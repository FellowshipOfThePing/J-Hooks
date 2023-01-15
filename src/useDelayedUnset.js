import { useEffect, useState } from "react";

/**
 * Custom hook, returns a state with a setter that automatically sets the state to false x milliseconds after being set to true.
 * Useful for temporarily highlighting UI components.
 *
 * @param {number} delay Delay time in milliseconds
 * @returns {Array} Array containing stateful value and updater function.
 */
const setDelayedUnset = (delay = 100) => {
	const [booleanState, setBooleanState] = useState(false);

	useEffect(() => {
		let timeout;
		if (booleanState) {
			timeout = setTimeout(() => {
				setBooleanState(false);
			}, delay);
		}

		return () => {
			if (timeout) {
				clearTimeout(timeout);
			}
		};
	}, [booleanState]);

	return [booleanState, setBooleanState];
};

export default setDelayedUnset;
