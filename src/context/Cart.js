import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FirebaseContext } from './Firebase';
import { products } from '../data';

export const CartContext = React.createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartLoading, setCartLoading] = useState(false);

  const { addToCart, userData, dbh } = useContext(FirebaseContext);

  const addItemToCart = (email, productId, selectedSize) => {
    setCartLoading(true);
    if (userData) {
      addToCart(userData.email, productId, selectedSize);
    } else {
      const cartItem = { productId, selectedSize };
      const cart = JSON.parse(localStorage.getItem('shoppingCart'));
      if (cart && cart.length) {
        localStorage.setItem('shoppingCart', JSON.stringify([cartItem, ...cart]));
      } else {
        localStorage.setItem('shoppingCart', JSON.stringify([cartItem]));
      }
      setCart(JSON.parse(localStorage.getItem('shoppingCart')));
    }
    setCartLoading(false);
  };

  const getCartData = arr => {
    const tempCart = arr.reduce((accum, item) => {
      const product = products.find(product => item.productId === product.id);
      console.log(product);
      if (product) accum.push({ ...item, ...product });
      return accum;
    }, []);
    setCart(tempCart);
  };

  useEffect(() => {
    setCartLoading(true);
    let cartItems = [];
    if (userData) {
      dbh
        .collection('cartItems')
        .where('userId', '==', userData.email)
        .onSnapshot(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            cartItems.push(doc.data());
          });
          console.log('Cart', cartItems);
        });
    } else {
      cartItems = JSON.parse(localStorage.getItem('shoppingCart'));
      if (cartItems === null) {
        cartItems = [];
      }
    }
    getCartData(cartItems);
    setCartLoading(false);
  }, [userData, setCart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addItemToCart,
        cartLoading,
      }}>
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CartProvider;
