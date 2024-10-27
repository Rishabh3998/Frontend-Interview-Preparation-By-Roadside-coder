import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import "../App.css";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <nav className="navbar">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "20px",
        }}
      >
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/blog">Blog</Link>
      </div>
      <div className="model-switch">
        <label>
          <input
            type="checkbox"
            onChange={toggleTheme}
            checked={theme === "darked"}
          />
          <span className="slider round"></span>
        </label>
      </div>
    </nav>
  );
};

export default Navbar;
