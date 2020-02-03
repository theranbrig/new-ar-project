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

  const registerUser = (email, password, userName, firstName, lastName) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        dbh
          .collection('users')
          .doc(firebase.auth().currentUser.uid)
          .set({ userName, firstName, lastName, role: 'ADMIN' });
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

  const addToCart = (userId, productId, size) => {
    dbh
      .collection('cartItems')
      .doc()
      .set({ userId, productId, size });
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

  // FIREBASE PRODUCT MUTATIONS

  const createProduct = (
    name,
    brand,
    mainImage,
    color,
    price,
    sizes,
    glbFile,
    usdzFile,
    pictures,
    productInformation
  ) => {
    dbh
      .collection('products')
      .doc()
      .set({
        name,
        brand,
        mainImage,
        color,
        price,
        sizes,
        glbFile,
        usdzFile,
        pictures,
        productInformation,
      })
      .catch(err => console.log(err));
  };

  return (
    <FirebaseContext.Provider
      value={{
        firebaseError,
        registerUser,
        userData,
        loginUser,
        addToCart,
        dbh,
        logoutUser,
        createProduct,
      }}>
      {children}
    </FirebaseContext.Provider>
  );
};

FirebaseProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FirebaseProvider;
