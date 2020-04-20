import '@firebase/firestore';
import '@firebase/storage';
import '@firebase/analytics';
import '@firebase/messaging';
import 'firebase/auth';

import * as firebase from 'firebase/app';

import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';

const dotenv = require('dotenv');

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_authDomain,
  databaseURL: process.env.REACT_APP_databaseURL,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId,
  vapidKey: process.env.REACT_APP_fcm_key,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const FirebaseContext = React.createContext();

const dbh = firebase.firestore();

const storage = firebase.storage();

let messaging;
if (firebase.messaging.isSupported()) {
  messaging = firebase.messaging();
}

if (messaging) {
  messaging.usePublicVapidKey(process.env.REACT_APP_fcm_key);
}

const FirebaseProvider = ({ children }) => {
  const [firebaseError, setFirebaseError] = useState('');
  const [userLoading, setUserLoading] = useState(true);
  const [userValidated, setUserValidated] = useState(false);
  const [messagingToken, setMessagingToken] = useState('');
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
  const [message, setMessage] = useState(null);

  firebase.analytics().logEvent('notification_received');

  if (messaging) {
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
      setMessage(payload);
    });
  }

  const verifiedRegister = (email, password, userName) => {
    //  Check if user name is taken.
    dbh
      .collection('users')
      .where('userName', '==', userName)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.docs.length) {
          setFirebaseError('Someone has already taken that username.');
        } else {
          // Sign up user and create user in db. Send user data validation.
          firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((user) => {
              if (user && user.user.emailVerified === false) {
                user.user.sendEmailVerification().then(() => {
                  dbh
                    .collection('users')
                    .doc(user.user.uid)
                    .set({
                      userName,
                      role: 'USER',
                      photoLikes: [],
                      followers: [],
                      favoriteProducts: [],
                      photo:
                        'https://oneoone-resource.s3.ap-northeast-2.amazonaws.com/yzed/icon_user.png',
                    })
                    .then(() => {
                      dbh
                        .collection('newsletterSubscriptions')
                        .doc()
                        .set({ age: null, name: userName, email, gender: '' });
                    });
                });
              }
            })
            .catch(function (error) {
              setFirebaseError(error.message);
            });
        }
      });
  };

  const registerUser = (email, password, userName, callback) => {
    dbh
      .collection('users')
      .where('userName', '==', userName)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.docs.length) {
          setFirebaseError('Someone has already taken that username.');
        } else {
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
                  photo:
                    'https://oneoone-resource.s3.ap-northeast-2.amazonaws.com/yzed/icon_user.png',
                })
                .then(() => {
                  dbh
                    .collection('newsletterSubscriptions')
                    .doc()
                    .set({ age: null, name: userName, email, gender: '' });
                  const user = firebase.auth().currentUser;
                  user.sendEmailVerification();
                  callback(true);
                });
            })
            .catch(function (error) {
              setFirebaseError(error.message);
            });
        }
      });
  };

  const loginUser = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(function (error) {
        setFirebaseError(error.message);
      });
  };

  const logoutUser = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      firebase
        .auth()
        .signOut()
        .catch(function (error) {
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
      .then(function () {
        callback(true);
      })
      .catch(function (error) {
        setFirebaseError(error.message);
      });
  };

  const onAuthStateChange = async (callback) => {
    setUserLoading(true);
    await firebase.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user && user.emailVerified) {
        setUserValidated(true);
        dbh
          .collection('users')
          .doc(user.uid)
          .onSnapshot((doc) => {
            console.log(doc);
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
              callback({ loggedIn: true, id: user.uid, ...userDetails, lastVisit: new Date() });
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
          tag: taggedProducts[0].id,
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
        setFirebaseError,
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
        verifiedRegister,
        onAuthStateChange,
        setUserData,
        messaging,
      }}>
      {children}
    </FirebaseContext.Provider>
  );
};

FirebaseProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FirebaseProvider;
