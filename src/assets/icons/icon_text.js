import React from 'react';

const TextSVG = ({ fill }) => {
  return (
    <svg
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
      x='0px'
      y='0px'
      viewBox='0 0 100 88'
      fill={fill ?? '#272727'}>
      <path
        id='Path_126'
        d='M37.6,13.2h12.3v6.1h12.3V0.9H0.7v18.4H13v-6.1h12.3v61.4H13v12.3h36.8V74.6H37.6V13.2z'
      />
      <path
        id='Path_127'
        d='M49.9,31.6v18.4h12.3v-6.1h6.1v30.7h-6.1v12.3h24.6V74.6h-6.1V43.9h6.1v6.1H99V31.6H49.9z'
      />
    </svg>
  );
};

export default TextSVG;
