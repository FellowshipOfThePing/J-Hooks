import React, { useState, useRef } from "react";
import { useOutsideAlerter } from "../src";

const pageStyle = {
  height: "200px",
  width: "200px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
};

const componentStyle = {
  height: "10px",
  width: "10px",
};

const UseOutsideAlerterExample = () => {
  const [componentShowing, setComponentShowing] = useState(false);
  let compRef = useRef(null);

  useOutsideAlerter(compRef, () => setComponentShowing(false));

  return (
    <div style={pageStyle} aria-label="page">
      <button style={componentStyle} onClick={() => setComponentShowing(true)}>
        Show Component
      </button>
      {componentShowing && (
        <div style={componentStyle} ref={compRef}>
          Component
        </div>
      )}
    </div>
  );
};

export { UseOutsideAlerterExample };
