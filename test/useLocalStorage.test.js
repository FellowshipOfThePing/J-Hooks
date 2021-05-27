import * as React from "react";
import userEvent from "@testing-library/user-event";
import { render, screen, fireEvent } from "@testing-library/react";

import { UseLocalStorageExample } from "../examples/useLocalStorage.example";

test("Stores given value in local storage", () => {
  render(<UseLocalStorageExample />);
  const input = screen.getByLabelText("text-input");
  const submit = screen.getByLabelText("submit-input");
  const testState = screen.getByText(/TestState/i);

  // assert initial state
  expect(testState.textContent).toBe(`TestState: `);

  // Change Value
  fireEvent.change(input, { target: { value: "My New Value" } });
  userEvent.click(submit);

  // assert new state
  expect(testState.textContent).toBe(`TestState: My New Value`);

  // Change Value
  fireEvent.change(input, { target: { value: "My New New Value" } });
  userEvent.click(submit);

  // assert new state
  expect(testState.textContent).toBe(`TestState: My New New Value`);
});
