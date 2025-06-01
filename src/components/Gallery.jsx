import React, { useState } from 'react'
import '../styles/Gallery.css'

function Gallery({ t }) {
  const [activeFilter, setActiveFilter] = useState('all')

  const galleryItems = [
    {
      id: 1,
      title: 'Custom Fabric Collection',
      category: 'textiles',
      description: 'High-quality custom textile production for fashion brands.',
      tags: ['Custom', 'Fashion', 'Premium']
    },
    {
      id: 2,
      title: 'Corporate Uniforms',
      category: 'corporate',
      description: 'Professional uniform manufacturing for businesses.',
      tags: ['Corporate', 'Professional', 'Bulk']
    },
    {
      id: 3,
      title: 'Designer Patterns',
      category: 'design',
      description: 'Unique pattern development and textile design services.',
      tags: ['Design', 'Patterns', 'Creative']
    },
    {
      id: 4,
      title: 'Sports Apparel',
      category: 'sports',
      description: 'Technical fabrics for athletic and sportswear applications.',
      tags: ['Sports', 'Technical', 'Performance']
    },
    {
      id: 5,
      title: 'Home Textiles',
      category: 'home',
      description: 'Quality fabrics for interior design and home decoration.',
      tags: ['Home', 'Interior', 'Comfort']
    },
    {
      id: 6,
      title: 'Sustainable Materials',
      category: 'eco',
      description: 'Eco-friendly textile production using sustainable materials.',
      tags: ['Eco', 'Sustainable', 'Green']
    }
  ]

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'textiles', label: 'Textiles' },
    { id: 'corporate', label: 'Corporate' },
    { id: 'design', label: 'Design' },
    { id: 'sports', label: 'Sports' },
    { id: 'home', label: 'Home' },
    { id: 'eco', label: 'Eco-Friendly' }
  ]

  const filteredItems = activeFilter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter)

  return (
    <section id="gallery" className="gallery">
      <div className="container">
        <div className="gallery-header">
          <h2 className="gallery-title">{t.gallery.title}</h2>
          <p className="gallery-subtitle">{t.gallery.subtitle}</p>
          
          <div className="gallery-filter">
            {filters.map(filter => (
              <button
                key={filter.id}
                className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
        
        <div className="gallery-grid">
          {filteredItems.map(item => (
            <div key={item.id} className="gallery-item">
              <div className="gallery-item-image">
                {/* Placeholder for actual images */}
              </div>
              <div className="gallery-item-content">
                <div className="gallery-item-category">{item.category}</div>
                <h3 className="gallery-item-title">{item.title}</h3>
                <p className="gallery-item-description">{item.description}</p>
                <div className="gallery-item-tags">
                  {item.tags.map((tag, index) => (
                    <span key={index} className="gallery-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="gallery-stats">
          <div className="stat-item">
            <span className="stat-number">500+</span>
            <span className="stat-label">Completed Projects</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">50+</span>
            <span className="stat-label">Happy Clients</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">15+</span>
            <span className="stat-label">Years Experience</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">100%</span>
            <span className="stat-label">Quality Guarantee</span>
          </div>
        </div>

        <div className="gallery-cta">
          <h3 className="gallery-cta-title">Ready to Create Something Amazing?</h3>
          <p className="gallery-cta-description">
            Let's discuss your project and bring your textile manufacturing vision to life.
          </p>
          <div className="gallery-cta-buttons">
            <a href="#contact" className="gallery-cta-btn primary">
              Start Your Project
              <span>→</span>
            </a>
            <a 
              href="https://www.instagram.com/patterns.manufacturing/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="gallery-cta-btn secondary"
            >
              View on Instagram
              <span>📸</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Gallery 