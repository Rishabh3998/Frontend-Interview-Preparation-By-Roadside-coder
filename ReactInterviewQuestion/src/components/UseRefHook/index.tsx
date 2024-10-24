import { useEffect, useRef } from "react";

const UseRefHook = () => {
  const ref = useRef(0);
  const inputRef = useRef(null);

  // We can access complete DOM element and we've all the properties that exists inside DOM elements.
  console.log(inputRef.current);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div>
      <h3>{ref.current}</h3>
      <input type="text" ref={inputRef} />
      <button
        onClick={() => {
          inputRef.current.value = 5;
        }}
      >
        Set focus
      </button>
    </div>
  );
};

export default UseRefHook;
