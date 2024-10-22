import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);
  // let count1 = 0;

  const handleIncrement = () => {
    // Here same state is getting updated multiple times with prev value dependency
    // due to which state will update multiple times on single click. But the re-rendering
    // will still happens only once because these state changes are async operations.
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
    // O/P : 6 (counter value on single click)

    // The below code will only update the counter one time cause this one is depended on the
    // count state. Re-render will only happens once here and count will only increase by 1.
    // setCount(count + 1);
    // setCount(count + 1);
    // setCount(count + 1);
    // setCount(count + 1);

    // count1 += 1; // This will not trigger any re-render cause this is just a variable not state.
  };

  console.log("Counter (child) rendered");

  return (
    <div>
      <div>Counter: {count}</div>
      {/* The below line will not show any update in the count1 value */}
      {/* <div>Counter: {count1}</div> */}
      <div style={{ marginTop: "1rem" }}>
        <button onClick={handleIncrement}>Increment</button>
      </div>
    </div>
  );
};

export default Counter;
