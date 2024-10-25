/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useRef } from "react";
import useIntersectionObserver from "../CustomHooks/hooks/useIntersectionObserver";

const IntersectionObserver = () => {
  const ref = useRef(null);

  const options = useMemo(() => {
    return {
      root: null,
      rootMargin: 0,
      threshold: 0.5,
    };
  }, []);

  const intersectionEntry: any = useIntersectionObserver(ref, options);

  console.log("isIntersecting", intersectionEntry?.isIntersecting);
  console.log("intersectionRatio", intersectionEntry?.intersectionRatio);

  return (
    <div
      style={{
        height: "200vh",
        background: intersectionEntry?.isIntersecting ? "white" : "grey",
      }}
    >
      <div ref={ref} style={{ height: "50vh", background: "lightblue" }}>
        Roadside coder
      </div>
    </div>
  );
};

export default IntersectionObserver;
