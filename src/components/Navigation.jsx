import React from 'react'
import '../styles/Navigation.css'

function Navigation({ t, currentLanguage, toggleLanguage, theme, toggleTheme, scrollToSection }) {
  return (
    <nav className="nav">
      <div className="nav-container">
        <div className="logo">PATTERNS</div>
        <div className="nav-links">
          <a onClick={() => scrollToSection('hero')}>{t.nav.home}</a>
          <a onClick={() => scrollToSection('services')}>{t.nav.services}</a>
          <a onClick={() => scrollToSection('gallery')}>{t.nav.gallery}</a>
          <a onClick={() => scrollToSection('contact')}>{t.nav.contact}</a>
        </div>
        <div className="nav-controls">
          <button className="theme-toggle" onClick={toggleTheme} title="Toggle theme">
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <button className="lang-toggle" onClick={toggleLanguage}>
            {currentLanguage === 'en' ? 'DE' : 'EN'}
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navigation 