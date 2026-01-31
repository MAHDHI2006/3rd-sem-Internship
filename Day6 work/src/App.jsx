
import './App.css'

function App() {
  const h1style = {
    textAlign: 'center',
    marginTop: '50px',
  };
  return (
        <header>
          <div>
            <h1>Login page</h1>
            <div id="Box">
              <input type="text" placeholder="Username or Email" />
            </div>
            <p></p>
            <div id="Box">
             <input type="password" placeholder="Password" />
            </div>
            <p></p>
            <div>
              <button>Login</button>
              <p>IF YOU DON'T HAVE ACCOUT REGISTER</p><button>Register</button>
            </div>
          </div>
        </header>
  )
}

export default App