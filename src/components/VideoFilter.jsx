import React, { useRef, useEffect } from 'react';

const VideoFilter = ({ src, enableFilter = false }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    if (!video || !canvas || !enableFilter) return;

    const ctx = canvas.getContext('2d');
    let animationId;

    const processFrame = () => {
      if (video.readyState >= 2) { // HAVE_CURRENT_DATA
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        ctx.drawImage(video, 0, 0);
        
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        // Цветовая фильтрация - заменяем определенный цвет
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          
          // Если цвет близок к белому или светло-серому
          if (r > 200 && g > 200 && b > 200) {
            // Заменяем на красный
            data[i] = 166;     // R
            data[i + 1] = 38;  // G  
            data[i + 2] = 57;  // B
            // data[i + 3] остается как есть (alpha)
          }
        }
        
        ctx.putImageData(imageData, 0, 0);
        
        // Добавляем PM текст в случайных местах
        ctx.font = '40px Arial';
        ctx.fillStyle = '#a62639';
        ctx.fillRect(50, 50, 120, 60);
        ctx.fillStyle = '#161616';
        ctx.fillText('PM', 60, 90);
        
        ctx.fillStyle = '#a62639';
        ctx.fillRect(canvas.width - 170, canvas.height - 110, 120, 60);
        ctx.fillStyle = '#161616';
        ctx.fillText('PM', canvas.width - 160, canvas.height - 70);
      }
      
      animationId = requestAnimationFrame(processFrame);
    };

    const handleLoadedData = () => {
      processFrame();
    };

    video.addEventListener('loadeddata', handleLoadedData);
    
    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [enableFilter]);

  return (
    <div className="video-filter-container">
      <video
        ref={videoRef}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        style={{ display: enableFilter ? 'none' : 'block' }}
        className="hero-video-bg"
      />
      {enableFilter && (
        <canvas
          ref={canvasRef}
          className="hero-video-bg"
          style={{ 
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            objectFit: 'cover',
            minWidth: '100%',
            minHeight: '100%',
            zIndex: 1
          }}
        />
      )}
    </div>
  );
};

export default VideoFilter; 