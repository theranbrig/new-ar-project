import React from 'react';
import AppRouter from './components/AppRouter';
import FirebaseProvider from './context/Firebase';
import ProductProvider from './context/Product';
import CartProvider from './context/Cart';
import YZEDTheme from './utilities/YZEDTheme';

function App() {
  return (
    <YZEDTheme>
      <FirebaseProvider>
        <CartProvider>
          <ProductProvider>
            <AppRouter />
          </ProductProvider>
        </CartProvider>
      </FirebaseProvider>
    </YZEDTheme>
  );
}

export default App;
