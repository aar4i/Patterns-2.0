import React, { useState } from 'react'
import '../styles/Services.css'

function Services() {
  const [openServices, setOpenServices] = useState([])

  const services = [
    {
      id: 1,
      number: "1",
      title: "Embroidery",
      subtitle: "Durable & professional\nstitching.",
      description: "High-quality embroidery services using state-of-the-art equipment. We specialize in custom logos, text, and intricate designs on various textile materials. Our embroidery is durable, professional, and perfect for corporate branding, team uniforms, and personal customization. 1 Custom logo embroidery. 2 Text and lettering. 3 Complex multi-color designs. 4 Durable thread materials. 5 Fast turnaround times.",
      image: "/Images/Frame 18.png"
    },
    {
      id: 2,
      number: "2", 
      title: "Screen Printing",
      subtitle: "Bold & vibrant\ndesigns.",
      description: "Professional screen printing for vibrant, long-lasting designs. Perfect for large quantity orders, our screen printing delivers exceptional color saturation and durability. Ideal for t-shirts, hoodies, bags, and promotional materials. 1 Vibrant color reproduction. 2 Large quantity production. 3 Multiple printing locations. 4 Specialty inks available. 5 Cost-effective for bulk orders.",
      image: "/Images/Frame 20.png"
    },
    {
      id: 3,
      number: "3",
      title: "DTF Printing", 
      subtitle: "Full-color, detailed\nprints.",
      description: "Direct-to-Film printing technology for photographic quality results. Perfect for complex designs, gradients, and full-color artwork. Works on various fabric types and colors, offering unlimited design possibilities with exceptional detail and color accuracy. 1 Photographic prints. 2 Full color capability. 3 Works on any fabric color. 4 No minimum order quantity. 5 Soft hand feel.",
      image: "/Images/Frame 19.png"
    },
    {
      id: 4,
      number: "4",
      title: "Heat Transfer",
      subtitle: "Perfect for small\nbatches.",
      description: "Heat transfer vinyl application for precise, professional results. Ideal for small quantities, single items, and specialized applications. Offers excellent durability and a wide range of colors and finishes including metallic, glitter, and reflective options. 1 Perfect for small quantities. 2 Wide range of vinyl colors. 3 Specialty finishes available. 4 Precise application. 5 Quick production time.",
      image: "/Images/Frame 21.png"
    }
  ]

  const toggleService = (serviceId) => {
    if (openServices.includes(serviceId)) {
      setOpenServices([])
    } else {
      setOpenServices([serviceId])
    }
  }

  // Function to process text and highlight features
  const processDescription = (description) => {
    const parts = description.split(/(\s\d\s)/);
    return parts.map((part, index) => {
      if (part.match(/^\s\d\s$/)) {
        return (
          <span key={index} className="feature-number-inline">
            {part.trim()}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <section id="services" className="services">
      <div className="services-container">
        <div className="services-main-container">
          {services.map((service) => (
            <React.Fragment key={service.id}>
              <div className="service-item">
                <div className="service-title-row">
                  <div 
                    className={`service-header ${openServices.includes(service.id) ? 'active' : ''}`}
                    onClick={() => toggleService(service.id)}
                  >
                    <h2 className="service-title">{service.number}{service.title}—</h2>
                  </div>
                </div>
                
                <div className="service-subtitle-row">
                  <p className="service-subtitle">{service.subtitle}</p>
                </div>
              </div>
              
              <div className={`service-panel ${openServices.includes(service.id) ? 'open' : ''}`}>
                <div className="service-panel-content">
                  <div className="service-panel-inner">
                    <div className="service-info">
                      <div className="service-text">
                        <p className="service-description">
                          {processDescription(service.description)}
                        </p>
                      </div>
                      <div className="service-image-container">
                        <div className="service-image">
                          <img src={service.image} alt={`${service.title} Example`} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services