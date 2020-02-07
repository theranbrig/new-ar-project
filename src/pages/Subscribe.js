import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import SubscriptionForm from '../components/SubscriptionForm';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import { FirebaseContext } from '../context/Firebase';

export const SubscriptionStyles = styled.div`
  min-height: calc(90vh - 50px);
  margin-top: calc(10vh + 50px);
`;

const Subscribe = () => {
  const history = useHistory();
  const { userData } = useContext(FirebaseContext);

  useEffect(() => {
    if (userData) {
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
