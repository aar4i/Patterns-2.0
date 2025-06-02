import React, { useState } from 'react'
import GeometricPatternBackground from './GeometricPatternBackground'
import '../styles/GeometricPatternShowcase.css'

const GeometricPatternShowcase = () => {
  const [currentPattern, setCurrentPattern] = useState('hexagons')
  const [intensity, setIntensity] = useState('medium')
  const [animated, setAnimated] = useState(true)

  const patterns = [
    { 
      id: 'hexagons', 
      name: 'Шестиугольники', 
      description: 'Сотовая структура',
      category: 'Природная геометрия'
    },
    { 
      id: 'triangles', 
      name: 'Треугольники', 
      description: 'Тессельация треугольников',
      category: 'Классическая геометрия'
    },
    { 
      id: 'isometric', 
      name: 'Изометрические кубы', 
      description: '3D изометрическая проекция',
      category: '3D геометрия'
    },
    { 
      id: 'diamonds', 
      name: 'Ромбы', 
      description: 'Вращающиеся ромбы',
      category: 'Динамическая геометрия'
    },
    { 
      id: 'textile', 
      name: 'Текстильное плетение', 
      description: 'Имитация тканевого узора',
      category: 'Промышленные паттерны'
    },
    { 
      id: 'circuit', 
      name: 'Печатная плата', 
      description: 'Схема электронной платы',
      category: 'Технологические паттерны'
    }
  ]

  const intensities = [
    { id: 'subtle', name: 'Тонкий', percentage: '8%' },
    { id: 'medium', name: 'Средний', percentage: '15%' },
    { id: 'strong', name: 'Яркий', percentage: '25%' }
  ]

  const currentPatternInfo = patterns.find(p => p.id === currentPattern)

  return (
    <section className="geometric-showcase">
      <div className="geometric-showcase-container">
        <div className="showcase-header">
          <h2>Геометрические Паттерны</h2>
          <p>Профессиональные геометрические решения для современного дизайна</p>
        </div>

        <div className="pattern-controls">
          <div className="control-section">
            <h3>Выберите паттерн:</h3>
            <div className="pattern-grid">
              {patterns.map(pattern => (
                <button
                  key={pattern.id}
                  className={`pattern-card ${currentPattern === pattern.id ? 'active' : ''}`}
                  onClick={() => setCurrentPattern(pattern.id)}
                >
                  <div className="pattern-preview-mini">
                    <GeometricPatternBackground 
                      variant={pattern.id} 
                      intensity="medium" 
                      animated={false}
                    />
                  </div>
                  <div className="pattern-info">
                    <span className="pattern-name">{pattern.name}</span>
                    <small className="pattern-description">{pattern.description}</small>
                    <span className="pattern-category">{pattern.category}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="control-row">
            <div className="control-group">
              <h3>Интенсивность:</h3>
              <div className="button-group">
                {intensities.map(int => (
                  <button
                    key={int.id}
                    className={`control-button intensity ${intensity === int.id ? 'active' : ''}`}
                    onClick={() => setIntensity(int.id)}
                  >
                    <span>{int.name}</span>
                    <small>{int.percentage}</small>
                  </button>
                ))}
              </div>
            </div>

            <div className="control-group">
              <h3>Анимация:</h3>
              <button
                className={`control-button toggle ${animated ? 'active' : ''}`}
                onClick={() => setAnimated(!animated)}
              >
                {animated ? 'Включена' : 'Отключена'}
              </button>
            </div>
          </div>
        </div>

        <div className="main-preview">
          <GeometricPatternBackground 
            variant={currentPattern} 
            intensity={intensity} 
            animated={animated}
          />
          <div className="preview-info">
            <h3>{currentPatternInfo?.name}</h3>
            <p>{currentPatternInfo?.description}</p>
            <div className="pattern-details">
              <span className="category-badge">{currentPatternInfo?.category}</span>
              <span className="intensity-badge">Интенсивность: {intensity}</span>
              <span className="animation-badge">
                {animated ? '🎬 Анимированный' : '🖼️ Статичный'}
              </span>
            </div>
          </div>
        </div>

        <div className="usage-examples">
          <h3>Применение в дизайне:</h3>
          <div className="examples-grid">
            <div className="example-item">
              <h4>Hero секция</h4>
              <pre><code>{`<GeometricPatternBackground 
  variant="${currentPattern}" 
  intensity="subtle" 
  animated={true}
/>`}</code></pre>
            </div>
            <div className="example-item">
              <h4>Карточки продуктов</h4>
              <pre><code>{`<GeometricPatternBackground 
  variant="${currentPattern}" 
  intensity="medium" 
  animated={false}
/>`}</code></pre>
            </div>
            <div className="example-item">
              <h4>Модальные окна</h4>
              <pre><code>{`<GeometricPatternBackground 
  variant="${currentPattern}" 
  intensity="strong" 
  animated={true}
/>`}</code></pre>
            </div>
          </div>
        </div>

        <div className="technical-info">
          <h3>Техническая информация:</h3>
          <div className="tech-grid">
            <div className="tech-item">
              <span className="tech-label">Производительность:</span>
              <span className="tech-value">60 FPS, &lt; 3% CPU</span>
            </div>
            <div className="tech-item">
              <span className="tech-label">Технология:</span>
              <span className="tech-value">CSS Animations + GPU</span>
            </div>
            <div className="tech-item">
              <span className="tech-label">Совместимость:</span>
              <span className="tech-value">Chrome 60+, Firefox 55+, Safari 12+</span>
            </div>
            <div className="tech-item">
              <span className="tech-label">Мобильные:</span>
              <span className="tech-value">Адаптивная оптимизация</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GeometricPatternShowcase 