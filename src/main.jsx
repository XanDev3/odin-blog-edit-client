import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'
import { AuthProvider } from './context/AuthProvider.jsx'
import { PostProvider } from './context/PostProvider.jsx'
import { CommentsProvider } from './context/CommentsProvider.jsx'
import Navbar from './layouts/Navbar.jsx'
import App from './App.jsx'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <CookiesProvider>
      <BrowserRouter>
        <AuthProvider>
          <PostProvider>
            <CommentsProvider>
              <Routes>
                <Route path='/*' element={<App />} />
              </Routes>
            </CommentsProvider>
          </PostProvider>
        </AuthProvider>
      </BrowserRouter>
    </CookiesProvider>
  </React.StrictMode>
)
