function App() {
  const [count, setCount] = React.useState(0);
  let count1 = 0;
  const increment = () => {
    setCount(count + 1);
    // count += 1; // This will not work because re-rendering only works if state changes
  };

  // using traditional way of creating elements

  //   return React.createElement(
  //     "div",
  //     null,
  //     React.createElement("p", null, `Count: ${count}`),
  //     React.createElement("button", { onClick: increment }, "Increment")
  //   );

  // using the way which saves a lot of time and also modern and dev friendly with less hassle.

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(App));
