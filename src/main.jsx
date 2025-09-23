import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.jsx'

// Подавляем некоторые console warnings в development
if (import.meta.env.DEV) {
  const originalError = console.error
  console.error = (...args) => {
    // Игнорируем ошибки source map
    if (typeof args[0] === 'string' && args[0].includes('Source map error')) {
      return
    }
    originalError.apply(console, args)
  }
}

createRoot(document.getElementById('root')).render(
  <App />
)
