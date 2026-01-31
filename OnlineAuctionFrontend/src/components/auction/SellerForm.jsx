import { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../config/api';

const SellerForm = ({ onAuctionCreated }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startingPrice: '',
    duration: '24'
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_BASE_URL}/create-auction`, {
        ...formData,
        startingPrice: parseFloat(formData.startingPrice),
        duration: parseInt(formData.duration)
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      alert('Auction created successfully!');
      setFormData({ title: '', description: '', startingPrice: '', duration: '24' });
      if (onAuctionCreated) onAuctionCreated();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to create auction');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="seller-form">
      <h2>Create Auction</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Item Title"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          required
        />
        <textarea
          placeholder="Item Description"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          required
        />
        <input
          type="number"
          placeholder="Starting Price ($)"
          value={formData.startingPrice}
          onChange={(e) => setFormData({...formData, startingPrice: e.target.value})}
          min="1"
          step="0.01"
          required
        />
        <select
          value={formData.duration}
          onChange={(e) => setFormData({...formData, duration: e.target.value})}
        >
          <option value="1">1 Hour</option>
          <option value="6">6 Hours</option>
          <option value="12">12 Hours</option>
          <option value="24">24 Hours</option>
          <option value="72">3 Days</option>
        </select>
        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Auction'}
        </button>
      </form>
    </div>
  );
};

export default SellerForm;