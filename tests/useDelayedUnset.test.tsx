import { renderHook, act } from "@testing-library/react-hooks";
import { useDelayedUnset } from "../src";

describe("useDelayedUnset", () => {
	it("Returned value is tuple of types boolean and function", () => {
		const { result } = renderHook(() => useDelayedUnset(1000));
		const [state, setState] = result.current;

		expect(typeof state).toBe("boolean");
		expect(typeof setState).toBe("function");
	});

	it("Returned state is initially false", () => {
		const { result } = renderHook(() => useDelayedUnset(1000));
		const [state] = result.current;

		expect(state).toBe(false);
	});

	it("Returned state changes to true after setState", () => {
		const { result } = renderHook(() => useDelayedUnset(1000));

		act(() => {
			// Set state to true
			result.current[1](true);
		});

		// State should now be true
		expect(result.current[0]).toBe(true);
	});

	it("State reverts to false after specified delay time", (done) => {
		const { result } = renderHook(() => useDelayedUnset(1000));

		act(() => {
			// Set state to true
			result.current[1](true);
		});

		// State should now be true
		expect(result.current[0]).toBe(true);

		setTimeout(() => {
			// Check that component has disappeared
			expect(result.current[0]).toBe(false);
			done();
		}, 1000);
	});

	it("State reverts to false after default delay time", (done) => {
		const { result } = renderHook(() => useDelayedUnset());

		act(() => {
			// Set state to true
			result.current[1](true);
		});

		// State should now be true
		expect(result.current[0]).toBe(true);

		setTimeout(() => {
			// Check that component has disappeared
			expect(result.current[0]).toBe(false);
			done();
		}, 100);
	});
});
