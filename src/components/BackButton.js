import React, { useContext } from 'react';

import ChevronLeft from '../assets/icons/icon_chevron_left';
import { FirebaseContext } from '../context/Firebase';
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

const BackButton = ({ link }) => {
  const { setFirebaseError } = useContext(FirebaseContext);
  const history = useHistory();
  return (
    <BackButtonStyles>
      <button
        onClick={() => {
          document.body.style.overflow = 'unset';
          if (link) {
            history.push(link);
          } else {
            history.goBack();
          }
          setFirebaseError('');
        }}
        aria-label='Back Button'>
        <ChevronLeft />
      </button>
    </BackButtonStyles>
  );
};

export default BackButton;
