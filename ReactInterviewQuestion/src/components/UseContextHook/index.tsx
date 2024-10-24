/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useState } from "react";

const ThemeContext = createContext<any>("light");

export const UseContextHook = () => {
  const [state, setState] = useState("dark");

  const changeTheme = () => {
    setState(state === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ state, changeTheme }}>
      <div>
        <GrandParentComponent data="light" />
      </div>
      <div>
        <GrandChildComponent />
      </div>
    </ThemeContext.Provider>
  );
};

const GrandParentComponent = ({ data }: any) => {
  return <ParentComponent data={data} />;
};
const ParentComponent = ({ data }: any) => {
  return <ChildComponent data={data} />;
};
const ChildComponent = ({ data }: any) => {
  return <ParentComponent data={data} />;
};
const GrandChildComponent = ({ data }: any) => {
  const { contextData, changeContextData } = useContext(ThemeContext);
  return (
    <div>
      <div>{data}</div>
      <div>value from context: {contextData}</div>
      <button onClick={changeContextData}>Change theme</button>
    </div>
  );
};

export default GrandChildComponent;
