import 'react-multi-carousel/lib/styles.css';

import React, { useContext, useEffect, useRef, useState } from 'react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

import Carousel from 'react-multi-carousel';
import CloseSVG from '../assets/icons/icon_close';
import { FirebaseContext } from '../context/Firebase';
import PhotoCarouselFullScreenPhoto from './PhotoCarouselFullScreenPhoto';
import TagFilledSVG from '../assets/icons/icon_tag_filled';
import styled from 'styled-components';

const body = document.querySelector('body');

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 2,
    partialVisibilityGutter: 40,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2,
    partialVisibilityGutter: 40,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    partialVisibilityGutter: 40,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
    partialVisibilityGutter: 40,
  },
};

const SliderStyles = styled.div`
  font-family: ${props => props.theme.fonts.main};
  font-weight: 300;
  .carousel-section {
    margin: 30px 0;
    padding-bottom: 20px;
    h2 {
      font-size: 1.2rem;
      font-weight: 300;
      text-align: left;
      padding-left: 20px;
      svg {
        height: 16px;
        vertical-align: middle;
        margin-right: 10px;
      }
    }
  }
  .slider-cell-content {

    img {
      background: ${props => props.theme.colors.lightGrey};
      width: 90%;
      margin: 0 auto;
    }
  }

  /* .break-1 {
    background: ${props => props.theme.colors.white};
    height: 220px;
    width: 20px;
    position: absolute;
    top: 600px;
    z-index: 10;
    left: 22%;
    @media (min-width: 480px) {
      height: 300px;
    }
  }
  .break-2 {
    background: ${props => props.theme.colors.white};
    height: 220px;
    width: 20px;
    position: absolute;
    top: 600px;
    z-index: 10;
    right: 22%;
    @media (min-width: 480px) {
      height: 300px;
    }
  } */
  .selected-user {
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
    box-shadow: ${props => props.theme.boxShadows.allAround};
    width: 300px;
    margin: 0 auto;
    svg {
      width: 70%;
      margin: 15%;
    }
    a .user-data-content {
      color: ${props => props.theme.colors.black};
      text-decoration: none;
    }
    .user-information {
      padding: 0 40px 20px;
    }
    .user-data {
      margin-top: 5px;
      display: grid;
      grid-template-columns: 1fr 4fr;
      align-items: center;
      text-align: left;
      grid-gap: 10px;
      h4,
      h5 {
        font-family: ${props => props.theme.fonts.main};
        margin: 3px auto;
        color: ${props => props.theme.colors.black};
      }
      h4 {
        font-size: 1.2rem;
      }
      h5 {
        font-size: 1.1rem;
        font-weight: 300;
      }
    }
  }
  a {
    text-decoration: none;
  }
`;

