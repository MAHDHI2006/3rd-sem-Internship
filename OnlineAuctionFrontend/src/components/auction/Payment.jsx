import { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../config/api';

const Payment = () => {
  const [wonAuctions, setWonAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: ''
  });

  useEffect(() => {
    fetchWonAuctions();
  }, []);

  const fetchWonAuctions = async () => {
    try {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));
      const response = await axios.get(`${API_BASE_URL}/my-bids`, {
        headers: { Authorization: token }
      });
      
      const won = response.data.filter(auction => 
        auction.status === 'sold' && auction.winner === user.username
      );
      setWonAuctions(won);
    } catch (error) {
      console.error('Error fetching won auctions:', error);
    } finally {
      setLoading(false);
    }
  };

  const processPayment = async (auction) => {
    if (!paymentData.cardNumber || !paymentData.expiryDate || !paymentData.cvv || !paymentData.name) {
      alert('Please fill in all payment details');
      return;
    }

    alert(`Payment of $${auction.currentPrice} processed successfully for "${auction.title}"!`);
    setPaymentData({ cardNumber: '', expiryDate: '', cvv: '', name: '' });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="payment-container">
      <h2>Payment for Won Auctions</h2>
      {wonAuctions.length === 0 ? (
        <p>No auctions won yet.</p>
      ) : (
        wonAuctions.map(auction => (
          <div key={auction._id} className="payment-card">
            <h3>{auction.title}</h3>
            <p><strong>Final Price:</strong> ${auction.currentPrice}</p>
            <p><strong>Seller:</strong> {auction.seller}</p>
            
            <div className="payment-form">
              <h4>Payment Details</h4>
              <input
                type="text"
                placeholder="Card Number"
                value={paymentData.cardNumber}
                onChange={(e) => setPaymentData({...paymentData, cardNumber: e.target.value})}
                maxLength="16"
              />
              <input
                type="text"
                placeholder="MM/YY"
                value={paymentData.expiryDate}
                onChange={(e) => setPaymentData({...paymentData, expiryDate: e.target.value})}
                maxLength="5"
              />
              <input
                type="text"
                placeholder="CVV"
                value={paymentData.cvv}
                onChange={(e) => setPaymentData({...paymentData, cvv: e.target.value})}
                maxLength="3"
              />
              <input
                type="text"
                placeholder="Cardholder Name"
                value={paymentData.name}
                onChange={(e) => setPaymentData({...paymentData, name: e.target.value})}
              />
              <button onClick={() => processPayment(auction)}>
                Pay ${auction.currentPrice}
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Payment;