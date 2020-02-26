import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import ChevronLeft from '../assets/icons/icon_chevron_left';
import ChevronRight from '../assets/icons/icon_chevron_right';

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
      <button onClick={() => history.goBack()} aria-label='Back Button'>
        <ChevronLeft />
      </button>
    </BackButtonStyles>
  );
};

export default BackButton;
