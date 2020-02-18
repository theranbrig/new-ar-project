import React, { useState, useRef, useEffect } from 'react';

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
  const modelRef = useRef();
  const history = useHistory();
  useEffect(() => {
    console.log(modelRef.current);
  }, []);
  return (
    <ModelStyles className='model-box'>
      {/* <model-viewer
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
        background-color='#f9f9f9'>
        {/* {displayLink && (
          <button
            onClick={() =>
              setStateGLB(
                'https://oneoone-resource.s3.ap-northeast-2.amazonaws.com/yzed/GLTF_FEB6_JUMPERJACKET_V3.gltf'
              )
            }>
            Change
          </button>
        )}
      </model-viewer> */}
      <model-viewer
        id='hotspot-demo'
        camera-controls
        src='../assets/images/Astronaut.glb'
        alt='A 3D model of an astronaut.'>
        <button slot='hotspot-visor' data-position='0 1.75 0.35' data-normal='0 0 1'></button>
        <button slot='hotspot-hand' data-position='-0.55 0.95 0.1' data-normal='-1 0 1'>
          <div id='annotation'>This hotspot disappears completely</div>
        </button>
        <button
          slot='hotspot-foot'
          data-position='0.16 0.11 0.15'
          data-normal='0 1 0.75'
          data-visibility-attribute='visible'></button>
        <button slot='hotspot-visor' data-position='0 1.75 0.35' data-normal='0 0 1'></button>
      </model-viewer>
      <button slot='hotspot-visor' data-position='0 1.75 0.35' data-normal='0 0 1'></button>
      <button slot='hotspot-hand' data-position='-0.55 0.95 0.1' data-normal='-1 0 1'>
        <div id='annotation'>This hotspot disappears completely</div>
      </button>
      <button
        slot='hotspot-foot'
        data-position='0.16 0.11 0.15'
        data-normal='0 1 0.75'
        data-visibility-attribute='visible'></button>
    </ModelStyles>
  );
};

export default ModelViewer;
