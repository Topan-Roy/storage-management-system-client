import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router'
import { router } from './Router/Router.jsx'
import MobileContainer from './Authentication/MobileContainer/MobileContainer.jsx'
import AuthProvider from './Contexts/AuthProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MobileContainer>
      <AuthProvider>
        <RouterProvider router={router} />,
      </AuthProvider>

    </MobileContainer>

  </StrictMode>,
)
