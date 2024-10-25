import { useState } from "react";
import "./App.css";
import Counter from "./components/Counter";
import ListRenderUsingMap from "./components/ListRenderUsingMap";
import CounterClass from "./components/ClassBasedComponents";
import UseStateHook from "./components/UseStateHook";
import UseEffectHook from "./components/UseEffectHook";
import UseContextHook from "./components/UseContextHook";
import ShoppingCart from "./components/UseReducerHook/ShoppingCart";
import CounterCustomHook from "./components/CustomHooks";
import FetchCustomHook from "./components/CustomHooks/FetchCustomHook";

function App() {
  const [showMessage, setShowMessage] = useState(false);
  const [showMessage2, setShowMessage2] = useState(false);
  const handleShowMessage = () => {
    // Here the doubt was that what will happen if two states will get update, will the re-render
    // happens two times.

    // No, the re-render will happen only one time because this operation is Asynchronous, It will
    // not update right away, it will wait for all the code to run and then theses operations will run.
    // and the changes will re-render in one go.
    setShowMessage((prev) => !prev);
    setShowMessage2((prev) => !prev);
  };
  console.log("Parent rendered");
  return (
    <>
      <h1>Counter</h1>
      <Counter />
      <br />
      <h1>List</h1>
      <ListRenderUsingMap />
      <br />
      <CounterClass />
      {showMessage && <b>Now you see me </b>}
      {showMessage2 && <b>Now you see me again</b>}
      <button onClick={handleShowMessage} style={{ marginLeft: "1rem" }}>
        Show message
      </button>
      <UseStateHook />
      <br />
      <UseEffectHook />
      <br />
      <UseContextHook />
      <br />
      <ShoppingCart />
      <br />
      <CounterCustomHook />
      <br />
      <FetchCustomHook />
    </>
  );
}

export default App;
