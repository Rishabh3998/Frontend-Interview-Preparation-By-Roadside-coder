import { useState } from "react";

const UseStateHook = () => {
  const [state, setState] = useState(false);
  const handleClick = () => {
    setState((prev) => !prev);
  };
  return (
    <div>
      <h1>useState hook</h1>
      {state && <p>This is showing state conditionally</p>}
      <button onClick={handleClick}>Click to show state</button>
    </div>
  );
};

export default UseStateHook;
