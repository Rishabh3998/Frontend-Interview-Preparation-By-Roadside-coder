import { useState } from "react";

const useCounter = (initialCount = 0, step = 1) => {
  const [count, setCount] = useState(initialCount);

  const increment = () => {
    setCount(count + step);
  };
  const decrement = () => {
    setCount(count - step);
  };
  const reset = () => {
    setCount(initialCount);
  };

  return {
    count,
    increment,
    decrement,
    reset,
  };
};

export default useCounter;
