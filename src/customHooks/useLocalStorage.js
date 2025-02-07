import { useState, useEffect } from "react";

// a general custom hook to initialize a state variable which gets saved to local storage, too
// see: https://expertbeacon.com/how-to-use-localstorage-with-react-hooks-to-set-and-get-items/
function useLocalStorage(key, initialValue) {
  const [state, setState] = useState(() => {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}

export default useLocalStorage;
