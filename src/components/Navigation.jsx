import React from 'react'
import './Navigation.css'

function Navigation({ t, currentLanguage, toggleLanguage, scrollToSection }) {
  return (
    <nav className="nav">
      <div className="nav-container">
        <div className="logo">PATTERNS 2.0</div>
        <div className="nav-links">
          <a onClick={() => scrollToSection('hero')}>{t.nav.home}</a>
          <a onClick={() => scrollToSection('services')}>{t.nav.services}</a>
          <a onClick={() => scrollToSection('gallery')}>{t.nav.gallery}</a>
          <a onClick={() => scrollToSection('contact')}>{t.nav.contact}</a>
        </div>
        <button className="lang-toggle" onClick={toggleLanguage}>
          {currentLanguage === 'en' ? 'DE' : 'EN'}
        </button>
      </div>
    </nav>
  )
}

export default Navigation 