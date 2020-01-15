import React from 'react';
import styled from 'styled-components';
import ProductThumbs from '../components/ProductThumbs';
import '@google/model-viewer';

const HomeStyles = styled.div`
  margin: 0 auto;
  text-align: center;
  font-family: Montserrat;
  model-viewer {
    width: 450px;
    height: 300px;
    margin: 0 auto;
    z-index: 0;
    @media (max-width: 576px) {
      max-width: 90%;
    }
  }
  .product-title h2 {
    font-weight: 300;
  }
`;

const Home = () => {
  return (
    <HomeStyles>
      <div className='model-box'>
        <model-viewer
          src='../assets/images/Astronaut.glb'
          alt='A 3D model of an astronaut'
          auto-rotate
          ar
          shadow-intensity='1'
          stage-light-intensity='3'
          environment-intensity='2'
          camera-controls
          background-color='#f9f9f9'></model-viewer>
      </div>
      {/* <iframe
        id='d6c1f27d-6a27-4c7e-bd7d-bd19d7faa56c'
        src='https://www.vectary.com/viewer/v1/?model=d6c1f27d-6a27-4c7e-bd7d-bd19d7faa56c&turntable=-2'
        frameborder='0'
        width='100%'
        height='480'></iframe> */}
      <div className='product-title'>
        <h3>Adidas</h3>
        <h2>CRAZYCHAOS</h2>
        <button>VIEW IN AR</button>
        <button>BECOME A YZER</button>
        <h3>Discover yzed.</h3>
        <h2>RECOMMENDED FOR YOU</h2>
        <ProductThumbs />
      </div>
    </HomeStyles>
  );
};

export default Home;
