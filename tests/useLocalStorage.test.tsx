import { renderHook, act } from "@testing-library/react-hooks";
import { useLocalStorage } from "../src";

describe("useLocalStorage", () => {
	it("Stores given value in local storage (without default value)", () => {
		const { result } = renderHook(() => useLocalStorage("Test Key 1"));

		// assert initial state
		expect(result.current[0]).toBe("");

		// Change Value
		act(() => {
			// Set state to true
			result.current[1]("New Test Value");
		});

		// State should be set to new value
		expect(result.current[0]).toBe("New Test Value");
	});

	it("Stores given value in local storage (with default value)", () => {
		const { result } = renderHook(() =>
			useLocalStorage("Test Key 2", "Test Value")
		);

		// assert initial state
		expect(result.current[0]).toBe("Test Value");

		// Change Value
		act(() => {
			// Set state to true
			result.current[1]("New Test Value");
		});

		// State should be set to new value
		expect(result.current[0]).toBe("New Test Value");
	});
});
