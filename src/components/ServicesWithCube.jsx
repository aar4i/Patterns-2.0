import React from 'react'
import CubeReelSlider from './CubeReelSlider'
import '../styles/Services.css'
import '../styles/CubeReelSlider.css'

function ServicesWithCube({ isActive, onSectionChange }) {
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

  const AllServicesSlide = () => (
    <section className="services">
      <div className="services-container">
        {services.map((service) => (
          <div 
            key={service.id}
            className="service-item"
          >
            <div className="service-title">
              <span className="service-number">{service.id}</span>
              {service.title}
            </div>
            <div className="service-subtitle">
              {service.subtitle.split('\n').map((line, i) => (
                <span key={i}>
                  {line}
                  {i < service.subtitle.split('\n').length - 1 && <br />}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )

  const SingleServiceSlide = ({ service }) => (
    <section className="services">
      <div className="services-container">
        <div className="service-item">
          <div className="service-title">
            <span className="service-number">{service.id}</span>
            {service.title}
          </div>
          <div className="service-subtitle">
            {service.subtitle.split('\n').map((line, i) => (
              <span key={i}>
                {line}
                {i < service.subtitle.split('\n').length - 1 && <br />}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )

  // Функция для получения описания сервиса (пока не используется)
  // const getServiceDescription = (serviceId) => {
  //   return ""
  // }

  return (
    <div id="services">
      <CubeReelSlider 
        autoPlay={false}
        isActive={isActive}
        onSectionChange={onSectionChange}
      >
        <AllServicesSlide />
        
        {services.map((service) => (
          <SingleServiceSlide key={service.id} service={service} />
        ))}
      </CubeReelSlider>
    </div>
  )
}

export default ServicesWithCube 