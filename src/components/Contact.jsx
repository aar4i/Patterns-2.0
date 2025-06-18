import React, { useState } from 'react'
import emailjs from '@emailjs/browser'
import '../styles/Contact.css'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const [focusedField, setFocusedField] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('')
  const [privacyAccepted, setPrivacyAccepted] = useState(false)

  // Configuration for form fields
  const formFields = [
    {
      name: 'name',
      type: 'text',
      label: 'YOUR NAME',
      isTextarea: false
    },
    {
      name: 'email',
      type: 'email', 
      label: 'EMAIL',
      isTextarea: false
    },
    {
      name: 'phone',
      type: 'tel',
      label: 'PHONE NUMBER', 
      isTextarea: false
    },
    {
      name: 'message',
      type: 'text',
      label: 'DESCRIBE\nWHAT YOU WANT TO DO',
      isTextarea: true
    }
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handlePrivacyChange = (e) => {
    setPrivacyAccepted(e.target.checked)
  }

  const handleFieldClick = (fieldName) => {
    setFocusedField(fieldName)
    setTimeout(() => {
      const input = document.querySelector(`input[name="${fieldName}"], textarea[name="${fieldName}"]`)
      if (input) input.focus()
    }, 100)
  }

  const handleFocus = (fieldName) => {
    setFocusedField(fieldName)
  }

  const handleBlur = (fieldName) => {
    if (!formData[fieldName]) {
      setFocusedField(null)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Проверяем, что все поля заполнены
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      setSubmitStatus('Please fill in all fields')
      return
    }

    // Проверяем согласие с Privacy Policy
    if (!privacyAccepted) {
      setSubmitStatus('Please accept the Privacy Policy to continue')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('')

    try {
      // Конфигурация EmailJS (замените на ваши данные)
      const serviceID = 'service_a6xf19k'
      const templateID = 'template_wt8e3nm'  // Вставьте ID шаблона Contact Us
      const publicKey = 'bJW23xxe84BurjT5W'

      console.log('Sending email with params:', {
        serviceID,
        templateID,
        publicKey,
        formData
      })

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        message: formData.message
      }

      console.log('Template params:', templateParams)

      const response = await emailjs.send(serviceID, templateID, templateParams, publicKey)
      console.log('EmailJS response:', response)
      
      setSubmitStatus('Message sent successfully!')
      setFormData({ name: '', email: '', phone: '', message: '' })
      setPrivacyAccepted(false)
      setFocusedField(null)
      
    } catch (error) {
      console.error('Detailed error:', error)
      console.error('Error message:', error.message)
      console.error('Error status:', error.status)
      console.error('Error text:', error.text)
      
      let errorMessage = 'Error sending message. Please try again.'
      
      if (error.status === 400) {
        errorMessage = 'Bad request. Please check form data.'
      } else if (error.status === 401) {
        errorMessage = 'Unauthorized. Please check EmailJS configuration.'
      } else if (error.status === 404) {
        errorMessage = 'Service or template not found.'
      }
      
      setSubmitStatus(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFieldActive = (fieldName) => focusedField === fieldName || formData[fieldName]

  const renderFormField = (field) => {
    const { name, type, label, isTextarea } = field
    const isActive = isFieldActive(name)

    return (
      <div key={name} className="form-field">
        <div 
          className={`field-label ${isTextarea ? 'textarea-field' : ''} ${isActive ? 'focused' : ''}`}
          onClick={() => handleFieldClick(name)}
        >
          {!isActive && (
            isTextarea ? (
              <div className="textarea-content">
                {label.split('\n').map((line, index) => (
                  <React.Fragment key={index}>
                    {line} {index < label.split('\n').length - 1 && <br />}
                  </React.Fragment>
                ))}
                <br />
                <br />
              </div>
            ) : (
              label
            )
          )}
          
          {isTextarea ? (
            <textarea
              name={name}
              value={formData[name]}
              onChange={handleInputChange}
              onFocus={() => handleFocus(name)}
              onBlur={() => handleBlur(name)}
              style={{ display: isActive ? 'block' : 'none' }}
            />
          ) : (
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleInputChange}
              onFocus={() => handleFocus(name)}
              onBlur={() => handleBlur(name)}
              style={{ display: isActive ? 'block' : 'none' }}
            />
          )}
        </div>
      </div>
    )
  }

  return (
    <section id="contact" className="contact">
      <div className="contact-container">
        <div className="contact-content">
          <div className="contact-form-section">
            <form onSubmit={handleSubmit} className="contact-form">
              {formFields.map(renderFormField)}
              
              <div className="privacy-checkbox">
                <label className="checkbox-container">
                  <input 
                    type="checkbox" 
                    checked={privacyAccepted}
                    onChange={handlePrivacyChange}
                    className="checkbox-input"
                  />
                  <span className="checkmark"></span>
                  <span className="checkbox-text">
                    I agree to the processing of my data in accordance with the{' '}
                    <a href="#privacy-policy" className="privacy-link">Privacy Policy</a>.
                  </span>
                </label>
              </div>
              
              <button type="submit" className="submit-button" disabled={isSubmitting}>
                <span className="submit-text">
                  {isSubmitting ? 'SENDING...' : 'SUBMIT'}
                </span>
              </button>
              
              {submitStatus && (
                <div className={`submit-status ${submitStatus.includes('success') ? 'success' : 'error'}`}>
                  {submitStatus}
                </div>
              )}
            </form>
          </div>

          <div className="contact-divider">
            <p className="divider-text">OR</p>
          </div>

          <div className="contact-info-section">
            <div className="contact-action">GET IN TOUCH</div>
            <div className="contact-email">
              <a href="mailto:niko@patterns-agency.com">niko@patterns-agency.com</a>
            </div>
            <div className="contact-social">
              <a href="https://wa.me/4915225899470" className="social-link" target="_blank" rel="noopener noreferrer">WHATSAPP</a>
              <a href="https://instagram.com" className="social-link">INSTAGRAM</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact 