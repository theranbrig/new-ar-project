import React, { useState } from 'react';

import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

export const ModelStyles = styled.div`
  button {
    position: absolute;
    bottom: 5px;
    left: 10%;
    width: 80%;
    border: none;
    border-radius: 0px;
    font-family: Montserrat, sans-serif;
    font-size: 1.2rem;
  }
`;

const ModelViewer = ({ glbFile, usdzFile, imageUrl, productId, displayLink }) => {
  const [stateGLB, setStateGLB] = useState('');
  const history = useHistory();
  return (
    <ModelStyles className='model-box'>
      <model-viewer
        id='main-viewer'
        src={stateGLB || glbFile}
        alt='YZED 3D MODEL'
        auto-rotate
        ar
        camera-controls
        ios-src={usdzFile}
        preload
        poster={imageUrl}
        quick-look-browsers='safari chrome'
        background-color='#f9f9f9'
        animation-name='updown'></model-viewer>
    </ModelStyles>
  );
};

export default ModelViewer;
