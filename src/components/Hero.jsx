import React, { useState, useEffect } from 'react'
// import P5VideoFilter from './P5VideoFilter'
import VideoColorAnalyzer from './VideoColorAnalyzer'
import '../styles/Hero.css'

function Hero() {
  const [isMobile, setIsMobile] = useState(false)

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

  return (
    <section id="hero" className="hero">
      <div className="hero-background">
        {isMobile ? (
          // Простое видео для мобильной версии
          <video 
            className="hero-video-bg mobile-video"
            autoPlay 
            muted 
            loop 
            playsInline
            preload="metadata"
          >
            <source src="/videos/hero/916 mobile.mp4" type="video/mp4" />
          </video>
        ) : (
          // VideoColorAnalyzer для десктопа
          <VideoColorAnalyzer 
            src="/videos/hero/PM_new.mp4"
            className="hero-video-bg pixelated"
          />
        )}
        <div className="hero-overlay"></div>
      </div>
      <div className="hero-container">
        <div className="hero-content">
          
          
          <h1 className="hero-title">
            Patterns
            <br />
            Manufacturing
          </h1>
          
          <ul className="hero-features">
            <li>Sign up for free</li>
            <li>Premium materials</li>
            <li>No minimum order quantity</li>
          </ul>
          
          <button className="hero-cta" onClick={scrollToServices}>
            BROWSE PRODUCTS
          </button>
        </div>
      </div>
      
      <div className="scroll-indicator" onClick={scrollToServices}>
        <div className="scroll-arrow">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 10L12 15L17 10H7Z" fill="currentColor"/>
          </svg>
        </div>
      </div>
    </section>
  )
}

export default Hero 