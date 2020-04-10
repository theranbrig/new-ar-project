import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import LoadingSpinner from '../components/LoadingSpinner';
import styled from 'styled-components';

export const UserActionStyle = styled.div`
  min-height: 90vh;
  width: 500px;
  max-width: 95%;
  padding-top: 10vh;
  margin: 0 auto;
`;

const UserAction = () => {
  const location = useLocation();
  const history = useHistory();
  const query = location.search;
  const mode = query.slice(query.indexOf('mode=') + 5, query.indexOf('oobCode') - 1);
  console.log(mode);
  useEffect(() => {
    if (mode === 'resetPassword') {
      history.push(`/reset/${query}`);
    } else {
      history.push(`/verified/${query}`);
    }
  }, []);

  return (
    <UserActionStyle>
      <LoadingSpinner color='#272727' />
    </UserActionStyle>
  );
};

export default UserAction;
