import { useEffect, useState } from "react";

export const useDebounce = (callback, delay, value, setRef) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      callback(inputValue);
    }, delay);

    return () => clearTimeout(timer);
  }, [inputValue, callback, delay]);

  const handleChange = (e) => {
    const currentValue = e.target.value;
    setInputValue(currentValue);
    setRef(currentValue);
  };

  return { inputValue, handleChange };
};
