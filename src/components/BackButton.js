import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

export const BackButtonStyles = styled.div`
  margin-top: 10px;
  text-align: left;
  button {
    border: none;
    background: white;
    .fa-chevron-left {
      font-size: 1.4rem;
    }
  }
`;

const BackButton = () => {
  const history = useHistory();
  return (
    <BackButtonStyles>
      <button onClick={() => history.goBack()} aria-label='Back Button'>
        <i className='fa fa-chevron-left' aria-hidden='true'></i>
      </button>
    </BackButtonStyles>
  );
};

export default BackButton;
