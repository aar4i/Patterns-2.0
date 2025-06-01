import React from 'react'
import './styles/App.css'
import Hero from './components/Hero'
import Services from './components/Services'
import Gallery from './components/Gallery'
import Contact from './components/Contact'

function App() {
  return (
    <div className="App">
      <Hero />
      <Services />
      <Gallery />
      <Contact />
    </div>
  )
}

export default App
