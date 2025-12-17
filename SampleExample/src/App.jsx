import React, { useState } from 'react'
import './css/App.css'
import Navbar from './components/functionalComponents/Navbar'
import Login from './components/functionalComponents/Login'
import Sigup from './components/functionalComponents/Sigup'
import Home from './pages/Home'
import About from './pages/About'
import Learning from './pages/Learning'
import Contact from './pages/Contact'

function App() {
  const [page, setPage] = useState('home')

  const renderPage = () => {
    if (page === 'login') return <Login onNavigate={setPage} />
    if (page === 'signup') return <Sigup onNavigate={setPage} />
    if (page === 'about') return <About />
    if (page === 'learning') return <Learning />
    if (page === 'contact') return <Contact />
    return <Home />
  }

  return (
    <div className="app-root">
      <Navbar onNavigate={setPage} activePage={page} />
      <main>
        {renderPage()}
      </main>
    </div>
  )
}

export default App
