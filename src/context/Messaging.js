import React, { useContext, useEffect, useState } from 'react';

import { FirebaseContext } from './Firebase';
import PropTypes from 'prop-types';

export const MessagingContext = React.createContext();

const MessagingProvider = ({ children }) => {
  const { messaging } = useContext(FirebaseContext);

  messaging
    .getToken()
    .then((currentToken) => {
      if (currentToken) {
        console.log(currentToken);
        // sendTokenToServer(currentToken);
        // updateUIForPushEnabled(currentToken);
      } else {
        // Show permission request.
        console.log('No Instance ID token available. Request permission to generate one.');
        // Show permission UI.
        // updateUIForPushPermissionRequired();
        // setTokenSentToServer(false);
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // showToken('Error retrieving Instance ID token. ', err);
      // setTokenSentToServer(false);
    });

  return <MessagingContext.Provider value={{}}>{children}</MessagingContext.Provider>;
};

MessagingProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MessagingProvider;
