import React from 'react'
import './styles/App.css'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <div className="App">
      <div className="section" id="hero">
        <Hero />
      </div>
      <div className="section" id="about">
        <About />
      </div>
      <div className="section" id="techniques">
        <Services />
      </div>
      <div className="section" id="contact">
        <Contact />
      </div>
      <Footer />
    </div>
  )
}

export default App
