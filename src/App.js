import React from 'react';
import AppRouter from './components/AppRouter';
import FirebaseProvider from './context/Firebase';

function App() {
  return (
    <FirebaseProvider>
      <AppRouter />
    </FirebaseProvider>
  );
}

export default App;
