import React, { useContext, useEffect } from 'react';

import { FirebaseContext } from '../context/Firebase';
import { Helmet } from 'react-helmet';
import SubscriptionForm from '../components/SubscriptionForm';
import TopTitle from '../components/TopTitle';
import { motion } from 'framer-motion';
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
    <motion.div
      exit={{ opacity: 0, x: '100vw' }}
      initial={{ opacity: 0, x: '-100vw' }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: 'spring', ease: 'easeIn', duration: 1, mass: 0.5 }}>
      <SubscriptionStyles>
        <Helmet>
          <title>YZED - SUBSCRIBE</title>
        </Helmet>
        <TopTitle title='Subscribe to YZED' />
        <SubscriptionForm />
      </SubscriptionStyles>
    </motion.div>
  );
};

export default Subscribe;
