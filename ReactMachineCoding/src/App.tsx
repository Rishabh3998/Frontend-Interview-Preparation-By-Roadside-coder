import "./App.css";
import "./index.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import TodoList from "./Features/TodoList";
import HolyGrailLayout from "./Features/HolyGrailLayout";
import Tabs from "./Features/Tabs";
import Home from "./Home";

function App() {
  return (
    <div style={{ width: "95vw", height: "95vh" }}>
      <Router>
        <div style={{ marginBottom: "2rem" }}>
          <Link to="/">Home</Link>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todo" element={<TodoList />} />
          <Route path="/holy-grail-layout" element={<HolyGrailLayout />} />
          <Route path="/tabs" element={<Tabs />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
