import React from 'react'
import '../styles/Services.css'

function Services() {
  const services = [
    {
      id: "1",
      title: "Embroidery—",
      subtitle: "Durable & professional\nstitching."
    },
    {
      id: "2", 
      title: "Screen Printing—",
      subtitle: "Bold & vibrant designs."
    },
    {
      id: "3",
      title: "DTF Printing—", 
      subtitle: "Full-color, detailed\nprints."
    },
    {
      id: "4",
      title: "Heat Transfer—",
      subtitle: "Perfect for small\nbatches."
    }
  ]

  return (
    <section id="services" className="services">
      <div className="services-container">
        {services.map((service, index) => (
          <div 
            key={service.id}
            className="service-item"
          >
            <div className="service-title">
              <span className="service-number">{service.id}</span>
              {service.title}
            </div>
            <div className="service-subtitle">
              {service.subtitle.split('\n').map((line, index) => (
                <span key={index}>
                  {line}
                  {index < service.subtitle.split('\n').length - 1 && <br />}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Services 