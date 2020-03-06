import ChevronLeft from '../assets/icons/icon_chevron_left';
import ChevronRight from '../assets/icons/icon_chevron_right';
import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

export const BackButtonStyles = styled.div`
  text-align: left;
  background: transparent;
  button {
    border: none;
    background: transparent;
    height: 16px;
    width: 16px;
    svg {
      height: 14px;
    }
  }
`;

const BackButton = () => {
  const history = useHistory();
  return (
    <BackButtonStyles>
      <button
        onClick={() => {
          document.body.style.overflow = 'unset';
          history.goBack();
        }}
        aria-label='Back Button'>
        <ChevronLeft />
      </button>
    </BackButtonStyles>
  );
};

export default BackButton;
