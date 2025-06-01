import React from 'react'
import './Gallery.css'

function Gallery({ t }) {
  return (
    <section id="gallery" className="gallery">
      <div className="container">
        <h2 className="section-title">
          <span>{t.gallery.title}</span>
          <span className="subtitle">{t.gallery.subtitle}</span>
        </h2>
        <div className="gallery-grid">
          <div className="gallery-item item-1">
            <div className="gallery-overlay">DECONSTRUCTED</div>
          </div>
          <div className="gallery-item item-2">
            <div className="gallery-overlay">MINIMAL</div>
          </div>
          <div className="gallery-item item-3">
            <div className="gallery-overlay">FUTURISTIC</div>
          </div>
          <div className="gallery-item item-4">
            <div className="gallery-overlay">ABSTRACT</div>
          </div>
          <div className="gallery-item item-5">
            <div className="gallery-overlay">EXPERIMENTAL</div>
          </div>
          <div className="gallery-item item-6">
            <div className="gallery-overlay">REVOLUTIONARY</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Gallery 