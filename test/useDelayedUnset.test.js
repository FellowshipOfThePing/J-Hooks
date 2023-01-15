import * as React from "react";
import userEvent from "@testing-library/user-event";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import { UseDelayedUnsetExample } from "../examples/useDelayedUnset.example";

describe("useDelayedUnset", () => {
  it("Page renders without component mounted", () => {
    const { queryByText } = render(<UseDelayedUnsetExample />);

    const button = queryByText("Show Component");
    const component = queryByText("Visible Component");

    expect(button).toBeInTheDocument();
    expect(component).not.toBeInTheDocument();
  });

  it("Page component appears after clicking the button", () => {
    const { queryByText } = render(<UseDelayedUnsetExample />);

    // Click button
    const button = queryByText("Show Component");
    userEvent.click(button);

    // Check if component is now in document
    const component = queryByText("Visible Component");
    expect(component).toBeInTheDocument();
  });

  it("Page component dissappears after specified delay time", (done) => {
    const { queryByText } = render(<UseDelayedUnsetExample />);

    // Click button
    const button = queryByText("Show Component");
    userEvent.click(button);

    // Check if component is now in document
    let component = queryByText("Visible Component");
    expect(component).toBeInTheDocument();
    
    setTimeout(() => {
      // Check that component has disappeared
      component = queryByText("Visible Component");
      expect(component).not.toBeInTheDocument();
      done();
    }, 1000);
  });
});