const MainPageCarousel = ({ title }) => {
  const carouselRef = useRef();

  const [showFullScreen, setShowFullScreen] = useState('');
  const [photos, setPhotos] = useState([]);

  const { dbh, userData, firebase } = useContext(FirebaseContext);

  const likePhoto = (photo, liked) => {
    if (liked) {
      dbh
        .collection('userPhotos')
        .doc(photo.id)
        .update({ likes: firebase.firestore.FieldValue.arrayRemove(userData.id) })
        .then(() => {
          checkPhotos();
        });
    } else {
      dbh
        .collection('userPhotos')
        .doc(photo.id)
        .update({ likes: firebase.firestore.FieldValue.arrayUnion(userData.id) })
        .then(() => {
          checkPhotos();
        });
    }
  };

  const checkPhotos = () => {
    dbh
      .collection('userPhotos')
      .limit(6)
      .onSnapshot(querySnapshot => {
        let tempItems = [];
        querySnapshot.docs.forEach(doc => {
          tempItems.push({ id: doc.id, ...doc.data() });
        });
        setPhotos(tempItems);
      });
  };

  useEffect(() => {
    checkPhotos();
    return () => {
      checkPhotos();
    };
  }, []);

  return (
    <SliderStyles>
      {/* <Link to='/user/gZctMW4ASGNvAcrwVvAP80NlAa32'>
        <div className='selected-user'>
          <LazyLoadImage
            src={user.profile_image_url}
            alt={user.name}
            effect='blur'
            height='300px'
          />
          <div className='user-information'>
            <div className='user-data'>
              <InstaSVG />
              <div className='user-data-content'>
                <h4>{user.handle}</h4>
                <h5>{user.name}</h5>
              </div>
            </div>
            <div className='user-data'>
              <FollowerSVG />
              <div className='user-data-content'>
                <h4>{user.followers}</h4>
                <h5>New Followers</h5>
              </div>
            </div>
            <div className='user-data'>
              <ImpressionSVG />
              <div className='user-data-content'>
                <h4>{user.impressions}</h4>
                <h5>New Impressions</h5>
              </div>
            </div>
          </div>
        </div>
      </Link> */}
      <div className='carousel-section'>
        {/* <div className='break-1'></div>
        <div className='break-2'></div> */}
        <h2>
          <TagFilledSVG />
          {title}
        </h2>
        <Carousel ref={carouselRef} responsive={responsive} partialVisible swipeable>
          {photos.map((photo, index) => (
            <div
              className='slider-cell-content'
              key={photo.id}
              onClick={() => {
                disableBodyScroll(body);
                setShowFullScreen(index);
              }}>
              <img src={photo.url} alt={photo.id} />
            </div>
          ))}
        </Carousel>
        {showFullScreen.length !== 0 && (
          <FullScreenSlider
            photos={photos}
            setShowFullScreen={setShowFullScreen}
            userData={userData}
            likePhoto={likePhoto}
            showFullScreen={showFullScreen}
          />
        )}
      </div>
    </SliderStyles>
  );
};

const FullSliderStyles = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1005;
  background: ${props => props.theme.colors.black};
  height: 100vh;
  width: 100%;
  font-family: ${props => props.theme.fonts.main};
  .carousel {
    width: 500px;
    max-width: 95%;
    height: 100vh;
    position: relative;
    margin: 0 auto;
    background: none;
    border: none;
    .top {
      color: ${props => props.theme.colors.white};
      text-align: left;
      width: 325px;
      margin: 10px auto 20px;
      display: grid;
      grid-template-columns: 1fr 40px;
      align-items: center;
      h1,
      h2 {
        padding: 0;
        margin: 0;
      }
      h1 {
        font-size: 1.5rem;
        margin-bottom: 10px;
      }
      h2 {
        font-size: 1.1rem;
        font-weight: 300;
      }
      button {
        height: 40px;
        width: 40px;
        background: none;
        border: 1px solid ${props => props.theme.colors.white};
        border-radius: 50%;
        svg {
          margin-top: 3px;
          height: 14px;
        }
      }
    }
  }
`;

const FullScreenSlider = ({ photos, setShowFullScreen, userData, likePhoto, showFullScreen }) => {
  const fullScreenRef = useRef();
  
  const fullResponsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  useEffect(() => {
    if (fullScreenRef) {
      fullScreenRef.current.goToSlide(showFullScreen);
    }
  }, [fullScreenRef]);

  return (
    <FullSliderStyles>
      <div className='carousel'>
        <section className='top'>
          <div className='title'>
            <h1>Today's Timeline</h1>
            <h2>Swipe to explore more!</h2>
          </div>
          <button
            onClick={() => {
              enableBodyScroll(body);
              setShowFullScreen('');
            }}>
            <CloseSVG fill='#fff' />
          </button>
        </section>
        <section className='main-carousel'>
          <Carousel ref={fullScreenRef} responsive={fullResponsive} swipeable>
            {photos.map(photo => (
              <PhotoCarouselFullScreenPhoto
                key={photo.id}
                photo={photo}
                setShowFullScreen={setShowFullScreen}
                userData={userData}
                likePhoto={likePhoto}
              />
            ))}
          </Carousel>
        </section>
      </div>
    </FullSliderStyles>
  );
};

export default MainPageCarousel;
