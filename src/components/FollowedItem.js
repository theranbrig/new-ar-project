import 'react-lazy-load-image-component/src/effects/blur.css';

import React, { useContext, useEffect, useState } from 'react';

import CloseSVG from '../assets/icons/icon_close';
import { FirebaseContext } from '../context/Firebase';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import moment from 'moment';
import styled from 'styled-components';

export const FollowedItemStyles = styled.div`
  .photo-feed-item {
    display: grid;
    grid-template-columns: 65px 1fr;
    grid-gap: 15px;
  }
  .feed-item,
  .photo-feed-item {
    width: 90%;
    margin: 10px auto;
    padding: 10px 0;
  }
  .comment {
    font-family: ${props => props.theme.fonts.main};
    display: grid;
    grid-template-columns: 1fr 20px;
    align-items: center;
    grid-gap: 10px;
    p {
      margin: 0;
      font-weight: 300;
    }
    strong {
      font-weight: 600;
    }
  }
  button {
    background: ${props => props.theme.colors.grey};
    border: none;
    height: 16px;
    width: 16px;
    align-self: center;
    border-radius: 8px;
    svg {
      height: 8px;
      margin-left: -3px;
    }
  }
  a {
    font-weight: 600;
    text-decoration: none;
    margin-left: 20px;
    color: ${props => props.theme.colors.black};
  }
  .new {
    display: inline-block;
    height: 6px;
    width: 6px;
    border-radius: 3px;
    background: #5987f0;
  }
`;

const FollowedItem = ({ item }) => {
  const [commenter, setCommenter] = useState(null);
  const [lastVisit, setLastVisit] = useState(null);

  const { dbh } = useContext(FirebaseContext);
  useEffect(() => {
    dbh
      .collection('users')
      .doc(item.userId)
      .get()
      .then(doc => {
        setCommenter({ id: doc.id, ...doc.data() });
        const match = document.cookie.match(new RegExp('(^| )' + 'previousVisitDate' + '=([^;]+)'));
        if (match) {
          setLastVisit(match[2]);
        }
      });
  }, []);

  return (
    <FollowedItemStyles>
      <div className={item.photo ? 'photo-feed-item' : 'feed-item'}>
        {item.photo && <LazyLoadImage src={item.photo} />}
        <div className='comment'>
          <div>
            <p>
              <strong>{item.user.userName}</strong> posted a picture to "
              {item.comment.length > 12 ? `${item.comment.substring(0, 12)}...` : item.comment}" by{' '}
              <strong>{commenter && commenter.userName}</strong>
            </p>
            <div>
              {moment.unix(item.commentAdded.seconds).fromNow()}{' '}
              {item.commentAdded.seconds > lastVisit && <div className='new'></div>}{' '}
              <Link to={`/comments/${item.threadId}`}>view reply</Link>
            </div>
          </div>
          <button>
            <CloseSVG fill='white' />
          </button>
        </div>
      </div>
    </FollowedItemStyles>
  );
};

export default FollowedItem;
