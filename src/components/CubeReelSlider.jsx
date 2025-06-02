import React, { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import '../styles/CubeReelSlider.css'

// npm install react-swipeable
import { useSwipeable } from 'react-swipeable'

function CubeReelSlider({ children, autoPlay = false, autoPlayInterval = 3000, isActive, onSectionChange }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const totalSlides = React.Children.count(children)
  const [isAnimating, setIsAnimating] = useState(false)

  // Переход к следующему слайду
  const nextSlide = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
    setTimeout(() => setIsAnimating(false), 600)
  }, [isAnimating, totalSlides])

  // Переход к предыдущему слайду
  const prevSlide = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
    setTimeout(() => setIsAnimating(false), 600)
  }, [isAnimating, totalSlides])

  // Переход к конкретному слайду
  const goToSlide = useCallback((index) => {
    if (isAnimating || index === currentSlide) return
    setIsAnimating(true)
    setCurrentSlide(index)
    setTimeout(() => setIsAnimating(false), 600)
  }, [isAnimating, currentSlide])

  // Автопроигрывание
  useEffect(() => {
    if (!autoPlay) return

    const interval = setInterval(nextSlide, autoPlayInterval)
    return () => clearInterval(interval)
  }, [autoPlay, autoPlayInterval, nextSlide])

  // Настройка свайпов
  const swipeHandlers = useSwipeable({
    onSwipedLeft: nextSlide,
    onSwipedRight: prevSlide,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  })

  // Обработка клавиатуры
  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'ArrowLeft':
          prevSlide()
          break
        case 'ArrowRight':
          nextSlide()
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [nextSlide, prevSlide])

  // Обработка колесика мыши только если компонент активен
  useEffect(() => {
    if (!isActive) return

    const handleWheel = (event) => {
      if (isAnimating) return
      
      // Если на первом слайде и прокручиваем вверх - переходим к предыдущему разделу
      if (currentSlide === 0 && event.deltaY < 0) {
        event.preventDefault()
        event.stopPropagation()
        if (onSectionChange) {
          onSectionChange('up')
        }
        return
      }
      
      // Если на последнем слайде и прокручиваем вниз - переходим к следующему разделу
      if (currentSlide === totalSlides - 1 && event.deltaY > 0) {
        event.preventDefault()
        event.stopPropagation()
        if (onSectionChange) {
          onSectionChange('down')
        }
        return
      }
      
      // Блокируем событие только если обрабатываем его внутри слайдера
      event.preventDefault()
      event.stopPropagation()
      
      if (event.deltaY > 0) {
        // Прокрутка вниз - следующий слайд
        nextSlide()
      } else if (event.deltaY < 0) {
        // Прокрутка вверх - предыдущий слайд
        prevSlide()
      }
    }

    // Добавляем обработчик с низким приоритетом (capture: false)
    document.addEventListener('wheel', handleWheel, { passive: false, capture: false })
    return () => document.removeEventListener('wheel', handleWheel)
  }, [nextSlide, prevSlide, isAnimating, isActive, currentSlide, totalSlides, onSectionChange])

  return (
    <div className="cube-reel-slider" {...swipeHandlers}>
      <div className="cube-container">
        <div className="cube-perspective">
          <div 
            className="cube"
            style={{
              transform: `rotateY(${-currentSlide * 72}deg)`
            }}
          >
            {React.Children.map(children, (child, index) => (
              <div
                key={index}
                className={`cube-face cube-face-${index}`}
                style={{
                  transform: `rotateY(${index * 72}deg) translateZ(50vw)`
                }}
              >
                {child}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CubeReelSlider 