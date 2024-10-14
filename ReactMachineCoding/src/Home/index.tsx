import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Machine Coding Questions</h1>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Link to="/todo">1. Todo List</Link>
        <Link to="/holy-grail-layout">2. Holy grail layout</Link>
        <Link to="/tabs">3. Tabs</Link>
      </div>
    </div>
  );
};

export default Home;
