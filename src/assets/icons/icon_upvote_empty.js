import React from 'react';

const EmptyUpVoteSVG = ({ fill }) => {
  return (
    <svg
      version='1.1'
      id='Layer_1'
      xmlns='http://www.w3.org/2000/svg'
      x='0px'
      y='0px'
      viewBox='0 0 84.8 92.7'
      fill={fill ?? '#272727'}>
      <path
        class='st0'
        d='M83.4,41.3L43.5,1.1c-0.8-0.7-2-0.7-2.8,0L0.9,41.2c-0.3,0.3-0.5,0.8-0.5,1.3c0,1.1,0.8,2,2,2.1h18h2V90
	c0,0.5,0.2,1,0.6,1.4c0.4,0.4,0.9,0.6,1.4,0.6H59c1.1,0,1.9-0.9,1.9-1.9V44.6H82c0.7,0,1.1-0.2,1.5-0.6c0.4-0.4,0.5-0.9,0.5-1.4
	C84,42.1,83.8,41.6,83.4,41.3z M59,40.6c-0.5,0-1,0.2-1.4,0.6c-0.4,0.4-0.6,0.9-0.6,1.4V88l-29.7-0.2h-1.1l0-2.6l0,0V42.6
	c0-1.1-0.9-2-1.9-2H7L42.1,5.3l35.2,35.3H59z'
      />
    </svg>
  );
};

export default EmptyUpVoteSVG;