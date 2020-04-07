import React from 'react';
import Slider from 'react-slick';

import classes from './Carousel.module.css';
import CarouselItem from './CarouselItem/CarouselItem';

const menu = [
  {
    label: 'Big Mac',
    type: 'bigMac',
    img: require('../../assets/images/bigMac.jpg'),
  },
  {
    label: 'Whopper',
    type: 'whopper',
    img: require('../../assets/images/whooper.jpg'),
  },
  {
    label: 'Cheese Lover',
    type: 'cheeseLover',
    img: require('../../assets/images/cheeseLover.jpg'),
  },
  {
    label: 'Carnivore',
    type: 'carnivore',
    img: require('../../assets/images/carnivore.jpg'),
  },
];

const Carousel = (props) => {
  const settings = {
    dots: true,
    autoplay: true,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
  };

  return (
    <div className={classes.Container}>
      <h3>People also Bought</h3>
      <Slider {...settings}>
        {menu.map((el) => (
          <CarouselItem
            key={el.label}
            name={el.label}
            clicked={() => props.setMenu(el.type)}
            type={el.type}
            img={el.img}
          />
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
