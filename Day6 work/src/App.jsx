
import './App.css'

function App() {
  const h1style = {
    textAlign: 'center',
    marginTop: '50px',
  };
  return (
        <header>
          <button className="signup-btn">Sign Up</button>
          <div>
            <h1>GOOGLE</h1>
            <div id="search-bar">
              <input type="text" placeholder="Search URL" />
              <button>Search</button>
            </div>
          </div>
        </header>
  )
}

export default App