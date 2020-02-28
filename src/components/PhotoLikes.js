import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { FirebaseContext } from '../context/Firebase';
import LikeFilledSVG from '../assets/icons/icon_like_filled';
import LikeEmptySVG from '../assets/icons/icon_like_empty';
import '@firebase/firestore';

const LikeStyles = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  button {
    background: none;
    border: none;

    svg {
      height: 25px;
    }
  }
  h4 {
    display: inline;
    font-size: 20px;
  }
`;

const PhotoLikes = ({ photo, toggleLike, isLiked, loading, userData }) => {
  return (
    <LikeStyles>
      <button disabled={loading || !userData.loggedIn} onClick={() => toggleLike()}>
        {isLiked ? <LikeFilledSVG /> : <LikeEmptySVG />}
      </button>
      <h4>
        <strong>{photo.likes.length}</strong> Like
        {photo.likes.length !== 1 && 's'}
      </h4>
    </LikeStyles>
  );
};

export default PhotoLikes;
