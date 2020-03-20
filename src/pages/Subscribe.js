import React, { useContext, useEffect } from 'react';

import { FirebaseContext } from '../context/Firebase';
import { Helmet } from 'react-helmet';
import SubscriptionForm from '../components/SubscriptionForm';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

export const SubscriptionStyles = styled.div`
  min-height: calc(90vh - 50px);
  margin-top: calc(10vh + 50px);
`;

const Subscribe = () => {
  const history = useHistory();
  const { userData } = useContext(FirebaseContext);

  useEffect(() => {
    if (userData.loggedIn) {
      history.push('/');
    }
  }, [userData]);
  
  return (
    <SubscriptionStyles>
      <Helmet>
        <title>YZED - SUBSCRIBE</title>
      </Helmet>
      <SubscriptionForm />
    </SubscriptionStyles>
  );
};

export default Subscribe;
