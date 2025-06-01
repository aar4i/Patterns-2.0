import React, { useState } from 'react'
import '../styles/Contact.css'

function Contact({ t }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
  }

  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2 className="section-title">
          <span>{t.contact.title}</span>
          <span className="subtitle">{t.contact.subtitle}</span>
        </h2>
        
        <div className="contact-content">
          <div className="contact-form">
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <input 
                    type="text" 
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input 
                    type="email" 
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <input 
                  type="tel" 
                  name="phone"
                  placeholder="Phone Number (Optional)"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              
              <div className="form-group">
                <textarea 
                  name="message"
                  placeholder="Tell us about your project..."
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              
              <button type="submit" className="submit-btn">
                Send Message
              </button>
            </form>
          </div>
          
          <div className="contact-alternative">
            <div className="divider">
              <span>{t.contact.alternative.or}</span>
            </div>
            
            <div className="direct-contact">
              <h3>Direct Contact</h3>
              <a href="mailto:hello@patterns-berlin.de" className="contact-email">
                hello@patterns-berlin.de
              </a>
            </div>
            
            <div className="social-links">
              <a href="https://www.instagram.com/patterns.manufacturing/" target="_blank" rel="noopener noreferrer" className="social-link">Instagram</a>
              <a href="#" className="social-link">WhatsApp</a>
              <a href="#" className="social-link">Facebook</a>
            </div>
            
            <div className="copyright">{t.contact.copyright}</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact 