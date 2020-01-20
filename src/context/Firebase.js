import * as firebase from 'firebase/app';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '@firebase/firestore';
import 'firebase/auth';

const dotenv = require('dotenv');

dotenv.config();

// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_authDomain,
  databaseURL: process.env.REACT_APP_databaseURL,
  projectId: 'yzed-a8bd1',
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_Id,
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const FirebaseContext = React.createContext();

const dbh = firebase.firestore();

const FirebaseProvider = ({ children }) => {
  const [firebaseError, setFirebaseError] = useState(null);
  const [userData, setUserData] = useState(null);

  const registerUser = (email, password) => {
    console.log(email);
    console.log(password);
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(function(error) {
        setFirebaseError(error.message);
      });
  };

  const loginUser = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(function(error) {
        setFirebaseError(error.message);
      });
  };

  const addToCart = (userId, productId, size) => {
    dbh
      .collection('cartItems')
      .doc()
      .set({ userId, productId, size });
  };

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      setUserData(user);
    } else {
      setUserData(null);
    }
  });

  return (
    <FirebaseContext.Provider
      value={{
        firebaseError,
        registerUser,
        userData,
        loginUser,
        addToCart,
      }}>
      {children}
    </FirebaseContext.Provider>
  );
};

FirebaseProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FirebaseProvider;
