import React from 'react'
import { motion } from 'framer-motion'
import '../styles/Gallery.css'

function Gallery() {
  return (
    <section id="gallery" className="gallery">
      <div className="gallery-container">
        <motion.div 
          className="gallery-content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="gallery-title">
            <span className="contrast-block">Gallery</span>
          </h2>
          <div className="gallery-placeholder">
            <span className="placeholder-text">Coming Soon</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Gallery 