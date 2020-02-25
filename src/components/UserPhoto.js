import React, { useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Link } from 'react-router-dom';
import PhotoLikes from '../components/PhotoLikes';
import CloseSVG from '../assets/icons/icon_close';
import TagSVG from '../assets/icons/icon_tag';

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
  }
  .image {
    position: relative;
    width: 225px;
    height: 340px;
    margin: 0 auto;
  }
  a {
    color: tomato;
    margin-right: 5px;
    text-decoration: none;
  }
`;

const TagStyles = styled.div`
  position: absolute;
  background: ${props => `${props.theme.colors.black}d5`};
  height: 340px;
  width: 225px;
  top: 0;
  left: calc(50% - 112.5px);
  a {
    display: block;
    color: ${props => props.theme.colors.white};
    margin: 90px auto;
    h3,
    h4 {
      font-family: ${props => props.theme.fonts.main};
      margin: 0 auto;
    }
    h4 {
      font-weight: 300;
    }
    h3 {
      font-weight: 600;
    }
  }
  img {
    margin-top: 10px;
  }
`;

const TagButton = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background: ${props => props.theme.colors.white};
  z-index: 600;
  box-shadow: ${props => props.theme.boxShadows.allAround};
  svg {
    height: 24px;
    margin-top: 8px;
  }
`;

const Tag = ({ tag, setShowTags }) => {
  return (
    <TagStyles>
      <TagButton
        onClick={() => {
          setShowTags(false);
        }}>
        <CloseSVG />
      </TagButton>
      <Link to={`/products/${tag.id}`}>
        <h3>{tag.brand}</h3>
        <h4>{tag.name}</h4>
        <LazyLoadImage
          src={tag.mainImage}
          alt={tag.name}
          effect='blur'
          height='100px'
          width='100px;'
        />
      </Link>
    </TagStyles>
  );
};

const UserPhoto = ({ photo, userName }) => {
  const [showTags, setShowTags] = useState(false);
  console.log(photo);
  return (
    <PhotoStyles>
      <div className='image'>
        <TagButton
          onClick={() => {
            setShowTags(true);
          }}>
          <TagSVG />
        </TagButton>
        <LazyLoadImage
          src={photo.url}
          alt={photo.description}
          effect='blur'
          height='340px'
          width='225px;'
        />
        {showTags && <Tag tag={photo.tags[0]} setShowTags={setShowTags} />}
      </div>
      <p className='likes-and-time'>
        <div className='likes'>
          <PhotoLikes photoId={photo.id} />
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
