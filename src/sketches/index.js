// Экспорт всех доступных скетчей p5.js
export { PatternWaveSketch } from './PatternWave.js'
export { GeometricPatternSketch } from './GeometricPattern.js'

// Объект с метаданными скетчей
export const sketchMetadata = {
  PatternWave: {
    name: 'Волновые Паттерны',
    description: 'Интерактивные волны с частицами, имитирующие текстильные паттерны',
    category: 'interactive',
    difficulty: 'medium'
  },
  GeometricPattern: {
    name: 'Геометрические Узоры',
    description: 'Анимированные геометрические формы в стиле промышленного дизайна',
    category: 'generative',
    difficulty: 'advanced'
  }
}

// Список всех доступных скетчей
export const availableSketches = [
  'PatternWave',
  'GeometricPattern'
] 