/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSearchParams } from "react-router-dom";

const Product = () => {
  // To read / add something inside the route in the params we use useSearchParams
  const [searchParams, setSearchParams] = useSearchParams();

  const updateSearchParams = (newParams: any) => {
    const paramsObject = Object.fromEntries(searchParams.entries());
    const mergedParams = { ...paramsObject, ...newParams };
    setSearchParams(mergedParams);
  };

  return (
    <div>
      <h1>Colors</h1>
      <button onClick={() => updateSearchParams({ color: "red" })}>Red</button>
      <button onClick={() => updateSearchParams({ color: "white" })}>
        white
      </button>
      <h2>Size</h2>
      <button onClick={() => updateSearchParams({ size: 10 })}>10</button>
      <button onClick={() => updateSearchParams({ size: 12 })}>12</button>
    </div>
  );
};

export default Product;
