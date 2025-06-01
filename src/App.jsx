import React, { useState, useEffect } from 'react'
import './styles/App.css'
import { translations } from './data/translations'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import Services from './components/Services'
import Gallery from './components/Gallery'
import Contact from './components/Contact'

function App() {
  const [currentLanguage, setCurrentLanguage] = useState('en')
  const [theme, setTheme] = useState('dark')
  const t = translations[currentLanguage]

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleLanguage = () => {
    setCurrentLanguage(currentLanguage === 'en' ? 'de' : 'en')
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
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
        theme={theme}
        toggleTheme={toggleTheme}
        scrollToSection={scrollToSection}
      />
      <Hero t={t} scrollToSection={scrollToSection} />
      <Services t={t} />
      <Gallery t={t} />
      <Contact t={t} />
    </div>
  )
}

export default App
