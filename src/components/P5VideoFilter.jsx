import React, { useRef, useEffect, useState } from 'react';
import p5 from 'p5';

const P5VideoFilter = ({ src, targetColor = { r: 255, g: 255, b: 0 }, colorTolerance = 60 }) => {
  const containerRef = useRef(null);
  const p5InstanceRef = useRef(null);
  
  // Состояние для настроек
  const [settings, setSettings] = useState({
    targetR: targetColor.r,
    targetG: targetColor.g, 
    targetB: targetColor.b,
    tolerance: colorTolerance,
    sampleStep: 20,
    minSize: 12,
    maxSize: 24,
    minOpacity: 0.6,
    maxOpacity: 0.9,
    minTimer: 90,
    maxTimer: 180
  });
  
  const [showUI, setShowUI] = useState(true);

  useEffect(() => {
    console.log('P5VideoFilter инициализируется с:', { src, targetColor, colorTolerance });
    
    const sketch = (p) => {
      let video;
      let canvas;
      let pmElements = [];
      
      p.setup = () => {
        console.log('P5 setup начинается');
        // Создаем canvas на весь экран для отрисовки мелких элементов
        canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        canvas.parent(containerRef.current);
        console.log('Canvas создан:', p.windowWidth, 'x', p.windowHeight);
        
        // Создаем видео элемент для анализа
        video = p.createVideo([src]);
        video.hide(); // Скрываем стандартный video элемент
        video.loop();
        video.volume(0);
        video.size(160, 90); // Маленький размер для анализа
        
        // Обработчик загрузки видео
        video.onloadeddata = () => {
          console.log('P5 видео загружено для анализа, размер:', video.width, 'x', video.height);
        };
        
        // Инициализируем массив PM элементов
        initPMElements();
        
        // Делаем pmElements доступным глобально для тестирования
        window.pmElementsTest = pmElements;
      };
      
      const initPMElements = () => {
        pmElements = [];
        console.log('PM элементы инициализированы');
      };
      
      p.draw = () => {
        // Прозрачный фон
        p.clear();
        
        if (video && video.loadedmetadata && video.width > 0 && video.height > 0) {
          // НЕ скрываем fallback видео - оно должно быть всегда видно
          const fallbackVideo = document.querySelector('.hero-video-bg');
          if (fallbackVideo) {
            fallbackVideo.style.display = 'block';
          }
          
          // Анализируем цветовые каналы и создаем мелкие PM элементы
          if (p.frameCount % 10 === 0) { // Каждые ~167мс
            analyzeAndCreateSmallPM();
          }
          
          // Рисуем мелкие PM элементы
          drawSmallPMElements();
          
          // Отладочная информация каждые 60 кадров
          if (p.frameCount % 60 === 0) {
            console.log('Активных PM элементов:', pmElements.length);
          }
        } else {
          // Показываем fallback видео всегда
          const fallbackVideo = document.querySelector('.hero-video-bg');
          if (fallbackVideo) {
            fallbackVideo.style.display = 'block';
          }
          
          if (p.frameCount % 60 === 0) {
            console.log('Видео еще не загружено, frameCount:', p.frameCount);
          }
        }
      };
      
      const analyzeAndCreateSmallPM = () => {
        // Проверяем, что видео готово к анализу
        if (!video || !video.loadedmetadata || video.width === 0 || video.height === 0) {
          console.log('Видео не готово к анализу');
          return;
        }
        
        try {
          // Создаем временный canvas для анализа
          const tempCanvas = p.createGraphics(video.width, video.height);
          tempCanvas.image(video, 0, 0, video.width, video.height);
          tempCanvas.loadPixels();
          
          // Проверяем, что пиксели загружены
          if (!tempCanvas.pixels || tempCanvas.pixels.length === 0) {
            console.log('Пиксели canvas не загружены');
            tempCanvas.remove();
            return;
          }
          
          console.log(`Анализируем видео ${video.width}x${video.height}, пикселей: ${tempCanvas.pixels.length}`);
          
          const sampleStep = settings.sampleStep; // Используем настройку
          let matchCount = 0;
          
          // Убираем старые неактивные элементы
          const beforeFilter = pmElements.length;
          pmElements = pmElements.filter(element => element.opacity > 0.01);
          const afterFilter = pmElements.length;
          
          if (beforeFilter !== afterFilter) {
            console.log(`Удалено ${beforeFilter - afterFilter} неактивных элементов`);
          }
          
          // Используем настройки цвета
          const currentTargetColor = { r: settings.targetR, g: settings.targetG, b: settings.targetB };
          
          // Сканируем видео на наличие целевого цвета
          for (let x = 0; x < video.width; x += sampleStep) {
            for (let y = 0; y < video.height; y += sampleStep) {
              const pixelIndex = (y * video.width + x) * 4;
              
              if (pixelIndex < tempCanvas.pixels.length - 3) { // Проверяем границы + 3 для RGB
                const r = tempCanvas.pixels[pixelIndex];
                const g = tempCanvas.pixels[pixelIndex + 1];
                const b = tempCanvas.pixels[pixelIndex + 2];
                
                // Отладка первых нескольких пикселей
                if (matchCount === 0 && p.frameCount % 120 === 0 && x < sampleStep * 3 && y < sampleStep * 3) {
                  const distance = Math.sqrt(
                    Math.pow(r - currentTargetColor.r, 2) + 
                    Math.pow(g - currentTargetColor.g, 2) + 
                    Math.pow(b - currentTargetColor.b, 2)
                  );
                  console.log(`Пиксель (${x},${y}): RGB(${r}, ${g}, ${b}), Целевой: RGB(${currentTargetColor.r}, ${currentTargetColor.g}, ${currentTargetColor.b}), Дистанция: ${distance.toFixed(1)}, Толерантность: ${settings.tolerance}`);
                }
                
                // Проверяем, соответствует ли пиксель целевому цвету
                if (isColorMatch(r, g, b, currentTargetColor, settings.tolerance)) {
                  matchCount++;
                  
                  // Масштабируем координаты с маленького видео на большой экран
                  const screenX = (x / video.width) * p.width;
                  const screenY = (y / video.height) * p.height;
                  
                  // Проверяем, нет ли уже элемента рядом с этой позицией
                  const existingElement = pmElements.find(el => 
                    Math.abs(el.x - screenX) < 60 && Math.abs(el.y - screenY) < 60
                  );
                  
                  if (!existingElement) {
                    // Создаем новый мелкий PM элемент с настройками
                    const newElement = {
                      x: screenX + p.random(-15, 15),
                      y: screenY + p.random(-15, 15),
                      size: p.random(settings.minSize, settings.maxSize),
                      opacity: 0,
                      targetOpacity: p.random(settings.minOpacity, settings.maxOpacity),
                      rotation: p.random(-15, 15),
                      active: true,
                      timer: p.random(settings.minTimer, settings.maxTimer),
                      colorMatch: true
                    };
                    pmElements.push(newElement);
                    console.log(`Создан новый PM элемент на позиции (${Math.round(screenX)}, ${Math.round(screenY)}) для пикселя RGB(${r}, ${g}, ${b})`);
                  }
                }
              }
            }
          }
          
          if (matchCount > 0) {
            console.log(`Найдено ${matchCount} пикселей целевого цвета, всего элементов: ${pmElements.length}`);
          } else {
            // Если ничего не найдено, покажем образец цветов для отладки
            if (p.frameCount % 120 === 0) { // Каждые 2 секунды
              console.log('Образец цветов в видео:');
              for (let i = 0; i < Math.min(20, tempCanvas.pixels.length); i += 4) {
                const r = tempCanvas.pixels[i];
                const g = tempCanvas.pixels[i + 1];
                const b = tempCanvas.pixels[i + 2];
                if (r !== undefined && g !== undefined && b !== undefined) {
                  console.log(`Пиксель ${i/4}: RGB(${r}, ${g}, ${b})`);
                }
              }
              
              // Дополнительная выборка из центра кадра
              const centerX = Math.floor(video.width / 2);
              const centerY = Math.floor(video.height / 2);
              const centerIndex = (centerY * video.width + centerX) * 4;
              if (centerIndex < tempCanvas.pixels.length - 3) {
                const r = tempCanvas.pixels[centerIndex];
                const g = tempCanvas.pixels[centerIndex + 1];
                const b = tempCanvas.pixels[centerIndex + 2];
                console.log(`Центр кадра: RGB(${r}, ${g}, ${b})`);
              }
            }
          }
          
          // Очищаем временный canvas
          tempCanvas.remove();
          
        } catch (error) {
          console.error('Ошибка при анализе видео:', error);
          return;
        }
        
        // Обновляем существующие элементы
        pmElements.forEach(element => {
          if (element.active) {
            element.timer--;
            if (element.timer <= 0) {
              element.targetOpacity = 0;
              element.active = false;
            }
          }
          
          // Плавная анимация прозрачности
          element.opacity = p.lerp(element.opacity, element.targetOpacity, 0.06);
        });
      };
      
      // Функция для проверки соответствия цвета
      const isColorMatch = (r, g, b, target, tolerance) => {
        const distance = Math.sqrt(
          Math.pow(r - target.r, 2) + 
          Math.pow(g - target.g, 2) + 
          Math.pow(b - target.b, 2)
        );
        return distance <= tolerance;
      };
      
      const drawSmallPMElements = () => {
        const visibleElements = pmElements.filter(element => element.opacity > 0.01);
        
        if (visibleElements.length > 0 && p.frameCount % 60 === 0) {
          console.log(`Рисуем ${visibleElements.length} видимых элементов`);
        }
        
        visibleElements.forEach((element) => {
          p.push();
          p.translate(element.x, element.y);
          p.rotate(p.radians(element.rotation));
          
          // Рисуем мелкий красный фон для PM
          p.fill(166, 38, 57, element.opacity * 255);
          p.noStroke();
          p.rect(-element.size/2, -element.size/3, element.size, element.size/1.5);
          
          // Рисуем мелкий текст PM
          p.fill(22, 22, 22, element.opacity * 255); // Черный текст
          p.textAlign(p.CENTER, p.CENTER);
          p.textSize(element.size * 0.35); // Мельче текст
          p.textStyle(p.BOLD);
          p.text('PM', 0, 0);
          
          p.pop();
        });
        
        // Отладочная информация в углу экрана
        if (visibleElements.length > 0) {
          p.push();
          p.fill(255, 255, 255, 200);
          p.noStroke();
          p.rect(10, 10, 200, 40);
          p.fill(0);
          p.textAlign(p.LEFT, p.TOP);
          p.textSize(14);
          p.text(`PM элементов: ${visibleElements.length}`, 15, 25);
          p.pop();
        }
      };
      
      p.windowResized = () => {
        console.log('Окно изменено, новый размер:', p.windowWidth, 'x', p.windowHeight);
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        initPMElements();
      };
    };

    // Создаем экземпляр p5
    p5InstanceRef.current = new p5(sketch);

    // Cleanup функция
    return () => {
      if (p5InstanceRef.current) {
        console.log('P5 instance удаляется');
        p5InstanceRef.current.remove();
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  // Тестовая функция для создания элементов
  const createTestElements = () => {
    if (p5InstanceRef.current) {
      const p = p5InstanceRef.current;
      // Создаем несколько тестовых элементов
      for (let i = 0; i < 5; i++) {
        const newElement = {
          x: p.random(100, p.width - 100),
          y: p.random(100, p.height - 100),
          size: p.random(settings.minSize, settings.maxSize),
          opacity: 0,
          targetOpacity: p.random(settings.minOpacity, settings.maxOpacity),
          rotation: p.random(-15, 15),
          active: true,
          timer: p.random(settings.minTimer, settings.maxTimer),
          colorMatch: true
        };
        // Добавляем через глобальную переменную (хак для тестирования)
        if (window.pmElementsTest) {
          window.pmElementsTest.push(newElement);
        }
      }
      console.log('Созданы тестовые элементы');
    }
  };

  return (
    <>
      <div 
        ref={containerRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 2,
          pointerEvents: 'none'
        }}
      />
      
      {/* Временный UI для настройки */}
      {showUI && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: 'rgba(0, 0, 0, 0.8)',
          color: 'white',
          padding: '20px',
          borderRadius: '10px',
          zIndex: 1000,
          pointerEvents: 'all',
          fontFamily: 'Arial, sans-serif',
          fontSize: '12px',
          width: '300px',
          maxHeight: '80vh',
          overflowY: 'auto'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h3 style={{ margin: 0, fontSize: '14px' }}>Настройки фильтра</h3>
            <button 
              onClick={() => setShowUI(false)}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >×</button>
          </div>
          
          {/* Целевой цвет */}
          <div style={{ marginBottom: '15px' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>Целевой цвет:</div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <div>
                <label>R:</label>
                <input 
                  type="range" 
                  min="0" 
                  max="255" 
                  value={settings.targetR}
                  onChange={(e) => setSettings(prev => ({...prev, targetR: parseInt(e.target.value)}))}
                  style={{ width: '60px', marginLeft: '5px' }}
                />
                <span style={{ marginLeft: '5px', fontSize: '10px' }}>{settings.targetR}</span>
              </div>
              <div>
                <label>G:</label>
                <input 
                  type="range" 
                  min="0" 
                  max="255" 
                  value={settings.targetG}
                  onChange={(e) => setSettings(prev => ({...prev, targetG: parseInt(e.target.value)}))}
                  style={{ width: '60px', marginLeft: '5px' }}
                />
                <span style={{ marginLeft: '5px', fontSize: '10px' }}>{settings.targetG}</span>
              </div>
              <div>
                <label>B:</label>
                <input 
                  type="range" 
                  min="0" 
                  max="255" 
                  value={settings.targetB}
                  onChange={(e) => setSettings(prev => ({...prev, targetB: parseInt(e.target.value)}))}
                  style={{ width: '60px', marginLeft: '5px' }}
                />
                <span style={{ marginLeft: '5px', fontSize: '10px' }}>{settings.targetB}</span>
              </div>
            </div>
            <div style={{ 
              width: '20px', 
              height: '20px', 
              backgroundColor: `rgb(${settings.targetR}, ${settings.targetG}, ${settings.targetB})`,
              border: '1px solid white',
              marginTop: '5px'
            }}></div>
          </div>
          
          {/* Толерантность */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ fontWeight: 'bold' }}>Толерантность: {settings.tolerance}</label>
            <input 
              type="range" 
              min="0" 
              max="200" 
              value={settings.tolerance}
              onChange={(e) => setSettings(prev => ({...prev, tolerance: parseInt(e.target.value)}))}
              style={{ width: '100%', marginTop: '5px' }}
            />
          </div>
          
          {/* Плотность */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ fontWeight: 'bold' }}>Плотность сканирования: {settings.sampleStep}</label>
            <input 
              type="range" 
              min="5" 
              max="50" 
              value={settings.sampleStep}
              onChange={(e) => setSettings(prev => ({...prev, sampleStep: parseInt(e.target.value)}))}
              style={{ width: '100%', marginTop: '5px' }}
            />
            <div style={{ fontSize: '10px', color: '#ccc' }}>Меньше = больше элементов</div>
          </div>
          
          {/* Размер элементов */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ fontWeight: 'bold' }}>Размер элементов:</label>
            <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
              <div style={{ flex: 1 }}>
                <label>Мин: {settings.minSize}</label>
                <input 
                  type="range" 
                  min="5" 
                  max="50" 
                  value={settings.minSize}
                  onChange={(e) => setSettings(prev => ({...prev, minSize: parseInt(e.target.value)}))}
                  style={{ width: '100%' }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label>Макс: {settings.maxSize}</label>
                <input 
                  type="range" 
                  min="5" 
                  max="50" 
                  value={settings.maxSize}
                  onChange={(e) => setSettings(prev => ({...prev, maxSize: parseInt(e.target.value)}))}
                  style={{ width: '100%' }}
                />
              </div>
            </div>
          </div>
          
          {/* Прозрачность */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ fontWeight: 'bold' }}>Прозрачность:</label>
            <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
              <div style={{ flex: 1 }}>
                <label>Мин: {settings.minOpacity.toFixed(1)}</label>
                <input 
                  type="range" 
                  min="0.1" 
                  max="1" 
                  step="0.1"
                  value={settings.minOpacity}
                  onChange={(e) => setSettings(prev => ({...prev, minOpacity: parseFloat(e.target.value)}))}
                  style={{ width: '100%' }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label>Макс: {settings.maxOpacity.toFixed(1)}</label>
                <input 
                  type="range" 
                  min="0.1" 
                  max="1" 
                  step="0.1"
                  value={settings.maxOpacity}
                  onChange={(e) => setSettings(prev => ({...prev, maxOpacity: parseFloat(e.target.value)}))}
                  style={{ width: '100%' }}
                />
              </div>
            </div>
          </div>
          
          {/* Быстрые пресеты */}
          <div style={{ marginBottom: '10px' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>Быстрые пресеты:</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
              <button onClick={() => setSettings(prev => ({...prev, targetR: 255, targetG: 255, targetB: 0, tolerance: 60}))} 
                style={{ padding: '5px 10px', fontSize: '10px', background: '#ffff00', color: 'black', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>
                Желтый
              </button>
              <button onClick={() => setSettings(prev => ({...prev, targetR: 255, targetG: 0, targetB: 0, tolerance: 60}))} 
                style={{ padding: '5px 10px', fontSize: '10px', background: '#ff0000', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>
                Красный
              </button>
              <button onClick={() => setSettings(prev => ({...prev, targetR: 0, targetG: 255, targetB: 0, tolerance: 60}))} 
                style={{ padding: '5px 10px', fontSize: '10px', background: '#00ff00', color: 'black', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>
                Зеленый
              </button>
              <button onClick={() => setSettings(prev => ({...prev, targetR: 0, targetG: 0, targetB: 255, tolerance: 60}))} 
                style={{ padding: '5px 10px', fontSize: '10px', background: '#0000ff', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>
                Синий
              </button>
              <button onClick={() => setSettings(prev => ({...prev, targetR: 255, targetG: 255, targetB: 255, tolerance: 60}))} 
                style={{ padding: '5px 10px', fontSize: '10px', background: '#ffffff', color: 'black', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>
                Белый
              </button>
              <button onClick={() => setSettings(prev => ({...prev, targetR: 0, targetG: 0, targetB: 0, tolerance: 60}))} 
                style={{ padding: '5px 10px', fontSize: '10px', background: '#000000', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>
                Черный
              </button>
            </div>
          </div>
          
          {/* Тестовый режим */}
          <div style={{ marginBottom: '10px', borderTop: '1px solid #555', paddingTop: '10px' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>Тестирование:</div>
            <button 
              onClick={createTestElements}
              style={{ 
                padding: '8px 15px', 
                fontSize: '12px', 
                background: '#ff6600', 
                color: 'white', 
                border: 'none', 
                borderRadius: '5px', 
                cursor: 'pointer',
                width: '100%'
              }}
            >
              🧪 Создать тестовые элементы
            </button>
            <div style={{ fontSize: '10px', color: '#ccc', marginTop: '5px' }}>
              Создает 5 элементов случайно для проверки отрисовки
            </div>
          </div>
        </div>
      )}
      
      {/* Кнопка для показа UI если она скрыта */}
      {!showUI && (
        <button 
          onClick={() => setShowUI(true)}
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            border: 'none',
            padding: '10px',
            borderRadius: '5px',
            cursor: 'pointer',
            zIndex: 1000,
            pointerEvents: 'all'
          }}
        >
          ⚙️ Настройки
        </button>
      )}
    </>
  );
};

export default P5VideoFilter; 