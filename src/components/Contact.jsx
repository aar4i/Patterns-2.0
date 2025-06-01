import React, { useState } from 'react'
import { motion } from 'framer-motion'
import '../styles/Contact.css'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  return (
    <section id="contact" className="contact">
      <div className="contact-container">
        <motion.div 
          className="contact-content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Форма */}
          <div className="contact-form-section">
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-field">
                <div className="field-label">YOUR NAME</div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-field">
                <div className="field-label">EMAIL</div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-field">
                <div className="field-label">PHONE NUMBER</div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-field">
                <div className="field-label">DESCRIBE WHAT YOU WANT TO DO LOREM IPSUM AHAHAH</div>
                <div className="textarea-placeholder">
                  3 ROW HERE<br />
                  4 ROW<br />
                  5TH ROW HERE
                </div>
              </div>

              <button type="submit" className="submit-button">
                SUBMIT
              </button>
            </form>
          </div>

          {/* Разделитель */}
          <div className="contact-divider">
            <span className="divider-text">OR</span>
          </div>

          {/* Контактная информация */}
          <div className="contact-info-section">
            <div className="contact-action">
              CONTACT US
            </div>
            
            <div className="contact-email">
              GAYMANUFACTURING@PM.DE
            </div>

            <div className="contact-social">
              <a href="#" className="social-link">IG</a>
              <a href="#" className="social-link">WHATSAPP</a>
              <a href="#" className="social-link">FB</a>
            </div>
          </div>

          {/* Футер */}
          <div className="contact-footer">
            <div>© Patterns Manufacturing 2025</div>
            <div>All rights reserved.</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact 