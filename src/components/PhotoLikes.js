import '@firebase/firestore';

import React, { useContext, useEffect, useState } from 'react';

import { FirebaseContext } from '../context/Firebase';
import LikeEmptySVG from '../assets/icons/icon_like_empty';
import LikeFilledSVG from '../assets/icons/icon_like_filled';
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

const PhotoLikes = ({ photo, userData }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState([]);
  const [loading, setLoading] = useState(false);

  const { dbh, firebase } = useContext(FirebaseContext);

  const toggleLike = photo => {
    setLoading(true);
    if (isLiked) {
      dbh
        .collection('userPhotos')
        .doc(photo.id)
        .update({ likes: firebase.firestore.FieldValue.arrayRemove(userData.id) })
        .then(() => setLoading(false));
    } else {
      dbh
        .collection('userPhotos')
        .doc(photo.id)
        .update({ likes: firebase.firestore.FieldValue.arrayUnion(userData.id) })
        .then(() => setLoading(false));
    }
  };

  const checkLike = () => {
    dbh
      .collection('userPhotos')
      .doc(photo.id)
      .onSnapshot(querySnapshot => {
        if (userData.loggedIn) {
          setIsLiked(querySnapshot.data().likes.some(like => like === userData.id));
          setLikes(querySnapshot.data().likes);
        }
      });
  };

  useEffect(() => {
    checkLike();
    return () => {
      checkLike();
    };
  }, []);

  return (
    <LikeStyles isLiked={isLiked} loading={loading ? 1 : 0}>
      <button disabled={loading || !userData.loggedIn} onClick={() => toggleLike(photo)}>
        <div className='liked'>
          <LikeFilledSVG />
        </div>
        <div className='notLiked'>
          <LikeEmptySVG />
        </div>
      </button>
      <h4>
        <strong>{likes.length}</strong> Like
        {likes.length !== 1 && 's'}
      </h4>
    </LikeStyles>
  );
};

export default PhotoLikes;
