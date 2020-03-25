import React, { useContext, useEffect, useState } from 'react';

import { FirebaseContext } from '../context/Firebase';
import FollowedItem from '../components/FollowedItem';
import TopTitle from './TopTitle';
import styled from 'styled-components';

export const FollowingStyles = styled.div`
  width: 500px;
  margin: 0 auto;
  max-width: 95%;
  min-height: 90vh;
  margin-top: 10vh;
  img {
    width: 65px;
  }
  .followed-items {
    padding-bottom: 50px;
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
          let thread = { threadId: doc.id, ...doc.data() };
          console.log(thread);
          dbh
            .collection('userPhotos')
            .doc(doc.id)
            .collection('comments')
            .get()
            .then(querySnapshot => {
              querySnapshot.docs.forEach(doc => {
                comments.push({
                  id: doc.id,
                  ...doc.data(),
                  commentAdded: doc.data().addedOn,
                  ...thread,
                });
              });
              console.log(comments);
              setFollowedThreads(
                [...followedThreads, ...comments].sort(
                  (a, b) => b.commentAdded.seconds - a.commentAdded.seconds
                )
              );
            });
        });
      });
  }, []);

  return (
    <FollowingStyles>
      <TopTitle title='Following Threads' />
      <div className='followed-items'>
        {followedThreads.map(thread => (
          <FollowedItem item={thread} key={thread.id} />
        ))}
      </div>
    </FollowingStyles>
  );
};

export default Following;
