import { useEffect } from "react";

/**
 * Custom hook, used to call a given function whenever a user clicks outside of the given ref, or presses escape.
 * Mostly used for improving UX around modals, dropdowns, and any other "floating" components that need to be closed easily.
 *
 * @param {ref} ref used to listen for events relative to a referenced component
 * @param {function} func is called onClick or onEscape
 */
const useOutsideAlerter = (ref, func) => {
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (ref.current && !ref.current.contains(event.target)) {
				func();
			}
		};

		const handleEscapeKey = (event) => {
			if (ref.current && event.keyCode === 27) {
				func();
			}
		};

		document.addEventListener("mouseup", handleClickOutside);
		document.addEventListener("keydown", handleEscapeKey);
		return () => {
			document.removeEventListener("mouseup", handleClickOutside);
			document.removeEventListener("keydown", handleEscapeKey);
		};
	}, [ref]);
};

export default useOutsideAlerter;
