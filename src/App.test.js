import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import { replaceCamelCaseWithSpaces } from "./App";

describe("Button and checkbox tests", () => {
  const color1 = "MediumVioletRed";
  const color2 = "MidnightBlue";
  test("button has correct initial color and name", () => {
    render(<App />);
    const colorButton = screen.getByRole("button", {
      name: `Change to ${replaceCamelCaseWithSpaces(color2)}`,
    });

    //expect the initial name and color
    expect(colorButton).toHaveStyle({ backgroundColor: color1 });

    //click button to change
    fireEvent.click(colorButton);

    //expect the color to be ${color2}
    expect(colorButton).toHaveStyle({ backgroundColor: color2 });

    //expect the text to be Change to ${color1}
    expect(colorButton).toHaveTextContent(
      `Change to ${replaceCamelCaseWithSpaces(color1)}`
    );
  });

  test("initial conditions", () => {
    render(<App />);

    //check button start enabled
    const colorButton = screen.getByRole("button", {
      name: `Change to ${replaceCamelCaseWithSpaces(color2)}`,
    });
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

    const colorButton = screen.getByRole("button", {
      name: `Change to ${replaceCamelCaseWithSpaces(color2)}`,
    });
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

    const colorButton = screen.getByRole("button", {
      name: `Change to ${replaceCamelCaseWithSpaces(color2)}`,
    });
    const checkbox = screen.getByRole("checkbox", { name: "Disable button" });

    //expect button to be disabled when checkbox is enabled
    fireEvent.click(checkbox);
    expect(colorButton).toBeDisabled();
    expect(colorButton).toHaveStyle({ backgroundColor: "gray" });

    //expect button to be enabled when checkbox is disabled
    fireEvent.click(checkbox);
    expect(colorButton).toBeEnabled();
    expect(colorButton).toHaveStyle({ backgroundColor: color1 });

    //expect button to change color to ${color2} on click
    fireEvent.click(colorButton);
    expect(colorButton).toHaveStyle({ backgroundColor: color2 });

    //expect button to be disabled when checkbox is enabled again
    fireEvent.click(checkbox);
    expect(colorButton).toBeDisabled();
    expect(colorButton).toHaveStyle({ backgroundColor: "gray" });

    //expect button to have color changed
    fireEvent.click(checkbox);
    expect(colorButton).toHaveStyle({ backgroundColor: color2 });
  });
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
