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
        .then((token) => {
          console.log(token);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));

  messaging.onTokenRefresh(() => {
    messaging
      .getToken()
      .then((refreshedToken) => {
        console.log('Token refreshed.');
        console.log(refreshedToken);
        // Indicate that the new Instance ID token has not yet been sent to the
        // app server.
        // setTokenSentToServer(false);
        // Send Instance ID token to app server.
        // sendTokenToServer(refreshedToken);
        // ...
      })
      .catch((err) => {
        console.log('Unable to retrieve refreshed token ', err);
        // showToken('Unable to retrieve refreshed token ', err);
      });
  });

  messaging.onMessage(function (payload) {
    console.log('Message received. ', payload);
  });

  return <MessagingContext.Provider value={{}}>{children}</MessagingContext.Provider>;
};

MessagingProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MessagingProvider;
