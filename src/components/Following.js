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
  .buttons {
    border-bottom: 1px solid ${props => props.theme.colors.lightGrey};
    padding: 20px 0;
    button {
      border: 1px solid ${props => props.theme.colors.black};
      background: none;
      width: 100px;
      margin: 0 5px;
      height: 25px;
      font-size: 16px;
      line-height: 22px;
      padding: 0;
      border-radius: 12.5px;
      font-family: ${props => props.theme.fonts.main};
    }
    button.inactive {
      border: 1px solid ${props => props.theme.colors.lightGrey};
      color: ${props => props.theme.colors.lightGrey};
    }
  }
`;

const Following = ({ userId }) => {
  const [sortByDate, setSortByDate] = useState(false);
  const [followedItems, setFollowedItems] = useState([]);
  const [followedThreads, setFollowedThreads] = useState([]);
  const { dbh } = useContext(FirebaseContext);

  useEffect(() => {
    dbh
      .collection('userPhotos')
      .where('followers', 'array-contains', userId)
      .get()
      .then(querySnapshot => {
        let comments = [];
        let followed = [];
        querySnapshot.docs.map(doc => {
          let thread = { threadId: doc.id, ...doc.data() };
          followed.push(thread);
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
              if (sortByDate) {
                setFollowedItems(
                  [...followedItems, ...comments].sort(
                    (a, b) => b.commentAdded.seconds - a.commentAdded.seconds
                  )
                );
              } else {
                const previousVisitDate = document.cookie.match(
                  new RegExp('(^| )' + 'previousVisitDate' + '=([^;]+)')
                );
                if (previousVisitDate) {
                  const filteredThreads = [...followedItems, ...comments].filter(
                    item => item.commentAdded.seconds < previousVisitDate[2] - 604800
                  );
                  setFollowedItems(
                    filteredThreads.sort((a, b) => b.addedOn.seconds - a.addedOn.seconds)
                  );
                } else {
                  setFollowedItems(
                    [...followedItems, ...comments].sort(
                      (a, b) => b.commentAdded.seconds - a.commentAdded.seconds
                    )
                  );
                }
              }
            });
        });
        console.log(followed);
        setFollowedThreads(followed);
      });
  }, [sortByDate]);

  const toggleView = () => {
    setFollowedItems([]);
    setSortByDate(!sortByDate);
  };

  return (
    <FollowingStyles>
      <TopTitle title='Following Threads' />
      <section className='buttons'>
        <button
          className={sortByDate ? 'active' : 'inactive'}
          onClick={() => {
            toggleView();
          }}>
          Latest
        </button>
        <button
          className={!sortByDate ? 'active' : 'inactive'}
          onClick={() => {
            toggleView();
          }}>
          Overview
        </button>
      </section>
      <div className='followed-items'>
        {followedItems.map(item => (
          <FollowedItem item={item} key={item.id} />
        ))}
      </div>
    </FollowingStyles>
  );
};

export default Following;
