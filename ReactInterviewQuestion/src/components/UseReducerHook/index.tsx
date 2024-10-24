import { useReducer } from "react";

const UseReducerHook = () => {
  const countReducer = (
    state: { count: number },
    action: { type: string; payload: number }
  ) => {
    switch (action.type) {
      case "INCREMENT":
        return {
          ...state,
          count: state.count + action.payload,
        };
      case "DECREMENT":
        return {
          ...state,
          count: state.count - action.payload,
        };
      default:
        return state;
    }
  };

  const initialCount = {
    count: 0,
  };

  const [state, dispatch] = useReducer(countReducer, initialCount);

  return (
    <div>
      <p>Count: {state?.count}</p>
      <button onClick={() => dispatch({ type: "INCREMENT", payload: 2 })}>
        Increment
      </button>
      <button onClick={() => dispatch({ type: "DECREMENT", payload: 2 })}>
        Decrement
      </button>
    </div>
  );
};

export default UseReducerHook;
