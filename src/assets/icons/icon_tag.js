import React from 'react';

const TagSVG = ({ fill }) => {
  return (
    <svg
      version='1.1'
      id='Layer_1'
      xmlns='http://www.w3.org/2000/svg'
      x='0px'
      y='0px'
      viewBox='0 0 22 22'
      fill={fill ?? '#272727'}>
      <path
        class='st0'
        d='M20.8,1L20.8,1c-0.1-0.1-0.2-0.2-0.4-0.2c0,0,0,0,0,0c-0.1,0-0.3,0.1-0.4,0.1l-1.8,1.8l0,0
	c-0.1,0-0.2-0.1-0.3-0.1l-5.4-1.3c-0.1,0-0.3,0-0.4,0c-0.5,0-0.9,0.2-1.2,0.5l-9.6,9.6c-0.7,0.7-0.7,1.8,0,2.4L8,20.5
	c0.7,0.7,1.8,0.7,2.4,0l9.6-9.6c0.4-0.4,0.6-1,0.5-1.6l-1.3-5.4c0-0.1-0.1-0.2-0.1-0.3l0,0l1.8-1.8C21.1,1.5,21.1,1.2,20.8,1z
	 M19.5,9.5c0.1,0.2,0,0.5-0.2,0.6l-9.6,9.6C9.6,19.9,9.4,20,9.2,20c-0.2,0-0.3-0.1-0.5-0.2L2,13c-0.3-0.3-0.3-0.7,0-0.9l9.6-9.6
	c0.2-0.2,0.4-0.2,0.6-0.2l5.2,1.3l-1.6,1.6l0,0c-0.9-0.4-1.9,0-2.3,0.8c-0.4,0.9,0,1.9,0.8,2.3c0.9,0.4,1.9,0,2.3-0.8
	c0.2-0.5,0.2-1,0-1.5l0,0l0,0l1.5-1.5l0,0.1L19.5,9.5z M15.6,7.1L15.6,7.1c-0.1,0.1-0.3,0.2-0.5,0.2c0,0,0,0,0,0
	c-0.2,0-0.3-0.1-0.5-0.2s-0.2-0.3-0.2-0.5c0-0.2,0.1-0.3,0.2-0.5c0.3-0.3,0.7-0.3,0.9,0C15.9,6.4,15.9,6.9,15.6,7.1z'
      />
    </svg>
  );
};

export default TagSVG;