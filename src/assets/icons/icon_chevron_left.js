import React from 'react';

const ChevronLeft = ({ fill }) => {
  return (
    <svg
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
      x='0px'
      y='0px'
      viewBox='0 0 100 100'
      fill={fill ?? '#272727'}>
      <polygon
        points='78,6.8 71.4,0.3 26.5,45.2 24.9,46.8 24.9,46.8 21.6,50.1 24.9,53.4 24.9,53.4 71.4,100 78,93.4
	34.7,50.1 '
      />
    </svg>
  );
};

export default ChevronLeft;
