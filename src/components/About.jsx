import React from 'react'
import '../styles/About.css'

function About() {
  const aboutLines = [
    "Patterns Manufacturing",
    "European agency providing full-cycle production",
    "of custom garments for brands and companies — Professional textile solutions",
    "Modern manufacturing processes — Quality assurance guaranteed — Patterns Manufacturing"
  ];

  return (
    <section id="about" className="about">
      <div className="marquee-container">
        {aboutLines.map((line, lineIndex) => (
          <div key={lineIndex} className="marquee-line">
            <div className="marquee-content">
              {/* Дублируем каждую строку для бесшовной анимации */}
              {[...Array(4)].map((_, index) => (
                <div key={index} className="marquee-text">
                  {line}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default About 