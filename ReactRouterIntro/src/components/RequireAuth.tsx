import { Navigate } from "react-router-dom";

/* eslint-disable @typescript-eslint/no-explicit-any */
const RequireAuth = ({ children }: any) => {
  const loggedIn = localStorage.getItem("loggedIn");

  if (!loggedIn) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default RequireAuth;
