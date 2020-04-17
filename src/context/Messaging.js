import React, { useContext, useEffect, useState } from 'react';

import { FirebaseContext } from './Firebase';
import PropTypes from 'prop-types';

export const MessagingContext = React.createContext();

const MessagingProvider = ({ children }) => {
  const { messaging } = useContext(FirebaseContext);

  messaging
    .requestPermission()
    .then(() => {
      return messaging
        .getToken()
        .then((token) => console.log(token))
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));

  return <MessagingContext.Provider value={{}}>{children}</MessagingContext.Provider>;
};

MessagingProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MessagingProvider;
