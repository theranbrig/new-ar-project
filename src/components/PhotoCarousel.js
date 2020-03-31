import 'react-multi-carousel/lib/styles.css';
import 'react-lazy-load-image-component/src/effects/blur.css';

import React, { useContext, useEffect, useRef, useState } from 'react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

import Carousel from 'react-multi-carousel';
import CloseSVG from '../assets/icons/icon_close';
import Fade from './FadeOut';
import { FirebaseContext } from '../context/Firebase';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import { ModalContext } from '../context/Modal';
import PhotoCarouselFullScreenPhoto from './PhotoCarouselFullScreenPhoto';
import TagFilledSVG from '../assets/icons/icon_tag_filled';
import { motion } from 'framer-motion';
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
      span {
        font-weight: 700;
      }
    }
  }
  .slider-cell-content {
    animation: fadein 1s;
    img {
      background: #7f7fd5;
      background: -webkit-linear-gradient(to top, #91eae4, #86a8e7, #7f7fd5);
      background: linear-gradient(to top, #91eae4, #86a8e7, #7f7fd5);
      background-size: 100% 100%;
      width: 92%;
      margin: 0 auto;
    }
  }
  /* ul.react-multi-carousel-track {
    margin-left: 15px;
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
  .hidden-slider-cell-content {
    opacity: 0;
  }
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const MainPageCarousel = ({ title, product, brand }) => {
  const carouselRef = useRef();

  const [photos, setPhotos] = useState([]);

  const { dbh, userData, firebase } = useContext(FirebaseContext);

  const {
    sliderPhotos,
    sliderPhotoIndex,
    setOpenFullScreenSlider,
    openFullScreenSlider,
    setSliderPhotos,
  } = useContext(ModalContext);

  const checkPhotos = () => {
    dbh
      .collection('userPhotos')
      .where('tag', '==', product)
      .onSnapshot(querySnapshot => {
        let tempItems = [];
        querySnapshot.docs.forEach(doc => {
          // const url = doc.data().url.replace('/yzed/', '/yzed/300x200/');
          tempItems.push({ id: doc.id, ...doc.data() });
        });
        setPhotos(tempItems);
      });
  };

  useEffect(() => {
    checkPhotos();
    return () => checkPhotos();
  }, []);

  return (
    <SliderStyles>
      <div className='carousel-section'>
        <h2>
          <TagFilledSVG />
          <span>{brand}</span> {title}
        </h2>
        <LazyLoadComponent>
          <Carousel ref={carouselRef} responsive={responsive} partialVisible swipeable>
            {photos.map((photo, index) => (
              <div
                className={
                  openFullScreenSlider.length === 0
                    ? 'slider-cell-content'
                    : 'hidden-slider-cell-content'
                }
                key={photo.id}
                onClick={() => {
                  disableBodyScroll(body);
                  setOpenFullScreenSlider(index);
                  setSliderPhotos(photos);
                }}>
                <img src={photo.url} alt={photo.id} rel='preload' />
              </div>
            ))}
          </Carousel>
        </LazyLoadComponent>
      </div>
    </SliderStyles>
  );
};

const FullSliderStyles = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1500;
  background: #272727f9;
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
  .example-enter {
    opacity: 0.01;
  }

  .example-enter.example-enter-active {
    opacity: 1;
    transition: opacity 500ms ease-in;
  }

  .example-leave {
    opacity: 1;
  }

  .example-leave.example-leave-active {
    opacity: 0.01;
    transition: opacity 300ms ease-in;
  }
`;

export const FullScreenSlider = ({
  sliderPhotos,
  setOpenFullScreenSlider,
  userData,
  openFullScreenSlider,
}) => {
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
      fullScreenRef.current.goToSlide(openFullScreenSlider);
    }
  }, [fullScreenRef]);

  return (
    <FullSliderStyles key='full-screen-slider'>
      <div
        className='carousel'
        onClick={() => {
          enableBodyScroll(body);
          setOpenFullScreenSlider('');
        }}>
        <section
          className='top'
          onClick={e => {
            e.stopPropagation();
          }}>
          <div className='title'>
            <h1>Today's Timeline</h1>
            <h2>Swipe to explore more!</h2>
          </div>
          <button
            onClick={() => {
              enableBodyScroll(body);
              setOpenFullScreenSlider('');
            }}>
            <CloseSVG fill='#fff' />
          </button>
        </section>
        <section
          className='main-carousel'
          onClick={e => {
            e.stopPropagation();
          }}>
          <Carousel ref={fullScreenRef} responsive={fullResponsive} swipeable>
            {sliderPhotos.map(photo => (
              <PhotoCarouselFullScreenPhoto
                key={photo.id}
                photo={photo}
                setOpenFullScreenSlider={setOpenFullScreenSlider}
                userData={userData}
              />
            ))}
          </Carousel>
        </section>
      </div>
    </FullSliderStyles>
  );
};

export default MainPageCarousel;
