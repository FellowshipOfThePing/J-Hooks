import { useState, useEffect } from "react";

const useLocalStorage = (localStorageKey, defaultValue = "") => {
  const [value, setValue] = useState(localStorage.getItem(localStorageKey) || defaultValue);
  useEffect(() => {
    localStorage.setItem(localStorageKey, value);
  }, [value]);
  return [value, setValue];
};

export default useLocalStorage;