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

	it("Conditional component appears after clicking the button", async () => {
		const { queryByText } = render(<UseOutsideAlerterExample />);

		// Click button
		const button = queryByText("Show Component");
		if (!button) throw new Error("Button not found");
		await userEvent.click(button);

		// Check if component is now in document
		const component = queryByText("Component");
		expect(component).toBeInTheDocument();
	});

	it("Conditional component dissappears after clicking outside of it", async () => {
		const { queryByText } = render(<UseOutsideAlerterExample />);

		// Click button
		const button = queryByText("Show Component");
		if (!button) throw new Error("Button not found");
		await userEvent.click(button);

		// Check if component is now in document
		const component = queryByText("Component");
		expect(component).toBeInTheDocument();

		// Click page
		const page = screen.getByLabelText("page");
		await userEvent.click(page);

		// Check that component has disappeared
		expect(component).not.toBeInTheDocument();
	});

	it("Conditional component dissappears after pressing escape", async () => {
		const { queryByText } = render(<UseOutsideAlerterExample />);

		// Click button
		const button = queryByText("Show Component");
		if (!button) throw new Error("Button not found");
		await userEvent.click(button);

		// Check if component is now in document
		const component = queryByText("Component");
		expect(component).toBeInTheDocument();

		// Press escape key (twice)
		const page = screen.getByLabelText("page");
		await userEvent.keyboard("{esc}");
		fireEvent.keyDown(page, { key: "Escape", code: "Escape" });

		// Check that component has disappeared
		expect(component).not.toBeInTheDocument();
	});

	it("Conditional component does not dissappear after clicking inside it", async () => {
		const { queryByText } = render(<UseOutsideAlerterExample />);

		// Click button
		const button = queryByText("Show Component");
		if (!button) throw new Error("Button not found");
		await userEvent.click(button);

		// Check if component is now in document
		const component = queryByText("Component");
		expect(component).toBeInTheDocument();

		// Click inside component
		if (!component) throw new Error("Component not found");
		await userEvent.click(component);

		// Check that component has disappeared
		expect(component).toBeInTheDocument();
	});
});
