import { useState } from 'react';

export function useLocalStorage<T> (key: string, initialValue: any) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window?.localStorage.getItem(key);
      return item ? JSON.parse(item) as T : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: any) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log('LocalStorage setValue error', error);
    }
  };
  return [storedValue, setValue];
};
