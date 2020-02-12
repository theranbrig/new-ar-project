import React, { useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { users } from '../data';
import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 3,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 3,
  },
};

const SliderStyles = styled.div`
  .carousel-section {
    margin: 30px 0;
  }
  .slider-cell-content {
    img {
      width: 100%;
    }
  }
  .break-1 {
    background: white;
    height: 200px;
    width: 20px;
    position: absolute;
    top: 400px;
    z-index: 10;
    left: 30%;
  }
  .break-2 {
    background: white;
    height: 200px;
    width: 20px;
    position: absolute;
    top: 400px;
    z-index: 10;
    right: 30%;
  }
`;

const MainPageCarousel = () => {
  const [user, setUser] = useState(users[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <SliderStyles>
      <img
        src='https://res.cloudinary.com/dq7uyauun/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1579148073/influencer1.jpg'
        alt='influencer'
        height='300px'
      />
      <div className='carousel-section'>
        <div className='break-1'></div>
        <div className='break-2'></div>
        <Carousel
          responsive={responsive}
          infinite={true}
          removeArrowOnDeviceType={['tablet', 'mobile']}
          afterChange={(previousSlide, { currentSlide, onMove }) => {
            if (currentSlide > previousSlide) {
              setCurrentIndex(currentIndex + 1);
            } else {
              setCurrentIndex(currentIndex - 1);
            }
            console.log(users[currentIndex]);
          }}>
          {users.map(user => (
            <div className='slider-cell-content' key={user.handle} onClick={() => {}}>
              <LazyLoadImage src={user.profile_image_url} alt={user.name} effect='blur' />
            </div>
          ))}
        </Carousel>
      </div>
    </SliderStyles>
  );
};

export default MainPageCarousel;
