import React, { useState, useEffect } from 'react'
import '../styles/Navigation.css'

function Navigation({ t, currentLanguage, toggleLanguage, theme, toggleTheme, scrollToSection }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleNavClick = (sectionId) => {
    scrollToSection(sectionId)
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className={`navigation ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <a href="#" className="logo" onClick={() => handleNavClick('hero')}>
          PATTERNS
        </a>
        
        <ul className="nav-menu">
          <li className="nav-item">
            <a className="nav-link" onClick={() => handleNavClick('hero')}>
              {t.nav.home}
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" onClick={() => handleNavClick('services')}>
              {t.nav.services}
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" onClick={() => handleNavClick('gallery')}>
              {t.nav.gallery}
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" onClick={() => handleNavClick('contact')}>
              {t.nav.contact}
            </a>
          </li>
        </ul>

        <div className="nav-controls">
          <button className="theme-toggle" onClick={toggleTheme} title="Toggle theme">
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <button className="language-toggle" onClick={toggleLanguage}>
            {currentLanguage === 'en' ? 'DE' : 'EN'}
          </button>
        </div>

        <button 
          className={`mobile-toggle ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span className="hamburger"></span>
          <span className="hamburger"></span>
          <span className="hamburger"></span>
        </button>
      </div>

      <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
        <ul className="mobile-nav-menu">
          <li>
            <a className="mobile-nav-link" onClick={() => handleNavClick('hero')}>
              {t.nav.home}
            </a>
          </li>
          <li>
            <a className="mobile-nav-link" onClick={() => handleNavClick('services')}>
              {t.nav.services}
            </a>
          </li>
          <li>
            <a className="mobile-nav-link" onClick={() => handleNavClick('gallery')}>
              {t.nav.gallery}
            </a>
          </li>
          <li>
            <a className="mobile-nav-link" onClick={() => handleNavClick('contact')}>
              {t.nav.contact}
            </a>
          </li>
        </ul>
        
        <div className="mobile-controls">
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <button className="language-toggle" onClick={toggleLanguage}>
            {currentLanguage === 'en' ? 'DE' : 'EN'}
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navigation 