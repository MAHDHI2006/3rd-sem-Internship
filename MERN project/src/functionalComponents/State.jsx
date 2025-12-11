import { useState } from "react";
import Props from "./Props";
import Navbar from "./Navbar";

const State = () => {
   const [state,updateState] = useState("State");
   const setState = () => {
       updateState("Updated State");
   }
  return (
    <div>
        <p>This is {state} Component</p>
        <button onClick={setState}>Update State</button>
    </div>
    );
};

export default State;