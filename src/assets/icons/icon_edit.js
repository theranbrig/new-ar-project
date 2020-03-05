import React from 'react';

const EditSVG = ({ fill }) => {
  return (
    <svg
      version='1.1'
      id='Layer_1'
      xmlns='http://www.w3.org/2000/svg'
      x='0px'
      y='0px'
      viewBox='0 0 100 100'
      fill={fill ?? '#272727'}>
      <g>
        <path
          d='M81.3,43.1L27.8,96.5L5.8,99c-2.9,0.3-5.4-2.2-5.1-5.1l2.4-22l53.5-53.5L81.3,43.1z M96.5,27.8L85.6,38.7L61,14.1L71.9,3.2
		c3.6-3.6,9.5-3.6,13.1,0l11.6,11.6C100.1,18.4,100.1,24.2,96.5,27.8z'
        />
      </g>
    </svg>
  );
};

export default EditSVG;
