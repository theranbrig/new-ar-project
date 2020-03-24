import React, { useContext, useEffect, useState } from 'react';

import { FirebaseContext } from '../context/Firebase';
import TopTitle from './TopTitle';
import moment from 'moment';
import styled from 'styled-components';

export const FollowingStyles = styled.div`
  width: 500px;
  margin: 0 auto;
  max-width: 90%;
  img {
    width: 65px;
  }
`;

const Following = ({ userId }) => {
  const [followedThreads, setFollowedThreads] = useState([]);
  const { dbh } = useContext(FirebaseContext);

  useEffect(() => {
    dbh
      .collection('userPhotos')
      .where('followers', 'array-contains', userId)
      .get()
      .then(querySnapshot => {
        let comments = [];
        querySnapshot.docs.map(doc => {
          dbh
            .collection('userPhotos')
            .doc(doc.id)
            .collection('comments')
            .get()
            .then(querySnapshot => {
              querySnapshot.docs.forEach(doc => {
                comments.push({ id: doc.id, ...doc.data() });
              });
              console.log(comments);
              setFollowedThreads(
                [...followedThreads, ...comments].sort(
                  (a, b) => b.addedOn.seconds - a.addedOn.seconds
                )
              );
            });
        });
      });
  }, []);

  return (
    <FollowingStyles>
      <TopTitle title='Following Threads' />
      {followedThreads.map(thread => (
        <div>
          {thread.photo && <img src={thread.photo} alt={thread.photo} />}
          <p>
            {thread.comment} - {moment.unix(thread.addedOn.seconds).fromNow()}
          </p>
        </div>
      ))}
    </FollowingStyles>
  );
};

export default Following;
