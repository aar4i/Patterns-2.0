import React, { useState } from 'react'
import '../styles/Footer.css'
import TermsOfService from './TermsOfService'
import PrivacyPolicy from './PrivacyPolicy'

function Footer() {
  const [isTermsOpen, setIsTermsOpen] = useState(false)
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false)

  return (
    <>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-links">
            <span onClick={() => setIsPrivacyOpen(true)} className="footer-link" style={{cursor: 'pointer'}}>
              Privacy Policy
            </span>
            <span onClick={() => setIsTermsOpen(true)} className="footer-link" style={{cursor: 'pointer'}}>
              Terms of Service
            </span>
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
      {isTermsOpen && <TermsOfService onClose={() => setIsTermsOpen(false)} />}
      {isPrivacyOpen && <PrivacyPolicy onClose={() => setIsPrivacyOpen(false)} />}
    </>
  )
}

export default Footer 