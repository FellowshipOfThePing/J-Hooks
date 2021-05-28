import * as React from "react";
import userEvent from "@testing-library/user-event";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import { UseOutsideAlerterExample } from "../examples/useOutsideAlerter.example";

describe("useOutsideAlerter", () => {
  it("Page renders without component mounted", () => {
    const { queryByText } = render(<UseOutsideAlerterExample />);

    const button = queryByText("Show Component");
    const component = queryByText("Component");

    expect(button).toBeInTheDocument();
    expect(component).not.toBeInTheDocument();
  });

  it("Page component appears after clicking the button", () => {
    const { queryByText } = render(<UseOutsideAlerterExample />);

    // Click button
    const button = queryByText("Show Component");
    userEvent.click(button);

    // Check if component is now in document
    const component = queryByText("Component");
    expect(component).toBeInTheDocument();
  });

  it("Page component dissappears after clicking outside of it", () => {
    const { queryByText } = render(<UseOutsideAlerterExample />);

    // Click button
    const button = queryByText("Show Component");
    userEvent.click(button);

    // Check if component is now in document
    const component = queryByText("Component");
    expect(component).toBeInTheDocument();

    // Click page
    const page = screen.getByLabelText("page");
    userEvent.click(page);

    // Check that component has disappeared
    expect(component).not.toBeInTheDocument();
  });

  it("Page component dissappears after pressing escape", () => {
    const { queryByText } = render(<UseOutsideAlerterExample />);

    // Click button
    const button = queryByText("Show Component");
    userEvent.click(button);

    // Check if component is now in document
    const component = queryByText("Component");
    expect(component).toBeInTheDocument();

    // Press escape key (twice)
    const page = screen.getByLabelText("page");
    userEvent.keyboard("{esc}");
    fireEvent.keyDown(page, { key: "Escape", code: "Escape" });

    // Check that component has disappeared
    expect(component).not.toBeInTheDocument();
  });
});
