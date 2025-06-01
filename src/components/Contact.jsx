import React, { useState } from 'react'
import '../styles/Contact.css'
import { telegramConfig } from '../config/telegram'

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { token, chatId } = telegramConfig
    const message = `<b>New Contact Submission</b>%0A` +
      `<b>Name:</b> ${formData.name}%0A` +
      `<b>Email:</b> ${formData.email}%0A` +
      `<b>Phone:</b> ${formData.phone}%0A` +
      `<b>Message:</b> ${formData.message}`
    try {
      const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&parse_mode=HTML&text=${encodeURIComponent(message)}`)
      if (res.ok) {
        alert('Message sent successfully!')
        setFormData({ name: '', email: '', phone: '', message: '' })
      } else {
        alert('Failed to send message.')
      }
    } catch (error) {
      console.error('Telegram API error:', error)
      alert('Error sending message.')
    }
  }

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="contact-header">
          <h2 className="contact-title">{t.contact.title}</h2>
          <p className="contact-subtitle">{t.contact.subtitle}</p>
        </div>
        
        <div className="contact-content">
          <div className="contact-form">
            <h3 className="form-title">Send us a Message</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <input 
                    type="text" 
                    name="name"
                    placeholder="Your Name *"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input 
                    type="email" 
                    name="email"
                    placeholder="Email Address *"
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
                  placeholder="Tell us about your project... *"
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
            <div className="direct-contact">
              <h3>Direct Contact</h3>
              <a href="mailto:hello@patterns-berlin.de" className="contact-email">
                hello@patterns-berlin.de
              </a>
            </div>

            <div className="divider">
              <span>{t.contact.alternative.or}</span>
            </div>
            
            <div className="social-links">
              <h3>Follow Us</h3>
              <div className="social-links-grid">
                <a 
                  href="https://www.instagram.com/patterns.manufacturing/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-link"
                >
                  Instagram
                </a>
                <a href="#" className="social-link">WhatsApp</a>
                <a href="#" className="social-link">Facebook</a>
                <a href="#" className="social-link">LinkedIn</a>
              </div>
            </div>

            <div className="contact-info">
              <h3>Company Info</h3>
              <div className="info-item">
                <div className="info-label">Business Hours</div>
                <div className="info-value">Mon - Fri: 9:00 - 18:00</div>
              </div>
              <div className="info-item">
                <div className="info-label">Response Time</div>
                <div className="info-value">Within 24 hours</div>
              </div>
              <div className="info-item">
                <div className="info-label">Languages</div>
                <div className="info-value">English, German</div>
              </div>
              <div className="info-item">
                <div className="info-label">Services</div>
                <div className="info-value">Worldwide Shipping</div>
              </div>
            </div>
          </div>
        </div>

        <div className="copyright">
          {t.contact.copyright}
        </div>
      </div>
    </section>
  )
}

export default Contact 