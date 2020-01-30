import React from 'react';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import { users } from '../data';
import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const SliderStyles = styled.div`
  .awssld__wrapper {
    height: 520px;
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
    .name {
      margin: 10px 0 0;
    }
    .handle {
      font-weight: 300;
      margin-bottom: 10px;
      margin-top: 10px;
    }
    .impressions,
    .followers {
      display: grid;
      grid-template-columns: 1fr 4fr;
      justify-content: center;
      align-items: center;
      margin: 0 30px;
      h4 {
        margin: 5px auto;
        font-size: 1.1rem;
        text-align: left;
      }
    }
  }
`;

const MainPageCarousel = () => {
  return (
    <SliderStyles>
      <AwesomeSlider>
        {users.map(user => (
          <div className='slider-cell content' key={user.handle}>
            <h3 className='name'>{user.name}</h3>
            <h3 className='handle'>{user.handle}</h3>
            <div className='user-photo'>
              <div className='user-likes'>
                <i className='fa fa-heart' aria-hidden='true'></i>
                <p> {user.likes}</p>
              </div>
              <LazyLoadImage src={user.profile_image_url} alt={user.name} effect='blur' />
              <div className='followers'>
                <i className='fa fa-user'></i>
                <div className='stats'>
                  <h4>{user.followers}</h4>
                  <h4>New Followers</h4>
                </div>
              </div>
              <div className='impressions'>
                <i className='fa fa-eye'></i>
                <div className='stats'>
                  <h4>{user.impressions}</h4>
                  <h4>New Impressions</h4>
                </div>
              </div>
            </div>
          </div>
        ))}
      </AwesomeSlider>
    </SliderStyles>
  );
};

export default MainPageCarousel;

