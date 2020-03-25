import React, { useContext, useEffect, useState } from 'react';

import { FirebaseContext } from '../context/Firebase';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import moment from 'moment';
import styled from 'styled-components';

export const FollowedThreadStyles = styled.div`
  width: 95%;
  margin: 0 auto;
  padding: 10px 0;
  a {
    text-decoration: none;
    color: ${props => props.theme.colors.black};
    display: grid;
    grid-template-columns: 65px 1fr;
    font-family: ${props => props.theme.fonts.main};
    align-items: center;
    grid-gap: 15px;
    p {
      font-weight: 300;
    }
    strong {
      font-weight: 600;
    }
  }
`;

const FollowedThread = ({ thread }) => {
  console.log(thread);
  const [commenter, setCommenter] = useState(null);
  const [newFeedComments, setNewFeedComments] = useState([]);
  const { dbh } = useContext(FirebaseContext);
  useEffect(() => {
    dbh
      .collection('userPhotos')
      .doc(thread.threadId)
      .collection('comments')
      .get()
      .then(querySnapshot => {
        let comments = [];
        querySnapshot.docs.forEach(doc => {
          comments.push({ id: doc.id, ...doc.data() });
        });
        const dateLimit = Date.now() / 1000 - 60 * 60 * 24 * 7;
        const newComments = comments.filter(comment => {
          return comment.addedOn.seconds > dateLimit;
        });
        setNewFeedComments(newComments);
        dbh
          .collection('users')
          .doc(thread.userId)
          .get()
          .then(doc => {
            setCommenter({ ...doc.data() });
          });
      });
  }, []);
  return (
    <FollowedThreadStyles>
      <Link to={`/comments/${thread.threadId}`}>
        <LazyLoadImage src={thread.url} />
        <p>
          <strong>{newFeedComments.length}</strong> new replies have been posted to "{' '}
          {thread.description.length > 12
            ? `${thread.description.substring(0, 12)}...`
            : thread.description}
          " by <strong>{commenter && commenter.userName}</strong>
        </p>
      </Link>
    </FollowedThreadStyles>
  );
};

export default FollowedThread;
