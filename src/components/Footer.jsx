import React from 'react'
import '../styles/Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <a href="#privacy-policy" className="footer-link">Privacy Policy</a>
          <a href="#terms" className="footer-link">Terms of Service</a>
          <a href="#about" className="footer-link">About Us</a>
        </div>
        <div className="footer-text">
          © 2025 Patterns Manufacturing. All rights reserved.
          {'\n'}
          European agency providing full-cycle production of custom garments.
          {'\n'}
          Professional textile solutions for brands and companies.
        </div>
      </div>
    </footer>
  )
}

export default Footer 