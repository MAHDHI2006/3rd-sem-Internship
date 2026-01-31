import { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../config/api';

const AdminDashboard = () => {
  const [allAuctions, setAllAuctions] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const token = localStorage.getItem('token');
      const [auctionsRes, usersRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/auctions`, { headers: { Authorization: token } }),
        axios.get(`${API_BASE_URL}/getallsignup`, { headers: { Authorization: token } })
      ]);
      
      setAllAuctions(auctionsRes.data);
      setUsers(usersRes.data);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const completeAuction = async (auctionId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API_BASE_URL}/complete-auction/${auctionId}`, {}, {
        headers: { Authorization: token }
      });
      
      alert('Auction completed successfully!');
      fetchAllData();
    } catch (error) {
      alert('Error completing auction');
    }
  };

  if (loading) return <div>Loading admin dashboard...</div>;

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      
      <div className="admin-section">
        <h3>All Auctions ({allAuctions.length})</h3>
        <div className="auctions-grid">
          {allAuctions.map(auction => (
            <div key={auction._id} className="admin-auction-card">
              <h4>{auction.title}</h4>
              <p><strong>Seller:</strong> {auction.seller}</p>
              <p><strong>Current Price:</strong> ${auction.currentPrice}</p>
              <p><strong>Status:</strong> {auction.status}</p>
              <p><strong>Bids:</strong> {auction.bids.length}</p>
              {auction.status === 'active' && (
                <button onClick={() => completeAuction(auction._id)}>
                  Complete Auction
                </button>
              )}
              {auction.winner && (
                <p><strong>Winner:</strong> {auction.winner}</p>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="admin-section">
        <h3>User Statistics</h3>
        <div className="stats">
          <p>Total Users: {users.length}</p>
          <p>Buyers: {users.filter(u => u.userType === 'buyer' || u.userType === 'both').length}</p>
          <p>Sellers: {users.filter(u => u.userType === 'seller' || u.userType === 'both').length}</p>
          <p>Admins: {users.filter(u => u.role === 'admin').length}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;