/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

const isBrowser = typeof window !== "undefined";

const useLocalStorage = (key: string, initialValue: string) => {
  // If not in the browser
  if (!isBrowser) return [initialValue, () => {}, () => {}];

  // If key is not present
  if (!key) {
    throw new Error("Local storage key cannot be falsy");
  }

  // If the provided key is already present inside the localStorage
  const storedValue = localStorage.getItem(key);
  const initial = storedValue ? JSON.parse(storedValue) : initialValue;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [value, setValue] = useState(initial);

  const set = (newValue: any) => {
    try {
      const valueToStore =
        newValue instanceof Function ? newValue(value) : newValue;
      setValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  const remove = () => {
    try {
      localStorage.removeItem(key);
      setValue(undefined);
    } catch (error) {
      console.log(error);
    }
  };

  return [value, set, remove];
};

export default useLocalStorage;
