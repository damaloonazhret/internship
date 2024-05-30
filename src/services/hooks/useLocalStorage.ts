import {useCallback} from "react";

interface UseLocalStorage {
  setItem: (key: string, value: string) => void;
  getItem: (key: string) => string;
  removeItem: (key: string) => void;
}

export const useLocalStorage = (): UseLocalStorage => {
  const setItem = useCallback((key: string, value: string) => {
    localStorage.setItem(key, value);
  }, []);

  const getItem = useCallback((key: string) => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : undefined;
  }, []);

  const removeItem = useCallback((key: string) => {
    localStorage.removeItem(key);
  }, []);

  return { setItem, getItem, removeItem };
};
