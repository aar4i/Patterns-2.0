import React, { useState, useEffect, useRef, useCallback } from 'react'
import './styles/App.css'
import Hero from './components/Hero'
import ServicesWithCube from './components/ServicesWithCube'
import Gallery from './components/Gallery'
import Contact from './components/Contact'

function App() {
  const [currentSection, setCurrentSection] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const appRef = useRef(null)

  const sections = ['hero', 'services', 'gallery', 'contact']

  // Функция для смены раздела из CubeReelSlider
  const changeSection = useCallback((direction) => {
    if (isScrolling) return
    
    let nextSection = currentSection
    if (direction === 'up' && currentSection > 0) {
      nextSection = currentSection - 1
    } else if (direction === 'down' && currentSection < sections.length - 1) {
      nextSection = currentSection + 1
    }

    if (nextSection !== currentSection) {
      setIsScrolling(true)
      setCurrentSection(nextSection)
      setTimeout(() => {
        setIsScrolling(false)
      }, 800)
    }
  }, [currentSection, isScrolling, sections.length])

    useEffect(() => {
    const handleWheel = (event) => {
      // Если сейчас в процессе скролла, игнорируем
      if (isScrolling) return

      // Если мы в разделе Services, позволяем CubeReelSlider обработать событие
      if (currentSection === 1) {
        return
      }

      event.preventDefault()
      
      const delta = event.deltaY
      let nextSection = currentSection

      if (delta > 0 && currentSection < sections.length - 1) {
        // Прокрутка вниз
        nextSection = currentSection + 1
      } else if (delta < 0 && currentSection > 0) {
        // Прокрутка вверх
        nextSection = currentSection - 1
      }

      if (nextSection !== currentSection) {
        setIsScrolling(true)
        setCurrentSection(nextSection)
        
        // Сбрасываем флаг скролла после анимации
        setTimeout(() => {
          setIsScrolling(false)
        }, 800)
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [currentSection, isScrolling])

  return (
    <div 
      className="App" 
      ref={appRef}
      style={{
        transform: `translateY(-${currentSection * 100}vh)`,
        transition: isScrolling ? 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none'
      }}
    >
      <div className="section" id="hero">
        <Hero />
      </div>
      <div className="section" id="services">
        <ServicesWithCube 
          isActive={currentSection === 1}
          onSectionChange={changeSection}
        />
      </div>
      <div className="section" id="gallery">
        <Gallery />
      </div>
      <div className="section" id="contact">
        <Contact />
      </div>
    </div>
  )
}

export default App
