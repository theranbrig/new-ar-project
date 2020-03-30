import 'react-lazy-load-image-component/src/effects/blur.css';

import React, { useContext, useEffect } from 'react';

import { FirebaseContext } from '../context/Firebase';
import Following from '../components/Following';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';

const Threads = () => {
  const { dbh } = useContext(FirebaseContext);

  const { userId } = useParams();

  useEffect(() => {
    var expires = new Date(Date.now() + 86400 * 100000).toUTCString();
    const match = document.cookie.match(new RegExp('(^| )lastVisitDate=([^;]+)'));
    if (match) {
      if (match[2]) {
        document.cookie = 'previousVisitDate=' + match[2] + '; path=/threads; ;expires=' + expires;
      }
    }
    document.cookie = 'lastVisitDate=' + Date.now() + '; path=/threads; expires=' + expires;
    const lastLogin = document.cookie.match(new RegExp('(^| )previousVisitDate=([^;]+)'));
    if (lastLogin) {
      dbh
        .collection('users')
        .doc(userId)
        .update({ lastLogin: lastLogin[2] });
    }
  }, []);

  return (
    <motion.div
      exit={{ opacity: 0, x: '-100vw' }}
      initial={{ opacity: 0, x: '100vw' }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: 'spring', ease: 'easeIn', duration: 1, mass: 0.5 }}>
      <Following userId={userId} />;
    </motion.div>
  );
};

export default Threads;
