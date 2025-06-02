/**
 * Интерактивный скетч с волновыми паттернами
 * Подходит для сайта производства текстиля и паттернов
 */

export const PatternWaveSketch = (p) => {
  let time = 0
  let mouseInfluence = 0
  let particles = []
  let colors = []

  p.setup = () => {
    const canvas = p.createCanvas(p.windowWidth, p.windowHeight)
    canvas.parent(p.canvas.parentNode)
    
    // Цветовая палитра в стиле производства
    colors = [
      p.color(45, 55, 72),   // темно-серый
      p.color(74, 85, 104),  // серый
      p.color(160, 174, 192), // светло-серый
      p.color(203, 213, 224), // очень светлый серый
      p.color(255, 255, 255)  // белый
    ]

    // Создаем частицы для паттернов
    for (let i = 0; i < 150; i++) {
      particles.push({
        x: p.random(p.width),
        y: p.random(p.height),
        size: p.random(2, 8),
        speed: p.random(0.5, 2),
        angle: p.random(p.TWO_PI),
        colorIndex: Math.floor(p.random(colors.length))
      })
    }
  }

  p.draw = () => {
    // Градиентный фон
    drawGradientBackground()
    
    // Обновляем время
    time += 0.01
    
    // Влияние мыши
    let targetMouseInfluence = p.map(p.mouseX, 0, p.width, 0, 1)
    mouseInfluence = p.lerp(mouseInfluence, targetMouseInfluence, 0.05)
    
    // Рисуем волновые линии
    drawWaveLines()
    
    // Рисуем интерактивные частицы
    drawParticles()
    
    // Рисуем паттерн сетки
    drawPatternGrid()
  }

  const drawGradientBackground = () => {
    for (let i = 0; i <= p.height; i++) {
      let inter = p.map(i, 0, p.height, 0, 1)
      let c = p.lerpColor(colors[0], colors[1], inter)
      p.stroke(c)
      p.line(0, i, p.width, i)
    }
  }

  const drawWaveLines = () => {
    p.stroke(colors[2])
    p.strokeWeight(1)
    p.noFill()
    
    for (let y = 0; y < p.height; y += 40) {
      p.beginShape()
      for (let x = 0; x <= p.width; x += 5) {
        let wave1 = p.sin(x * 0.01 + time) * 20
        let wave2 = p.sin(x * 0.005 + time * 1.5) * 15
        let wave3 = p.sin(x * 0.02 + time * 0.8) * 8
        
        let finalY = y + wave1 + wave2 + wave3
        finalY += p.sin(x * 0.003 + mouseInfluence * 10) * mouseInfluence * 30
        
        p.vertex(x, finalY)
      }
      p.endShape()
    }
  }

  const drawParticles = () => {
    particles.forEach(particle => {
      // Обновляем позицию частиц
      particle.x += p.cos(particle.angle + time) * particle.speed
      particle.y += p.sin(particle.angle + time * 0.7) * particle.speed
      
      // Влияние мыши на частицы
      let distToMouse = p.dist(particle.x, particle.y, p.mouseX, p.mouseY)
      if (distToMouse < 100) {
        let force = p.map(distToMouse, 0, 100, 2, 0)
        let angleToMouse = p.atan2(particle.y - p.mouseY, particle.x - p.mouseX)
        particle.x += p.cos(angleToMouse) * force
        particle.y += p.sin(angleToMouse) * force
      }
      
      // Возвращаем частицы в границы экрана
      if (particle.x < 0) particle.x = p.width
      if (particle.x > p.width) particle.x = 0
      if (particle.y < 0) particle.y = p.height
      if (particle.y > p.height) particle.y = 0
      
      // Рисуем частицу
      p.fill(colors[particle.colorIndex])
      p.noStroke()
      let dynamicSize = particle.size + p.sin(time * 2 + particle.angle) * 2
      p.ellipse(particle.x, particle.y, dynamicSize)
    })
  }

  const drawPatternGrid = () => {
    p.stroke(colors[3])
    p.strokeWeight(0.5)
    
    let gridSize = 50 + mouseInfluence * 30
    
    for (let x = 0; x < p.width; x += gridSize) {
      for (let y = 0; y < p.height; y += gridSize) {
        let distToMouse = p.dist(x, y, p.mouseX, p.mouseY)
        let alpha = p.map(distToMouse, 0, 200, 100, 10)
        
        p.stroke(p.red(colors[3]), p.green(colors[3]), p.blue(colors[3]), alpha)
        
        // Рисуем крестики как элементы паттерна
        let size = 5 + p.sin(time + x * 0.01 + y * 0.01) * 3
        p.line(x - size, y, x + size, y)
        p.line(x, y - size, x, y + size)
      }
    }
  }

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight)
  }

  p.mousePressed = () => {
    // Добавляем новые частицы при клике
    for (let i = 0; i < 5; i++) {
      particles.push({
        x: p.mouseX + p.random(-20, 20),
        y: p.mouseY + p.random(-20, 20),
        size: p.random(3, 10),
        speed: p.random(0.5, 3),
        angle: p.random(p.TWO_PI),
        colorIndex: Math.floor(p.random(colors.length))
      })
    }
    
    // Ограничиваем количество частиц
    if (particles.length > 200) {
      particles.splice(0, particles.length - 200)
    }
  }
} 