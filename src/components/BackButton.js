import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import ChevronUp from '../assets/icons/icon_chevron_up';


export const BackButtonStyles = styled.div`
  text-align: left;
  background: ${props => props.theme.colors.white};
  button {
    border: none;
    background: transparent;
    height: 40px;
    width: 40px;
    padding: 0;
    svg {
      height: 20px;
    }
  }
`;

const BackButton = () => {
  const history = useHistory();
  return (
    <BackButtonStyles>
      <button onClick={() => history.goBack()} aria-label='Back Button'>
        <ChevronUp />
      </button>
    </BackButtonStyles>
  );
};

export default BackButton;
