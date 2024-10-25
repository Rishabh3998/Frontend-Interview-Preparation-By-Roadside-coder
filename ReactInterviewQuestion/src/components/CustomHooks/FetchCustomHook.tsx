/* eslint-disable @typescript-eslint/no-explicit-any */
import useFetch from "./hooks/useFetch";

const FetchCustomHook = () => {
  const {
    data = [],
    loading,
    error,
  } = useFetch("https://jsonplaceholder.typicode.com/posts");

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div>
      <h1>Posts list:</h1>
      {data && (
        <ul>
          {data.slice(0, 5)?.map((item: any) => (
            <li key={item.id}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FetchCustomHook;
