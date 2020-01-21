import React from 'react';
import AppRouter from './components/AppRouter';
import FirebaseProvider from './context/Firebase';
import CartProvider from './context/Cart';

function App() {
  return (
    <FirebaseProvider>
      <CartProvider>
        <AppRouter />
      </CartProvider>
    </FirebaseProvider>
  );
}

export default App;
