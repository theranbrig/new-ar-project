import React, { useContext, useEffect, useState } from 'react';

import CloseSVG from '../assets/icons/icon_close';
import { FirebaseContext } from '../context/Firebase';
import styled from 'styled-components';

export const ErrorStyles = styled.div`
  width: 90%;
  border: 1px solid tomato;
  color: tomato;
  font-family: ${props => props.theme.fonts.main};
  margin: 20px auto;
  padding: 10px;
  .top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    text-align: center;
    button {
      border: none;
      background: transparent;
      svg {
        height: 12px;
      }
    }
    h4 {
      margin: 0;
    }
    h4,
  }
  p {
    text-align: center;
    margin: 0;
  }
`;

const Error = ({ error, clearFunction }) => {
  const { setFirebaseError } = useContext(FirebaseContext);
  return (
    <ErrorStyles>
      <div className='top'>
        <div className='left'></div>
        <h4>Oops!</h4>
        <button
          onClick={() => {
            setFirebaseError('');
            if (clearFunction) {
              clearFunction('');
            }
          }}>
          <CloseSVG fill='tomato' />
        </button>
      </div>
      <p>{error}</p>
    </ErrorStyles>
  );
};

export default Error;
