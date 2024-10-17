/* eslint-disable @typescript-eslint/no-explicit-any */
// Build a highly scalable carousel component in React.js
// Requirements:
// - We want to create a carousel component which takes array of images as input.
// - The component should efficiently handles a large number of images while maintaining scalability,
//   performance optimizations and extensibility.
// - Provide callback functions for events like image click, enabling users to define custom behavior.
// - Focus on accessibility.

import { useEffect, useRef, useState } from "react";

interface IImage {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

interface ICarousel {
  images: IImage[];
  isLoading: boolean;
  imgPerSlide?: number;
  imgLimit?: number;
  onImageClick: (image: IImage, index: number) => void;
  customPrevButton?: React.ReactElement;
  customNextButton?: React.ReactElement;
}

const Carousel = ({
  images = [],
  isLoading = false,
  imgPerSlide = 2,
  imgLimit = images.length,
  customPrevButton,
  customNextButton,
  onImageClick,
}: ICarousel) => {
  const imageRef = useRef<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imgWidth, setImgWidth] = useState(0);

  useEffect(() => {
    if (images?.length > 0) {
      setCurrentIndex(0);
    }
  }, [images]);

  const handleClickPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? imgLimit - 1 : prev - 1));
  };

  const handleClickNext = () => {
    setCurrentIndex((prev) => (prev === imgLimit - 1 ? 0 : prev + 1));
  };

  return !isLoading ? (
    <div className="carousel" style={{ width: imgPerSlide * imgWidth }}>
      <div
        className="image-container"
        style={{
          transform: `translateX
        (-${currentIndex * imgWidth})px`,
        }}
      >
        {images
          ?.slice(0, imgLimit > images?.length ? images?.length : imgLimit)
          ?.map((img, index) => {
            return (
              <img
                onLoad={() => setImgWidth(imageRef?.current?.offsetWidth)}
                ref={imageRef}
                className="image"
                src={img.url}
                alt={img.title}
                key={img.id}
                onClick={() => onImageClick(img, index)}
              ></img>
            );
          })}
      </div>
      {customPrevButton instanceof Function ? (
        customPrevButton(handleClickPrev)
      ) : (
        <button className="btn prev" onClick={handleClickPrev}>
          Prev
        </button>
      )}
      {customNextButton instanceof Function ? (
        customNextButton(handleClickNext)
      ) : (
        <button className="btn next" onClick={handleClickNext}>
          Next
        </button>
      )}
    </div>
  ) : (
    <div>Loading....</div>
  );
};

export default Carousel;
