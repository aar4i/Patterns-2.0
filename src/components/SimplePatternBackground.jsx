import React from 'react'
import '../styles/SimplePatternBackground.css'

const SimplePatternBackground = ({ variant = 'dots', intensity = 'subtle' }) => {
  return (
    <div className={`pattern-background pattern-${variant} pattern-${intensity}`}>
      {variant === 'dots' && (
        <div className="dots-container">
          {Array.from({ length: 50 }, (_, i) => (
            <div key={i} className="dot" style={{
              '--delay': `${Math.random() * 4}s`,
              '--x': `${Math.random() * 100}%`,
              '--y': `${Math.random() * 100}%`,
              '--size': `${Math.random() * 4 + 2}px`
            }} />
          ))}
        </div>
      )}
      
      {variant === 'lines' && (
        <div className="lines-container">
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} className="line" style={{
              '--delay': `${i * 0.5}s`,
              '--angle': `${i * 22.5}deg`
            }} />
          ))}
        </div>
      )}
      
      {variant === 'grid' && (
        <div className="grid-container">
          <div className="grid-lines horizontal" />
          <div className="grid-lines vertical" />
        </div>
      )}
      
      {variant === 'geometric' && (
        <div className="geometric-container">
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} className="geometric-shape" style={{
              '--delay': `${i * 0.3}s`,
              '--x': `${(i % 4) * 25}%`,
              '--y': `${Math.floor(i / 4) * 33}%`
            }} />
          ))}
        </div>
      )}
    </div>
  )
}

export default SimplePatternBackground 