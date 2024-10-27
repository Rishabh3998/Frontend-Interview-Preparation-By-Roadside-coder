import { useNavigate } from "react-router-dom";

/* eslint-disable @typescript-eslint/no-explicit-any */
const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    navigate("/posts");
    console.log(e.target.email.value, e.target.password.value);
    localStorage.setItem("loggedIn", "true");
  };

  return (
    <div>
      <form action="submit" onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Enter email" />
        <input type="password" name="password" placeholder="Enter password" />
        <input type="submit" value="submit" />
      </form>
    </div>
  );
};

export default Login;
