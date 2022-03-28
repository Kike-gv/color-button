import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import { replaceCamelCaseWithSpaces } from "./App";

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
  const checkbox = screen.getByRole("checkbox", { name: "Disable button" });

  //expect button to be disabled when checkbox is enabled
  fireEvent.click(checkbox);
  expect(colorButton).toBeDisabled();

  //expect button to be enabled when checkbox is disabled
  fireEvent.click(checkbox);
  expect(colorButton).toBeEnabled();
});

test("Code Quiz! Button Gray when Disabled", () => {
  render(<App />);

  const colorButton = screen.getByRole("button", { name: "Change to blue" });
  const checkbox = screen.getByRole("checkbox", { name: "Disable button" });

  //expect button to be disabled when checkbox is enabled
  fireEvent.click(checkbox);
  expect(colorButton).toBeDisabled();
  expect(colorButton).toHaveStyle({ backgroundColor: "gray" });

  //expect button to be enabled when checkbox is disabled
  fireEvent.click(checkbox);
  expect(colorButton).toBeEnabled();
  expect(colorButton).toHaveStyle({ backgroundColor: "red" });

  //expect button to change color to blue on click
  fireEvent.click(colorButton);
  expect(colorButton).toHaveStyle({ backgroundColor: "blue" });

  //expect button to be disabled when checkbox is enabled again
  fireEvent.click(checkbox);
  expect(colorButton).toBeDisabled();
  expect(colorButton).toHaveStyle({ backgroundColor: "gray" });

  //expect button to have color changed
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({ backgroundColor: "blue" });
});

describe("spaces before came-casel capital letters", () => {
  test("Works for no inner capital letter", () => {
    expect(replaceCamelCaseWithSpaces("Red")).toBe("Red");
  });

  test("Works for one inner capital letter", () => {
    expect(replaceCamelCaseWithSpaces("MidnightBlue")).toBe("Midnight Blue");
  });

  test("Works for multiple capital letters", () => {
    expect(replaceCamelCaseWithSpaces("MediumVioletRed")).toBe(
      "Medium Violet Red"
    );
  });
});
