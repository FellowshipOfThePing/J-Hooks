import * as React from "react";
import { useDelayedUnset } from "../src";

const UseDelayedUnsetExample = () => {
	const [componentVisible, setComponentVisible] = useDelayedUnset(1000);

	return (
		<>
			<button onClick={() => setComponentVisible(true)}>
				Show Component
			</button>
			{componentVisible && <div>Visible Component</div>}
		</>
	);
};

export { UseDelayedUnsetExample };
