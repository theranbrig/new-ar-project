import React from 'react';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';

import { users } from '../data';
import styled from 'styled-components';

const SliderStyles = styled.div`
  .awssld__wrapper {
    height: 500px;
    margin-top: 40px;
    border: 1px solid black;
    max-width: 90%;
    margin-left: 5%;
  }
  .awssld__content {
    background-color: white !important;
  }
  .slider-cell {
    height: 100%;
    h3 {
      margin: 5px 0;
    }
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
      left: 8px;
      background: white;
      padding: 5px 10px;
      p {
        display: inline;
      }
    }
  }
`;

const MainPageCarousel = () => {
  return (
    <SliderStyles>
      <AwesomeSlider>
        {users.map(user => (
          <div className='slider-cell content'>
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
      </AwesomeSlider>
    </SliderStyles>
  );
};

export default MainPageCarousel;

// export default MainPageUserCarousel;
