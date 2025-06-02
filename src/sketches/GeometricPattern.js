/**
 * Геометрический паттерн скетч
 * Имитирует текстильные узоры и паттерны производства
 */

export const GeometricPatternSketch = (p) => {
  let time = 0
  let shapes = []
  let colors = []
  let gridSize = 60

  p.setup = () => {
    const canvas = p.createCanvas(p.windowWidth, p.windowHeight)
    canvas.parent(p.canvas.parentNode)
    
    // Промышленная цветовая палитра
    colors = [
      p.color(31, 41, 55),   // темно-синий
      p.color(55, 65, 81),   // серо-синий
      p.color(107, 114, 128), // серый
      p.color(156, 163, 175), // светло-серый
      p.color(229, 231, 235), // очень светлый
      p.color(59, 130, 246),  // акцент синий
      p.color(16, 185, 129)   // акцент зеленый
    ]

    // Создаем сетку геометрических форм
    initializeShapes()
  }

  p.draw = () => {
    // Фон
    p.background(colors[0])
    
    time += 0.008
    
    // Рисуем основную сетку
    drawMainGrid()
    
    // Рисуем анимированные формы
    drawAnimatedShapes()
    
    // Рисуем интерактивные элементы
    drawInteractiveElements()
    
    // Рисуем overlay паттерн
    drawOverlayPattern()
  }

  const initializeShapes = () => {
    shapes = []
    for (let x = 0; x < p.width; x += gridSize) {
      for (let y = 0; y < p.height; y += gridSize) {
        shapes.push({
          x: x,
          y: y,
          type: Math.floor(p.random(4)), // 4 типа форм
          size: p.random(20, 40),
          rotation: p.random(p.TWO_PI),
          rotationSpeed: p.random(-0.02, 0.02),
          colorIndex: Math.floor(p.random(colors.length)),
          phase: p.random(p.TWO_PI)
        })
      }
    }
  }

  const drawMainGrid = () => {
    p.stroke(colors[2])
    p.strokeWeight(0.3)
    
    // Вертикальные линии
    for (let x = 0; x <= p.width; x += gridSize) {
      let alpha = 50 + p.sin(time + x * 0.01) * 20
      p.stroke(p.red(colors[2]), p.green(colors[2]), p.blue(colors[2]), alpha)
      p.line(x, 0, x, p.height)
    }
    
    // Горизонтальные линии
    for (let y = 0; y <= p.height; y += gridSize) {
      let alpha = 50 + p.cos(time + y * 0.01) * 20
      p.stroke(p.red(colors[2]), p.green(colors[2]), p.blue(colors[2]), alpha)
      p.line(0, y, p.width, y)
    }
  }

  const drawAnimatedShapes = () => {
    shapes.forEach(shape => {
      p.push()
      p.translate(shape.x + gridSize / 2, shape.y + gridSize / 2)
      p.rotate(shape.rotation + time * shape.rotationSpeed)
      
      // Анимация размера
      let dynamicSize = shape.size + p.sin(time * 2 + shape.phase) * 5
      
      // Влияние мыши
      let distToMouse = p.dist(shape.x, shape.y, p.mouseX, p.mouseY)
      if (distToMouse < 100) {
        let influence = p.map(distToMouse, 0, 100, 2, 1)
        dynamicSize *= influence
      }
      
      // Выбираем цвет
      let shapeColor = colors[shape.colorIndex]
      let alpha = 180 + p.sin(time + shape.phase) * 75
      p.fill(p.red(shapeColor), p.green(shapeColor), p.blue(shapeColor), alpha)
      p.noStroke()
      
      // Рисуем форму в зависимости от типа
      switch (shape.type) {
        case 0: // Ромб
          drawDiamond(dynamicSize)
          break
        case 1: // Шестиугольник
          drawHexagon(dynamicSize)
          break
        case 2: // Треугольник
          drawTriangle(dynamicSize)
          break
        case 3: // Круг с паттерном
          drawPatternCircle(dynamicSize)
          break
      }
      
      p.pop()
    })
  }

  const drawDiamond = (size) => {
    p.beginShape()
    p.vertex(0, -size / 2)
    p.vertex(size / 2, 0)
    p.vertex(0, size / 2)
    p.vertex(-size / 2, 0)
    p.endShape(p.CLOSE)
  }

  const drawHexagon = (size) => {
    p.beginShape()
    for (let i = 0; i < 6; i++) {
      let angle = p.TWO_PI / 6 * i
      let x = p.cos(angle) * size / 2
      let y = p.sin(angle) * size / 2
      p.vertex(x, y)
    }
    p.endShape(p.CLOSE)
  }

  const drawTriangle = (size) => {
    p.triangle(0, -size / 2, -size / 2, size / 2, size / 2, size / 2)
  }

  const drawPatternCircle = (size) => {
    p.ellipse(0, 0, size)
    
    // Внутренний паттерн
    p.stroke(colors[0])
    p.strokeWeight(1)
    for (let i = 0; i < 8; i++) {
      let angle = p.TWO_PI / 8 * i
      let x = p.cos(angle) * size / 4
      let y = p.sin(angle) * size / 4
      p.line(0, 0, x, y)
    }
  }

  const drawInteractiveElements = () => {
    // Рисуем интерактивные точки вокруг мыши
    p.fill(colors[5])
    p.noStroke()
    
    for (let i = 0; i < 12; i++) {
      let angle = p.TWO_PI / 12 * i + time * 2
      let radius = 50 + p.sin(time * 3 + i) * 20
      let x = p.mouseX + p.cos(angle) * radius
      let y = p.mouseY + p.sin(angle) * radius
      
      if (x > 0 && x < p.width && y > 0 && y < p.height) {
        let size = 3 + p.sin(time * 4 + i) * 2
        p.ellipse(x, y, size)
      }
    }
  }

  const drawOverlayPattern = () => {
    p.stroke(colors[6])
    p.strokeWeight(1)
    p.noFill()
    
    // Волновые линии overlay
    for (let x = 0; x < p.width; x += 10) {
      let y1 = p.height / 2 + p.sin(x * 0.01 + time) * 100
      let y2 = p.height / 2 + p.sin(x * 0.015 + time + 1) * 80
      
      let alpha = p.map(p.sin(x * 0.005 + time), -1, 1, 20, 60)
      p.stroke(p.red(colors[6]), p.green(colors[6]), p.blue(colors[6]), alpha)
      
      p.line(x, y1, x, y2)
    }
  }

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight)
    initializeShapes()
  }

  p.mousePressed = () => {
    // Перегенерируем формы в радиусе клика
    shapes.forEach(shape => {
      let dist = p.dist(shape.x, shape.y, p.mouseX, p.mouseY)
      if (dist < 120) {
        shape.type = Math.floor(p.random(4))
        shape.colorIndex = Math.floor(p.random(colors.length))
        shape.rotationSpeed = p.random(-0.03, 0.03)
        shape.phase = p.random(p.TWO_PI)
      }
    })
  }

  p.keyPressed = () => {
    if (p.key === ' ') {
      // Пересоздаем все формы при нажатии пробела
      initializeShapes()
    }
  }
} 