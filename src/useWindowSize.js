import { useLayoutEffect, useState } from "react";

/**
 * Custom hook, returns an array with the width and height values of the current browser window, updates on change.
 *
 * @returns {Array} Array containing the width and height values of the current browser window.
 */
const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);
  
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }

    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
};

export default useWindowSize;
