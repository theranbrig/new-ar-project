import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Link } from 'react-router-dom';
import PhotoLikes from '../components/PhotoLikes';

export const PhotoStyles = styled.div`
  width: 400px;
  max-width: 90%;
  margin: 20px auto;
  padding: 10px;
  border: 1px solid ${props => props.theme.colors.lightGrey};
  border-radius: 3px;
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
      margin-bottom: 3px;
    }
    a {
      color: tomato;
      margin-right: 5px;
      text-decoration: none;
    }
  }
`;

const UserPhoto = ({ photo, userName }) => {
  console.log('PHOTO', photo);
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
          <PhotoLikes photoId={photo.id} />
        </div>
        <p className='date'>{moment.unix(photo.addedOn.seconds).fromNow()}</p>
      </p>
      <div className='description'>
        <h4>@{userName}</h4>
        <p>
          {photo.tags.map(tag => (
            <Link to={`/product/${tag.id}`}>{`#${tag.brand}-${tag.name}`}</Link>
          ))}
        </p>
        <p>{photo.description}</p>
      </div>
    </PhotoStyles>
  );
};

export default UserPhoto;
