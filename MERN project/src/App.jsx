import ClassComponent from "./components/ClassComponent.jsx";
import Navbar from "./functionalComponents/Navbar.jsx";
import './App.css';
function App() {
  const h1style = {
    color: 'blue',
    textAlign: 'center',
    marginTop: '50px',
  };
  return (
    <header>
      <Navbar />
      <div>
        <h1 style={h1style}>Welcome to JSX</h1>
        <h2 className="h2">This is simple React component</h2>
        <ClassComponent />
        <img src="vite.svg" alt="React Logo" style={{marginLeft : "100px", width:"200px",height:"200px"}} />
      </div>
    </header>
  )
}

export default App
