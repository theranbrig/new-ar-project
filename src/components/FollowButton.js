import React, { useContext, useEffect, useState } from 'react';

import CheckSVG from '../assets/icons/icon_success_check';
import { FirebaseContext } from '../context/Firebase';
import PlusSVG from '../assets/icons/icon_plus';
import styled from 'styled-components';

export const FollowButtonStyles = styled.div`
  background: ${({ followed, theme }) =>
    followed ? `${theme.colors.white}` : `${theme.colors.black}`};
  width: 120px;
  color: ${({ followed, theme }) => (followed ? `${theme.colors.black}` : `${theme.colors.white}`)};
  text-align: center;
  height: 26px;
  line-height: 26px;
  border-radius: 13px;
  font-weight: 300;
  border: ${({ followed, theme }) =>
    followed ? `1px solid ${theme.colors.black}` : `1 px solid ${theme.colors.white}`};
  svg {
    height: 14px;
    vertical-align: middle;
    margin-top: -2px;
  }
`;

const FollowButton = ({ photoId }) => {
  const [followed, setFollowed] = useState(false);

  const { dbh, userData, firebase } = useContext(FirebaseContext);

  const followThread = () => {
    if (userData.loggedIn) {
      if (!followed) {
        dbh
          .collection('userPhotos')
          .doc(photoId)
          .update({
            followers: firebase.firestore.FieldValue.arrayUnion(userData.id),
          });
      } else {
        dbh
          .collection('userPhotos')
          .doc(photoId)
          .update({
            followers: firebase.firestore.FieldValue.arrayRemove(userData.id),
          });
      }
    }
  };

  const checkFollowed = () => {
    if (userData.loggedIn) {
      dbh
        .collection('userPhotos')
        .doc(photoId)
        .onSnapshot(querySnapshot => {
          if (querySnapshot.data().followers) {
            setFollowed(querySnapshot.data().followers.some(follower => follower === userData.id));
          }
        });
    }
  };

  useEffect(() => {
    checkFollowed();
    return () => {
      checkFollowed();
    };
  }, [userData, followed]);

  return (
    <FollowButtonStyles onClick={() => followThread()} followed={followed}>
      {followed ? (
        <>
          <CheckSVG /> Following
        </>
      ) : (
        <>
          <PlusSVG fill='white' /> Follow
        </>
      )}
    </FollowButtonStyles>
  );
};

export default FollowButton;
