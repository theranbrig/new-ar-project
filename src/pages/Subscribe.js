import React, { useContext, useEffect } from 'react';

import { FirebaseContext } from '../context/Firebase';
import { Helmet } from 'react-helmet';
import SubscriptionForm from '../components/SubscriptionForm';
import TopTitle from '../components/TopTitle';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

export const SubscriptionStyles = styled.div`
  min-height: calc(90vh);
  margin-top: calc(10vh);
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
      <TopTitle title='Subscribe to YZED' />
      <SubscriptionForm />
    </SubscriptionStyles>
  );
};

export default Subscribe;
