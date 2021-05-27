import * as React from "react";
import { useStateWithRef } from "../src";

const UseStateWithRefExample = () => {
  const [testState, setTestState, testRef] = useStateWithRef("My Value");
  const [inputValue, setInputValue] = React.useState("");

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
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit" aria-label="submit-input" onClick={handleSubmit}>
        Submit
      </button>
      <div>TestState: {testState}</div>
      <div>TestRef: {testRef.current}</div>
    </div>
  );
};

export { UseStateWithRefExample };
