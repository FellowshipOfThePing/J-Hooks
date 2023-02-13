import { RefObject, useEffect } from "react";

/**
 * Custom hook, used to call a given function whenever a user clicks outside of the given ref, or presses escape.
 * Mostly used for improving UX around modals, dropdowns, and any other "floating" components that need to be closed easily.
 *
 * @param {ref} ref used to listen for events relative to a referenced component
 * @param {function} handler is called onClick or onEscape
 */
const useOutsideAlerter = (ref: RefObject<any>, handler: Function) => {
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (ref?.current && !ref?.current.contains(event.target)) {
				handler();
			}
		};

		const handleEscapeKey = (event: KeyboardEvent) => {
			if (ref.current && event.key === "Escape") {
				handler();
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
