/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useRouteError } from "react-router-dom";

interface IError {
  data: string;
  message: string;
}

const Error = () => {
  const error: IError | any = useRouteError();
  return (
    <div>
      <h1>Something went wrong</h1>
      <p>{error.data || error.message}</p>
      <Link to="/">Go back</Link>
    </div>
  );
};

export default Error;
