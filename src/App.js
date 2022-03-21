import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [buttonColor, setButtonColor] = useState("red");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const newButtonColor = buttonColor === "red" ? "blue" : "red";
  return (
    <div>
      <button
        style={{ backgroundColor: buttonColor }}
        onClick={() => setButtonColor(newButtonColor)}
        disabled={isButtonDisabled}
      >
        Change to {newButtonColor}
      </button>

      <input
        type="checkbox"
        onChange={(e) => setIsButtonDisabled(e.target.checked)}
      />
    </div>
  );
}

export default App;
