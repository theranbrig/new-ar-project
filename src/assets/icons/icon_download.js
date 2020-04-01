import React from 'react';

const DownloadSVG = ({ fill }) => {
  return (
    <svg
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
      x='0px'
      y='0px'
      viewBox='0 0 100 100'
      fill={fill ?? '#272727'}>
      <g>
        <path
          d='M50,99C22.9,99,0.9,77,0.9,49.8S22.9,0.7,50,0.7s49.2,22,49.2,49.2S77.2,99,50,99z M41.3,49.8H27.3c-2.1,0-3.2,2.6-1.7,4.1
		l22.8,22.7c0.9,0.9,2.4,0.9,3.3,0l22.8-22.7c1.5-1.5,0.4-4.1-1.7-4.1h-14v-23c0-1.3-1.1-2.4-2.4-2.4H43.7c-1.3,0-2.4,1.1-2.4,2.4
		V49.8z'
        />
      </g>
    </svg>
  );
};

export default DownloadSVG;
