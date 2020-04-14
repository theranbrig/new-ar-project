import AppRouter from './components/AppRouter';
import { BrowserRouter } from 'react-router-dom';
import CartProvider from './context/Cart';
import FirebaseProvider from './context/Firebase';
import LocationProvider from './context/Location';
import ModalProvider from './context/Modal';
import ProductProvider from './context/Product';
import React from 'react';
import YZEDTheme from './utilities/YZEDTheme';

function App() {
  return (
    <BrowserRouter>
      <YZEDTheme>
        <FirebaseProvider>
          <LocationProvider>
            <CartProvider>
              <ProductProvider>
                <ModalProvider>
                  <AppRouter />
                </ModalProvider>
              </ProductProvider>
            </CartProvider>
          </LocationProvider>
        </FirebaseProvider>
      </YZEDTheme>
    </BrowserRouter>
  );
}

export default App;
