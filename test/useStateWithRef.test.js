import * as React from "react";
import userEvent from "@testing-library/user-event";
import { render, screen, fireEvent } from "@testing-library/react";

import { UseStateWithRefExample } from "../examples/useStateWithRef.example";

test("allows you to undo and redo", () => {
  render(<UseStateWithRefExample />);
  const input = screen.getByLabelText("text-input");
  const submit = screen.getByLabelText("submit-input");
  const testState = screen.getByText(/TestState/i);
  const testRef = screen.getByText(/TestRef/i);

  // assert initial state
  expect(testState.textContent).toBe(`TestState: My Value`);
  expect(testRef.textContent).toBe(`TestRef: My Value`);

  // Change Value
  fireEvent.change(input, { target: { value: "My New Value" } });
  userEvent.click(submit);

  // assert new state
  expect(testState.textContent).toBe(`TestState: My New Value`);
  expect(testRef.textContent).toBe(`TestRef: My New Value`);

  // Change Value
  fireEvent.change(input, { target: { value: "My New New Value" } });
  userEvent.click(submit);

  // assert new state
  expect(testState.textContent).toBe(`TestState: My New New Value`);
  expect(testRef.textContent).toBe(`TestRef: My New New Value`);
});
