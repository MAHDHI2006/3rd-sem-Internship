import React, { useState, useEffect } from 'react'

import '../../css/App.css'

const API_BASE_URL = 'https://threerd-sem-internship-5.onrender.com';

const Login = ({ onNavigate = () => {} }) => {
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token')
    if (token) {
      onNavigate('home')
    }
  }, [onNavigate])

  const handleLogin = async (event) => {
    event.preventDefault()
    const email = event.target.email.value
    const password = event.target.password.value

    try {
      const response = await fetch(`${API_BASE_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem('token', data.token)
        onNavigate('home')
        window.location.href = '/' // Force refresh to update auth state
      } else {
        setError(data.error || 'Login failed')
      }
    } catch (err) {
      setError('Failed to connect to server. Please try again later.')
      console.error('Login error:', err)
    }
  }

  return (
    <section className="login-page">
      <h1 className="login-title">Login Page</h1>
      {error && <div className="error-message">{error}</div>}
      <form className="login-form" onSubmit={handleLogin}>
        <label className="form-label">Email:</label>
        <input 
          className="form-input" 
          type="email" 
          name="email" 
          placeholder="you@example.com" 
          required 
          autoComplete="username"
        />

        <label className="form-label">Password:</label>
        <input 
          className="form-input" 
          type="password" 
          name="password" 
          placeholder="Enter password" 
          required 
          autoComplete="current-password"
        />

        <button className="submit-btn" type="submit">Login</button>
      </form>
      <p style={{ marginTop: 16 }}>
        Create an account? <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('signup'); }}>Signup</a>
      </p>
    </section>
  )
}

export default Login