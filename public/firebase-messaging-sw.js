importScripts('https://www.gstatic.com/firebasejs/7.14.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.14.0/firebase-messaging.js');

const firebaseConfig = {
  apiKey: 'AIzaSyCbeKQnNn5ZzS_6BajkJwlJ5qEF-b3NDF4',
  authDomain: 'yzed-dev.firebaseapp.com',
  databaseURL: 'https://yzed-dev.firebaseio.com',
  projectId: 'yzed-dev',
  storageBucket: 'yzed-dev.appspot.com',
  messagingSenderId: '528819968183',
  appId: '1:528819968183:web:d80c32d7ac8b6b54b01532',
  measurementId: 'G-RPGT39JQP9',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});
