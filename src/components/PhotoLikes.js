import '@firebase/firestore';

import LikeEmptySVG from '../assets/icons/icon_like_empty';
import LikeFilledSVG from '../assets/icons/icon_like_filled';
import React from 'react';
import styled from 'styled-components';

const LikeStyles = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  button {
    background: none;
    border: none;
  }
  .liked {
    position: relative;
    svg {
      height: 25px;
      opacity: ${({ isLiked, loading }) => ((loading && !isLiked) || isLiked ? '1' : '0')};
      transition-duration: 0.5s;
    }
  }
  .notLiked {
    position: relative;
    svg {
      height: 25px;
      position: absolute;
      left: 0;
      top: -27px;
    }
  }
  h4 {
    display: inline;
    font-size: 20px;
  }
`;

const PhotoLikes = ({ photo, toggleLike, isLiked, loading, userData }) => {
  return (
    <LikeStyles isLiked={isLiked} loading={loading ? 1 : 0}>
      <button disabled={loading || !userData.loggedIn} onClick={() => toggleLike()}>
        <div className='liked'>
          <LikeFilledSVG />
        </div>
        <div className='notLiked'>
          <LikeEmptySVG />
        </div>
      </button>
      <h4>
        <strong>{photo.likes.length}</strong> Like
        {photo.likes.length !== 1 && 's'}
      </h4>
    </LikeStyles>
  );
};

export default PhotoLikes;
