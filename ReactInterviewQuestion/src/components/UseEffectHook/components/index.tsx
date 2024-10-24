import { useEffect, useState } from "react";

const useEffectPolyfill = () => {
  const [count, setCount] = useState(0);
  //   const [count1, setCount1] = useState(0);

  useEffect(() => {
    console.log("Effect triggered", count);
  }, [count]);

  console.log("rendered");

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <div>
      <h1>useEffect Polyfill</h1>
      <h3>Counter: {count}</h3>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};

export default useEffectPolyfill;
