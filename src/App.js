import React from 'react';
import AppRouter from './components/AppRouter';
import FirebaseProvider from './context/Firebase';
import ProductProvider from './context/Product';
import CartProvider from './context/Cart';
import ModalProvider from './context/Modal';
import YZEDTheme from './utilities/YZEDTheme';

function App() {
  return (
    <YZEDTheme>
      <FirebaseProvider>
        <CartProvider>
          <ProductProvider>
            <ModalProvider>
              <AppRouter />
            </ModalProvider>
          </ProductProvider>
        </CartProvider>
      </FirebaseProvider>
    </YZEDTheme>
  );
}

export default App;
