import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

test("button has correct initial color and name", () => {
  render(<App />);
  const colorButton = screen.getByRole("button", { name: "Change to blue" });

  //expect the initial name and color
  expect(colorButton).toHaveStyle({ backgroundColor: "red" });

  //click button to change
  fireEvent.click(colorButton);

  //expect the color to be blue
  expect(colorButton).toHaveStyle({ backgroundColor: "blue" });

  //expect the text to be Change to red
  expect(colorButton.textContent).toBe("Change to red");
});

test("initial conditions", () => {
  render(<App />);

  //check button start enabled
  const colorButton = screen.getByRole("button", { name: "Change to blue" });
  expect(colorButton).toBeEnabled();

  //check checkbox starts unchecked
  const checkbox = screen.getByRole("checkbox");
  expect(checkbox).not.toBeChecked();

  
  //expect button to be disabled when checkbox is enabled
  fireEvent.click(checkbox);
  expect(colorButton).toBeDisabled();
  
  //expect button to be enabled when checkbox is disabled
  fireEvent.click(checkbox);
  expect(colorButton).toBeEnabled();

});



test("interaction sequence between checkbox and button", () => {
  render(<App />);

  const colorButton = screen.getByRole("button", { name: "Change to blue" });
  const checkbox = screen.getByRole("checkbox");

  
  //expect button to be disabled when checkbox is enabled
  fireEvent.click(checkbox);
  expect(colorButton).toBeDisabled();
  
  //expect button to be enabled when checkbox is disabled
  fireEvent.click(checkbox);
  expect(colorButton).toBeEnabled();


});
