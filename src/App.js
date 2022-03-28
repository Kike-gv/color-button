import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

export function replaceCamelCaseWithSpaces(colorName){
  return colorName.replace(/\B([A-Z])\B/g, " $1") 
}

function App() {
  const [buttonColor, setButtonColor] = useState("MediumVioletRed");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const newButtonColor = buttonColor === "MediumVioletRed" ? "MidnightBlue" : "MediumVioletRed";
  const buttonDisabledColor = isButtonDisabled ? "gray": buttonColor;
  
  return (
    <div>
      <button
        style={{ backgroundColor: buttonDisabledColor }}
        onClick={() => setButtonColor(newButtonColor)}
        disabled={isButtonDisabled}
      >
        Change to {replaceCamelCaseWithSpaces(newButtonColor)}
      </button>

      <input
        type="checkbox"
        id="disable-button-checkbox"
        defaultChecked={isButtonDisabled}
        onChange={(e) => setIsButtonDisabled(e.target.checked)}
      />
      <label htmlFor="disable-button-checkbox">Disable button</label> 
    </div>
  );
}

export default App;
