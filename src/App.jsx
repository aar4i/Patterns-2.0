import React from 'react'
import './styles/App.css'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Contact from './components/Contact'
import { ServicesProvider } from './context/ServicesContext'

function App() {
  return (
    <ServicesProvider>
      <div className="App">
        <Hero />
        <Services />
        <About />
        <Contact />
      </div>
    </ServicesProvider>
  )
}

export default App
