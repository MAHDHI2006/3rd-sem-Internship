import { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../config/api';

const Register = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    role: 'user',
    userType: 'buyer'
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      console.log('Submitting registration:', formData);
      console.log('API URL:', API_BASE_URL);
      
      const response = await axios.post(`${API_BASE_URL}/signup`, formData);
      console.log('Registration response:', response.data);
      
      if (response.data.isSignup) {
        alert('Registration successful! Please login.');
        onRegister();
      }
    } catch (error) {
      console.error('Registration error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Registration failed';
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Register</h2>
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          required
        />
        <input
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={(e) => setFormData({...formData, username: e.target.value})}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          required
        />
        <select
          value={formData.role}
          onChange={(e) => setFormData({...formData, role: e.target.value})}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <select
          value={formData.userType}
          onChange={(e) => setFormData({...formData, userType: e.target.value})}
        >
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
          <option value="both">Both</option>
        </select>
        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default Register;