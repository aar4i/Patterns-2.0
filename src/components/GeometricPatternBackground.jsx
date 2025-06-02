import React from 'react'
import '../styles/GeometricPatternBackground.css'

const GeometricPatternBackground = ({ variant = 'hexagons', intensity = 'subtle', animated = true }) => {
  // Генерация сетки точек для паттернов
  const generateGrid = (cols, rows) => {
    const points = []
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        points.push({ x: j, y: i, index: i * cols + j })
      }
    }
    return points
  }

  // Генерация треугольной сетки
  const generateTriangularGrid = (cols, rows) => {
    const triangles = []
    for (let i = 0; i < rows - 1; i++) {
      for (let j = 0; j < cols - 1; j++) {
        // Два треугольника на каждый квадрат сетки
        triangles.push({
          type: 'up',
          x: j,
          y: i,
          index: (i * cols + j) * 2
        })
        triangles.push({
          type: 'down',
          x: j,
          y: i,
          index: (i * cols + j) * 2 + 1
        })
      }
    }
    return triangles
  }

  const renderHexagons = () => {
    const hexagons = generateGrid(12, 8)
    return (
      <div className="hexagons-container">
        {hexagons.map(hex => (
          <div
            key={hex.index}
            className="hexagon"
            style={{
              '--x': `${hex.x * 8.5}%`,
              '--y': `${hex.y * 12}%`,
              '--delay': `${(hex.x + hex.y) * 0.1}s`
            }}
          />
        ))}
      </div>
    )
  }

  const renderTriangles = () => {
    const triangles = generateTriangularGrid(16, 10)
    return (
      <div className="triangles-container">
        {triangles.map(tri => (
          <div
            key={tri.index}
            className={`triangle triangle-${tri.type}`}
            style={{
              '--x': `${tri.x * 6.25}%`,
              '--y': `${tri.y * 10}%`,
              '--delay': `${tri.index * 0.05}s`
            }}
          />
        ))}
      </div>
    )
  }

  const renderIsometric = () => {
    const cubes = generateGrid(10, 6)
    return (
      <div className="isometric-container">
        {cubes.map(cube => (
          <div
            key={cube.index}
            className="isometric-cube"
            style={{
              '--x': `${cube.x * 10}%`,
              '--y': `${cube.y * 16}%`,
              '--delay': `${(cube.x + cube.y) * 0.15}s`
            }}
          >
            <div className="cube-face cube-top" />
            <div className="cube-face cube-left" />
            <div className="cube-face cube-right" />
          </div>
        ))}
      </div>
    )
  }

  const renderDiamonds = () => {
    const diamonds = generateGrid(14, 8)
    return (
      <div className="diamonds-container">
        {diamonds.map(diamond => (
          <div
            key={diamond.index}
            className="diamond"
            style={{
              '--x': `${diamond.x * 7}%`,
              '--y': `${diamond.y * 12.5}%`,
              '--delay': `${diamond.index * 0.08}s`,
              '--rotation': `${(diamond.x + diamond.y) * 15}deg`
            }}
          />
        ))}
      </div>
    )
  }

  const renderTextileWeave = () => {
    const threads = generateGrid(20, 15)
    return (
      <div className="textile-container">
        {threads.map(thread => (
          <div
            key={thread.index}
            className={`textile-thread ${(thread.x + thread.y) % 2 === 0 ? 'horizontal' : 'vertical'}`}
            style={{
              '--x': `${thread.x * 5}%`,
              '--y': `${thread.y * 6.67}%`,
              '--delay': `${thread.index * 0.03}s`
            }}
          />
        ))}
      </div>
    )
  }

  const renderCircuitBoard = () => {
    const components = generateGrid(8, 5)
    return (
      <div className="circuit-container">
        {/* Дорожки */}
        <div className="circuit-tracks">
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} className="circuit-track horizontal" style={{
              '--y': `${i * 8.33}%`,
              '--delay': `${i * 0.1}s`
            }} />
          ))}
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} className="circuit-track vertical" style={{
              '--x': `${i * 12.5}%`,
              '--delay': `${i * 0.15}s`
            }} />
          ))}
        </div>
        {/* Компоненты */}
        {components.map(comp => (
          <div
            key={comp.index}
            className="circuit-component"
            style={{
              '--x': `${comp.x * 12.5}%`,
              '--y': `${comp.y * 20}%`,
              '--delay': `${comp.index * 0.2}s`
            }}
          />
        ))}
      </div>
    )
  }

  return (
    <div className={`geometric-pattern-bg pattern-${variant} pattern-${intensity} ${animated ? 'animated' : ''}`}>
      {variant === 'hexagons' && renderHexagons()}
      {variant === 'triangles' && renderTriangles()}
      {variant === 'isometric' && renderIsometric()}
      {variant === 'diamonds' && renderDiamonds()}
      {variant === 'textile' && renderTextileWeave()}
      {variant === 'circuit' && renderCircuitBoard()}
    </div>
  )
}

export default GeometricPatternBackground 