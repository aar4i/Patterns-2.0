import React from 'react'
import './Contact.css'

function Contact({ t }) {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2 className="section-title">
          <span>{t.contact.title}</span>
          <span className="subtitle">{t.contact.subtitle}</span>
        </h2>
        <div className="contact-content">
          <div className="contact-form">
            <form>
              <div className="form-field">
                <label className="field-label">{t.contact.form.name}</label>
                <input type="text" />
              </div>
              <div className="form-field">
                <label className="field-label">{t.contact.form.email}</label>
                <input type="email" />
              </div>
              <div className="form-field">
                <label className="field-label">{t.contact.form.phone}</label>
                <input type="tel" />
              </div>
              <div className="form-field">
                <label className="field-label message-label">{t.contact.form.message.split('\n')[0]}</label>
                <textarea rows="6">{t.contact.form.message.split('\n').slice(1).join('\n')}</textarea>
              </div>
              <button type="submit">{t.contact.form.submit}</button>
            </form>
          </div>
          <div className="contact-alternative">
            <div className="contact-or">{t.contact.alternative.or}</div>
            <div className="contact-us-title">{t.contact.alternative.contactUs}</div>
            <div className="contact-email">{t.contact.alternative.email}</div>
            <div className="social-links">
              <a href="#">{t.contact.social.ig}</a>
              <a href="#">{t.contact.social.whatsapp}</a>
              <a href="#">{t.contact.social.fb}</a>
            </div>
            <div className="copyright">{t.contact.copyright}</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact 