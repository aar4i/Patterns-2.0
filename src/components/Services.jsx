import React from 'react'
import './Services.css'

function Services({ t }) {
  return (
    <section id="services" className="services">
      <div className="container">
        <h2 className="section-title">
          <span>{t.services.title}</span>
          <span className="subtitle">{t.services.subtitle}</span>
        </h2>
        <div className="services-grid">
          {t.services.items.map((service, index) => (
            <div key={index} className={`service-card card-${index + 1}`}>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services 