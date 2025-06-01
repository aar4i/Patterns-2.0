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
      <div className="contact-container">
        <div className="contact-content">
          <div className="contact-form">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">{t.contact.form.name}</label>
                <input 
                  type="text" 
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">{t.contact.form.email}</label>
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">{t.contact.form.phone}</label>
                <input 
                  type="tel" 
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">{t.contact.form.message}</label>
                <textarea 
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  required
                ></textarea>
              </div>
              
              <button type="submit" className="submit-btn">
                {t.contact.form.submit}
              </button>
            </form>
          </div>
          
          <div className="contact-alternative">
            <div className="divider">
              <span>{t.contact.alternative.or}</span>
            </div>
            
            <div className="direct-contact">
              <h3>{t.contact.alternative.contactUs}</h3>
              <a href="mailto:gaymanufacturing@pm.de" className="contact-email">
                GAYMANUFACTURING@PM.DE
              </a>
            </div>
            
            <div className="social-links">
              <a 
                href="https://www.instagram.com/patterns.manufacturing/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-link"
              >
                {t.contact.social.ig}
              </a>
              <a href="#" className="social-link">{t.contact.social.whatsapp}</a>
              <a href="#" className="social-link">{t.contact.social.fb}</a>
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