import React from 'react';

const TagFilledSVG = ({ fill }) => {
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
          d='M1,10.2C1,5.1,5.1,1,10.2,1h39.1c2.1,0,5,1.2,6.5,2.7l40.6,40.6c3.6,3.6,3.6,9.4,0,13L57.2,96.3c-3.6,3.6-9.4,3.6-13,0
		L3.7,55.8C2.2,54.3,1,51.4,1,49.3V10.2z M13.2,22.4c0,5.1,4.1,9.2,9.2,9.2s9.2-4.1,9.2-9.2s-4.1-9.2-9.2-9.2S13.2,17.4,13.2,22.4z'
        />
      </g>
    </svg>
  );
};

export default TagFilledSVG;
