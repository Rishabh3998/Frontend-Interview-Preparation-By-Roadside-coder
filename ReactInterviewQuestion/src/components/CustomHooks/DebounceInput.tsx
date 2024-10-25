/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import useDebounce from "./hooks/useDebounce";

const DebounceInput = () => {
  const [state, setState] = useState("");

  const handleChange = (e: any) => {
    setState(e.target.value);
  };

  const { debouncedValue } = useDebounce(state, 1000, () => {
    console.log("callback");
  });

  return (
    <div>
      <p>{debouncedValue}</p>
      <input
        type="text"
        value={state}
        onChange={handleChange}
        placeholder="Type something...."
      />
    </div>
  );
};

export default DebounceInput;
