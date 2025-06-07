import React from 'react'
import '../styles/Services.css'

function Services() {
  return (
    <section id="services" className="services-showcase">
      <div className="services-showcase-container">
        <div className="all-techniques-grid">
        
          <div className="single-technique">
            <div className="technique-banner">
              <h2 className="technique-title">EMBROIDERY</h2>
            </div>
            <div className="single-example">
              <img src="/public/Images/Frame 18.png" alt="Embroidery Example" className="example-image" />
            </div>
          </div>

         
          <div className="single-technique">
            <div className="technique-banner">
              <h2 className="technique-title">SCREEN PRINTING</h2>
            </div>
            <div className="single-example">
              <img src="public/Images/Frame 20.png" alt="Screen Printing Example" className="example-image" />
            </div>
          </div>

        
          <div className="single-technique">
            <div className="technique-banner">
              <h2 className="technique-title">DTF PRINTING</h2>
            </div>
            <div className="single-example">
              <img src="public/Images/Frame 19.png" alt="DTF Printing Example" className="example-image" />
            </div>
          </div>

         
          <div className="single-technique">
            <div className="technique-banner">
              <h2 className="technique-title">HEAT TRANSFER</h2>
            </div>
            <div className="single-example">
              <img src="public/Images/Frame 21.png" alt="Heat Transfer Example" className="example-image" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services 