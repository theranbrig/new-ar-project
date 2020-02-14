import * as firebase from 'firebase/app';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '@firebase/firestore';
import '@firebase/storage';
import 'firebase/auth';

const dotenv = require('dotenv');

dotenv.config();

// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_authDomain,
  databaseURL: process.env.REACT_APP_databaseURL,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const FirebaseContext = React.createContext();

export const dbh = firebase.firestore();

export const storage = firebase.storage();

const FirebaseProvider = ({ children }) => {
  const [firebaseError, setFirebaseError] = useState(null);
  const [userData, setUserData] = useState(null);

  const registerUser = (email, password, userName, firstName, lastName) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        dbh
          .collection('users')
          .doc(firebase.auth().currentUser.uid)
          .set({ userName, firstName, lastName, role: 'ADMIN' })
          .then(() => {
            dbh
              .collection('newsletterSubscriptions')
              .doc()
              .set({ age: null, name: `${firstName} ${lastName}`, email, gender: '' });
          });
      })
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

  const logoutUser = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      firebase
        .auth()
        .signOut()
        .catch(function(error) {
          setFirebaseError(error.message);
        });
    }
  };

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      const userId = dbh.collection('users').doc(firebase.auth().currentUser.uid);
      let userDetails;
      userId
        .get()
        .then(doc => {
          if (doc.exists) {
            const { userName, firstName, lastName, role } = doc.data();
            userDetails = { id: user.uid, email: user.email, userName, firstName, lastName, role };
            if (!userData) {
              let tempCart = [];
              setUserData(userDetails);
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
      console.log(userData);
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
        dbh,
        logoutUser,
        firebase,
        storage,
      }}>
      {children}
    </FirebaseContext.Provider>
  );
};

FirebaseProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FirebaseProvider;
