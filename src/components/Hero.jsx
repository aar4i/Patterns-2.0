import React, { useState, useEffect, useMemo } from 'react'
import VideoColorAnalyzer from './VideoColorAnalyzer'
import FooterCopyright from './FooterCopyright'
import '../styles/Hero.css'

// Константы для цветов вне компонента для гарантированной стабильности ссылок
const BLACK_COLOR = { r: 0, g: 0, b: 0 }
const WHITE_COLOR = { r: 255, g: 255, b: 255 }

function Hero() {
  const [isMobile, setIsMobile] = useState(false)
  const [isWhiteMode, setIsWhiteMode] = useState(false)

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
    setIsWhiteMode(!isWhiteMode)
  }

  return (
    <section id="hero" className="hero">
      <div className="hero-background">
        {isMobile ? (
          <VideoColorAnalyzer 
            src="/videos/hero/916 mobile.mp4"
            className="hero-video-bg mobile pixelated"
            targetColor={targetColor}
          />
        ) : (
          <VideoColorAnalyzer 
            src="/videos/hero/PM_new.mp4"
            className="hero-video-bg pixelated"
            targetColor={targetColor}
          />
        )}
        <div className="hero-overlay"></div>
      </div>

      <div className="hero-container">
        <div className="hero-content"></div>
      </div>

      {/* PA элемент справа вверху - только переключатель цвета */}
      <div className="hero-pa-elements">
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