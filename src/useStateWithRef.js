import { useState, useRef } from "react";

/**
 * Custom hook, saves the given value in React state and as a ref value, returns modified setState function that changes new state and ref
 * Especially useful for comparing values in event listeners that cannot track changes in React state (but can in ref.current)
 *
 * @param {any} data Data to be saved in state/ref value
 * @returns {Array} Array containing typical react state return values, with an added ref that is changed whenever setMyState is called
 */
const useStateWithRef = (data) => {
	let [myState, _setMyState] = useState(data);
	let myStateRef = useRef(data);

	let setMyState = (data) => {
		myStateRef.current = data;

		_setMyState(data);
	};

	return [myState, setMyState, myStateRef];
};

export default useStateWithRef;
