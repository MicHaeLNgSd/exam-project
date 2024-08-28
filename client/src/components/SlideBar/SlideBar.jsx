import React, { useEffect, useState } from 'react';
import Flickity from 'react-flickity-component';
import classNames from 'classnames';
import style from './SlideBar.module.sass';
import carouselConstants from '../../carouselConstants';
import './flickity.css';

const options = {
  draggable: true,
  wrapAround: true,
  pageDots: false,
  prevNextButtons: true,
  autoPlay: true,
  groupCells: true,
  lazyLoad: true,
  initialIndex: 2,
};

const SliderBar = ({ carouselType, images }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const flickityStyles = classNames({
    [style.mainCarousel]: carouselType === carouselConstants.MAIN_SLIDER,
    [style.exampleCarousel]: carouselType === carouselConstants.EXAMPLE_SLIDER,
    [style.feedbackCarousel]:
      carouselType === carouselConstants.FEEDBACK_SLIDER,
  });

  const renderSlides = () => {
    switch (carouselType) {
      case carouselConstants.MAIN_SLIDER: {
        return Object.keys(images).map((key, index) => (
          <img
            src={images[key]}
            alt="slide"
            key={index}
            className={style['carousel-cell']}
          />
        ));
      }
      case carouselConstants.EXAMPLE_SLIDER: {
        return Object.keys(images).map((key, index) => (
          <div className={style['example-cell']} key={index}>
            <img src={images[key]} alt="slide" />
            <p>{carouselConstants.EXAMPLE_SLIDER_TEXT[index]}</p>
          </div>
        ));
      }
      case carouselConstants.FEEDBACK_SLIDER: {
        return Object.keys(images).map((key, index) => (
          <div className={style['feedback-cell']} key={index}>
            <img src={images[key]} alt="slide" />
            <p>{carouselConstants.FEEDBACK_SLIDER_TEXT[index].feedback}</p>
            <span>{carouselConstants.FEEDBACK_SLIDER_TEXT[index].name}</span>
          </div>
        ));
      }
      default:
        return null;
    }
  };

  if (isLoading) return null;
  return (
    <Flickity className={flickityStyles} elementType="div" options={options}>
      {renderSlides()}
      {renderSlides()}
    </Flickity>
  );
};

export default SliderBar;
