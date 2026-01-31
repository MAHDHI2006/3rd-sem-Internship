import { useState, useEffect } from 'react';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import SellerForm from './components/auction/SellerForm';
import AuctionList from './components/auction/AuctionList';
import Payment from './components/auction/Payment';
import AdminDashboard from './components/admin/AdminDashboard';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('login');
  const [userAction, setUserAction] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setUser(JSON.parse(userData));
      setCurrentView('dashboard');
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setCurrentView('login');
    setUserAction(null);
  };

  const renderContent = () => {
    if (!user) {
      return currentView === 'login' ? (
        <div>
          <Login onLogin={handleLogin} />
          <p>
            Don't have an account? 
            <button onClick={() => setCurrentView('register')}>Register</button>
          </p>
        </div>
      ) : (
        <div>
          <Register onRegister={() => setCurrentView('login')} />
          <p>
            Already have an account? 
            <button onClick={() => setCurrentView('login')}>Login</button>
          </p>
        </div>
      );
    }

    if (user.role === 'admin') {
      return <AdminDashboard />;
    }

    if (userAction === 'seller') {
      return <SellerForm onAuctionCreated={() => setUserAction(null)} />;
    }

    if (userAction === 'buyer') {
      return <AuctionList />;
    }

    if (userAction === 'payment') {
      return <Payment />;
    }

    return (
      <div className="dashboard">
        <h2>Welcome, {user.username}!</h2>
        <p>Role: {user.role} | Type: {user.userType}</p>
        
        <div className="action-buttons">
          {(user.userType === 'seller' || user.userType === 'both') && (
            <button onClick={() => setUserAction('seller')}>
              Sell Item
            </button>
          )}
          
          {(user.userType === 'buyer' || user.userType === 'both') && (
            <button onClick={() => setUserAction('buyer')}>
              Browse Auctions
            </button>
          )}
          
          <button onClick={() => setUserAction('payment')}>
            My Payments
          </button>
          
          <button onClick={() => setUserAction(null)}>
            Dashboard
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>Online Auction System</h1>
        {user && (
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        )}
      </header>
      <main>
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
