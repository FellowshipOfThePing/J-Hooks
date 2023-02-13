import { Dispatch, SetStateAction, useEffect, useState } from "react";

type BooleanStateTuple = [boolean, Dispatch<SetStateAction<boolean>>];

/**
 * Custom hook, returns a state with a setter that automatically sets the state to false x milliseconds after being set to true.
 * Useful for temporarily highlighting UI components.
 *
 * @param {number} delay Delay time in milliseconds
 * @returns {Array} Array containing stateful value and updater function.
 */
const setDelayedUnset = (delay: number = 100): BooleanStateTuple => {
	const [booleanState, setBooleanState] = useState<boolean>(false);

	useEffect(() => {
		let timeout: ReturnType<typeof setTimeout>;
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
