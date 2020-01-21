import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FirebaseContext } from './Firebase';
import { products } from '../data';

export const CartContext = React.createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(localStorage.getItem('shoppingCart') || '');

  const { addToCart, userData, dbh } = useContext(FirebaseContext);

  const addItemToCart = (email, productId, selectedSize) => {
    if (userData) {
      addToCart(userData.email, productId, selectedSize);
    } else {
      const cartItem = { productId, selectedSize };
      const cart = JSON.parse(localStorage.getItem('shoppingCart'));
      if (cart && cart.length) {
        localStorage.setItem('shoppingCart', JSON.stringify([cartItem, ...cart]));
        setCart(JSON.parse(localStorage.getItem('shoppingCart')));
      } else {
        localStorage.setItem('shoppingCart', JSON.stringify([cartItem]));
        setCart(JSON.parse(localStorage.getItem('shoppingCart')));
      }
    }
  };

  const getCartData = arr => {
    const cart = arr.reduce((accum, item) => {
      const product = products.find(product => item.productId === product.id);
      if (product) accum.push({ ...item, ...product });
      return accum;
    }, []);
    setCart(cart);
  };

  const getLocalData = async () => {};

  useEffect(() => {
    if (userData) {
      let cartItems = [];
      dbh
        .collection('cartItems')
        .where('userId', '==', userData.email)
        .onSnapshot(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            cartItems.push(doc.data());
          });
          console.log('Cart', cartItems);
          if (cartItems.length) {
            getCartData(cartItems);
          }
        });
    } else {
      const localCart = JSON.parse(localStorage.getItem('shoppingCart'));

      getCartData(localCart);

      console.log(cart);
    }
    console.log(cart);
  }, [userData, localStorage, setCart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addItemToCart,
      }}>
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CartProvider;
