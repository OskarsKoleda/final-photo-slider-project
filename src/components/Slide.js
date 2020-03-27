import React, { Fragment } from "react";

const Slide = props => (
  <div
    onTouchStart={props.onTouchStart}
    onTouchMove={props.onTouchMove}
    onTouchEnd={props.onTouchEnd}
    onClick={props.onClickHandler}
    className={props.classes.join(" ")}
    dangerouslySetInnerHTML={{ __html: props.content }}
  ></div>
);

export default Slide;
