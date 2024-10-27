import { NavLink, Outlet } from "react-router-dom";
import "../App.css";

const Home = () => {
  return (
    <div>
      <div className="header">
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/sign-up">Sign up</NavLink>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
