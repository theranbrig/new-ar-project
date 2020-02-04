import React from 'react';
import AppRouter from './components/AppRouter';
import FirebaseProvider from './context/Firebase';
import ProductProvider from './context/Product';
import CartProvider from './context/Cart';

function App() {
  return (
    <FirebaseProvider>
      <ProductProvider>
        <CartProvider>
          <AppRouter />
        </CartProvider>
      </ProductProvider>
    </FirebaseProvider>
  );
}

export default App;
