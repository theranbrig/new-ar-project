import React from 'react';
import styled from 'styled-components';
import ProductThumbs from '../components/ProductThumbs';
import '@google/model-viewer';
import ArrowIcon from '../assets/images/down-arrow.png';
import MainPageUserCarousel from '../components/MainPageUserCarousel';

const HomeStyles = styled.div`
  margin: 0 auto;
  text-align: center;
  font-family: Montserrat;
  margin-top: 50px;
  max-width: 500px;
  model-viewer {
    width: 450px;
    height: 300px;
    margin: 0 auto;
    z-index: 0;
    @media (max-width: 576px) {
      max-width: 90%;
    }
  }
  .main-product-title {
    width: 450px;
    text-align: left;
    margin: 0 auto;
    @media (max-width: 576px) {
      max-width: 90%;
    }
  }
  .main-product-title h2 {
    font-weight: 300;
    font-size: 2rem;
    margin: 0;
  }
  .main-product-title h3 {
    font-weight: 400;
    margin-bottom: 10px;
  }
  .main-product-title h4 {
    font-weight: 400;
    margin-bottom: 50px;
    margin-top: 10px;
    color: #c7c7c7;
  }
  .discover-box {
    color: #c7c7c7;
    h3 {
      margin: 50px 0 0;
      letter-spacing: 0.1rem;
      font-weight: 400;
    }
    img {
      height: 150px;
    }
  }
`;

const WhiteButton = styled.button`
  border: 2px solid black;
  border-radius: 0px;
  height: 50px;
  display: block;
  margin: 0 auto;
  font-size: 1.2rem;
  padding: 5px 40px;
  font-family: Montserrat;
  min-width: 300px;
`;

const BlackButton = styled.button`
  border: 2px solid black;
  border-radius: 0px;
  height: 50px;
  display: block;
  margin: 0 auto;
  font-size: 1.2rem;
  padding: 5px 40px;
  font-family: Montserrat;
  background: black;
  color: white;
  min-width: 300px;
  margin-bottom: 10px;
`;

const Home = () => {
  return (
    <HomeStyles>
      <div className='model-box'>
        <model-viewer
          src='https://res.cloudinary.com/dq7uyauun/raw/upload/v1579138896/Astronaut.glb'
          alt='A 3D model of an astronaut'
          auto-rotate
          ar
          shadow-intensity='1'
          stage-light-intensity='3'
          environment-intensity='2'
          camera-controls
          ios-src='https://res.cloudinary.com/dq7uyauun/raw/upload/v1579148925/Astronaut.usdz'
          preload
          background-color='#f9f9f9'></model-viewer>
      </div>
      {/* <iframe
        id='d6c1f27d-6a27-4c7e-bd7d-bd19d7faa56c'
        src='https://www.vectary.com/viewer/v1/?model=d6c1f27d-6a27-4c7e-bd7d-bd19d7faa56c&turntable=-2'
        frameborder='0'
        width='100%'
        height='480'></iframe> */}
      <h3 className='product-title-area'>
        <div className='main-product-title'>
          <h3>ADIDAS</h3>
          <h2>CRAZYCHAOS</h2>
          <h4>Featured Today</h4>
        </div>
        <div className='top-buttons'>
          <BlackButton>VIEW IN AR</BlackButton>
          <WhiteButton>BECOME A YZER</WhiteButton>
        </div>
        <div className='discover-box'>
          <h3>Discover yzed.</h3>
          <img src={ArrowIcon} />
        </div>
        <h2>RECOMMENDED FOR YOU</h2>
        <ProductThumbs />
        <MainPageUserCarousel />
      </h3>
    </HomeStyles>
  );
};

export default Home;
