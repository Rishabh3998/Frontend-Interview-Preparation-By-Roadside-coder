import { useEffect, useState } from "react";

const useDebounce = (value: string, delay: number, callback = () => {}) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
      callback();
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay, callback]);
  return {
    debouncedValue,
  };
};

export default useDebounce;
