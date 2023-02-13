import * as React from "react";
import { useWindowSize } from "../src";

const UseWindowSizeExample = () => {
	const [width, height] = useWindowSize();

	return (
		<div>
			<div>Width: {width}</div>
			<div>Height: {height}</div>
		</div>
	);
};

export { UseWindowSizeExample };
