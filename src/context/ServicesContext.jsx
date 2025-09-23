import React, { createContext, useContext, useState } from 'react'

const ServicesContext = createContext()

export const useServices = () => {
  const context = useContext(ServicesContext)
  if (!context) {
    throw new Error('useServices must be used within a ServicesProvider')
  }
  return context
}

export const ServicesProvider = ({ children }) => {
  const [selectedServices, setSelectedServices] = useState([])
  const [hasScrolledToContact, setHasScrolledToContact] = useState(false)

  const addService = (serviceName) => {
    if (!selectedServices.includes(serviceName)) {
      setSelectedServices(prev => [...prev, serviceName])
      
      // Скроллим к контактам только если еще не скроллили в этой сессии
      if (!hasScrolledToContact) {
        setHasScrolledToContact(true)
        setTimeout(() => {
          const contactSection = document.getElementById('contact')
          if (contactSection) {
            contactSection.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            })
          }
        }, 300)
      }
    }
  }

  const removeService = (serviceName) => {
    setSelectedServices(prev => prev.filter(service => service !== serviceName))
  }

  const clearServices = () => {
    setSelectedServices([])
  }

  const getServicesText = () => {
    return selectedServices.map(service => `#${service}`).join(' ')
  }

  return (
    <ServicesContext.Provider value={{
      selectedServices,
      addService,
      removeService,
      clearServices,
      getServicesText,
      hasScrolledToContact
    }}>
      {children}
    </ServicesContext.Provider>
  )
}
