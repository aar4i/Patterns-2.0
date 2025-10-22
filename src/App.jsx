import React from 'react'
import './styles/App.css'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Contact from './components/Contact'

function App() {
  return (
    <div className="App">
      <Hero />
      <Services />
      <About />
      <Contact />
    </div>
  )
}

export default App