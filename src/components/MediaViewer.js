import React from 'react';

const MediaViewer = ({ glbFile, usdzFile }) => {
  return (
    <div className='model-box'>
      <model-viewer
        id='main-viewer'
        src={glbFile}
        alt='A 3D model of an astronaut'
        auto-rotate
        ar
        shadow-intensity='1'
        camera-controls
        ios-src={usdzFile}
        preload
        background-color='#f9f9f9'></model-viewer>
    </div>
  );
};

export default MediaViewer;
