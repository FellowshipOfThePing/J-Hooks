import { useEffect } from "react";

const useOutsideAlerter = (ref, func) => {
  useEffect(() => {
    const handleClickOutside = event => {
      if (ref.current && !ref.current.contains(event.target)) {
        func();
      }
    };

    const handleEscapeKey = event => {
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