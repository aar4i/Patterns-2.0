import React from 'react'
import CubeReelSlider from '../components/CubeReelSlider'
import '../styles/CubeReelSlider.css'

// Пример простого использования CubeReelSlider
function CubeSliderExample() {
  const slides = [
    {
      id: 1,
      title: "Первый слайд",
      content: "Добро пожаловать в 3D куб!",
      bgColor: "#FEA900"
    },
    {
      id: 2,
      title: "Второй слайд", 
      content: "Проведите пальцем для навигации",
      bgColor: "#B3DC4A"
    },
    {
      id: 3,
      title: "Третий слайд",
      content: "Используйте стрелки на клавиатуре",
      bgColor: "#6AC0FF"
    },
    {
      id: 4,
      title: "Четвертый слайд",
      content: "Или нажмите на индикаторы внизу",
      bgColor: "#FF6B6B"
    }
  ]

  const SlideContent = ({ slide }) => (
    <div 
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: slide.bgColor,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textAlign: 'center',
        padding: '2rem'
      }}
    >
      <h2 style={{
        fontSize: 'clamp(2rem, 5vw, 4rem)',
        marginBottom: '1rem',
        fontWeight: '300'
      }}>
        {slide.title}
      </h2>
      <p style={{
        fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
        fontWeight: '300',
        maxWidth: '600px',
        lineHeight: '1.4'
      }}>
        {slide.content}
      </p>
      <div style={{
        marginTop: '2rem',
        fontSize: 'clamp(3rem, 8vw, 6rem)',
        fontWeight: '100',
        opacity: 0.3
      }}>
        {slide.id}
      </div>
    </div>
  )

  return (
    <div style={{ height: '100vh', overflow: 'hidden' }}>
      <CubeReelSlider autoPlay={false}>
        {slides.map((slide) => (
          <SlideContent key={slide.id} slide={slide} />
        ))}
      </CubeReelSlider>
    </div>
  )
}

export default CubeSliderExample 