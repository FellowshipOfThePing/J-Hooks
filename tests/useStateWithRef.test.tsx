import { renderHook, act } from "@testing-library/react-hooks";
import { useStateWithRef } from "../src";

describe("useStateWithRef", () => {
	it("Returned value is tuple of types string, function, and object", () => {
		const { result } = renderHook(() => useStateWithRef("Initial Value!"));
		const [stateValue, setStateValue, refValue] = result.current;

		expect(typeof stateValue).toBe("string");
		expect(typeof setStateValue).toBe("function");
		expect(typeof refValue).toBe("object");
		expect(typeof refValue.current).toBe("string");
	});

	it("Returned state and ref are both equal to initial value", () => {
		const { result } = renderHook(() => useStateWithRef("Initial Value!"));

		expect(result.current[0]).toBe("Initial Value!");
		expect(result.current[2].current).toBe("Initial Value!");
	});

	it("Returned state/ref values change correctly after using the setter", () => {
		const { result } = renderHook(() => useStateWithRef("Initial Value!"));

		expect(result.current[0]).toBe("Initial Value!");
		expect(result.current[2].current).toBe("Initial Value!");

		act(() => {
			// Set to new value
			result.current[1]("New Value!");
		});

		// Value should now be changed
		expect(result.current[0]).toBe("New Value!");
		expect(result.current[2].current).toBe("New Value!");
	});
});
