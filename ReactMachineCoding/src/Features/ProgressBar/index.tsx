// Requirements:

import { useEffect, useState } from "react";

// Create a progress bar component. It should follow the guidelines below.
// 1. Use React to build the UI
// 2. Display the percentage value in the middle.
// 3. Green progress fill animation. #00c251
// 4. Add accessibility
// 5. It should be a scalable component.

// Evaluation criteria:
// 1. Correct implementation of the required functionalities.
// 2. Edge cases handling
// 3. Code organization, readability and adherence to best practices.
// 4. UI/UX design responsiveness.
// 5. Quality of code comments and documentation.
// 6. Overall user experience and error handling.

const ProgressBar = ({
  value = 0,
  onComplete = () => {},
}: {
  value: number;
  onComplete?: () => void;
}) => {
  const [percent, setPercent] = useState(value);

  useEffect(() => {
    setPercent(Math.min(100, Math.max(value, 0)));
    if (value >= 100) {
      onComplete();
    }
  }, [value]);

  return (
    <div className="progress">
      <span style={{ color: percent > 49 ? "white" : "black" }}>
        {percent.toFixed()}%
      </span>
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuenow={Number(percent.toFixed())}
        aria-valuemax={100}
        // style={{ width: `${percent}%` }}
        style={{
          transform: `scaleX(${percent / 100})`,
          transformOrigin: "left",
        }}
      />
    </div>
  );
};

export default ProgressBar;
