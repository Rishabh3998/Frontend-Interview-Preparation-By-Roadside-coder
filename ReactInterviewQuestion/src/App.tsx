import { useState } from "react";
import "./App.css";
import Counter from "./components";

function App() {
  const [showMessage, setShowMessage] = useState(false);
  const [showMessage2, setShowMessage2] = useState(false);
  const handleShowMessage = () => {
    // Here the doubt was that what will happen if two states will get update will the re-render
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
      {showMessage && <b>Now you see me</b>}
      {showMessage2 && <b>Now you see me again</b>}
      <button onClick={handleShowMessage} style={{ marginLeft: "1rem" }}>
        Show message
      </button>
    </>
  );
}

export default App;
