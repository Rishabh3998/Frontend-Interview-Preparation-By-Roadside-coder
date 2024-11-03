/* eslint-disable @typescript-eslint/no-explicit-any */
// Design and implement a "Star Rating" component using React

// Requirements:
// -   Ensure the component is fully functional and displays a visual representation of a star rating
//     system, with 5 stars that a user can click to set a rating.
// -   Enhance the component to be more user-friendly and visually appealing. This can involve adding
//     the hover effect, or changing the star icons appearance when active or hovered.
// -   Write the component in a way that it can easily be reused across different parts of an
//     application and can accept different sizes, current rating etc for the stars as props.

import { useState } from "react";
import "../../App.css";

const StarRating = ({
  size = 5,
  rating,
  onChange,
}: {
  size: number;
  rating: number;
  onChange: any;
}) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleChange = (newRating: number) => {
    onChange(newRating);
  };

  const handleStarHover = (hoveredRating: number) => {
    setHoverRating(hoveredRating);
  };

  return (
    <div>
      <h1>Star Rating</h1>
      {/* Create an Array of given size and fill it will empty spaces */}
      <div className="star-rating">
        {Array(size)
          .fill(" ")
          .map((_, index) => {
            const starValue = index + 1;
            let starClass = "star";

            if (hoverRating >= starValue) {
              starClass += " hover";
            } else if (rating >= starValue) {
              starClass += " active";
            }

            return (
              <span
                key={index}
                className={starClass}
                onClick={() => handleChange(starValue)}
                onMouseEnter={() => handleStarHover(starValue)}
                onMouseLeave={() => handleStarHover(0)}
              >
                &#9733;
              </span>
            );
          })}
      </div>
    </div>
  );
};

export default StarRating;
