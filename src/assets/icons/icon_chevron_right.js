import React from 'react';

const ChevronRight = ({ fill }) => {
  return (
    <svg
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
      x='0px'
      y='0px'
      viewBox='0 0 58 100'
      fill={fill ?? '#272727'}>
      <polygon
        className='st0'
        points='0.6,6.8 7.1,0.3 52.1,45.2 53.7,46.8 53.7,46.8 57,50.1 53.7,53.4 53.7,53.4 7.1,100 0.6,93.4
	43.8,50.1 '
      />
    </svg>
  );
};

export default ChevronRight;
