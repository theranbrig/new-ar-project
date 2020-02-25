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

const PhotoLikes = ({ photoId }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [clicked, setClicked] = useState(false);

  const { dbh, userData, firebase, userLoading } = useContext(FirebaseContext);

  const toggleLike = () => {
    setClicked(true);
    if (isLiked && !clicked) {
      dbh
        .collection('users')
        .doc(userData.id)
        .update({ likedPhotos: firebase.firestore.FieldValue.arrayRemove(photoId) })
        .then(() => {
          dbh
            .collection('userPhotos')
            .doc(photoId)
            .update({ likes: firebase.firestore.FieldValue.increment(-1) })
            .then(() => {
              setIsLiked(!isLiked);
              setClicked(false);
            });
        });
    } else if (!clicked && !isLiked) {
      dbh
        .collection('users')
        .doc(userData.id)
        .update({ likedPhotos: firebase.firestore.FieldValue.arrayUnion(photoId) })
        .then(() => {
          setIsLiked(!isLiked);
          dbh
            .collection('userPhotos')
            .doc(photoId)
            .update({ likes: firebase.firestore.FieldValue.increment(1) })
            .then(() => {
              setIsLiked(!isLiked);
              setClicked(false);
            });
        });
    }
  };

  useEffect(() => {
    if (userData.loggedIn) {
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
  }, [setIsLiked, toggleLike, userLoading]);

  if (userLoading) return null;

  return (
    <LikeStyles>
      <button onClick={() => toggleLike()}>{isLiked ? <LikeFilledSVG /> : <LikeEmptySVG />}</button>
      <h4>
        <strong>{photo && photo.likes ? photo.likes : 0}</strong> Like
        {((photo && photo.likes > 1) || (photo && photo.likes === 0)) && 's'}
      </h4>
    </LikeStyles>
  );
};

export default PhotoLikes;
