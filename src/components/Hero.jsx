import React from 'react'
import './Hero.css'

function Hero({ t }) {
  return (
    <section id="hero" className="hero">
      <div className="hero-content">
        <h1 className="hero-title">
          <span className="title-part">{t.hero.title}</span>
          <span className="title-part subtitle">{t.hero.subtitle}</span>
        </h1>
        <p className="hero-description">{t.hero.description}</p>
        <button className="cta-button">{t.hero.cta}</button>
      </div>
    </section>
  )
}

export default Hero 