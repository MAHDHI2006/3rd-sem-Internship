import React from 'react'
import '../../css/Navbar.css'

function Navbar({ onNavigate = () => {}, activePage = 'home' }) {
    const nav = (page) => (e) => {
        e && e.preventDefault()
        onNavigate(page)
    }

    return (
        <header className="site-header">
            <nav className="topbar">
                <ul className="nav-list">
                    <li className={`nav-item ${activePage === 'home' ? 'active' : ''}`}><a href="#" onClick={nav('home')}>Home</a></li>
                    <li className={`nav-item ${activePage === 'about' ? 'active' : ''}`}><a href="#about" onClick={nav('about')}>About</a></li>
                    <li className={`nav-item ${activePage === 'learning' ? 'active' : ''}`}><a href="#learning" onClick={nav('learning')}>Learning React</a></li>
                    <li className={`nav-item ${activePage === 'contact' ? 'active' : ''}`}><a href="#contact" onClick={nav('contact')}>Contact</a></li>
                </ul>
                <div className="nav-right">
                    <button className="login-btn" onClick={nav('login')}>Login</button>
                </div>
            </nav>
        </header>
    )
}

export default Navbar