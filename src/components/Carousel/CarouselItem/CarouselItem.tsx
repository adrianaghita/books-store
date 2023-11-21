import { useEffect, useState } from "react";
import styles from "./CarouselItem.module.scss";

import bookImage from "../../../assets/CarouselImages/svg-1.svg";
import lampImage from "../../../assets/CarouselImages/svg-2.svg";
import libraryImage from "../../../assets/CarouselImages/svg-3.svg";

const CarouselItem = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const images = [
    {
      id: 1,
      src: bookImage,
    },
    {
      id: 2,
      src: lampImage,
    },
    { id: 3, src: libraryImage },
  ];

  const handleThumbnailClick = (index: number) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    const autoplayInterval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(autoplayInterval);
  }, []);

  return (
    <div className={styles[`carousel-item`]}>
      <img
        className={styles[`carousel-image`]}
        src={images[activeIndex].src}
        alt={`Book ${images[activeIndex].src}`}
      />

      <div className={styles[`carousel-thumbnail`]}>
        {images.map((image, index) => (
          <button
            key={image.id}
            onClick={() => handleThumbnailClick(index)}
            className={` ${
              index === activeIndex
                ? styles[`carousel-thumbnail-active`]
                : styles[`carousel-thumbnail-inactive`]
            } `}
          />
        ))}
      </div>
    </div>
  );
};

export default CarouselItem;
