import React, { useState } from 'react'
import SimplePatternBackground from './SimplePatternBackground'
import '../styles/PatternShowcase.css'

const PatternShowcase = () => {
  const [currentPattern, setCurrentPattern] = useState('dots')
  const [intensity, setIntensity] = useState('subtle')

  const patterns = [
    { id: 'dots', name: 'Точки', description: 'Плавающие точки' },
    { id: 'lines', name: 'Линии', description: 'Вращающиеся лучи' },
    { id: 'grid', name: 'Сетка', description: 'Движущаяся сетка' },
    { id: 'geometric', name: 'Геометрия', description: 'Геометрические формы' }
  ]

  const intensities = [
    { id: 'subtle', name: 'Тонкий' },
    { id: 'medium', name: 'Средний' },
    { id: 'strong', name: 'Яркий' }
  ]

  return (
    <section className="pattern-showcase">
      <div className="showcase-container">
        <div className="showcase-header">
          <h2>Простые Креативные Паттерны</h2>
          <p>CSS анимации для современного дизайна</p>
        </div>

        <div className="pattern-controls">
          <div className="control-group">
            <h3>Тип паттерна:</h3>
            <div className="button-group">
              {patterns.map(pattern => (
                <button
                  key={pattern.id}
                  className={`control-button ${currentPattern === pattern.id ? 'active' : ''}`}
                  onClick={() => setCurrentPattern(pattern.id)}
                >
                  <span>{pattern.name}</span>
                  <small>{pattern.description}</small>
                </button>
              ))}
            </div>
          </div>

          <div className="control-group">
            <h3>Интенсивность:</h3>
            <div className="button-group">
              {intensities.map(int => (
                <button
                  key={int.id}
                  className={`control-button intensity ${intensity === int.id ? 'active' : ''}`}
                  onClick={() => setIntensity(int.id)}
                >
                  {int.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="pattern-preview">
          <SimplePatternBackground variant={currentPattern} intensity={intensity} />
          <div className="preview-overlay">
            <h3>Превью паттерна</h3>
            <p>Наведите мышь для ускорения анимации</p>
          </div>
        </div>

        <div className="usage-example">
          <h3>Использование:</h3>
          <pre><code>{`<SimplePatternBackground 
  variant="${currentPattern}" 
  intensity="${intensity}" 
/>`}</code></pre>
        </div>
      </div>
    </section>
  )
}

export default PatternShowcase 