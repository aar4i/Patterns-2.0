import React, { useState } from 'react'
import './App.css'
import { translations } from './translations'

function App() {
  const [currentLanguage, setCurrentLanguage] = useState('en')
  const t = translations[currentLanguage]

  const toggleLanguage = () => {
    setCurrentLanguage(currentLanguage === 'en' ? 'de' : 'en')
  }

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="App">
      {/* Navigation */}
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

      {/* Hero Section */}
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

      {/* Services Section */}
      <section id="services" className="services">
        <div className="container">
          <h2 className="section-title">
            <span>{t.services.title}</span>
            <span className="subtitle">{t.services.subtitle}</span>
          </h2>
          <div className="services-grid">
            {t.services.items.map((service, index) => (
              <div key={index} className={`service-card card-${index + 1}`}>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="gallery">
        <div className="container">
          <h2 className="section-title">
            <span>{t.gallery.title}</span>
            <span className="subtitle">{t.gallery.subtitle}</span>
          </h2>
          <div className="gallery-grid">
            <div className="gallery-item item-1">
              <div className="gallery-overlay">DECONSTRUCTED</div>
            </div>
            <div className="gallery-item item-2">
              <div className="gallery-overlay">MINIMAL</div>
            </div>
            <div className="gallery-item item-3">
              <div className="gallery-overlay">FUTURISTIC</div>
            </div>
            <div className="gallery-item item-4">
              <div className="gallery-overlay">ABSTRACT</div>
            </div>
            <div className="gallery-item item-5">
              <div className="gallery-overlay">EXPERIMENTAL</div>
            </div>
            <div className="gallery-item item-6">
              <div className="gallery-overlay">REVOLUTIONARY</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <h2 className="section-title">
            <span>{t.contact.title}</span>
            <span className="subtitle">{t.contact.subtitle}</span>
          </h2>
          <div className="contact-content">
            <div className="contact-form">
              <form>
                <div className="form-field">
                  <label className="field-label">{t.contact.form.name}</label>
                  <input type="text" />
                </div>
                <div className="form-field">
                  <label className="field-label">{t.contact.form.email}</label>
                  <input type="email" />
                </div>
                <div className="form-field">
                  <label className="field-label">{t.contact.form.phone}</label>
                  <input type="tel" />
                </div>
                <div className="form-field">
                  <label className="field-label message-label">{t.contact.form.message.split('\n')[0]}</label>
                  <textarea rows="6">{t.contact.form.message.split('\n').slice(1).join('\n')}</textarea>
                </div>
                <button type="submit">{t.contact.form.submit}</button>
              </form>
            </div>
            <div className="contact-alternative">
              <div className="contact-or">{t.contact.alternative.or}</div>
              <div className="contact-us-title">{t.contact.alternative.contactUs}</div>
              <div className="contact-email">{t.contact.alternative.email}</div>
              <div className="social-links">
                <a href="#">{t.contact.social.ig}</a>
                <a href="#">{t.contact.social.whatsapp}</a>
                <a href="#">{t.contact.social.fb}</a>
              </div>
              <div className="copyright">{t.contact.copyright}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default App
