import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FirebaseContext } from './Firebase';
import { products } from '../data';

export const CartContext = React.createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartLoading, setCartLoading] = useState(false);

  const { addToCart, userData, dbh } = useContext(FirebaseContext);

  const addItemToCart = (productId, selectedSize) => {
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
      getCartData(JSON.parse(localStorage.getItem('shoppingCart')));
    }
  };

  const removeItemFromCart = index => {
    if (window.confirm('Delete the item from your cart?')) {
      setCartLoading(true);
      const cartData = JSON.parse(localStorage.getItem('shoppingCart'));
      cartData.splice(index, 1);
      localStorage.setItem('shoppingCart', JSON.stringify([...cartData]));
      getCartData(JSON.parse(localStorage.getItem('shoppingCart')));
    }
  };

  const clearLocalCart = () => {
    localStorage.clear();
    setCart([]);
  };

  const getCartData = arr => {
    const tempCart = arr.reduce((accum, item) => {
      const product = products.find(product => item.productId === product.id);
      if (product) accum.push({ ...item, ...product });
      return accum;
    }, []);
    setCart(tempCart);
    setCartLoading(false);
  };

  const getFirebaseCart = userData => {
    setCartLoading(true);
    let tempCart = [];
    dbh
      .collection('cartItems')
      .where('userId', '==', userData.email)
      .onSnapshot(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          tempCart.push(doc.data());
        });
        return tempCart;
      });
  };

  useEffect(() => {
    setCartLoading(true);
    let cartItems = [];
    if (userData) {
      cartItems = getFirebaseCart(userData);
    } else {
      cartItems = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    }
    getCartData(cartItems);
  }, [userData, setCart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addItemToCart,
        cartLoading,
        removeItemFromCart,
        clearLocalCart,
      }}>
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CartProvider;
