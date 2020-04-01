import React from 'react';

const PlusSVG = ({ fill }) => {
  return (
    <svg
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
      x='0px'
      y='0px'
      viewBox='0 0 500 500'
      fill={fill ?? '#272727'}>
      <g>
        <path
          d='M250,3c44.5,0,85.7,11.1,123.5,33.4s67.9,52.3,90.1,90.1c22.2,37.8,33.4,79,33.4,123.5s-11.1,85.7-33.4,123.5
		c-22.2,37.8-52.3,67.9-90.1,90.1c-37.8,22.2-79,33.4-123.5,33.4s-85.7-11.1-123.5-33.4c-37.8-22.2-67.9-52.3-90.1-90.1
		S3,294.5,3,250s11.1-85.7,33.4-123.5s52.3-67.9,90.1-90.1S205.5,3,250,3z M393.4,277.9v-55.8c0-3.3-1.2-6.1-3.5-8.5
		c-2.3-2.3-5.1-3.5-8.5-3.5h-91.6v-91.6c0-3.3-1.2-6.1-3.5-8.5c-2.3-2.3-5.1-3.5-8.5-3.5h-55.8c-3.3,0-6.1,1.2-8.5,3.5
		c-2.3,2.3-3.5,5.1-3.5,8.5v91.6h-91.6c-3.3,0-6.1,1.2-8.5,3.5c-2.3,2.3-3.5,5.1-3.5,8.5v55.8c0,3.3,1.2,6.1,3.5,8.5
		c2.3,2.3,5.1,3.5,8.5,3.5h91.6v91.6c0,3.3,1.2,6.1,3.5,8.5c2.3,2.3,5.1,3.5,8.5,3.5h55.8c3.3,0,6.1-1.2,8.5-3.5
		c2.3-2.3,3.5-5.1,3.5-8.5v-91.6h91.6c3.3,0,6.1-1.2,8.5-3.5C392.3,284,393.4,281.2,393.4,277.9z'
        />
      </g>
    </svg>
  );
};

export default PlusSVG;
