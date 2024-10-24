/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";

const areEqual = (prevDeps: any, nextDeps: any) => {
  if (prevDeps === null) return false;
  if (prevDeps.length !== nextDeps.length) return false;
  for (let i = 0; i < prevDeps.length; i++) {
    if (prevDeps[i] !== nextDeps[i]) return false;
  }
  return true;
};

const useCustomMemo = (callback: any, deps: any) => {
  const memoizedRef = useRef<any>();

  // On first render the callback will be invoked and the result will be memoized
  // changes in deps also handled here
  if (!memoizedRef.current || areEqual(memoizedRef.current.deps, deps)) {
    memoizedRef.current = {
      value: callback(),
      deps,
    };
  }

  // cleanup logic
  useEffect(() => {
    return () => {
      memoizedRef.current = null;
    };
  }, []);

  return memoizedRef.current.value;
};

export default useCustomMemo;
