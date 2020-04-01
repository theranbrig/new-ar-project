import React from 'react';

const FilledUpVoteSVG = ({ fill }) => {
  return (
    <svg
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
      x='0px'
      y='0px'
      viewBox='0 0 16 17'
      fill={fill ?? '#272727'}>
      <path
        className='st0'
        d='M15.1,7.6l-6.9-7c-0.1-0.1-0.3-0.1-0.5,0l-6.9,7C0.7,7.6,0.7,7.7,0.7,7.8C0.7,8,0.8,8.2,1,8.2h3.1h0.4v7.9
	c0,0.1,0,0.2,0.1,0.2s0.1,0.1,0.2,0.1h6c0.2,0,0.3-0.2,0.3-0.3V8.2h3.7c0.1,0,0.2,0,0.3-0.1c0.1-0.1,0.1-0.2,0.1-0.2
	C15.2,7.7,15.2,7.7,15.1,7.6z'
      />
    </svg>
  );
};

export default FilledUpVoteSVG;
