import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { FirebaseContext } from '../context/Firebase';
import LikeFilledSVG from '../assets/icons/icon_like_filled';
import LikeEmptySVG from '../assets/icons/icon_like_empty';
import '@firebase/firestore';

const LikeStyles = styled.div`
  button {
    background: none;
    border: none;
    svg {
      height: 16px;
    }
  }
  h4 {
    display: inline;
  }
`;

const PhotoLikes = ({ photoId }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [photo, setPhoto] = useState(null);

  const { dbh, userData, firebase } = useContext(FirebaseContext);

  const toggleLike = () => {
    if (isLiked) {
      dbh
        .collection('users')
        .doc(userData.id)
        .update({ likedPhotos: firebase.firestore.FieldValue.arrayRemove(photoId) })
        .then(() => {
          dbh
            .collection('userPhotos')
            .doc(photoId)
            .update({ likes: firebase.firestore.FieldValue.increment(-1) });
          setIsLiked(!isLiked);
        });
    } else {
      dbh
        .collection('users')
        .doc(userData.id)
        .update({ likedPhotos: firebase.firestore.FieldValue.arrayUnion(photoId) })
        .then(() => {
          setIsLiked(!isLiked);
          dbh
            .collection('userPhotos')
            .doc(photoId)
            .update({ likes: firebase.firestore.FieldValue.increment(1) });
          setIsLiked(!isLiked);
        });
    }
  };

  useEffect(() => {
    if (userData) {
      dbh
        .collection('users')
        .doc(userData.id)
        .get()
        .then(doc => {
          const likedPhotos = doc.data().likedPhotos;
          if (likedPhotos.some(photo => photo === photoId)) {
            setIsLiked(true);
          }
          dbh
            .collection('userPhotos')
            .doc(photoId)
            .get()
            .then(doc => {
              setPhoto({ id: doc.id, ...doc.data() });
            });
        });
    }
  }, [userData, setIsLiked, toggleLike]);

  return (
    <LikeStyles>
      <div className='likes'>
        <button onClick={() => toggleLike()}>
          {isLiked ? <LikeFilledSVG /> : <LikeEmptySVG />}
        </button>
        <h4>
          <strong>{photo && photo.likes ? photo.likes : 0}</strong> Likes
        </h4>
      </div>
    </LikeStyles>
  );
};

export default PhotoLikes;