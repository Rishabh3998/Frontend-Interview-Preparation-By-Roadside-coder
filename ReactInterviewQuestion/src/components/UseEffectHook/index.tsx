/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useLayoutEffect, useState } from "react";

const UseEffectHook = () => {
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
  });

  useEffect(
    () => {
      // side effect code
      // Its better if we write the code inside proper conditions
      return () => {
        // This is a cleanup function (optional)
        // which will run when component will unmount / removed from DOM or before re-runs
      };
    },
    [
      // dependencies
    ]
  );

  const fetchUsers = async () => {
    const res = await fetch("https://random-data-api.com/api/v2/users");
    const apiData = await res.json();
    setData(apiData);
    console.log(data);
  };

  useEffect(
    () => {
      fetchUsers();
    },
    [
      // This will only run once when component will mount
    ]
  );

  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
      console.log("Interval cleared");
    };
  }, []);

  useEffect(() => {
    // Runs after our component is rendered, it does not block our render cycle
  }, []);

  useLayoutEffect(() => {
    // Runs before our component is rendered, it can block our render cycle
  }, []);

  return (
    <div>
      <h1>useEffect Hook</h1>
      <p>
        {data.first_name} {data.last_name}
      </p>
      <p>{seconds}</p>
    </div>
  );
};

export default UseEffectHook;
