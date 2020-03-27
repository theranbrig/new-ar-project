import React, { useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import ChevronLeft from '../assets/icons/icon_chevron_left';
import { FirebaseContext } from '../context/Firebase';
import { Link } from 'react-tiger-transition';
import styled from 'styled-components';
import { useLastLocation } from 'react-router-last-location';

export const BackButtonStyles = styled.div`
  text-align: left;
  background: transparent;
  a {
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
  const { setFirebaseError } = useContext(FirebaseContext);
  const history = useHistory();
  const location = useLocation();
  const lastLocation = useLastLocation();

  return (
    <BackButtonStyles>
      <Link
        transition='glide-right'
        onClick={() => {
          document.body.style.overflow = 'unset';
          setFirebaseError('');
        }}
        to={lastLocation ? `${lastLocation.pathname}` : '/'}
        aria-label='Back Button'>
        <ChevronLeft />
      </Link>
    </BackButtonStyles>
  );
};

export default BackButton;
