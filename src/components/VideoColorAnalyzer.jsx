import React, { useRef, useEffect, useState } from 'react';
import '../styles/fonts.css';

const VideoColorAnalyzer = ({ src, className = '', targetColor = null }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const hiddenCanvasRef = useRef(null);
  const animationRef = useRef(null);
  const elementsRef = useRef([]);
  const intervalRef = useRef(null);
  
  const [isReady, setIsReady] = useState(false);

  // Check pixel color
  const checkColor = (x, y, target, tolerance = 80) => {
    const hiddenCanvas = hiddenCanvasRef.current;
    const canvas = canvasRef.current;
    if (!hiddenCanvas || !canvas) return false;
    
    const ctx = hiddenCanvas.getContext('2d', { willReadFrequently: true });
    const width = hiddenCanvas.width;
    const height = hiddenCanvas.height;
    
    if (!canvas.width || !canvas.height || width <= 0 || height <= 0) {
      return false;
    }
    
    const scaledX = Math.floor(x * (width / canvas.width));
    const scaledY = Math.floor(y * (height / canvas.height));
    
    if (scaledX < 0 || scaledX >= width || scaledY < 0 || scaledY >= height) {
      return false;
    }
    
    try {
      const imageData = ctx.getImageData(scaledX, scaledY, 1, 1);
      const [r, g, b] = imageData.data;
      
      const distance = Math.sqrt(
        Math.pow(r - target.r, 2) + 
        Math.pow(g - target.g, 2) + 
        Math.pow(b - target.b, 2)
      );
      
      return distance <= tolerance;
    } catch (error) {
      return false;
    }
  };

  // Render PA elements
  const render = () => {
    const canvas = canvasRef.current;
    if (!canvas || !targetColor) return;
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const currentTime = Date.now();
    const newElements = [];
    
    elementsRef.current.forEach(element => {
      const age = (currentTime - element.createdAt) / 1000;
      const opacity = Math.max(0, Math.min(1, 1 - age / element.lifetime));
      
      if (opacity > 0 && checkColor(element.x, element.y, targetColor)) {
        newElements.push(element);
        
        const fontSize = 12;
        const halfWidth = fontSize * 0.6;
        const halfHeight = fontSize * 0.5;
        
        ctx.fillStyle = `rgba(166, 38, 57, ${opacity})`;
        ctx.fillRect(element.x - halfWidth, element.y - halfHeight, halfWidth * 2, halfHeight * 2);
        
        ctx.font = `bold ${fontSize}px PM_mod, Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`;
        ctx.fillText('PA', element.x, element.y);
      }
    });
    
    elementsRef.current = newElements;
  };

  // Analyze frame and add new elements
  const analyzeFrame = () => {
    if (!targetColor || !isReady) return;
    
    const video = videoRef.current;
    const hiddenCanvas = hiddenCanvasRef.current;
    const canvas = canvasRef.current;
    
    if (!video || !hiddenCanvas || !canvas || !canvas.width || !canvas.height) return;
    
    const hiddenCtx = hiddenCanvas.getContext('2d', { willReadFrequently: true });
    hiddenCtx.drawImage(video, 0, 0, hiddenCanvas.width, hiddenCanvas.height);
    
    let added = 0;
    const maxElements = 2000;
    const maxPerFrame = 50;
    
    for (let i = 0; i < 500 && added < maxPerFrame && elementsRef.current.length < maxElements; i++) {
      let x, y;
      
      if (i < 250) {
        x = Math.random() * canvas.width;
        y = Math.random() * canvas.height;
      } else {
        const step = 15;
        const gridX = Math.floor(canvas.width / step);
        const localI = i - 250;
        const baseX = (localI % gridX) * step + Math.random() * step;
        const baseY = Math.floor(localI / gridX) * step + Math.random() * step;
        
        x = Math.min(Math.max(baseX, 0), canvas.width - 1);
        y = Math.min(Math.max(baseY, 0), canvas.height - 1);
      }
      
      if (checkColor(x, y, targetColor)) {
        const hasNearby = elementsRef.current.some(el => {
          const dx = el.x - x;
          const dy = el.y - y;
          return (dx * dx + dy * dy) < 150;
        });
        
        if (!hasNearby) {
          const currentTime = Date.now();
          elementsRef.current.push({ 
            x: x + (Math.random() - 0.5) * 5,
            y: y + (Math.random() - 0.5) * 5,
            id: currentTime + Math.random(),
            createdAt: currentTime,
            lifetime: 1.5 + Math.random() * 2.5
          });
          added++;
        }
      }
    }
  };

  // Start animation
  const startAnimation = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    const animate = () => {
      render();
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
  };

  // Update canvas dimensions
  const updateCanvasSize = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const hiddenCanvas = hiddenCanvasRef.current;
    
    if (!video || !canvas || !hiddenCanvas) return;
    
    const videoRect = video.getBoundingClientRect();
    
    canvas.width = videoRect.width;
    canvas.height = videoRect.height;
    canvas.style.position = 'absolute';
    canvas.style.left = `${videoRect.left + window.scrollX}px`;
    canvas.style.top = `${videoRect.top + window.scrollY}px`;
    canvas.style.width = `${videoRect.width}px`;
    canvas.style.height = `${videoRect.height}px`;
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '10';
    
    hiddenCanvas.width = Math.floor(videoRect.width * 0.3);
    hiddenCanvas.height = Math.floor(videoRect.height * 0.3);
  };

  // Initialize video
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    const handleLoadedMetadata = () => {
      updateCanvasSize();
      setIsReady(true);
    };

    const handleResize = () => {
      updateCanvasSize();
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    window.addEventListener('resize', handleResize);

    if (video.readyState >= 2) {
      handleLoadedMetadata();
    }

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      window.removeEventListener('resize', handleResize);
    };
  }, [src]);

  // Color change
  useEffect(() => {
    if (targetColor) {
      elementsRef.current = [];
    }
  }, [targetColor]);

  // Start animation
  useEffect(() => {
    if (isReady && targetColor) {
      startAnimation();
    }
  }, [isReady, targetColor]);

  // Frame analysis
  useEffect(() => {
    if (!isReady || !targetColor) return;
    
    intervalRef.current = setInterval(analyzeFrame, 16);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isReady, targetColor]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <>
      <video
        ref={videoRef}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        className={className}
        style={{
          imageRendering: 'pixelated',
          MozImageRendering: 'crisp-edges',
          WebkitImageRendering: 'crisp-edges'
        }}
      />
      
      <canvas ref={hiddenCanvasRef} style={{ display: 'none' }} />
      <canvas ref={canvasRef} />
    </>
  );
};

export default VideoColorAnalyzer;