import useCounter from "./hooks/useCounter";
import useWindowSize from "./hooks/useWindowSize";

const CounterCustomHook = () => {
  const { count, increment, decrement, reset } = useCounter(0, 2);
  const { windowSize } = useWindowSize();

  return (
    <div>
      <h1>Counter using custom hook</h1>

      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={reset}>Reset</button>

      <h1>Window resize</h1>

      <p>Width: {windowSize.width}</p>
      <p>Height: {windowSize.height}</p>
    </div>
  );
};

export default CounterCustomHook;
