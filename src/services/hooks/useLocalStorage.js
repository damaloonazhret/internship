import {useCallback} from "react";

export const useLocalStorage = () => {
  const setItem = useCallback((key, value) => {
    localStorage.setItem(key, value);
  }, []);

  const getItem = useCallback((key) => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : undefined;
  }, []);

  const removeItem = useCallback((key) => {
    localStorage.removeItem(key);
  }, []);

  return { setItem, getItem, removeItem };
};
