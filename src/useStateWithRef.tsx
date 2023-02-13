import { useState, useRef, RefObject } from "react";

type StateWithRefTuple<T> = [T, Function, RefObject<T>];

/**
 * Custom hook, saves the given value in React state and as a ref value, returns modified setState function that changes new state and ref
 * Especially useful for comparing values in event listeners that cannot track changes in React state (but can in ref.current)
 *
 * @param {any} data Data to be saved in state/ref value
 * @returns {Array} Array containing typical react state return values, with an added ref that is changed whenever setMyState is called
 */
const useStateWithRef = <T,>(data: T): StateWithRefTuple<T> => {
	let [myState, _setMyState] = useState<T>(data);
	let myStateRef = useRef<T>(data);

	let setMyState = (data: T): void => {
		myStateRef.current = data;

		_setMyState(data);
	};

	return [myState, setMyState, myStateRef];
};

export default useStateWithRef;
