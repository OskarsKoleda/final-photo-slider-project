import React from "react";

import Slide from "../components/Slide";
import images from "../assets/data";

const Carousel = props => {
  const imagesLength = images.length;
  return (
    <div className="photo-slider">
      <div
        className="photos-slider-wrapper"
        style={{
          transform: `translateX(-${+props.index * (100 / imagesLength)}%)`
        }}
      >
        {images.map((image, key) => {
          const imgClasses = ["slide"];
          if (props.index === key) {
            imgClasses.push("active");
          }
          return (
            <Slide
              classes={imgClasses}
              index={key}
              key={key}
              content={image.content}
              onClickHandler={() => props.onImageClickHandler(key)}
              onTouchStart={event => props.onTouchStartHandler(event)}
              onTouchMove={event => props.onTouchMoveHandler(event)}
              onTouchEnd={() => props.onTouchEndHandler()}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Carousel;
