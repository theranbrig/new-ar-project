import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Link } from 'react-router-dom';
import PhotoLikes from '../components/PhotoLikes';
import CloseSVG from '../assets/icons/icon_close';
import TagSVG from '../assets/icons/icon_tag';
import { FirebaseContext } from '../context/Firebase';
import LoadingSpinner from '../components/LoadingSpinner';

const Tag = ({ tag, setShowTags }) => {
  return (
    <TagStyles>
      <HideTagButton
        onClick={() => {
          setShowTags(false);
        }}>
        <CloseSVG fill='white' />
      </HideTagButton>
      <Link to={`/products/${tag.id}`}>
        <h3>{tag.brand}</h3>
        <h4>{tag.name}</h4>
        <LazyLoadImage
          src={tag.mainImage}
          alt={tag.name}
          effect='blur'
          height='100px'
          width='100px;'
        />
      </Link>
    </TagStyles>
  );
};

const UserPhoto = ({ photo, userName, userData }) => {
  const [showTags, setShowTags] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [commentNumber, setCommentNumber] = useState(0);
  const [likeLoading, setLikeLoading] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState(null);

  const { dbh, firebase, userLoading } = useContext(FirebaseContext);

  const toggleLike = () => {
    setLikeLoading(true);
    if (isLiked) {
      dbh
        .collection('userPhotos')
        .doc(photo.id)
        .update({ likes: firebase.firestore.FieldValue.arrayRemove(userData.id) })
        .then(() => {
          getPhotoData(true);
        });
    } else {
      dbh
        .collection('userPhotos')
        .doc(photo.id)
        .update({ likes: firebase.firestore.FieldValue.arrayUnion(userData.id) })
        .then(() => {
          getPhotoData(true);
        });
    }
  };

  const getPhotoData = likeClick => {
    if (!likeClick) {
      setLoading(true);
    }
    dbh
      .collection('userPhotos')
      .doc(photo.id)
      .get()
      .then(doc => {
        dbh
          .collection('userPhotos')
          .doc(photo.id)
          .collection('comments')
          .get()
          .then(doc => setCommentNumber(doc.docs.length));
        setCurrentPhoto({ id: doc.id, ...doc.data() });
        if (userData.loggedIn) {
          if (doc.data().likes.some(like => like === userData.id)) {
            setIsLiked(true);
          } else {
            setIsLiked(false);
          }
        }

        setLikeLoading(false);
        setLoading(false);
      });
  };

  useEffect(() => {
    getPhotoData();
    return () => {
      getPhotoData();
    };
  }, []);

  if (loading || userLoading || !currentPhoto)
    return (
      <PhotoStyles>
        <LoadingSpinner color='black' />
      </PhotoStyles>
    );

  return (
    <PhotoStyles>
      <div className='image'>
        {!showTags && (
          <ShowTagButton
            showTags={showTags}
            onClick={() => {
              setShowTags(true);
            }}>
            <TagSVG />
          </ShowTagButton>
        )}
        <LazyLoadImage
          src={currentPhoto.url}
          alt={currentPhoto.description}
          effect='blur'
          height='340px'
          width='225px;'
        />
        {showTags && <Tag tag={currentPhoto.tags[0]} setShowTags={setShowTags} />}
      </div>
      <div className='likes-and-time'>
        <PhotoLikes
          photo={currentPhoto}
          toggleLike={toggleLike}
          isLiked={isLiked}
          setIsLiked={setIsLiked}
          loading={likeLoading}
          userData={userData}
        />
        <p className='date'>{moment.unix(currentPhoto.addedOn.seconds).fromNow()}</p>
      </div>
      <div className='description'>
        <h4>@{userName}</h4>
        <p>{currentPhoto.description}</p>
        <Link to={`/comments/${currentPhoto.id}`}>
          Read {commentNumber > 1 && 'all'} {commentNumber} comment{commentNumber !== 1 && 's'}...
        </Link>
      </div>
    </PhotoStyles>
  );
};

export default UserPhoto;

export const PhotoStyles = styled.div`
  width: 400px;
  max-width: 90%;
  margin: 20px auto;
  padding: 10px;
  min-height: 480px;
  border: 1px solid ${props => props.theme.colors.lightGrey};
  border-radius: 3px;
  img {
    border: 1px solid ${props => props.theme.colors.lightGrey};
    border-radius: 3px;
  }
  .likes-and-time {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    margin: 5px auto;
    i {
      margin-right: 10px;
    }
    p,
    h4 {
      margin: 10px 0;
      font-weight: 300;
      strong {
        font-weight: 600;
      }
    }
  }
  .description {
    text-align: left;
    width: 90%;
    margin: 0 auto;
    h4 {
      margin: 0;
    }
    p {
      font-weight: 300;
      margin-top: 3px;
      margin-bottom: 3px;
    }
  }
  .image {
    position: relative;
    width: 225px;
    height: 340px;
    margin: 0 auto;
  }
  a {
    color: ${props => props.theme.colors.grey};
    font-weight: 300;
    text-decoration: none;
  }
`;

const TagStyles = styled.div`
  position: absolute;
  background: ${props => `${props.theme.colors.black}d5`};
  height: 340px;
  width: 225px;
  top: 0;
  left: calc(50% - 112.5px);
  a {
    display: block;
    color: ${props => props.theme.colors.white};
    margin: 90px auto;
    h3,
    h4 {
      font-family: ${props => props.theme.fonts.main};
      margin: 0 auto;
    }
    h4 {
      font-weight: 300;
    }
    h3 {
      font-weight: 600;
    }
  }
  img {
    margin-top: 10px;
  }
`;

const ShowTagButton = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  z-index: 2;
  background: ${props => props.theme.colors.white};
  box-shadow: ${props => props.theme.boxShadows.allAround};
  svg {
    height: 24px;
    margin-top: 8px;
  }
`;

const HideTagButton = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  border: 1px solid ${props => props.theme.colors.white};
  svg {
    height: 24px;
    margin-top: 8px;
  }
`;
