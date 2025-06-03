import React, { useRef, useEffect, useState, useCallback } from 'react';

const VideoColorAnalyzer = ({ src, className = '' }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const hiddenCanvasRef = useRef(null);
  const animationRef = useRef(null);
  const pmElementsRef = useRef([]);
  const spatialGridRef = useRef(new Map());
  const elementPoolRef = useRef([]);
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [detectedColors, setDetectedColors] = useState([]);
  const [frameRate, setFrameRate] = useState(0);
  
  // Настройки анализа
  const [settings, setSettings] = useState({
    targetColor: { r: 0, g: 0, b: 0 },
    tolerance: 60,
    sampleStep: 6,
    elementSize: { min: 12, max: 24 },
    opacity: { min: 0.8, max: 1.0 },
    lifespan: { min: 30, max: 60 },
    maxElements: 600,
    analysisInterval: 50,
    pixelSize: 12,
    videoScale: 0.3,
    spatialGridSize: 28,
    maxElementsPerGrid: 3,
    elementsPerPixel: 1,
    minDistanceBetweenElements: 10,
    maxLayering: 2
  });
  
  const [showControls, setShowControls] = useState(false);

  // Получение элемента из пула или создание нового
  const getElementFromPool = useCallback(() => {
    if (elementPoolRef.current.length > 0) {
      return elementPoolRef.current.pop();
    }
    return {};
  }, []);

  // Возврат элемента в пул
  const returnElementToPool = useCallback((element) => {
    if (elementPoolRef.current.length < 100) {
      elementPoolRef.current.push(element);
    }
  }, []);

  // Получение ключа пространственной сетки
  const getSpatialKey = useCallback((x, y) => {
    const gridX = Math.floor(x / settings.spatialGridSize);
    const gridY = Math.floor(y / settings.spatialGridSize);
    return `${gridX}-${gridY}`;
  }, [settings.spatialGridSize]);

  // Добавление элемента в пространственную сетку
  const addToSpatialGrid = useCallback((x, y) => {
    const key = getSpatialKey(x, y);
    const count = spatialGridRef.current.get(key) || 0;
    spatialGridRef.current.set(key, count + 1);
  }, [getSpatialKey]);

  // Проверка возможности размещения элемента
  const canPlaceElement = useCallback((x, y) => {
    const key = getSpatialKey(x, y);
    const gridCount = spatialGridRef.current.get(key) || 0;
    
    if (gridCount >= settings.maxElementsPerGrid) {
      return false;
    }
    
    // Быстрая проверка близких элементов (только последние 100)
    let nearbyCount = 0;
    const checkRadius = settings.minDistanceBetweenElements;
    const elementsToCheck = pmElementsRef.current.slice(-100); // Проверяем только последние 100
    
    for (const element of elementsToCheck) {
      const dx = element.x - x;
      const dy = element.y - y;
      const distanceSquared = dx * dx + dy * dy; // Избегаем sqrt для производительности
      
      if (distanceSquared < checkRadius * checkRadius) {
        nearbyCount++;
        if (nearbyCount >= settings.maxLayering) {
          return false;
        }
      }
    }
    
    return true;
  }, [getSpatialKey, settings.maxElementsPerGrid, settings.minDistanceBetweenElements, settings.maxLayering]);

  // Создание PM элементов
  const createPMElements = useCallback((positions) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const currentElements = pmElementsRef.current;
    let addedCount = 0;
    
    // Перемешиваем позиции для равномерного распределения
    const shuffledPositions = [...positions].sort(() => Math.random() - 0.5);
    
    for (const pos of shuffledPositions) {
      if (currentElements.length >= settings.maxElements) break;
      if (addedCount >= 20) break; // Ограничиваем количество новых элементов за кадр
      
      // Проверяем границы экрана
      if (pos.x < 0 || pos.x > canvas.width || pos.y < 0 || pos.y > canvas.height) {
        continue;
      }
      
      // Проверяем возможность размещения
      if (canPlaceElement(pos.x, pos.y)) {
        // Добавляем небольшой разброс
        const offsetX = (Math.random() - 0.5) * pos.pixelSize * 0.5;
        const offsetY = (Math.random() - 0.5) * pos.pixelSize * 0.5;
        const finalX = pos.x + offsetX;
        const finalY = pos.y + offsetY;
        
        const element = getElementFromPool();
        element.id = Date.now() + Math.random();
        element.x = finalX;
        element.y = finalY;
        element.size = settings.elementSize.min + Math.random() * (settings.elementSize.max - settings.elementSize.min);
        element.opacity = settings.opacity.min + Math.random() * (settings.opacity.max - settings.opacity.min);
        element.targetOpacity = element.opacity;
        element.rotation = 0;
        element.createdAt = Date.now();
        element.lifespan = settings.lifespan.min + Math.random() * (settings.lifespan.max - settings.lifespan.min);
        element.active = true;
        
        currentElements.push(element);
        addToSpatialGrid(finalX, finalY);
        addedCount++;
      }
    }
    
    pmElementsRef.current = currentElements;
  }, [settings, getElementFromPool, canPlaceElement, addToSpatialGrid]);

  // Функция для получения границ видео (теперь canvas точно соответствует видео)
  const getVideoDisplayBounds = useCallback(() => {
    const canvas = canvasRef.current;
    
    if (!canvas) return null;
    
    // Теперь canvas точно соответствует видимому видео
    return {
      width: canvas.width,
      height: canvas.height,
      offsetX: 0,
      offsetY: 0
    };
  }, []);

  // Анализ кадра видео с пикселизацией
  const analyzeFrame = useCallback(() => {
    const video = videoRef.current;
    const hiddenCanvas = hiddenCanvasRef.current;
    
    if (!video || !hiddenCanvas || video.readyState !== 4) {
      return;
    }

    const ctx = hiddenCanvas.getContext('2d', { willReadFrequently: true });
    const originalWidth = video.videoWidth;
    const originalHeight = video.videoHeight;
    
    // Уменьшенные размеры для анализа (пикселизация)
    const width = Math.floor(originalWidth * settings.videoScale);
    const height = Math.floor(originalHeight * settings.videoScale);
    
    // Устанавливаем размер скрытого canvas (только если изменился)
    if (hiddenCanvas.width !== width || hiddenCanvas.height !== height) {
      hiddenCanvas.width = width;
      hiddenCanvas.height = height;
    }
    
    // Отключаем сглаживание для четких пикселей
    ctx.imageSmoothingEnabled = false;
    
    // Рисуем уменьшенное видео на скрытом canvas
    ctx.drawImage(video, 0, 0, originalWidth, originalHeight, 0, 0, width, height);
    
    // Получаем границы отображения видео
    const videoBounds = getVideoDisplayBounds();
    if (!videoBounds) return;
    
    try {
      // Получаем данные пикселей
      const imageData = ctx.getImageData(0, 0, width, height);
      const pixels = imageData.data;
      
      const foundColors = [];
      const matchedPositions = [];
      
      // Анализируем пиксели с заданным шагом
      const step = settings.sampleStep;
      const tolerance = settings.tolerance;
      const targetR = settings.targetColor.r;
      const targetG = settings.targetColor.g;
      const targetB = settings.targetColor.b;
      
      for (let x = 0; x < width; x += step) {
        for (let y = 0; y < height; y += step) {
          const index = (y * width + x) * 4;
          
          if (index < pixels.length - 3) {
            const r = pixels[index];
            const g = pixels[index + 1];
            const b = pixels[index + 2];
            
            // Быстрая проверка цвета
            const distance = Math.sqrt(
              (r - targetR) * (r - targetR) +
              (g - targetG) * (g - targetG) + 
              (b - targetB) * (b - targetB)
            );
            
            if (distance <= tolerance) {
              // Прямое масштабирование координат (canvas теперь точно соответствует видео)
              const screenX = (x / width) * videoBounds.width;
              const screenY = (y / height) * videoBounds.height;
              
              const pixelSizeOnScreen = settings.pixelSize * (videoBounds.width / width);
              
              matchedPositions.push({ 
                x: screenX,
                y: screenY,
                color: { r, g, b },
                distance,
                pixelSize: pixelSizeOnScreen
              });
              
              // Добавляем в список обнаруженных цветов
              if (foundColors.length < 10) {
                foundColors.push({ r, g, b });
              }
            }
          }
        }
      }
      
      // Обновляем состояние
      setDetectedColors(foundColors.slice(0, 10));
      
      // Создаем новые PM элементы
      createPMElements(matchedPositions);
      
    } catch (error) {
      console.error('Ошибка анализа кадра:', error);
    }
  }, [settings, createPMElements, getVideoDisplayBounds]);

  // Рендеринг PM элементов
  const renderPMElements = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const currentTime = Date.now();
    const activeElements = [];
    
    // Очищаем пространственную сетку
    spatialGridRef.current.clear();
    
    pmElementsRef.current.forEach(element => {
      const age = (currentTime - element.createdAt) / 16.67; // возраст в кадрах (60fps)
      
      if (age < element.lifespan && element.active) {
        // Плавное исчезновение в последние кадры
        if (age > element.lifespan - 10) {
          element.opacity *= 0.95;
        }
        
        if (element.opacity > 0.05 && element.active) {
          // Рисуем PM элемент
          ctx.save();
          ctx.translate(element.x, element.y);
          
          // Настройки текста
          const fontSize = element.size * 0.4;
          ctx.font = `bold ${fontSize}px Arial`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          
          // Измеряем точные размеры текста
          const textMetrics = ctx.measureText('PM');
          const textWidth = textMetrics.width;
          const textHeight = fontSize;
          
          // Фон точно по размеру текста
          ctx.fillStyle = `rgba(166, 38, 57, ${element.opacity})`;
          ctx.fillRect(-textWidth/2, -textHeight/2, textWidth, textHeight);
          
          // Текст PM
          ctx.fillStyle = `rgba(0, 0, 0, ${element.opacity})`;
          ctx.fillText('PM', 0, 0);
          
          ctx.restore();
          
          activeElements.push(element);
        } else {
          // Возвращаем элемент в пул
          returnElementToPool(element);
        }
      } else {
        // Возвращаем элемент в пул
        returnElementToPool(element);
      }
    });
    
    pmElementsRef.current = activeElements;
    
    // Счетчик элементов
    if (activeElements.length > 0) {
      ctx.fillStyle = 'rgba(22, 22, 22, 0.95)';
      ctx.fillRect(0, 0, 220, 36);
      
      ctx.fillStyle = 'rgba(166, 38, 57, 1)';
      ctx.fillRect(0, 0, 220, 3);
      
      ctx.fillStyle = 'rgb(255, 255, 255)';
      ctx.font = 'bold 12px Arial';
      ctx.fillText(`PM ELEMENTS: ${activeElements.length}`, 14, 25);
    }
  }, [returnElementToPool]);

  // Основной цикл анимации
  const animate = useCallback(() => {
    renderPMElements();
    animationRef.current = requestAnimationFrame(animate);
  }, [renderPMElements]);

  // Инициализация видео
  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    if (!video || !canvas) return;
    
    const handleVideoLoad = () => {
      console.log('Видео загружено:', {
        videoWidth: video.videoWidth,
        videoHeight: video.videoHeight,
        readyState: video.readyState
      });
      
      // Синхронизируем размеры canvas с видео
      const updateCanvasSize = () => {
        const videoRect = video.getBoundingClientRect();
        canvas.width = videoRect.width;
        canvas.height = videoRect.height;
        canvas.style.width = `${videoRect.width}px`;
        canvas.style.height = `${videoRect.height}px`;
        canvas.style.left = `${videoRect.left}px`;
        canvas.style.top = `${videoRect.top}px`;
      };
      
      // Задержка для правильной синхронизации размеров
      setTimeout(() => {
        updateCanvasSize();
        setIsAnalyzing(true);
        
        // Запускаем анимацию
        animate();
      }, 100);
    };
    
    const handleVideoError = (e) => {
      console.error('Ошибка загрузки видео:', e);
    };
    
    video.addEventListener('loadeddata', handleVideoLoad);
    video.addEventListener('error', handleVideoError);
    
    return () => {
      video.removeEventListener('loadeddata', handleVideoLoad);
      video.removeEventListener('error', handleVideoError);
    };
  }, [animate]);

  // Периодический анализ кадров
  useEffect(() => {
    if (!isAnalyzing) return;
    
    let frameCount = 0;
    const startTime = Date.now();
    
    const analysisInterval = setInterval(() => {
      analyzeFrame();
      frameCount++;
      
      // Обновляем FPS каждую секунду
      if (frameCount % 10 === 0) {
        const elapsed = (Date.now() - startTime) / 1000;
        setFrameRate(Math.round(frameCount / elapsed));
      }
    }, settings.analysisInterval);
    
    return () => clearInterval(analysisInterval);
  }, [isAnalyzing, analyzeFrame, settings.analysisInterval]);

  // Обработчик изменения размера окна и синхронизация с видео
  useEffect(() => {
    const handleResize = () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      if (video && canvas) {
        const videoRect = video.getBoundingClientRect();
        canvas.width = videoRect.width;
        canvas.height = videoRect.height;
        canvas.style.width = `${videoRect.width}px`;
        canvas.style.height = `${videoRect.height}px`;
        canvas.style.left = `${videoRect.left}px`;
        canvas.style.top = `${videoRect.top}px`;
      }
    };

    // Используем ResizeObserver для точного отслеживания изменений видео
    const video = videoRef.current;
    let resizeObserver;
    
    if (video) {
      resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(video);
    }

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, []);

  // Очистка при размонтировании
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Обработчики для контролов
  const handleColorChange = (component, value) => {
    setSettings(prev => ({
      ...prev,
      targetColor: {
        ...prev.targetColor,
        [component]: parseInt(value)
      }
    }));
  };

  const setPresetColor = (color) => {
    setSettings(prev => ({
      ...prev,
      targetColor: color
    }));
  };

  const createTestElements = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    for (let i = 0; i < 5; i++) {
      const element = {
        id: Date.now() + Math.random(),
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: settings.elementSize.min + Math.random() * (settings.elementSize.max - settings.elementSize.min),
        opacity: 0,
        targetOpacity: settings.opacity.max,
        rotation: 0, // Без наклона
        createdAt: Date.now(),
        lifespan: settings.lifespan.max,
        active: true
      };
      
      pmElementsRef.current.push(element);
    }
  };

  return (
    <>
      {/* Основное видео с пикселизацией */}
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
      
      {/* Скрытый canvas для анализа */}
      <canvas
        ref={hiddenCanvasRef}
        style={{ display: 'none' }}
      />
      
      {/* Canvas для отрисовки PM элементов */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 10
        }}
      />
      
      {/* Панель управления */}
      {showControls && (
        <div style={{
          position: 'fixed',
          top: '20px', // В правом верхнем углу
          right: '20px',
          background: 'var(--bg-primary, #161616)',
          color: 'var(--text-primary, #eee8e7)',
          border: '1px solid var(--border-color, #333333)',
          padding: '24px',
          borderRadius: '0', // Гротескный стиль без скруглений
          zIndex: 1001,
          fontFamily: 'var(--font-primary, Arial)',
          fontSize: '12px',
          width: '340px',
          maxHeight: '75vh',
          overflowY: 'auto',
          boxShadow: 'var(--shadow-dark, 0 8px 32px rgba(166, 38, 57, 0.5))'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '20px',
            borderBottom: '1px solid var(--border-color, #333333)',
            paddingBottom: '16px'
          }}>
            <h3 style={{ 
              margin: 0, 
              fontSize: '14px',
              fontWeight: '400',
              letterSpacing: '1px',
              color: 'var(--text-primary, #eee8e7)'
            }}>
              VIDEO COLOR ANALYSIS
            </h3>
            <button 
              onClick={() => setShowControls(false)}
              style={{
                background: 'transparent',
                border: '1px solid var(--border-color, #333333)',
                color: 'var(--text-primary, #eee8e7)',
                cursor: 'pointer',
                fontSize: '14px',
                width: '28px',
                height: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                borderRadius: '0'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = 'var(--accent-primary, #a62639)';
                e.target.style.borderColor = 'var(--accent-primary, #a62639)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.borderColor = 'var(--border-color, #333333)';
              }}
            >×</button>
          </div>
          
          {/* Статистика */}
          <div style={{ 
            marginBottom: '20px', 
            padding: '16px', 
            background: 'var(--bg-tertiary, #1a1a1a)', 
            border: '1px solid var(--border-color, #333333)',
            borderRadius: '0'
          }}>
            <div style={{ 
              fontWeight: '400', 
              letterSpacing: '0.5px', 
              marginBottom: '8px',
              color: 'var(--accent-primary, #a62639)',
              fontSize: '11px'
                         }}>
               STATISTICS
             </div>
             <div style={{ fontSize: '11px', marginBottom: '4px' }}>Active elements: {pmElementsRef.current.length}</div>
             <div style={{ fontSize: '11px', marginBottom: '4px' }}>Analysis FPS: {frameRate}</div>
             <div style={{ fontSize: '11px', marginBottom: '4px' }}>Colors detected: {detectedColors.length}</div>
             <div style={{ fontSize: '11px', display: 'flex', alignItems: 'center', gap: '8px' }}>
               <span style={{ 
                 width: '8px', 
                 height: '8px', 
                 backgroundColor: isAnalyzing ? 'var(--accent-primary, #a62639)' : 'var(--text-muted, #cccccc)',
                 display: 'inline-block'
               }}></span>
               {isAnalyzing ? 'ANALYSIS' : 'STOPPED'}
            </div>
          </div>
          
          {/* Настройка FPS */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              fontWeight: '400', 
              fontSize: '11px',
              letterSpacing: '0.5px',
              color: 'var(--text-primary, #eee8e7)',
              display: 'block',
              marginBottom: '8px'
                         }}>
               ANALYSIS FPS: {Math.round(1000/settings.analysisInterval)}
             </label>
            <input 
              type="range" 
              min="16" 
              max="100" 
              value={settings.analysisInterval}
              onChange={(e) => setSettings(prev => ({...prev, analysisInterval: parseInt(e.target.value)}))}
              style={{ 
                width: '100%', 
                height: '4px',
                backgroundColor: 'var(--border-color, #333333)',
                outline: 'none',
                border: 'none',
                appearance: 'none',
                cursor: 'pointer'
              }}
            />
            <div style={{ 
              fontSize: '10px', 
              color: 'var(--text-muted, #cccccc)',
              marginTop: '4px',
              letterSpacing: '0.3px'
                         }}>
               16ms = 60fps, 33ms = 30fps, 100ms = 10fps
             </div>
          </div>
          
          {/* Целевой цвет */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ 
              fontWeight: '400', 
              fontSize: '11px',
              letterSpacing: '0.5px',
              color: 'var(--text-primary, #eee8e7)',
              marginBottom: '12px'
                         }}>
               TARGET COLOR
             </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
              {['r', 'g', 'b'].map(component => (
                <div key={component} style={{ flex: '1', minWidth: '70px' }}>
                  <label style={{ 
                    fontSize: '10px', 
                    letterSpacing: '0.5px',
                    color: 'var(--text-muted, #cccccc)',
                    display: 'block',
                    marginBottom: '4px'
                  }}>
                    {component.toUpperCase()}
                  </label>
                  <input 
                    type="range" 
                    min="0" 
                    max="255" 
                    value={settings.targetColor[component]}
                    onChange={(e) => handleColorChange(component, e.target.value)}
                    style={{ 
                      width: '100%', 
                      height: '4px',
                      backgroundColor: 'var(--border-color, #333333)',
                      outline: 'none',
                      border: 'none',
                      appearance: 'none',
                      cursor: 'pointer',
                      marginBottom: '4px'
                    }}
                  />
                  <span style={{ 
                    fontSize: '10px',
                    color: 'var(--text-muted, #cccccc)'
                  }}>
                    {settings.targetColor[component]}
                  </span>
                </div>
              ))}
            </div>
            <div style={{ 
              width: '40px', 
              height: '24px', 
              backgroundColor: `rgb(${settings.targetColor.r}, ${settings.targetColor.g}, ${settings.targetColor.b})`,
              border: '1px solid var(--border-color, #333333)',
              marginTop: '8px'
            }}></div>
          </div>
          
          {/* Пресеты цветов */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ 
              fontWeight: '400', 
              fontSize: '11px',
              letterSpacing: '0.5px',
              color: 'var(--text-primary, #eee8e7)',
              marginBottom: '12px'
                         }}>
               PRESETS
             </div>
             <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
               {[
                 { name: 'YELLOW', color: { r: 255, g: 255, b: 0 } },
                 { name: 'RED', color: { r: 255, g: 0, b: 0 } },
                 { name: 'GREEN', color: { r: 0, g: 255, b: 0 } },
                 { name: 'BLUE', color: { r: 0, g: 0, b: 255 } },
                 { name: 'WHITE', color: { r: 255, g: 255, b: 255 } },
                 { name: 'BLACK', color: { r: 0, g: 0, b: 0 } }
              ].map(preset => (
                <button 
                  key={preset.name}
                  onClick={() => setPresetColor(preset.color)}
                  style={{
                    padding: '8px 12px',
                    fontSize: '9px',
                    letterSpacing: '0.5px',
                    background: `rgb(${preset.color.r}, ${preset.color.g}, ${preset.color.b})`,
                    color: preset.color.r + preset.color.g + preset.color.b > 400 ? 'var(--text-inverse, #161616)' : 'var(--text-primary, #eee8e7)',
                    border: '1px solid var(--border-color, #333333)',
                    borderRadius: '0',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontWeight: '400'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'translateY(-1px)';
                    e.target.style.boxShadow = '0 2px 8px rgba(166, 38, 57, 0.3)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>
          
          {/* Толерантность */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              fontWeight: '400', 
              fontSize: '11px',
              letterSpacing: '0.5px',
              color: 'var(--text-primary, #eee8e7)',
              display: 'block',
              marginBottom: '8px'
                         }}>
               TOLERANCE: {settings.tolerance}
             </label>
            <input 
              type="range" 
              min="10" 
              max="200" 
              value={settings.tolerance}
              onChange={(e) => setSettings(prev => ({...prev, tolerance: parseInt(e.target.value)}))}
              style={{ 
                width: '100%', 
                height: '4px',
                backgroundColor: 'var(--border-color, #333333)',
                outline: 'none',
                border: 'none',
                appearance: 'none',
                cursor: 'pointer'
              }}
            />
          </div>
          
          {/* Размер пикселей */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              fontWeight: '400', 
              fontSize: '11px',
              letterSpacing: '0.5px',
              color: 'var(--text-primary, #eee8e7)',
              display: 'block',
              marginBottom: '8px'
                         }}>
               PIXEL SIZE: {settings.pixelSize}
             </label>
            <input 
              type="range" 
              min="4" 
              max="16" 
              value={settings.pixelSize}
              onChange={(e) => setSettings(prev => ({...prev, pixelSize: parseInt(e.target.value)}))}
              style={{ 
                width: '100%', 
                height: '4px',
                backgroundColor: 'var(--border-color, #333333)',
                outline: 'none',
                border: 'none',
                appearance: 'none',
                cursor: 'pointer',
                marginBottom: '4px'
              }}
            />
            <div style={{ 
              fontSize: '10px', 
              color: 'var(--text-muted, #cccccc)',
              letterSpacing: '0.3px'
            }}>
                             4 = small, 16 = large blocks
            </div>
          </div>
          
          {/* Шаг сэмплирования */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              fontWeight: '400', 
              fontSize: '11px',
              letterSpacing: '0.5px',
              color: 'var(--text-primary, #eee8e7)',
              display: 'block',
              marginBottom: '8px'
                         }}>
               DENSITY: {settings.sampleStep}
             </label>
            <input 
              type="range" 
              min="4" 
              max="16" 
              value={settings.sampleStep}
              onChange={(e) => setSettings(prev => ({...prev, sampleStep: parseInt(e.target.value)}))}
              style={{ 
                width: '100%', 
                height: '4px',
                backgroundColor: 'var(--border-color, #333333)',
                outline: 'none',
                border: 'none',
                appearance: 'none',
                cursor: 'pointer',
                marginBottom: '4px'
              }}
            />
            <div style={{ 
              fontSize: '10px', 
              color: 'var(--text-muted, #cccccc)',
              letterSpacing: '0.3px'
            }}>
                             4 = more blocks, 16 = fewer blocks
            </div>
          </div>
          
          {/* Масштаб видео для анализа */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              fontWeight: '400', 
              fontSize: '11px',
              letterSpacing: '0.5px',
              color: 'var(--text-primary, #eee8e7)',
              display: 'block',
              marginBottom: '8px'
                         }}>
               ANALYSIS RESOLUTION: {Math.round(settings.videoScale * 100)}%
             </label>
            <input 
              type="range" 
              min="0.1" 
              max="1" 
              step="0.05"
              value={settings.videoScale}
              onChange={(e) => setSettings(prev => ({...prev, videoScale: parseFloat(e.target.value)}))}
              style={{ 
                width: '100%', 
                height: '4px',
                backgroundColor: 'var(--border-color, #333333)',
                outline: 'none',
                border: 'none',
                appearance: 'none',
                cursor: 'pointer',
                marginBottom: '4px'
              }}
            />
            <div style={{ 
              fontSize: '10px', 
              color: 'var(--text-muted, #cccccc)',
              letterSpacing: '0.3px'
            }}>
                             10% = heavily pixelated, 100% = full resolution
            </div>
          </div>
          
          {/* Обнаруженные цвета */}
          {detectedColors.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <div style={{ 
                fontWeight: '400', 
                fontSize: '11px',
                letterSpacing: '0.5px',
                color: 'var(--text-primary, #eee8e7)',
                marginBottom: '12px'
                             }}>
                 DETECTED COLORS
               </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {detectedColors.slice(0, 6).map((color, index) => (
                  <div 
                    key={index}
                    style={{
                      width: '24px',
                      height: '24px',
                      backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
                      border: '1px solid var(--border-color, #333333)',
                      borderRadius: '0',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    title={`RGB(${color.r}, ${color.g}, ${color.b})`}
                    onMouseOver={(e) => {
                      e.target.style.transform = 'scale(1.1)';
                      e.target.style.boxShadow = '0 2px 8px rgba(166, 38, 57, 0.3)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = 'scale(1)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                ))}
              </div>
            </div>
          )}
          
          {/* Тест */}
          <div style={{ 
            borderTop: '1px solid var(--border-color, #333333)', 
            paddingTop: '16px',
            marginTop: '20px'
          }}>
            <button 
              onClick={createTestElements}
              style={{ 
                padding: '12px 16px', 
                fontSize: '11px', 
                letterSpacing: '0.5px',
                fontWeight: '400',
                background: 'var(--accent-primary, #a62639)', 
                color: 'var(--text-primary, #eee8e7)', 
                border: '1px solid var(--accent-primary, #a62639)', 
                borderRadius: '0', 
                cursor: 'pointer',
                width: '100%',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = 'var(--accent-secondary, #8a1f2e)';
                e.target.style.borderColor = 'var(--accent-secondary, #8a1f2e)';
                e.target.style.transform = 'translateY(-1px)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'var(--accent-primary, #a62639)';
                e.target.style.borderColor = 'var(--accent-primary, #a62639)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              🧪 CREATE TEST ELEMENTS
            </button>
          </div>
        </div>
      )}
      
      {/* Кнопка показать панель */}
      {!showControls && (
        <button 
          onClick={() => setShowControls(true)}
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: 'var(--bg-primary, #161616)',
            color: 'var(--text-primary, #eee8e7)',
            border: '1px solid var(--border-color, #333333)',
            padding: '12px 16px',
            borderRadius: '0',
            cursor: 'pointer',
            zIndex: 1001,
            fontSize: '11px',
            fontWeight: '400',
            letterSpacing: '0.5px',
            transition: 'all 0.3s ease',
            boxShadow: 'var(--shadow-light, 0 2px 8px rgba(166, 38, 57, 0.3))'
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = 'var(--accent-primary, #a62639)';
            e.target.style.borderColor = 'var(--accent-primary, #a62639)';
            e.target.style.transform = 'translateY(-1px)';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = 'var(--bg-primary, #161616)';
            e.target.style.borderColor = 'var(--border-color, #333333)';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          ⚙️ PANEL
        </button>
      )}
    </>
  );
};

export default VideoColorAnalyzer; 