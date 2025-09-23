import React, { useMemo, useEffect, useRef } from 'react'
import '../styles/About.css'

function About() {
  const aboutRef = useRef(null);

  const aboutLines = [
    "Patterns Manufacturing",
    "European agency providing full-cycle production",
    "of custom garments for brands and companies — Professional textile solutions",
    "Modern manufacturing processes — Quality assurance guaranteed — Patterns Manufacturing"
  ];

  // Intersection Observer для оптимизации анимаций
  useEffect(() => {
    const aboutElement = aboutRef.current;
    if (!aboutElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Секция видна - запускаем анимации
            entry.target.classList.remove('not-visible');
          } else {
            // Секция не видна - останавливаем анимации
            entry.target.classList.add('not-visible');
          }
        });
      },
      {
        rootMargin: '50px', // Начинаем анимацию чуть раньше попадания в viewport
        threshold: 0.1 // Срабатывает когда видно хотя бы 10% секции
      }
    );

    observer.observe(aboutElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Функция для создания PA элемента с случайной задержкой
  const createRandomPA = () => {
    const rotation = 0; // Убираем случайный поворот, делаем ровно
    const id = Math.random().toString(36).substr(2, 9); // Уникальный ID
    const delay = Math.random() * 12; // Случайная задержка от 0 до 12 секунд
    return { rotation, id, delay };
  };

  // Функция для разбивки текста с добавлением PA элементов
  const processTextWithPA = (text, lineIndex) => {
    const words = text.split(' ');
    const result = [];
    
    words.forEach((word, wordIndex) => {
      // Добавляем слово
      result.push({
        type: 'text',
        content: word,
        key: `word-${lineIndex}-${wordIndex}`
      });
      
      // Добавляем пробел или PA элемент если это не последнее слово
      if (wordIndex < words.length - 1) {
        // Увеличиваем вероятность для коротких строк
        const probability = words.length <= 3 ? 0.6 : 0.35; // Больше вероятность для коротких строк
        if (Math.random() < probability) {
          const paData = createRandomPA();
          result.push({
            type: 'pa',
            rotation: paData.rotation,
            delay: paData.delay,
            key: `pa-${lineIndex}-${wordIndex}-${paData.id}`
          });
        } else {
          result.push({
            type: 'text',
            content: ' ',
            key: `space-${lineIndex}-${wordIndex}`
          });
        }
      }
    });
    
    return result;
  };

  // Мемоизируем обработанный контент для стабильности
  const processedLines = useMemo(() => {
    return aboutLines.map((line, lineIndex) => 
      processTextWithPA(line, lineIndex)
    );
  }, []);

  return (
    <section id="about" className="about" ref={aboutRef}>
      <div className="about-content-wrapper">
        <div className="marquee-container">
          {processedLines.map((processedLine, lineIndex) => (
          <div key={lineIndex} className="marquee-line">
            <div className="marquee-content">
              {/* Дублируем каждую строку для бесшовной анимации */}
              {[...Array(4)].map((_, index) => (
                <div key={index} className="marquee-text">
                  {processedLine.map((item) => {
                    if (item.type === 'text') {
                      return <span key={item.key}>{item.content}</span>;
                    } else if (item.type === 'pa') {
                      return (
                        <span 
                          key={item.key} 
                          className="pa-element-marquee"
                          style={{ 
                            '--rotation': `${item.rotation}deg`,
                            '--random-delay': `${item.delay}s`
                          }}
                        >
                          <img 
                            src="/logos/CursorPM-white.svg" 
                            alt="PA" 
                            className="pa-marquee-svg"
                            style={{ 
                              transform: `rotate(${item.rotation}deg)` 
                            }}
                          />
                        </span>
                      );
                    }
                    return null;
                  })}
                </div>
              ))}
            </div>
          </div>
        ))}
        </div>
      </div>
    </section>
  )
}

export default About 