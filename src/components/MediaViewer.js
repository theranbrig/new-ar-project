import React from 'react';
import { Helmet } from 'react-helmet';

const MediaViewer = () => {
  return (
    <div className='model-box'>
      <Helmet>
        {/* <!-- Loads <model-viewer> for modern browsers: --> */}
        <script
          type='module'
          src='https://unpkg.com/@google/model-viewer/dist/model-viewer.js'></script>
        {/* <!-- Loads <model-viewer> for old browsers like IE11: --> */}
        <script
          nomodule
          src='https://unpkg.com/@google/model-viewer/dist/model-viewer-legacy.js'></script>
        {/* <!-- The following libraries and polyfills are recommended to maximize browser support -->
            <!-- NOTE: you must adjust the paths as appropriate for your project -->
            <!-- 🚨 REQUIRED: Web Components polyfill to support Edge and Firefox < 63 --> */}
        <script src='https://unpkg.com/@webcomponents/webcomponentsjs@2.1.3/webcomponents-loader.js'></script>
        {/* <!-- 💁 OPTIONAL: Intersection Observer polyfill for better performance in Safari and IE11 --> */}
        <script src='https://unpkg.com/intersection-observer@0.5.1/intersection-observer.js'></script>
        {/* <!-- 💁 OPTIONAL: Resize Observer polyfill improves resize behavior in non-Chrome browsers --> */}
        <script src='https://unpkg.com/resize-observer-polyfill@1.5.1/dist/ResizeObserver.js'></script>
        {/* <!-- 💁 OPTIONAL: Fullscreen polyfill is required for experimental AR features in Canary --> */}
        <script src='https://unpkg.com/fullscreen-polyfill@1.0.2/dist/fullscreen.polyfill.js'></script>
        {/* <!-- 💁 OPTIONAL: Include prismatic.js for Magic Leap support --> */}
        <script src='https://unpkg.com/@magicleap/prismatic@0.18.2/prismatic.min.js'></script>
      </Helmet>
      <model-viewer
        id='main-viewer'
        src='https://res.cloudinary.com/dq7uyauun/raw/upload/v1579138896/Astronaut.glb'
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
