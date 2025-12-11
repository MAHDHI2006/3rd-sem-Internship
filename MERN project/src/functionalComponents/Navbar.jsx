import LearningReact from "./LearningReact.jsx";
import Props from "./Props.jsx";
import { Link } from "react-router-dom";

function Navbar(props) {
  return (
    <header>
      <nav>
        <h3>My Navbar</h3>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>
      <p>The above content is Navbar</p>
      <LearningReact />
      
    </header>
  );
}
export default Navbar;