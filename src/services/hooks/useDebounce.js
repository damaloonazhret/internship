import { useEffect, useState } from "react";

const useDebounce = (value, delay) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInputValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return inputValue;
};
