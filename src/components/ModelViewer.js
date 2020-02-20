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
  const modelRef = useRef();
  const history = useHistory();
  useEffect(() => {
    console.log(modelRef.current);
  }, []);
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
        // preload
        // poster={imageUrl}
        quick-look-browsers='safari chrome'
        background-color='#f9f9f9'>
        <button
          slot='hotspot-1'
          class='hotspot selected'
          data-position='0.12446960685748254m 1.4896254801885986m 0.11368804288643726m'
          data-normal='0.005416552972374527m 0.0027649588370324946m 0.007938259623232084m'>
          <div class='annotation'>
            Data Point 1
          </div>
        </button>
        14:57
        <button
          slot='hotspot-2'
          class='hotspot'
          data-position='-0.0039991678509073m 1.3915419089310619m 0.1300058148036727m'
          data-normal='0.00037976944687782686m -0.000608202295199752m 0.009974260496678435m'>
          <div class='annotation'>
            Data Point 2
          </div>
        </button>
        14:57
        <button
          slot='hotspot-3'
          class='hotspot'
          data-position='-0.10422958659488071m 0.76324508328912m 0.08550504012436738m'
          data-normal='-0.0014256815837419426m -0.000012585993626808979m 0.009897842242836668m'>
          <div class='annotation'>
            Data Point 3
          </div>
        </button>
      </model-viewer>
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
      </model-viewer>*/}
      {/* <model-viewer
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
          data-visibility-attribute='visible'
          onClick={() => history.push('/shop')}></button>
      </model-viewer> */}
    </ModelStyles>
  );
};

export default ModelViewer;
