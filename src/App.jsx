import React, { useState } from 'react'
import './App.css'

const translations = {
  en: {
    nav: {
      home: 'Home',
      services: 'Services',
      gallery: 'Gallery',
      contact: 'Contact'
    },
    hero: {
      title: 'FUTURE',
      subtitle: 'TEXTILE',
      description: 'Revolutionary clothing manufacturing that breaks boundaries between art, technology and fashion',
      cta: 'START PROJECT'
    },
    services: {
      title: 'SERVICES',
      subtitle: 'BEYOND CONVENTIONAL',
      items: [
        {
          title: 'CUSTOM DESIGN',
          description: 'Deconstructed fashion that challenges traditional patterns'
        },
        {
          title: 'MASS PRODUCTION',
          description: 'Industrial scale manufacturing with artistic precision'
        },
        {
          title: 'SUSTAINABLE TECH',
          description: 'Eco-conscious processes meets postmodern aesthetics'
        },
        {
          title: 'DIGITAL PATTERNS',
          description: 'AI-generated designs for the new millennium'
        }
      ]
    },
    gallery: {
      title: 'VISUAL',
      subtitle: 'MANIFESTOS'
    },
    contact: {
      title: 'CONNECT',
      subtitle: 'COLLABORATE',
      form: {
        name: 'Your Name',
        email: 'Email Address',
        phone: 'Phone Number',
        message: 'Describe your vision...',
        submit: 'SEND MESSAGE'
      },
      info: {
        email: 'hello@patterns-manufacturing.com',
        phone: '+49 (0) 30 123 456 789',
        address: 'Berlin, Germany'
      }
    }
  },
  de: {
    nav: {
      home: 'Start',
      services: 'Leistungen',
      gallery: 'Galerie',
      contact: 'Kontakt'
    },
    hero: {
      title: 'ZUKUNFT',
      subtitle: 'TEXTIL',
      description: 'Revolutionäre Bekleidungsherstellung, die Grenzen zwischen Kunst, Technologie und Mode aufbricht',
      cta: 'PROJEKT STARTEN'
    },
    services: {
      title: 'LEISTUNGEN',
      subtitle: 'JENSEITS DER KONVENTION',
      items: [
        {
          title: 'CUSTOM DESIGN',
          description: 'Dekonstruierte Mode, die traditionelle Muster herausfordert'
        },
        {
          title: 'MASSENPRODUKTION',
          description: 'Industrielle Fertigung mit künstlerischer Präzision'
        },
        {
          title: 'NACHHALTIGE TECH',
          description: 'Umweltbewusste Prozesse treffen postmoderne Ästhetik'
        },
        {
          title: 'DIGITALE MUSTER',
          description: 'KI-generierte Designs für das neue Jahrtausend'
        }
      ]
    },
    gallery: {
      title: 'VISUELLE',
      subtitle: 'MANIFESTE'
    },
    contact: {
      title: 'VERBINDEN',
      subtitle: 'KOLLABORIEREN',
      form: {
        name: 'Ihr Name',
        email: 'E-Mail-Adresse',
        phone: 'Telefonnummer',
        message: 'Beschreiben Sie Ihre Vision...',
        submit: 'NACHRICHT SENDEN'
      },
      info: {
        email: 'hello@patterns-manufacturing.com',
        phone: '+49 (0) 30 123 456 789',
        address: 'Berlin, Deutschland'
      }
    }
  }
}

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
        <div className="hero-bg"></div>
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="title-part">{t.hero.title}</span>
            <span className="title-part subtitle">{t.hero.subtitle}</span>
          </h1>
          <p className="hero-description">{t.hero.description}</p>
          <button className="cta-button">{t.hero.cta}</button>
        </div>
        <div className="hero-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
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
                <div className="card-decoration"></div>
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
                <input type="text" placeholder={t.contact.form.name} />
                <input type="email" placeholder={t.contact.form.email} />
                <input type="tel" placeholder={t.contact.form.phone} />
                <textarea placeholder={t.contact.form.message}></textarea>
                <button type="submit">{t.contact.form.submit}</button>
              </form>
            </div>
            <div className="contact-info">
              <div className="info-item">
                <span className="label">EMAIL</span>
                <span className="value">{t.contact.info.email}</span>
              </div>
              <div className="info-item">
                <span className="label">PHONE</span>
                <span className="value">{t.contact.info.phone}</span>
              </div>
              <div className="info-item">
                <span className="label">LOCATION</span>
                <span className="value">{t.contact.info.address}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="contact-shapes">
          <div className="contact-shape shape-1"></div>
          <div className="contact-shape shape-2"></div>
        </div>
      </section>
    </div>
  )
}

export default App
