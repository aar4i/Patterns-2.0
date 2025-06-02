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

  const [focusedField, setFocusedField] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Убираем автоматическое изменение высоты - размер теперь фиксированный
  }

  const handleFieldClick = (fieldName) => {
    setFocusedField(fieldName)
    // Фокусируем input после клика
    setTimeout(() => {
      const input = document.querySelector(`input[name="${fieldName}"], textarea[name="${fieldName}"]`)
      if (input) input.focus()
    }, 100)
  }

  const handleFocus = (fieldName) => {
    setFocusedField(fieldName)
    
    // Убираем изменение высоты - размер теперь фиксированный
  }

  const handleBlur = (fieldName) => {
    if (!formData[fieldName]) {
      setFocusedField(null)
    }
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
                <div 
                  className={`field-label ${focusedField === 'name' || formData.name ? 'focused' : ''}`}
                  onClick={() => handleFieldClick('name')}
                >
                  {!(focusedField === 'name' || formData.name) && 'YOUR NAME'}
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('name')}
                    onBlur={() => handleBlur('name')}
                    required
                    style={{ display: focusedField === 'name' || formData.name ? 'block' : 'none' }}
                  />
                </div>
              </div>

              <div className="form-field">
                <div 
                  className={`field-label ${focusedField === 'email' || formData.email ? 'focused' : ''}`}
                  onClick={() => handleFieldClick('email')}
                >
                  {!(focusedField === 'email' || formData.email) && 'EMAIL'}
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('email')}
                    onBlur={() => handleBlur('email')}
                    required
                    style={{ display: focusedField === 'email' || formData.email ? 'block' : 'none' }}
                  />
                </div>
              </div>

              <div className="form-field">
                <div 
                  className={`field-label ${focusedField === 'phone' || formData.phone ? 'focused' : ''}`}
                  onClick={() => handleFieldClick('phone')}
                >
                  {!(focusedField === 'phone' || formData.phone) && 'PHONE NUMBER'}
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('phone')}
                    onBlur={() => handleBlur('phone')}
                    style={{ display: focusedField === 'phone' || formData.phone ? 'block' : 'none' }}
                  />
                </div>
              </div>

              <div className="form-field">
                <div 
                  className={`field-label textarea-field ${focusedField === 'message' || formData.message ? 'focused' : ''}`}
                  onClick={() => handleFieldClick('message')}
                >
                  {!(focusedField === 'message' || formData.message) && (
                    <div className="textarea-content">
                      DESCRIBE WHAT YOU WANT<br />
                      TO DO LOREM IPSUM AHAHAH<br />
                      3 ROW HERE<br />
                      4 ROW<br />
                      5TH ROW HERE
                    </div>
                  )}
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('message')}
                    onBlur={() => handleBlur('message')}
                    style={{ display: focusedField === 'message' || formData.message ? 'block' : 'none' }}
                  />
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