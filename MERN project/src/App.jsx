import ClassComponent from "./components/ClassComponent.jsx";
import Navbar from "./functionalComponents/Navbar.jsx";
import Home from "./functionalComponents/Home.jsx";
import About from "./functionalComponents/About.jsx";
import Contact from "./functionalComponents/Contact.jsx";
import Login from "./functionalComponents/Login.jsx"; 
import UseCallback from "./functionalComponents/UseCallback.jsx"; 
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./css/App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/usecallback" element={<UseCallback />} />
      </Routes>
      
    </BrowserRouter>
  )
}

export default App