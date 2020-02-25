import React, { useState, useRef, useEffect } from 'react';
import '@google/model-viewer';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

export const ModelStyles = styled.div`
  button {
    display: block;
    width: 20px;
    height: 20px;
    border-radius: 10px;
    border: none;
    background-color: blue;
    box-sizing: border-box;
  }

  button[slot='hotspot-hand'] {
    --min-hotspot-opacity: 0;
    background-color: red;
  }

  button[slot='hotspot-foot']:not([data-visible]) {
    background-color: transparent;
    border: 3px solid blue;
  }

  #annotation {
    background-color: #888888;
    position: absolute;
    transform: translate(10px, 10px);
    border-radius: 10px;
    padding: 10px;
  }
  /* This keeps child nodes hidden while the element loads */
  :not(:defined) > * {
    display: none;
  }
`;

const ModelViewer = ({ glbFile, usdzFile, imageUrl, productId, displayLink }) => {
  const [stateGLB, setStateGLB] = useState('');
  return (
    <ModelStyles className='model-box'>
      <model-viewer
        id='main-viewer'
        src={stateGLB || glbFile}
        alt='YZED 3D MODEL'
        auto-rotate
        ar
        preload
        camera-controls
        ios-src={usdzFile}
        autoplay
        quick-look-browsers='safari chrome'
        background-color='#f9f9f9'></model-viewer>
    </ModelStyles>
  );
};

export default ModelViewer;
