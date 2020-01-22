import React from 'react';

const MediaViewer = () => {
  return (
    <div className='model-box'>
      <model-viewer
        id='main-viewer'
        src='https://res.cloudinary.com/dq7uyauun/raw/upload/v1579138896/Astronaut.glb'
        // src='https://oneoone-resource.s3.ap-northeast-2.amazonaws.com/3d/GLTF_LOWPUFFERQUAD4.gltf'
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
  );
};

export default MediaViewer;
