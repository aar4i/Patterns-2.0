import { useRef, useEffect } from 'react'
import p5 from 'p5'

/**
 * Кастомный хук для использования p5.js в React компонентах
 * @param {Function} sketch - Функция скетча p5.js
 * @param {Array} dependencies - Массив зависимостей для перерендера
 * @returns {Object} - Объект с ref и методами управления
 */
export const useP5 = (sketch, dependencies = []) => {
  const containerRef = useRef()
  const p5InstanceRef = useRef()

  useEffect(() => {
    if (containerRef.current) {
      // Удаляем предыдущий экземпляр если есть
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove()
      }

      // Создаем новый экземпляр p5
      p5InstanceRef.current = new p5(sketch, containerRef.current)
    }

    // Cleanup функция
    return () => {
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove()
        p5InstanceRef.current = null
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sketch, ...dependencies])

  // Cleanup при размонтировании компонента
  useEffect(() => {
    return () => {
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove()
      }
    }
  }, [])

  return {
    containerRef,
    p5Instance: p5InstanceRef.current
  }
}

export default useP5 