import React from 'react';

const PencilSVG = ({ fill }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      version='1.1'
      width='15.033'
      height='14.959'
      viewBox='0 0 15.033 14.959'>
      <g id='pencil-edit-button' transform='translate(-0.001 -1.289)'>
        <path
          id='Path_136'
          data-name='Path 136'
          d='M9.348,3.785l3.058,3.058L4.666,14.584,1.609,11.526Zm5.378-.738L13.363,1.684a1.353,1.353,0,0,0-1.912,0L10.145,2.99,13.2,6.048l1.524-1.524A1.043,1.043,0,0,0,14.727,3.048ZM.009,15.824a.348.348,0,0,0,.421.414l3.408-.826L.781,12.354Z'
          transform='translate(0)'
          fill={fill ?? '#272727'}
        />
      </g>
    </svg>
  );
};

export default PencilSVG;
