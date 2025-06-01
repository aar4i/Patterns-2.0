import React from 'react'
import '../styles/Services.css'

function Services({ t }) {
  const services = [
    {
      icon: '🏭',
      title: 'Manufacturing',
      description: 'High-quality textile production with state-of-the-art machinery and skilled craftsmen.',
      features: ['Custom production', 'Quality control', 'Bulk orders', 'Fast turnaround']
    },
    {
      icon: '✂️',
      title: 'Custom Design',
      description: 'Tailored textile solutions designed specifically for your brand and requirements.',
      features: ['Personal consultation', 'Pattern development', 'Color matching', 'Sample creation']
    },
    {
      icon: '🚚',
      title: 'Logistics',
      description: 'Efficient delivery and supply chain management to get your products on time.',
      features: ['Worldwide shipping', 'Tracking system', 'Flexible delivery', 'Bulk handling']
    }
  ]

  const processSteps = [
    {
      number: '01',
      title: 'Consultation',
      description: 'We discuss your requirements and project specifications in detail.'
    },
    {
      number: '02',
      title: 'Design',
      description: 'Our team creates custom designs and patterns based on your needs.'
    },
    {
      number: '03',
      title: 'Production',
      description: 'Manufacturing begins with quality control at every step of the process.'
    },
    {
      number: '04',
      title: 'Delivery',
      description: 'Final products are packaged and delivered to your specified location.'
    }
  ]

  return (
    <section id="services" className="services">
      <div className="container">
        <div className="services-header">
          <h2 className="services-title">{t.services.title}</h2>
          <p className="services-subtitle">{t.services.subtitle}</p>
        </div>
        
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <span className="service-icon">{service.icon}</span>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <ul className="service-features">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex}>{feature}</li>
                ))}
              </ul>
              <a href="#contact" className="service-link">Learn More</a>
            </div>
          ))}
        </div>

        <div className="process-section">
          <h3 className="process-title">Our Process</h3>
          <div className="process-steps">
            {processSteps.map((step, index) => (
              <div key={index} className="process-step">
                <div className="step-number">{step.number}</div>
                <h4 className="step-title">{step.title}</h4>
                <p className="step-description">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="services-cta">
          <h3 className="cta-title">Ready to Start Your Project?</h3>
          <p className="cta-description">
            Contact us today to discuss your textile manufacturing needs and get a custom quote.
          </p>
          <a href="#contact" className="cta-button">
            Get Started
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Services 