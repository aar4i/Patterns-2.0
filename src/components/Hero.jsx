import React, { useState, useEffect, useMemo } from 'react'
// import P5VideoFilter from './P5VideoFilter'
import VideoColorAnalyzer from './VideoColorAnalyzer'
import FooterCopyright from './FooterCopyright'
import '../styles/Hero.css'

// Константы для цветов вне компонента для гарантированной стабильности ссылок
const BLACK_COLOR = { r: 0, g: 0, b: 0 }
const WHITE_COLOR = { r: 255, g: 255, b: 255 }

function Hero() {
  const [isMobile, setIsMobile] = useState(false)
  const [isWhiteMode, setIsWhiteMode] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isCameraMode, setIsCameraMode] = useState(false)
  const [isCameraLoading, setIsCameraLoading] = useState(false)
  const [isManuallyPaused, setIsManuallyPaused] = useState(false) // Флаг ручной паузы

  // Мемоизируем targetColor чтобы избежать лишних ре-рендеров
  const targetColor = useMemo(() => {
    return isWhiteMode ? WHITE_COLOR : BLACK_COLOR
  }, [isWhiteMode])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 480)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Автоматическое управление паузой при скролле
  useEffect(() => {
    const heroElement = document.getElementById('hero')
    if (!heroElement) return
    
    const handleScroll = () => {
      const heroRect = heroElement.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // Определяем, находимся ли мы на первом экране (срабатывает практически сразу)
      const isOnFirstScreen = heroRect.bottom > windowHeight * 0.9
      
      // Автоматическое управление паузой (только если не было ручной паузы)
      if (!isManuallyPaused) {
        if (!isOnFirstScreen && !isPaused) {
          // Прокрутили ниже первого экрана - ставим на паузу
          setIsPaused(true)
        } else if (isOnFirstScreen && isPaused) {
          // Вернулись на первый экран - снимаем с паузы
          setIsPaused(false)
        }
      }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Вызываем сразу
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isManuallyPaused, isPaused])

  const scrollToServices = () => {
    const servicesElement = document.getElementById('services')
    if (servicesElement) {
      servicesElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  const toggleColorMode = () => {
    const newMode = !isWhiteMode;
    console.log('Переключение цвета:', newMode ? 'БЕЛЫЙ' : 'ЧЕРНЫЙ');
    setIsWhiteMode(newMode);
  }

  const togglePause = () => {
    const newPausedState = !isPaused
    setIsPaused(newPausedState)
    setIsManuallyPaused(newPausedState) // Устанавливаем флаг ручной паузы
  }

  const toggleCamera = async () => {
    if (!isCameraMode) {
      setIsCameraLoading(true);
      try {
        console.log('Проверка доступности API камеры...');
        
        // Проверяем поддержку API
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          throw new Error('API камеры не поддерживается в этом браузере');
        }

        console.log('Запрос доступа к камере...');
        
        // Запрашиваем доступ к камере
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            width: { ideal: 1920 },
            height: { ideal: 1080 },
            facingMode: 'user'
          } 
        });
        
        setIsCameraMode(true);
        console.log('Камера активирована успешно');
        
      } catch (error) {
        console.error('Детальная ошибка:', error);
        
        let errorMessage = 'Не удалось получить доступ к камере.';
        
        if (error.name === 'NotAllowedError') {
          errorMessage = 'Доступ к камере заблокирован. Разрешите доступ в настройках браузера и обновите страницу.';
        } else if (error.name === 'NotFoundError') {
          errorMessage = 'Камера не найдена. Проверьте подключение камеры.';
        } else if (error.name === 'NotReadableError') {
          errorMessage = 'Камера занята другим приложением. Закройте другие программы использующие камеру.';
        } else if (error.name === 'OverconstrainedError') {
          errorMessage = 'Настройки камеры не поддерживаются. Попробуйте другие параметры.';
        } else if (error.name === 'SecurityError') {
          errorMessage = 'Ошибка безопасности. Требуется HTTPS для доступа к камере (кроме localhost).';
        } else {
          errorMessage += ` Ошибка: ${error.message}`;
        }
        
        alert(errorMessage);
      } finally {
        setIsCameraLoading(false);
      }
    } else {
      setIsCameraMode(false);
      console.log('Камера деактивирована');
    }
  }

  return (
    <section id="hero" className="hero">
      <div className="hero-background">
        {isMobile ? (
          // VideoColorAnalyzer для мобильной версии
          <VideoColorAnalyzer 
            src={isCameraMode ? null : "/videos/hero/916 mobile.mp4"}
            useCamera={isCameraMode}
            className="hero-video-bg mobile pixelated"
            targetColor={targetColor}
            isPaused={isPaused}
          />
        ) : (
          // VideoColorAnalyzer для десктопа
          <VideoColorAnalyzer 
            src={isCameraMode ? null : "/videos/hero/PM_new.mp4"}
            useCamera={isCameraMode}
            className="hero-video-bg pixelated"
            targetColor={targetColor}
            isPaused={isPaused}
          />
        )}
        <div className="hero-overlay"></div>
      </div>
      <div className="hero-container">
        <div className="hero-content">
          
          {/* Логотип перемещен в левый верхний угол */}
          
        </div>
      </div>
      

      
      
        


        <div 
        className="hero-pa-elements"
      >
        <img 
          src={isWhiteMode ? "/logos/CursorPM-white.svg" : "/logos/CursorPM.svg"}
          alt="PA"
          className={`pa-element large ${isWhiteMode ? 'white-mode' : ''}`}
          onClick={toggleColorMode}
          style={{
            cursor: 'pointer',
            backgroundColor: 'transparent',
            padding: 0,
            border: 'none',
            display: 'inline-block'
          }}
        />
        <span 
          className="pa-element large pause-button"
          onClick={togglePause}
          style={{
            backgroundColor: isPaused ? '#ffffff' : '#a62639',
            color: '#161616',
            cursor: 'pointer',
            marginLeft: '0.5rem'
          }}
        >
          <span 
            className={`pause-button-icon ${isPaused ? 'play-icon' : 'pause-icon'}`}
          >
            {isPaused ? 'play' : 'pause'}
          </span>
        </span>
        <span 
          className="pa-element large camera-button"
          onClick={toggleCamera}
          style={{
            backgroundColor: isCameraMode ? '#ffffff' : '#a62639',
            color: '#161616',
            cursor: 'pointer',
            marginLeft: '0.5rem'
          }}
        >
          <span className="camera-button-icon">
            <svg width="28" height="28" viewBox="0 0 16 16" fill="currentColor" style={{display: 'block'}}>
              <circle cx="8" cy="4" r="3"/>
              <path d="M8 8c-3.3 0-6 2.7-6 6v2h12v-2c0-3.3-2.7-6-6-6z"/>
            </svg>
          </span>
        </span>
      </div>
      
      {/* Логотип в левом верхнем углу */}
      <div className="hero-top-left-logo">
        <img 
          src="/logos/PM Final-93.svg" 
          alt="Patterns Manufacturing Logo" 
          className="hero-logo-svg"
        />
      </div>

      <div className="hero-scroll-arrow" onClick={scrollToServices}>
        <div className="scroll-arrow">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 10L12 15L17 10H7Z" fill="currentColor"/>
          </svg>
        </div>
      </div>
      
      <FooterCopyright />

    </section>
  )
}

export default Hero 