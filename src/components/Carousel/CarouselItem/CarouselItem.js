import React from 'react';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import classes from './CarouselItem.module.css';

export default function CarouselItem(props) {
  return (
    <div
      className={classes.Box}
      onClick={props.clicked}
    >
      <div className={classes.SlickSlide}>
        <img
          src={props.img}
          alt='Credit to Joshua Earle on Unsplash'
        />
      </div>
      <h3>{props.name}</h3>
    </div>
  );
}
