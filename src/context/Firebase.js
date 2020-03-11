import '@firebase/firestore';
import '@firebase/storage';
import '@firebase/analytics';
import 'firebase/auth';

import * as firebase from 'firebase/app';

import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';

const dotenv = require('dotenv');

dotenv.config();

// Initialize Firebase
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_authDomain,
//   databaseURL: process.env.REACT_APP_databaseURL,
//   projectId: process.env.REACT_APP_projectId,
//   storageBucket: process.env.REACT_APP_storageBucket,
//   messagingSenderId: process.env.REACT_APP_messagingSenderId,
//   appId: process.env.REACT_APP_appId,
//   measurementId: process.env.REACT_APP_measurementId,
// };
var firebaseConfig = {
  apiKey: 'AIzaSyAYiNWn_X3jRoUx7ZHQMKbrRiqZ4VdVGZ0',
  authDomain: 'yzed-88819.firebaseapp.com',
  databaseURL: 'https://yzed-88819.firebaseio.com',
  projectId: 'yzed-88819',
  storageBucket: 'yzed-88819.appspot.com',
  messagingSenderId: '132184777145',
  appId: '1:132184777145:web:b78abdf732a15aea711668',
  measurementId: 'G-E3SK8D4LDM',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const FirebaseContext = React.createContext();

export const dbh = firebase.firestore();

export const storage = firebase.storage();

const FirebaseProvider = ({ children }) => {
  const [firebaseError, setFirebaseError] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const [userData, setUserData] = useState({
    id: '',
    loggedIn: false,
    userName: '',
    role: '',
    description: '',
    photo: [],
    followers: [],
    favoriteProducts: [],
  });

  firebase.analytics().logEvent('notification_received');

  const registerUser = (email, password, userName) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        dbh
          .collection('users')
          .doc(firebase.auth().currentUser.uid)
          .set({
            userName,
            role: 'USER',
            photoLikes: [],
            followers: [],
            favoriteProducts: [],
            photo: 'https://oneoone-resource.s3.ap-northeast-2.amazonaws.com/yzed/icon_user.png',
          })
          .then(() => {
            dbh
              .collection('newsletterSubscriptions')
              .doc()
              .set({ age: null, name: userName, email, gender: '' });
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

  const forgotEmail = (email, callback) => {
    var actionCodeSettings = {
      // After password reset, the user will be give the ability to go back
      // to this page.
      url: 'http://localhost:3000/login',
      handleCodeInApp: true,
    };
    firebase
      .auth()
      .sendPasswordResetEmail(email, actionCodeSettings)
      .then(function() {
        callback(true);
      })
      .catch(function(error) {
        setFirebaseError(error.message);
      });
  };

  const onAuthStateChange = async callback => {
    setUserLoading(true);
    await firebase.auth().onAuthStateChanged(user => {
      if (user) {
        dbh
          .collection('users')
          .doc(user.uid)
          .onSnapshot(doc => {
            if (doc.exists) {
              const {
                userName,

                role,
                description,
                photo,
                followers,
                favoriteProducts,
              } = doc.data();
              const userDetails = {
                id: user.uid,
                email: user.email,
                userName,
                role,
                description,
                photo,
                followers,
                favoriteProducts,
              };
              callback({ loggedIn: true, id: user.uid, ...userDetails });
              setUserLoading(false);
            }
          });
      } else {
        callback({
          loggedIn: false,
          id: '',
          userName: '',
          role: '',
          description: '',
          photo: [],
          followers: [],
        });
        setUserLoading(false);
      }
    });
  };

  useEffect(() => {
    setUserLoading(true);
    onAuthStateChange(setUserData);
    return () => {
      onAuthStateChange(setUserData);
    };
  }, []);

  const uploadUserPhoto = (currentPictureUrl, description, taggedProducts) => {
    if (currentPictureUrl.length && userData && description.length && taggedProducts.length) {
      dbh
        .collection('userPhotos')
        .doc()
        .set({
          url: currentPictureUrl,
          userId: userData.id,
          tags: taggedProducts,
          description,
          likes: [],
          addedOn: new Date(),
        })
        .then(() => {
          onAuthStateChange(setUserData);
        });
    }
  };

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
        userLoading,
        uploadUserPhoto,
        forgotEmail,
      }}>
      {children}
    </FirebaseContext.Provider>
  );
};

FirebaseProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FirebaseProvider;
