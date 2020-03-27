import React from "react";

import Picture from "../components/Picture";
import images from "../assets/data";

const Slider = props => {
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
          const imgClasses = ["photo"];
          if (props.index === key) {
            imgClasses.push("active");
          }
          return (
            <Picture
              classes={imgClasses}
              index={key}
              key={key}
              myImg={image.src}
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

export default Slider;
