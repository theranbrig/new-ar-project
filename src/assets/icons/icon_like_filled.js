import React from 'react';

const LikeFilledSVG = ({ fill }) => {
  return (
    <svg
      version='1.1'
      id='Layer_1'
      xmlns='http://www.w3.org/2000/svg'
      x='0px'
      y='0px'
      viewBox='0 0 100 90'
      fill={fill ?? '#272728'}>
      <path
        d='M91.2,9.6l-0.1-0.1C80.5-0.9,63.5-0.8,53.1,9.6l-3,3l-3-3C41.9,4.3,35,1.7,28,1.7c-6.9,0-13.7,2.6-19,7.8
	C-1.4,20-1.4,37.1,9,47.6l39.3,39.3c0.5,0.5,1.1,0.7,1.7,0.7c0,0,0,0,0,0c0.6,0,1.2-0.2,1.6-0.6l0.1-0.2l0.1,0l39.3-39.1
	C101.6,37.2,101.6,20.1,91.2,9.6z'
      />
    </svg>
  );
};

export default LikeFilledSVG;
