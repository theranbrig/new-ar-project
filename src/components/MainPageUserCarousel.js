import React, { useState, useRef } from 'react';
import {
  getOriginalCounterPart,
  getOriginalIndexLookupTableByClones,
} from 'react-multi-carousel/lib/utils';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { users } from '../data';
import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import ImpressionSVG from '../assets/icons/icon_impressions';
import FollowerSVG from '../assets/icons/icon_followers';
import InstaSVG from '../assets/icons/icon_instagram';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
    partialVisibilityGutter: 40,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    partialVisibilityGutter: 40,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    partialVisibilityGutter: 40,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    partialVisibilityGutter: 40,
  },
};

const SliderStyles = styled.div`
  font-family: ${props => props.theme.fonts.main};
  font-weight: 300;
  .carousel-section {
    margin: 30px 0;
  }
  .slider-cell-content {
    img {
      width: 100%;
    }
  }
  .break-1 {
    background: ${props => props.theme.colors.white};
    height: 220px;
    width: 20px;
    position: absolute;
    top: 600px;
    z-index: 10;
    left: 22%;
    @media (min-width: 480px) {
      height: 300px;
    }
  }
  .break-2 {
    background: ${props => props.theme.colors.white};
    height: 220px;
    width: 20px;
    position: absolute;
    top: 600px;
    z-index: 10;
    right: 22%;
    @media (min-width: 480px) {
      height: 300px;
    }
  }
  .selected-user {
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
    box-shadow: 0px 0px 6px #c7c7c7;
    width: 300px;
    margin: 0 auto;
    svg {
      width: 70%;
      margin: 15%;
    }
    .user-information {
      padding: 0 40px 20px;
    }
    .user-data {
      margin-top: 5px;
      display: grid;
      grid-template-columns: 1fr 4fr;
      align-items: center;
      text-align: left;
      grid-gap: 10px;
      h4,
      h5 {
        font-family: ${props => props.theme.fonts.main};
        margin: 3px auto;
      }
      h4 {
        font-size: 1.2rem;
      }
      h5 {
        font-size: 1.1rem;
        font-weight: 300;
      }
    }
  }
`;

const MainPageCarousel = () => {
  const carouselRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [user, setUser] = useState(users[currentIndex]);
  const [carousel, setCarousel] = useState(null);

  console.log(user);
  return (
    <SliderStyles>
      <div className='selected-user'>
        <LazyLoadImage src={user.profile_image_url} alt={user.name} effect='blur' height='300px' />
        <div className='user-information'>
          <div className='user-data'>
            <InstaSVG />
            <div className='user-data-content'>
              <h4>{user.handle}</h4>
              <h5>{user.name}</h5>
            </div>
          </div>
          <div className='user-data'>
            <FollowerSVG />
            <div className='user-data-content'>
              <h4>{user.followers}</h4>
              <h5>New Followers</h5>
            </div>
          </div>
          <div className='user-data'>
            <ImpressionSVG />
            <div className='user-data-content'>
              <h4>{user.impressions}</h4>
              <h5>New Impressions</h5>
            </div>
          </div>
        </div>
      </div>
      <div className='carousel-section'>
        <div className='break-1'></div>
        <div className='break-2'></div>
        <Carousel
          ref={carouselRef}
          responsive={responsive}
          centerMode={true}
          infinite={true}
          removeArrowOnDeviceType={['tablet', 'mobile']}
          afterChange={async (previousSlide, { currentSlide, onMove }) => {
            console.log(carouselRef.current.props.children);
            const { slidesToShow } = carouselRef.current.state;
            console.log(currentSlide, slidesToShow);
            if (currentSlide >= 2 && currentSlide <= 7) {
              setUser(users[currentSlide - 2]);
            } else if (currentSlide > 7) {
              setUser(users[currentSlide - 8]);
            } else {
              setUser(users[5]);
            }
          }}>
          {users.map(user => (
            <div className='slider-cell-content' key={user.handle}>
              <LazyLoadImage src={user.profile_image_url} alt={user.name} effect='blur' />
            </div>
          ))}
        </Carousel>
      </div>
    </SliderStyles>
  );
};

export default MainPageCarousel;
