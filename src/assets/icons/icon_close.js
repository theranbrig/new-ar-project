import React from 'react';

const CloseSVG = ({ fill }) => {
  return (
    <svg
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
      x='0px'
      y='0px'
      viewBox='0 0 22 22'
      fill={fill ?? '#272727'}>
      <polygon points='21.6,1.3 20.9,0.6 11.2,10.3 1.6,0.6 0.9,1.3 10.5,11 0.9,20.6 1.6,21.3 11.2,11.7 20.9,21.3 21.6,20.6 11.9,11 ' />
    </svg>
  );
};

export default CloseSVG;
