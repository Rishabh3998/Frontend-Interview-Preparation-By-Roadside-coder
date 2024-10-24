/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from "react";

const useCustomEffect = (effect: any, deps: any) => {
  // Why we are taking useRef here?
  // Because the value of useRef persists when re-renders happens
  const isFirstRender = useRef(true);
  const prevDeps = useRef([]);

  // cases to handle:

  // 1. First render case
  if (isFirstRender.current) {
    isFirstRender.current = false;

    // 3. Cleanup function provided
    const cleanup = effect();
    return () => {
      if (cleanup && typeof cleanup === "function") {
        cleanup();
      }
    };
  }

  // 2. Deps changes and No Deps array
  const depsChanged = deps
    ? JSON.stringify(deps) !== JSON.stringify(prevDeps.current)
    : true;

  if (depsChanged) {
    // 3. Cleanup function provided
    const cleanup = effect();
    if (cleanup && typeof cleanup === "function" && deps) {
      cleanup();
    }
  }

  prevDeps.current = deps || [];
};

export default useCustomEffect;
