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
      <div className="about-content-wrapper">
        <div className="marquee-container">
          {aboutLines.map((line, lineIndex) => (
            <div key={lineIndex} className="marquee-line">
              <div className="marquee-content">
                {/* Duplicate 4 times for seamless animation */}
                {[...Array(4)].map((_, index) => (
                  <span key={index} className="marquee-text">
                    {line}{' '}
                    <span className="pa-element-marquee">
                      <img 
                        src="/logos/CursorPM-white.svg" 
                        alt="PA" 
                        className="pa-marquee-svg"
                      />
                    </span>
                  </span>
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