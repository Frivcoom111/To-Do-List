import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import LoginPage from './pages/login/LoginPage'
import SignupPage from './pages/signup/SignupPage'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SignupPage />  
  </StrictMode>,
)
