/* eslint-disable @typescript-eslint/no-explicit-any */
import { useReducer } from "react";

const ShoppingCart = () => {
  const cartReducer = (
    state: { cart: { id: number; title: string }[] },
    action: { type: any; payload?: any }
  ) => {
    switch (action.type) {
      case "ADD":
        return {
          ...state,
          cart: [...state.cart, action.payload],
        };

      case "REMOVE":
        return {
          ...state,
          cart: state.cart.filter((item) => item.id !== action.payload.id),
        };

      case "CLEAR":
        return {
          ...state,
          cart: [],
        };

      default:
        return state;
    }
  };

  const initialCart = {
    cart: [],
  };

  const [state, dispatch] = useReducer(cartReducer, initialCart);
  return (
    <div>
      <ul>
        {state.cart.map((item) => (
          <li key={item.id}>
            {item.title}
            <button
              onClick={() =>
                dispatch({
                  type: "REMOVE",
                  payload: item,
                })
              }
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={() =>
          dispatch({
            type: "ADD",
            payload: { id: Math.random(), title: "Product 1" },
          })
        }
      >
        Add product 1
      </button>
      <button
        onClick={() =>
          dispatch({
            type: "ADD",
            payload: { id: Math.random(), title: "Product 2" },
          })
        }
      >
        Add product 2
      </button>
      <button onClick={() => dispatch({ type: "CLEAR" })}>Clear cart</button>
    </div>
  );
};

export default ShoppingCart;
