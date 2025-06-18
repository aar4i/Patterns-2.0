import React, { useState } from 'react'
import '../styles/Services.css'

function Services() {
  const [openServices, setOpenServices] = useState([])

  const services = [
    {
      id: 1,
      number: "1",
      title: "Embroidery",
      subtitle: "Durable & professional stitching.",
      description: "High-quality embroidery services using state-of-the-art equipment. We specialize in custom logos, text, and intricate designs on various textile materials. Our embroidery is durable, professional, and perfect for corporate branding, team uniforms, and personal customization.",
      features: [
        "Custom logo embroidery",
        "Text and lettering",
        "Complex multi-color designs",
        "Durable thread materials",
        "Fast turnaround times"
      ],
      image: "/Images/Frame 18.png"
    },
    {
      id: 2,
      number: "2", 
      title: "Screen Printing",
      subtitle: "Bold & vibrant designs.",
      description: "Professional screen printing for vibrant, long-lasting designs. Perfect for large quantity orders, our screen printing delivers exceptional color saturation and durability. Ideal for t-shirts, hoodies, bags, and promotional materials.",
      features: [
        "Vibrant color reproduction",
        "Large quantity production",
        "Multiple printing locations",
        "Specialty inks available",
        "Cost-effective for bulk orders"
      ],
      image: "/Images/Frame 20.png"
    },
    {
      id: 3,
      number: "3",
      title: "DTF Printing", 
      subtitle: "Full-color, detailed prints.",
      description: "Direct-to-Film printing technology for photographic quality results. Perfect for complex designs, gradients, and full-color artwork. Works on various fabric types and colors, offering unlimited design possibilities with exceptional detail and color accuracy.",
      features: [
        "Photographic quality prints",
        "Full-color capability",
        "Works on any fabric color",
        "No minimum order quantity",
        "Soft hand feel"
      ],
      image: "/Images/Frame 19.png"
    },
    {
      id: 4,
      number: "4",
      title: "Heat Transfer",
      subtitle: "Perfect for small batches.",
      description: "Heat transfer vinyl application for precise, professional results. Ideal for small quantities, single items, and specialized applications. Offers excellent durability and a wide range of colors and finishes including metallic, glitter, and reflective options.",
      features: [
        "Perfect for small quantities",
        "Wide range of vinyl colors",
        "Specialty finishes available",
        "Precise application",
        "Quick production time"
      ],
      image: "/Images/Frame 21.png"
    }
  ]

  const toggleService = (serviceId) => {
    setOpenServices(prev => {
      if (prev.includes(serviceId)) {
        return prev.filter(id => id !== serviceId)
      } else {
        return [...prev, serviceId]
      }
    })
  }

  return (
    <section id="services" className="services">
      <div className="services-container">
        {services.map((service) => (
          <div key={service.id} className="service-item">
            <div 
              className="service-header"
              onClick={() => toggleService(service.id)}
            >
              <span className="service-number">{service.number}</span>
              <h2 className="service-title">{service.title}—</h2>
            </div>
            <p className="service-subtitle">{service.subtitle}</p>
            
            {/* Выпадающая панель */}
            <div className={`service-panel ${openServices.includes(service.id) ? 'open' : ''}`}>
              <div className="service-panel-content">
                <div className="service-info">
                  <div className="service-text">
                    <p className="service-description">{service.description}</p>
                    <ul className="service-features">
                      {service.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="service-image">
                    <img src={service.image} alt={`${service.title} Example`} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Services 