import React, { useContext, useEffect, useState } from 'react';

import EmptyUpVoteSVG from '../assets/icons/icon_upvote_empty';
import FilledUpVoteSVG from '../assets/icons/icon_upvote_filled';
import { FirebaseContext } from '../context/Firebase';
import { Link } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import { ModalContext } from '../context/Modal';
import { enableBodyScroll } from 'body-scroll-lock';
import moment from 'moment';
import styled from 'styled-components';

const body = document.querySelector('body');

export const FullScreenPhotoStyles = styled.div`
  .image {
    width: 280px;
    height: 448px;
    margin: 0 auto;
    position: relative;
    img {
      width: 282px;
      height: 450px;
      margin: 0 auto;
    }
  }
  .photo-info {
    font-family: ${props => props.theme.fonts.main};
    color: ${props => props.theme.colors.white};
    p {
      font-size: 0.9rem;
    }
    a {
      color: ${props => props.theme.colors.white};
      text-decoration: none;
      font-weight: 600;
      margin-right: 10px;
    }
  }

  .gradient {
    background: #7f7fd5;
    background: -webkit-linear-gradient(to top, #91eae4, #86a8e7, #7f7fd5);
    background: linear-gradient(to top, #91eae4, #86a8e7, #7f7fd5);
    background-size: 100% 100%;
    position: relative;
  }

  .photo-info {
    width: 325px;
    margin: 20px auto 0;
    display: grid;
    grid-template-columns: 1fr 40px;
    align-items: center;
    justify-content: center;
    grid-gap: 10px;
    text-align: left;
    .likes {
      button {
        width: 40px;
        height: 40px;
        background: none;
        border: none;
        svg {
          height: 18px;
        }
      }
      h5 {
        text-align: center;
        font-size: 1rem;
        font-weight: 400;
      }
      p,
      h5 {
        font-weight: 300;
      }
    }
    h5 {
      margin: 0;
      font-weight: 300;
    }
    .text {
      a {
        background: none;
        border: none;
        color: ${props => props.theme.colors.white};
        margin-left: 10px;
        font-size: 0.9rem;
        font-weight: 600;
      }
      span {
        margin-right: 10px;
      }
      p.comment a {
        margin-left: 0;
      }
    }
  }
`;

const PhotoCarouselFullScreenPhoto = ({ photo, userData }) => {
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState(0);
  const [loading, setLoading] = useState(false);

  const { setOpenFullScreenSlider } = useContext(ModalContext);
  const { dbh } = useContext(FirebaseContext);

  useEffect(() => {
    setLoading(true);
    dbh
      .collection('users')
      .doc(photo.userId)
      .get()
      .then(doc => {
        setUser({ id: doc.id, ...doc.data() });
        dbh
          .collection('userPhotos')
          .doc(photo.id)
          .collection('comments')
          .get()
          .then(querySnapshot => {
            setComments(querySnapshot.docs.length);
            setLoading(false);
          });
      });
  }, []);

  if (loading) {
    return (
      <FullScreenPhotoStyles>
        <LoadingSpinner />
      </FullScreenPhotoStyles>
    );
  }

  return (
    <FullScreenPhotoStyles>
      <div className='image gradient'>
        <Link
          onClick={() => {
            setOpenFullScreenSlider('');
            enableBodyScroll(body);
          }}
          to={`/comments/${photo.id}`}>
          <img src={photo.url} alt={photo.id} />
        </Link>
      </div>
      {user && (
        <section className='photo-info'>
          <div className='text'>
            <p className='comment'>
              <Link
                onClick={() => {
                  setOpenFullScreenSlider('');
                  enableBodyScroll(false);
                }}
                to={`/user/${user.id}`}>
                @{user.userName}
              </Link>
              {photo.description.split('\n').map((item, key) => {
                return (
                  <span key={key}>
                    {item}
                    <br />
                  </span>
                );
              })}
            </p>
            <div className='bottom-row'>
              <h5>
                <span>{moment.unix(photo.addedOn.seconds).fromNow()}</span> repl
                {comments === 1 ? 'y' : 'ies'}({comments})
                <Link
                  onClick={() => {
                    setOpenFullScreenSlider('');
                    enableBodyScroll(false);
                  }}
                  to={`/comments/${photo.id}`}>
                  reply
                </Link>
              </h5>
            </div>
          </div>
          <PhotoLikes photo={photo} />
        </section>
      )}
    </FullScreenPhotoStyles>
  );
};

const PhotoLikes = ({ photo }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState([]);

  const { dbh, userData, firebase } = useContext(FirebaseContext);

  const toggleLikePhoto = (photo, liked) => {
    if (liked) {
      dbh
        .collection('userPhotos')
        .doc(photo.id)
        .update({ likes: firebase.firestore.FieldValue.arrayRemove(userData.id) });
    } else {
      dbh
        .collection('userPhotos')
        .doc(photo.id)
        .update({ likes: firebase.firestore.FieldValue.arrayUnion(userData.id) });
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
  }, [photo, userData]);

  return (
    <div className='likes'>
      <button
        disabled={!userData.loggedIn}
        onClick={() => {
          toggleLikePhoto(photo, isLiked);
        }}>
        {isLiked ? <FilledUpVoteSVG fill='#fff' /> : <EmptyUpVoteSVG fill='#fff' />}
      </button>
      <h5>{likes.length}</h5>
    </div>
  );
};

export default PhotoCarouselFullScreenPhoto;
