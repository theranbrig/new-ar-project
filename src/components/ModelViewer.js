import React from 'react';

const ModelViewer = ({ glbFile, usdzFile, imageUrl }) => {
  return (
    <div className='model-box'>
      <model-viewer
        id='main-viewer'
        src={glbFile}
        alt='YZED 3D MODEL'
        auto-rotate
        ar
        camera-controls
        ios-src={usdzFile}
        preload
        poster={imageUrl}
        background-color='#f9f9f9'></model-viewer>
    </div>
  );
};

export default ModelViewer;
