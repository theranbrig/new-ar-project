import React from 'react';
import Slider from 'react-slick';
import { users } from '../data';
import styled from 'styled-components';

const SliderStyles = styled.div`
  .slider-cell {
    height: 500px;
    background-size: cover;
    .user-photo img {
      height: 300px;
      margin: 0 auto;
    }
    .user-photo {
      position: relative;
      text-align: center;
      width: 300px;
      margin: 0 auto;
    }
    .user-likes {
      position: absolute;
      top: 8px;
      left: 16px;
      background: white;
      padding: 5px 10px;
      p {
        display: inline;
      }
    }
  }
`;

const MainPageUserCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <SliderStyles>
      <Slider {...settings}>
        {users.map(user => (
          <div className='slider-cell'>
            <h3>{user.name}</h3>
            <h3>{user.handle}</h3>
            <div className='user-photo'>
              <div className='user-likes'>
                <i class='fa fa-heart' aria-hidden='true'></i>
                <p> {user.likes}</p>
              </div>
              <img src={user.profile_image_url} />
            </div>
          </div>
        ))}
      </Slider>
    </SliderStyles>
  );
};

export default MainPageUserCarousel;
