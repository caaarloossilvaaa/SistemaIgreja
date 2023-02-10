import './styles/globals.css'

import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

import { Home } from './pages/HomePage'
import { Members } from './pages/Members'
import { Congregations } from './pages/Congregations'
import { Letters } from './pages/Letters'
import { Logout } from './components/Logout'
import { Login } from './pages/Login'

export function App() {
  const location = useLocation()

  useEffect(() => {
    document.querySelector('html')!.style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html')!.style.scrollBehavior = ''
  }, [location.pathname])
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/members" element={<Members />} />
        <Route path="/congregations" element={<Congregations />} />
        <Route path="/letters" element={<Letters />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </>
  )
}
