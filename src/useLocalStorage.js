import { useState, useEffect } from "react";

/**
 * Custom hook which saves the given value in localStorage at the given key location with useState, or updates if key already has value in LS.
 * Keeps localStorage updated after initial storage with useEffect.
 *
 * @param {string} localStorageKey Key in localStorage
 * @param {string} defaultValue value to be saved if no value is found already saved with key in localStorage
 * @returns {Array} Array containing stateful value and updater function.
 */
const useLocalStorage = (localStorageKey, defaultValue = "") => {
	const [value, setValue] = useState(
		localStorage.getItem(localStorageKey) || defaultValue
	);

	useEffect(() => {
		localStorage.setItem(localStorageKey, value);
	}, [value]);

	return [value, setValue];
};

export default useLocalStorage;
