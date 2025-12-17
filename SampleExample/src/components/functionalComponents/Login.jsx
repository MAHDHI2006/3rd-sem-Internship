import React from 'react'
import '../../css/App.css'

const Login = ({ onNavigate = () => {} }) => {
  const handleLogin = async (event) => {
    event.preventDefault()
    const email = event.target.email.value
    const password = event.target.password.value
    // placeholder: replace with real auth call if available
    alert(`Logging in with ${email}`)
  }

  return (
    <section className="login-page">
      <h1 className="login-title">Login Page</h1>
      <form className="login-form" onSubmit={handleLogin}>
        <label className="form-label">Email:</label>
        <input className="form-input" type="email" name="email" placeholder="you@example.com" required />

        <label className="form-label">Password:</label>
        <input className="form-input" type="password" name="password" placeholder="Enter password" required />

        <button className="submit-btn" type="submit">Login</button>
      </form>
      <p style={{ marginTop: 16 }}>
        Create an account? <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('signup'); }}>Signup</a>
      </p>
    </section>
  )
}

export default Login