import React from 'react';

const ModelViewer = ({ glbFile, usdzFile, imageUrl }) => {
  return (
    <div className='model-box'>
      <model-viewer
        id='main-viewer'
        src={glbFile}
        alt='A 3D model of an astronaut'
        auto-rotate
        ar
        // shadow-intensity='1'
        // exposure='0.1'
        camera-controls
        ios-src={usdzFile}
        preload
        poster={imageUrl}
        background-color='#f9f9f9'></model-viewer>
    </div>
  );
};

export default ModelViewer;
