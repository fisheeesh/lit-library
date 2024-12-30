import { createRoot } from 'react-dom/client'
import './index.css'
import ThemeContextProvider from './contexts/ThemeContextProvider'
import AuthContextProvider from './contexts/AuthContextProvider'
import Router from './router/index.jsx'

createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <ThemeContextProvider>
      <Router />
    </ThemeContextProvider>
  </AuthContextProvider>
)
