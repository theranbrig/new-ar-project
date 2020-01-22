import React from 'react';
import styled from 'styled-components';

import SubscriptionForm from '../components/SubscriptionForm';
import { Helmet } from 'react-helmet';

export const SubscriptionStyles = styled.div`
  min-height: calc(90vh - 50px);
`;

const Subscribe = () => {
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
