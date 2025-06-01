import React, { useState } from 'react'
import './App.css'
import { translations } from './translations'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import Services from './components/Services'
import Gallery from './components/Gallery'
import Contact from './components/Contact'

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
      <Navigation 
        t={t}
        currentLanguage={currentLanguage}
        toggleLanguage={toggleLanguage}
        scrollToSection={scrollToSection}
      />
      <Hero t={t} />
      <Services t={t} />
      <Gallery t={t} />
      <Contact t={t} />
    </div>
  )
}

export default App
