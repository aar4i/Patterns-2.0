import React from 'react'
import useP5 from '../hooks/useP5'

/**
 * Универсальный компонент для отображения p5.js скетчей
 * @param {Function} sketch - Функция скетча p5.js
 * @param {string} className - CSS класс для контейнера
 * @param {Object} style - Inline стили для контейнера
 * @param {Array} dependencies - Зависимости для перерендера
 * @param {Object} containerProps - Дополнительные пропсы для контейнера
 */
const P5Canvas = ({ 
  sketch, 
  className = '', 
  style = {}, 
  dependencies = [], 
  ...containerProps 
}) => {
  const { containerRef } = useP5(sketch, dependencies)

  return (
    <div 
      ref={containerRef} 
      className={`p5-canvas ${className}`}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...style
      }}
      {...containerProps}
    />
  )
}

export default P5Canvas 