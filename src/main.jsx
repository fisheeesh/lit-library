import { createRoot } from 'react-dom/client'
import './index.css'
import ThemedApp from './contexts/ThemedApp'

createRoot(document.getElementById('root')).render(
  <ThemedApp />
)
