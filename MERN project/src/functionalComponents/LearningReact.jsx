import Props from "./Props.jsx";
import Navbar from "./Navbar";

const LearningReact = () => {  
    return( 
        <div>
            <h2>This is Learning React Component</h2>
            <p>React makes it painless to create interactive UIs.</p>
            <hr />
            <ol>
            <li>
              <Props grade="12" age="17" player="Haaland" img="public\vite.svg"/>
            </li>
            <hr /> 
          </ol>
        </div>
    );
}
export default LearningReact;