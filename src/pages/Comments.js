import Comments from '../components/Comments';
import React from 'react';
import { motion } from 'framer-motion';

const CommentsPage = () => {
  return (
    <motion.div
      exit={{ opacity: 0, x: '-100vw' }}
      initial={{ opacity: 0, x: '100vw' }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: 'spring', ease: 'linear', duration: 1, mass: 0.5 }}>
      <Comments />
    </motion.div>
  );
};

export default CommentsPage;
