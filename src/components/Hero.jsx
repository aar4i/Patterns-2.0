import React from 'react'
// import P5VideoFilter from './P5VideoFilter'
import VideoColorAnalyzer from './VideoColorAnalyzer'
import '../styles/Hero.css'

function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-background">
        {/* Используем новый профессиональный анализатор цветов с пикселизацией */}
        <VideoColorAnalyzer 
          src="/videos/hero/PM.mp4"
          className="hero-video-bg pixelated"
        />
        
        {/* Полупрозрачное наложение */}
        <div className="hero-overlay"></div>
      </div>
      
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="contrast-block white">PATTERNS</span>
            <br />
            <span className="contrast-block white">MANUFACTURING</span>
          </h1>
          
          <div className="hero-subtitle">
            <span className="contrast-block">Textile Production</span>
            <span className="contrast-block year">2025</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero 