import React from 'react';
import styled from 'styled-components';
import '@google/model-viewer';

const HomeStyles = styled.div`
  margin: 0 auto;
  text-align: center;
  model-viewer {
    min-width: 30%;
    min-height: 300px;
    margin: 0 auto;
  }
`;

const Home = () => {
  return (
    <HomeStyles>
      <h1>Model Viewer</h1>
      <div className='model-box'>
        <model-viewer
          src='../assets/images/Astronaut.glb'
          alt='A 3D model of an astronaut'
          auto-rotate
          ar
          camera-controls
          background-color='#f9f9f9'></model-viewer>
      </div>
    </HomeStyles>
  );
};

export default Home;
