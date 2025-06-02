import React from 'react'
import '../styles/Hero.css'

function Hero() {
  return (
    <section id="hero" className="hero">
      {/* Чистый минималистичный дизайн */}
      
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="contrast-block white">PATTERNS</span>
            <br />
            MANUFACTURING
          </h1>
          
          <div className="hero-subtitle">
            <span className="contrast-block">Textile Production</span>
            <span className="hero-year">2025</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero 