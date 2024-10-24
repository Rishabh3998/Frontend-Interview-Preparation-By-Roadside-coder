import { useCallback, useMemo, useState } from "react";

const UseMemoAndUseCallback = () => {
  const [counter, setCounter] = useState(0);
  const [counter2, setCounter2] = useState(100);

  const squaredValueCallback = useCallback(() => {
    // Here the function will be memoized, it will be called again and again when the component will
    // re-render but it will only initialize when the dependency gets changed.
    console.log("Expensive operation");
    return counter * counter;
  }, [counter]);

  const squaredValueMemo = useMemo(() => {
    // If we will not useMemo then this function will called again when the overall component get
    // re-rendered on the click of decrement counter.

    // When the dependency changes this will re-initialize the callback function with the latest value.
    // The callback function will re-initiate from scratch.

    // The goal of useMemo is to memoize the result coming from function not the function.
    console.log("Expensive operation");
    return counter * counter;
  }, [counter]);

  return (
    <div>
      <div>
        <p>Squared counter: {squaredValueMemo}</p>
        <p>Squared counter: {squaredValueCallback()}</p>
        <button onClick={() => setCounter((prev) => prev + 1)}>
          Increment
        </button>
      </div>
      <div>
        <p>Squared counter 2: {counter2}</p>
        <button onClick={() => setCounter2((prev) => prev - 1)}>
          Decrement counter 2
        </button>
      </div>
    </div>
  );
};

export default UseMemoAndUseCallback;
