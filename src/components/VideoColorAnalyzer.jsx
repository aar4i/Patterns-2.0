import React, { useRef, useEffect, useState } from 'react';
import '../styles/fonts.css';

const VideoColorAnalyzer = ({ src, className = '', targetColor = null, isPaused = false, useCamera = false }) => {
  console.log('VideoColorAnalyzer инициализация:', { src, isPaused, targetColor, useCamera });
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const hiddenCanvasRef = useRef(null);
  const animationRef = useRef(null);
  const elementsRef = useRef([]);
  const intervalRef = useRef(null);
  const streamRef = useRef(null);
  
  const [isReady, setIsReady] = useState(false);

  // Простая функция проверки цвета
  const checkColor = (x, y, target, tolerance = 80) => {
    const hiddenCanvas = hiddenCanvasRef.current;
    const canvas = canvasRef.current;
    if (!hiddenCanvas || !canvas) return false;
    
    const ctx = hiddenCanvas.getContext('2d', { willReadFrequently: true });
    const width = hiddenCanvas.width;
    const height = hiddenCanvas.height;
    
    // Проверяем, что canvas готов и имеет корректные размеры
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

  // Простая функция рендера
  const render = () => {
    const canvas = canvasRef.current;
    if (!canvas || !targetColor) return;
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const currentTime = Date.now();
    
    if (isPaused) {
      // При паузе просто рендерим существующие элементы без обновления времени жизни
      elementsRef.current.forEach(element => {
        const age = (currentTime - element.createdAt) / 1000;
        const opacity = Math.max(0, Math.min(1, 1 - age / element.lifetime));
        
        if (opacity > 0) {
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
    } else {
      // Когда не на паузе - обновляем жизненный цикл элементов
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
    }
    
    // Debug панель убрана
  };

  // Анализ кадра и добавление новых элементов
  const analyzeFrame = () => {
    if (!targetColor || isPaused || !isReady) return;
    
    const video = videoRef.current;
    const hiddenCanvas = hiddenCanvasRef.current;
    const canvas = canvasRef.current;
    
    if (!video || !hiddenCanvas || !canvas || !canvas.width || !canvas.height) return;
    
    const hiddenCtx = hiddenCanvas.getContext('2d', { willReadFrequently: true });
    hiddenCtx.drawImage(video, 0, 0, hiddenCanvas.width, hiddenCanvas.height);
    
    // Увеличиваем количество элементов и частоту их создания
    let added = 0;
    const maxElements = 2000; // Больше элементов
    const maxPerFrame = 50; // Больше элементов за кадр
    
    // Комбинируем случайный и систематический поиск
    for (let i = 0; i < 500 && added < maxPerFrame && elementsRef.current.length < maxElements; i++) {
      let x, y;
      
      if (i < 250) {
        // Первая половина попыток - случайные позиции по всему экрану
        x = Math.random() * canvas.width;
        y = Math.random() * canvas.height;
      } else {
        // Вторая половина - систематическое сканирование
        const step = 15;
        const gridX = Math.floor(canvas.width / step);
        const localI = i - 250;
        const baseX = (localI % gridX) * step + Math.random() * step;
        const baseY = Math.floor(localI / gridX) * step + Math.random() * step;
        
        x = Math.min(Math.max(baseX, 0), canvas.width - 1);
        y = Math.min(Math.max(baseY, 0), canvas.height - 1);
      }
      
      if (checkColor(x, y, targetColor)) {
        // Уменьшаем минимальное расстояние для большей плотности
        const hasNearby = elementsRef.current.some(el => {
          const dx = el.x - x;
          const dy = el.y - y;
          return (dx * dx + dy * dy) < 150; // Меньшее расстояние = больше плотность
        });
        
        if (!hasNearby) {
          const currentTime = Date.now();
          elementsRef.current.push({ 
            x: x + (Math.random() - 0.5) * 5, // Меньший разброс позиции
            y: y + (Math.random() - 0.5) * 5,
            id: currentTime + Math.random(),
            createdAt: currentTime,
            lifetime: 1.5 + Math.random() * 2.5 // Немного короче жизнь для динамики
          });
          added++;
        }
      }
    }
  };

  // Запуск анимации
  const startAnimation = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    const animate = () => {
      render();
      animationRef.current = requestAnimationFrame(animate);
    };
    
    console.log('Запуск анимации для цвета:', targetColor);
    animate();
  };

  // Функция обновления размеров canvas
  const updateCanvasSize = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const hiddenCanvas = hiddenCanvasRef.current;
    
    if (!video || !canvas || !hiddenCanvas) return;
    
    // Получаем точные размеры и позицию видео
    const videoRect = video.getBoundingClientRect();
    const videoComputedStyle = window.getComputedStyle(video);
    
    // Устанавливаем canvas точно поверх видео
    canvas.width = videoRect.width;
    canvas.height = videoRect.height;
    canvas.style.position = 'absolute';
    canvas.style.left = `${videoRect.left + window.scrollX}px`;
    canvas.style.top = `${videoRect.top + window.scrollY}px`;
    canvas.style.width = `${videoRect.width}px`;
    canvas.style.height = `${videoRect.height}px`;
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '10';
    
    // Обновляем скрытый canvas для анализа
    hiddenCanvas.width = Math.floor(videoRect.width * 0.3);
    hiddenCanvas.height = Math.floor(videoRect.height * 0.3);
    
    console.log('Canvas позиционирован:', {
      canvas: { 
        width: canvas.width, 
        height: canvas.height,
        left: canvas.style.left,
        top: canvas.style.top 
      },
      video: { 
        width: videoRect.width, 
        height: videoRect.height,
        left: videoRect.left,
        top: videoRect.top 
      }
    });
  };

  // Функция для настройки камеры
  const setupCamera = async () => {
    const video = videoRef.current;
    if (!video || !useCamera) return;

    try {
      console.log('Инициализация камеры...');
      
      // Останавливаем предыдущий поток если есть
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }

      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1920 },
          height: { ideal: 1080 },
          facingMode: 'user'
        } 
      });

      streamRef.current = stream;
      video.srcObject = stream;
      video.autoplay = true;
      video.muted = true;
      video.playsInline = true;

      const handleVideoLoad = () => {
        updateCanvasSize();
        setIsReady(true);
        console.log('Камера готова');
      };

      video.addEventListener('loadedmetadata', handleVideoLoad);
      
      return () => {
        video.removeEventListener('loadedmetadata', handleVideoLoad);
      };
    } catch (error) {
      console.error('Ошибка инициализации камеры:', error);
    }
  };

  // Функция для настройки видео файла
  const setupVideoFile = () => {
    const video = videoRef.current;
    if (!video || useCamera || !src) return;

    console.log('Инициализация видео файла:', src);
    
    // Останавливаем камеру если была активна
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    video.srcObject = null;
    video.src = src;

    const handleVideoLoad = () => {
      updateCanvasSize();
      setIsReady(true);
      console.log('Видео файл готов');
    };

    video.addEventListener('loadeddata', handleVideoLoad);
    
    return () => {
      video.removeEventListener('loadeddata', handleVideoLoad);
    };
  };

  // Инициализация видео или камеры
  useEffect(() => {
    const canvas = canvasRef.current;
    const hiddenCanvas = hiddenCanvasRef.current;
    
    if (!canvas || !hiddenCanvas) return;

    setIsReady(false);
    elementsRef.current = []; // Очищаем элементы при смене источника

    const handleResize = () => {
      updateCanvasSize();
    };
    
    const handleScroll = () => {
      // ВРЕМЕННО ОТКЛЮЧАЕМ обновление canvas при скролле
      // updateCanvasSize();
    };

    window.addEventListener('resize', handleResize);
    // ВРЕМЕННО НЕ слушаем скролл
    // window.addEventListener('scroll', handleScroll);
    
    let cleanup;
    
    if (useCamera) {
      setupCamera().then(cleanupFn => {
        cleanup = cleanupFn;
      });
    } else {
      cleanup = setupVideoFile();
    }
    
    return () => {
      window.removeEventListener('resize', handleResize);
      // window.removeEventListener('scroll', handleScroll);
      
      if (cleanup) {
        cleanup();
      }
      
      // Останавливаем камеру при размонтировании
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [src, useCamera]);

  // Управление паузой
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    if (isPaused) {
      video.pause();
    } else {
      video.play().catch(console.error);
    }
  }, [isPaused]);

  // Смена цвета
  useEffect(() => {
    if (targetColor) {
      console.log('Смена цвета на:', targetColor);
      elementsRef.current = []; // Очищаем элементы
    }
  }, [targetColor]);

  // Запуск анимации при готовности
  useEffect(() => {
    if (isReady && !isPaused && targetColor) {
      startAnimation();
    } else if (isPaused && animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  }, [isReady, isPaused, targetColor]);

  // Анализ кадров
  useEffect(() => {
    if (!isReady || isPaused || !targetColor) return;
    
    intervalRef.current = setInterval(analyzeFrame, 16); // ~60 FPS для более частого обновления
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isReady, isPaused, targetColor]);

  // Очистка при размонтировании
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      // Останавливаем камеру
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <>
      <video
        ref={videoRef}
        src={useCamera ? undefined : src}
        autoPlay
        muted
        loop={!useCamera} // Камера не должна зацикливаться
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