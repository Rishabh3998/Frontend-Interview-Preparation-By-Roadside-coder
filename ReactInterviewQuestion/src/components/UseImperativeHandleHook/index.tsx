/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef, useImperativeHandle, useRef } from "react";

const UseImperativeHandleHook = () => {
  const childRef = useRef<any>(null);
  return (
    <div>
      <ChildComponent ref={childRef} />
      <button onClick={childRef.current.focusInput()}>Focus on input</button>
    </div>
  );
};

const ChildComponent = forwardRef((_props: any, ref: any) => {
  // To pass the ref from child to parent we need to wrap the child component inside forwardRef
  // and then we can pass the entities by using useImperativeHandle hook.
  const inputRef = useRef<any>();
  const focusInput = () => {
    inputRef.current.focus();
  };

  useImperativeHandle(ref, () => {
    return {
      focusInput,
    };
  });

  return (
    <div>
      <input type="text" ref={inputRef} />
    </div>
  );
});

export default UseImperativeHandleHook;
