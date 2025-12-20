import { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../config/api';

const AuctionList = () => {
  const [auctions, setAuctions] = useState([]);
  const [bidAmounts, setBidAmounts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAuctions();
  }, []);

  const fetchAuctions = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/auctions`);
      setAuctions(response.data);
    } catch (error) {
      console.error('Error fetching auctions:', error);
    } finally {
      setLoading(false);
    }
  };

  const placeBid = async (auctionId) => {
    const bidAmount = bidAmounts[auctionId];
    if (!bidAmount) {
      alert('Please enter a bid amount');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API_BASE_URL}/place-bid`, {
        auctionId,
        bidAmount: parseFloat(bidAmount)
      }, {
        headers: { Authorization: token }
      });
      
      alert('Bid placed successfully!');
      setBidAmounts({...bidAmounts, [auctionId]: ''});
      fetchAuctions();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to place bid');
    }
  };

  if (loading) return <div>Loading auctions...</div>;

  return (
    <div className="auction-list">
      <h2>Active Auctions</h2>
      {auctions.length === 0 ? (
        <p>No active auctions found.</p>
      ) : (
        auctions.map(auction => (
          <div key={auction._id} className="auction-card">
            <h3>{auction.title}</h3>
            <p>{auction.description}</p>
            <div className="auction-details">
              <p><strong>Seller:</strong> {auction.seller}</p>
              <p><strong>Current Price:</strong> ${auction.currentPrice}</p>
              <p><strong>Total Bids:</strong> {auction.bids.length}</p>
            </div>
            <div className="bid-section">
              <input
                type="number"
                placeholder="Enter bid amount"
                value={bidAmounts[auction._id] || ''}
                onChange={(e) => setBidAmounts({...bidAmounts, [auction._id]: e.target.value})}
                min={auction.currentPrice + 0.01}
                step="0.01"
              />
              <button onClick={() => placeBid(auction._id)}>
                Place Bid
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AuctionList;