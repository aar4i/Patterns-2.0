import React from 'react'
import { motion } from 'framer-motion'
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
          <motion.div 
            key={service.id}
            className="service-item"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
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
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Services 