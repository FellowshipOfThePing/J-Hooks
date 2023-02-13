import * as React from "react";
import { useLocalStorage } from "../src";

const UseLocalStorageExample = () => {
	const [testState, setTestState] = useLocalStorage("Test Key");
	const [inputValue, setInputValue] = React.useState("");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	const handleSubmit = () => {
		setTestState(inputValue);
		setInputValue("");
	};

	return (
		<div>
			<input
				type="text"
				id="newValue"
				aria-label="text-input"
				value={inputValue}
				onChange={handleChange}
			/>
			<button
				type="submit"
				aria-label="submit-input"
				onClick={handleSubmit}
			>
				Submit
			</button>
			<div>TestState: {testState}</div>
		</div>
	);
};

export { UseLocalStorageExample };
