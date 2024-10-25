import useLocalStorage from "../CustomHooks/hooks/useLocalStorage";

const UseLocalStorageHook = () => {
  const [value, set, remove] = useLocalStorage("username", "guest");

  const handleLogout = () => {
    remove();
    set(" ");
  };

  return (
    <div>
      <h1>User Info:</h1>
      <h3>Hello {value}</h3>
      <input
        type="text"
        placeholder="Enter your name"
        value={value}
        onChange={(e) => set(e.target.value)}
      />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UseLocalStorageHook;
