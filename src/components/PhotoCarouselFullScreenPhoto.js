import 'react-lazy-load-image-component/src/effects/blur.css';

import React, { useContext, useEffect, useState } from 'react';

import EmptyUpVoteSVG from '../assets/icons/icon_upvote_empty';
import FilledUpVoteSVG from '../assets/icons/icon_upvote_filled';
import { FirebaseContext } from '../context/Firebase';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import PictureSVG from '../assets/icons/icon_picture';
import moment from 'moment';
import styled from 'styled-components';

export const FullScreenPhotoStyles = styled.div`
  .image {
    width: 280px;
    height: 448px;
    margin: 0 auto;
    position: relative;
    img {
      width: 280px;
      height: 448px;
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
    animation-duration: 9s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-name: placeHolderShimmer;
    animation-timing-function: linear;
    background: ${props => props.theme.colors.mediumGrey};
    background: -webkit-linear-gradient(
      to right,
      ${props => props.theme.colors.lightGrey},
      ${props => props.theme.colors.mediumGrey},
      ${props => props.theme.colors.lightGrey}
    );
    background: linear-gradient(
      to right,
      ${props => props.theme.colors.lightGrey},
      ${props => props.theme.colors.mediumGrey},
      ${props => props.theme.colors.lightGrey}
    );

    background-size: 100% 100%;

    position: relative;
  }

  @keyframes placeHolderShimmer {
    0% {
      background-position: -280px 0;
    }
    100% {
      background-position: 280px 0;
    }
  }
  .photo-info {
    width: 90%;
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
    }
  }
`;

const PhotoCarouselFullScreenPhoto = ({ photo, userData }) => {
  const [currentPhoto, setCurrentPhoto] = useState(photo);
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState(0);
  const [loading, setLoading] = useState(false);
  const { dbh } = useContext(FirebaseContext);

  useEffect(() => {
    setLoading(true);
    dbh
      .collection('users')
      .doc(photo.userId)
      .get()
      .then(doc => {
        let liked = false;
        if (userData.loggedIn) {
          liked = photo.likes.some(like => like === userData.id);
          setCurrentPhoto({ ...photo, liked });
        }
        setUser({ id: doc.id, ...doc.data() });
        dbh
          .collection('userPhotos')
          .doc(photo.id)
          .collection('comments')
          .get()
          .then(querySnapshot => {
            setComments(querySnapshot.docs.length);
            setLoading(false);
            console.log(currentPhoto);
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
      <>
        <div className='image gradient'>
          <img src={photo.url} alt={photo.description} />
        </div>
        {user && (
          <section className='photo-info'>
            <div className='text'>
              <p className='comment'>
                <Link to={`/user/${user.id}`}>@{user.userName}</Link>
                {photo.description}
              </p>
              <div className='bottom-row'>
                <h5>
                  <span>{moment.unix(photo.addedOn.seconds).fromNow()}</span> repl
                  {comments === 1 ? 'y' : 'ies'}(0)<Link to={`/comments/${photo.id}`}>reply</Link>
                </h5>
              </div>
            </div>
            <div className='likes'>
              <button
                onClick={() => {
                  // toggleUpvoteComment(photo.id, photo.liked);
                }}>
                {photo.liked ? <FilledUpVoteSVG fill='#fff' /> : <EmptyUpVoteSVG fill='#fff' />}
              </button>
              <h5>{photo.likes.length}</h5>
            </div>
          </section>
        )}
      </>
    </FullScreenPhotoStyles>
  );
};

export default PhotoCarouselFullScreenPhoto;
