import React, { useState } from 'react'
import P5Canvas from './P5Canvas'
import { PatternWaveSketch, GeometricPatternSketch, sketchMetadata, availableSketches } from '../sketches'
import '../styles/P5Gallery.css'

const P5Gallery = () => {
  const [currentSketch, setCurrentSketch] = useState('PatternWave')
  const [isFullscreen, setIsFullscreen] = useState(false)

  const getSketch = (sketchName) => {
    switch (sketchName) {
      case 'PatternWave':
        return PatternWaveSketch
      case 'GeometricPattern':
        return GeometricPatternSketch
      default:
        return PatternWaveSketch
    }
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  return (
    <div className="p5-gallery">
      <div className="gallery-header">
        <h2>Интерактивные Паттерны</h2>
        <p>Коллекция генеративных дизайнов для текстильного производства</p>
      </div>

      <div className="sketch-selector">
        {availableSketches.map(sketchName => (
          <button
            key={sketchName}
            className={`sketch-button ${currentSketch === sketchName ? 'active' : ''}`}
            onClick={() => setCurrentSketch(sketchName)}
          >
            <div className="sketch-info">
              <h3>{sketchMetadata[sketchName].name}</h3>
              <p>{sketchMetadata[sketchName].description}</p>
              <span className="sketch-category">{sketchMetadata[sketchName].category}</span>
            </div>
          </button>
        ))}
      </div>

      <div className={`canvas-container ${isFullscreen ? 'fullscreen' : ''}`}>
        <div className="canvas-controls">
          <button 
            className="fullscreen-toggle"
            onClick={toggleFullscreen}
            title={isFullscreen ? 'Выйти из полноэкранного режима' : 'Полноэкранный режим'}
          >
            {isFullscreen ? '⊟' : '⊞'}
          </button>
        </div>
        
        <P5Canvas 
          sketch={getSketch(currentSketch)}
          className="gallery-canvas"
          key={currentSketch} // Принудительный перерендер при смене скетча
        />
        
        <div className="canvas-info">
          <h3>{sketchMetadata[currentSketch].name}</h3>
          <p>
            <strong>Интерактивность:</strong> Наведите мышь для взаимодействия • 
            Кликните для изменения • Нажмите пробел для сброса (где доступно)
          </p>
        </div>
      </div>
    </div>
  )
}

export default P5Gallery 