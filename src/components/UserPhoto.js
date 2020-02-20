import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export const PhotoStyles = styled.div`
  width: 400px;
  max-width: 90%;
  margin: 20px auto;
  padding: 10px;
  img {
    border: 1px solid ${props => props.theme.colors.lightGrey};
    border-radius: 3px;
  }
  .likes-and-time {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    margin: 0 auto;
    i {
      margin-right: 10px;
    }
    p,
    h4 {
      margin: 10px 0;
      font-weight: 300;
      strong {
        font-weight: 600;
      }
    }
  }
  .description {
    text-align: left;
    width: 90%;
    margin: 0 auto;
    h4 {
      margin: 0;
    }
    p {
      font-weight: 300;
      margin-top: 3px;
    }
  }
`;

const UserPhoto = ({ photo, userName }) => {
  return (
    <PhotoStyles>
      <LazyLoadImage
        src={photo.url}
        alt={photo.description}
        effect='blur'
        height='340px'
        width='225px;'
      />
      <p className='likes-and-time'>
        <div className='likes'>
          <h4>
            <i className='fa fa-heart'></i>
            <strong>{photo.likes}</strong> Likes
          </h4>
        </div>
        <p className='date'>{moment.unix(photo.addedOn.seconds).fromNow()}</p>
      </p>
      <div className='description'>
        <h4>@{userName}</h4>
        <p>{photo.description}</p>
      </div>
    </PhotoStyles>
  );
};

export default UserPhoto;
