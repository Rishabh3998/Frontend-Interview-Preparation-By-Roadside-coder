import "./App.css";
import "./index.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import TodoList from "./Features/TodoList";
import HolyGrailLayout from "./Features/HolyGrailLayout";
import Tabs from "./Features/Tabs";
import Home from "./Home";
import Carousel from "./Features/Carousel";
import { useEffect, useState } from "react";
import InfiniteScroll from "./Features/InfiniteScroll";
import ProgressBar from "./Features/ProgressBar";
import StarRating from "./Features/StarRating";
import TicTacToe from "./Features/TicTacToe";
import Pagination from "./Features/Pagination";

function App() {
  const [isLoading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [currentRating, setCurrentRating] = useState(3);
  const [progress, setProgress] = useState(0);

  const handleRatingChange = (newRating: number) => {
    setCurrentRating(newRating);
  };

  const fetchImages = async (imgLimit: number) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/photos?_limit=${imgLimit}`
      );
      const data = await response.json();
      setImages(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages(8);
  }, []);

  useEffect(() => {
    setInterval(() => {
      setProgress((prev) => prev + 1);
    }, 100);
  }, []);

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
          <Route
            path="/carousel"
            element={
              <div className="carousel-container">
                <Carousel
                  images={images}
                  isLoading={isLoading}
                  onImageClick={() => {}}
                  imgPerSlide={1}
                  imgLimit={4}
                />
              </div>
            }
          />
          <Route path="/infinite-scroll" element={<InfiniteScroll />} />
          <Route
            path="/progress-bar"
            element={
              <ProgressBar
                value={progress}
                // onComplete={() => {
                //   alert("Download complete");
                //   setProgress(0);
                // }}
              />
            }
          />
          <Route
            path="/star-rating"
            element={
              <StarRating
                size={5}
                rating={currentRating}
                onChange={handleRatingChange}
              />
            }
          />
          <Route path="/tic-tac-toe" element={<TicTacToe boardSize={4} />} />
          <Route path="/pagination" element={<Pagination />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
