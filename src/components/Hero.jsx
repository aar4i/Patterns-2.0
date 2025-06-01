import React from 'react'
import '../styles/Hero.css'

function Hero({ t, scrollToSection }) {
  const handleOrderClick = () => {
    scrollToSection('contact')
  }

  return (
    <section id="hero" className="hero">
      <div className="hero-container">
        <h1 className="hero-title">{t.hero.title}</h1>
        <h2 className="hero-subtitle">{t.hero.subtitle}</h2>
        <p className="hero-description">{t.hero.description}</p>
        
        <div className="hero-actions">
          <button className="hero-cta" onClick={handleOrderClick}>
            {t.hero.cta}
          </button>
        </div>
        
        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-number">500+</span>
            <span className="stat-label">Projects</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">15+</span>
            <span className="stat-label">Years</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">50+</span>
            <span className="stat-label">Brands</span>
          </div>
        </div>

        <div className="hero-services-preview">
          <div className="service-preview">
            <span className="service-icon">🏭</span>
            <h3>Manufacturing</h3>
            <p>High-quality textile production with precision and care</p>
          </div>
          <div className="service-preview">
            <span className="service-icon">✂️</span>
            <h3>Custom Design</h3>
            <p>Tailored solutions for your specific requirements</p>
          </div>
          <div className="service-preview">
            <span className="service-icon">🚚</span>
            <h3>Fast Delivery</h3>
            <p>Quick and reliable shipping worldwide</p>
          </div>
        </div>
      </div>
      
      <div className="scroll-indicator">
        <span>Scroll Down</span>
        <div className="scroll-arrow"></div>
      </div>
    </section>
  )
}

export default Hero 