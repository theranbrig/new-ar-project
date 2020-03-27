import 'react-lazy-load-image-component/src/effects/blur.css';

import React, { useContext, useEffect, useState } from 'react';

import CloseSVG from '../assets/icons/icon_close';
import { FirebaseContext } from '../context/Firebase';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import { ModalContext } from '../context/Modal';
import OptionsModal from './OptionsModal';
import PhotoLikes from '../components/PhotoLikes';
import TagSVG from '../assets/icons/icon_tag';
import ThreeDotsSVG from '../assets/icons/icon_threedots';
import moment from 'moment';
import styled from 'styled-components';

const Tag = ({ tag, setShowTags }) => {
  const [taggedProduct, setTaggedProduct] = useState({});
  const { dbh } = useContext(FirebaseContext);
  useEffect(() => {
    dbh
      .collection('products')
      .doc(tag)
      .get()
      .then(doc => {
        setTaggedProduct({ id: doc.id, ...doc.data() });
      });
  }, []);
  return (
    <TagStyles>
      <HideTagButton
        onClick={() => {
          setShowTags(false);
        }}>
        <CloseSVG fill='white' />
      </HideTagButton>
      <Link to={`/item/${taggedProduct.id}`}>
        <h3>{taggedProduct.brand}</h3>
        <h4>{taggedProduct.name}</h4>
        <LazyLoadImage src={taggedProduct.mainImage} alt={taggedProduct.name} effect='blur' />
      </Link>
    </TagStyles>
  );
};

const UserPhoto = ({ photo, userName, userData }) => {
  const [showTags, setShowTags] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [owner, setOwner] = useState(false);
  const [commentNumber, setCommentNumber] = useState(0);
  const [likeLoading, setLikeLoading] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState(null);

  const { setOpenOptions, openOptions, setBodyScroll } = useContext(ModalContext);

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
        if (userData.loggedIn && doc.data()) {
          if (userData.id === doc.data().userId) {
            setOwner(true);
          }
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

  const removePhoto = photoId => {
    if (window.confirm('Are you sure you want to remove this photo?')) {
      dbh
        .collection('userPhotos')
        .doc(photoId)
        .delete()
        .then(() => {
          setOpenOptions(!openOptions);
          setBodyScroll(!openOptions);
        });
    }
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
      {owner && (
        <>
          <button
            className='more'
            onClick={() => {
              setOpenOptions(!openOptions);
              setBodyScroll(!openOptions);
            }}>
            <ThreeDotsSVG />
          </button>
        </>
      )}
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
        <LazyLoadImage src={currentPhoto.url} alt={currentPhoto.description} effect='blur' />
        {showTags && <Tag tag={currentPhoto.tag} setShowTags={setShowTags} />}
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
        <p>
          {currentPhoto.description.split('\n').map((item, key) => {
            return (
              <span key={key}>
                {item}
                <br />
              </span>
            );
          })}
        </p>
        <Link to={`/comments/${currentPhoto.id}`}>
          Read {commentNumber > 1 && 'all'} {commentNumber} comment{commentNumber !== 1 && 's'}...
        </Link>
      </div>
      <OptionsModal photoId={photo.id} removePhoto={removePhoto} />
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
  position: relative;
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
      width: 100%;
      font-weight: 300;
      margin-top: 3px;
      margin-bottom: 3px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .image {
    position: relative;
    width: 225px;
    height: 340px;
    margin: 0 auto;
    background: #7f7fd5; /* fallback for old browsers */
    background: -webkit-linear-gradient(
      to top,
      #91eae4,
      #86a8e7,
      #7f7fd5
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
      to top,
      #91eae4,
      #86a8e7,
      #7f7fd5
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
  img {
    width: 225px;
    height: 340px;
  }
  a {
    color: ${props => props.theme.colors.grey};
    font-weight: 300;
    text-decoration: none;
  }
  .more {
    position: absolute;
    right: 10px;
    top: 10px;
    background: none;
    border: none;
    svg {
      height: 20px;
    }
  }
  .options {
    position: absolute;
    right: 10px;
    top: 35px;
    width: 200px;
    height: 30px;
    z-index: 10;
    border-radius: 25px;
    background: ${props => props.theme.colors.white};
    border: 1px solid ${props => props.theme.colors.black};
    box-shadow: ${props => props.theme.boxShadows.allAround};
    button {
      border: none;
      font-size: 1.2rem;
      height: 100%;
      svg {
        height: 12px;
      }
    }
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
    width: 65px;
    height: 100px;
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
