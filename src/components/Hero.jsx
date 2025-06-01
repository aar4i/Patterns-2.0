import React from 'react'
import '../styles/Hero.css'

function Hero({ t, scrollToSection }) {
  const handleOrderClick = () => {
    scrollToSection('contact')
  }

  return (
    <section id="hero" className="hero">
      <div className="hero-background">
        <div className="hero-gradient"></div>
        <div className="hero-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </div>
      
      <div className="hero-content">
        <h1 className="hero-title">
          <span className="title-main">{t.hero.title}</span>
          <span className="title-accent">{t.hero.subtitle}</span>
        </h1>
        
        <p className="hero-description">{t.hero.description}</p>
        
        <div className="hero-actions">
          <button className="cta-primary" onClick={handleOrderClick}>
            {t.hero.cta}
          </button>
        </div>
        
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-number">500+</span>
            <span className="stat-label">Projects</span>
          </div>
          <div className="stat">
            <span className="stat-number">15+</span>
            <span className="stat-label">Years</span>
          </div>
          <div className="stat">
            <span className="stat-number">50+</span>
            <span className="stat-label">Brands</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero 