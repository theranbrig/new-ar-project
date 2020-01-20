import React from 'react';

import SubscriptionForm from '../components/SubscriptionForm';
import { Helmet } from 'react-helmet';

const Subscribe = () => {
  return (
    <div>
      <Helmet>
        <title>YZED - SUBSCRIBE</title>
      </Helmet>
      <SubscriptionForm />
    </div>
  );
};

export default Subscribe;
