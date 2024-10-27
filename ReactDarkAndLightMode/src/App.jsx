import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Navbar from "./components/Navbar";
import ThemeProvider from "./context/ThemeContext";

function App() {
  // We can use a useState here to store the state of the theme we want to acquire
  // But then we have to pass this state in all of the components which is not an ideal way to
  // do, also it will create prop drilling issue.
  // We can use state management lib as well like Zustand and redux, we can also simply use the
  // context API of React.
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<About />} path="/about" />
          <Route element={<Blog />} path="/blog" />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
