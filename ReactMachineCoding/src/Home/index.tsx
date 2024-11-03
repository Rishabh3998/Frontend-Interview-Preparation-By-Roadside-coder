import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Machine Coding Questions</h1>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Link to="/todo">1. Todo List</Link>
        <Link to="/holy-grail-layout">2. Holy grail layout</Link>
        <Link to="/tabs">3. Tabs</Link>
        <Link to="/carousel">4. Carousel</Link>
        <Link to="/infinite-scroll">5. Infinite scroll</Link>
        <Link to="/progress-bar">6. Progress bar</Link>
        <Link to="/star-rating">7. Star rating</Link>
      </div>
    </div>
  );
};

export default Home;
