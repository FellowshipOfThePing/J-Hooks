import * as React from "react";
import userEvent from "@testing-library/user-event";
import { render, screen, fireEvent } from "@testing-library/react";

import { UseWindowSizeExample } from "../examples/useWindowSize.example";

describe("useWindowSize", () => {
  it("Provides initial width and height of browser window", () => {
    render(<UseWindowSizeExample />);
    const width = screen.getByText(/Width:/i);
    const height = screen.getByText(/Height:/i);

    expect(width.textContent).toBe(`Width: 1024`);
    expect(height.textContent).toBe(`Height: 768`);
  });

  it("Displays new value when window height is changed", () => {
    render(<UseWindowSizeExample />);
    const width = screen.getByText(/Width:/i);
    const height = screen.getByText(/Height:/i);

    // Change window height
    Object.defineProperty(window, "innerHeight", {
      writable: true,
      configurable: true,
      value: 150,
    });
    window.dispatchEvent(new Event("resize"));

    expect(window.innerHeight).toBe(150);
    expect(width.textContent).toBe(`Width: 1024`);
    expect(height.textContent).toBe(`Height: 150`);
  });

  it("Displays new value when window width is changed", () => {
    render(<UseWindowSizeExample />);
    const width = screen.getByText(/Width:/i);
    const height = screen.getByText(/Height:/i);

    // Change window width
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 200,
    });
    window.dispatchEvent(new Event("resize"));

    expect(window.innerWidth).toBe(200);
    expect(width.textContent).toBe(`Width: 200`);
    expect(height.textContent).toBe(`Height: 150`);
  });

  it("Displays new values when both window width and height are changed", () => {
    render(<UseWindowSizeExample />);
    const width = screen.getByText(/Width:/i);
    const height = screen.getByText(/Height:/i);

    // Change window width
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1000,
    });
    window.dispatchEvent(new Event("resize"));

    // Change window height
    Object.defineProperty(window, "innerHeight", {
      writable: true,
      configurable: true,
      value: 2000,
    });
    window.dispatchEvent(new Event("resize"));

    expect(window.innerWidth).toBe(1000);
    expect(window.innerHeight).toBe(2000);
    expect(width.textContent).toBe(`Width: 1000`);
    expect(height.textContent).toBe(`Height: 2000`);
  });
});
