import React, { useContext, useEffect, useState } from 'react';

import { FirebaseContext } from './Firebase';
import PropTypes from 'prop-types';

export const CartContext = React.createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartLoading, setCartLoading] = useState(false);

  const { userData, dbh, userLoading } = useContext(FirebaseContext);

  const addToFirebaseCart = (userId, product, size, quantity) => {
    console.log(product);
    dbh
      .collection('cartItems')
      .doc()
      .set({
        userId,
        selectedSize: size,
        quantity,
        name: product.name,
        productId: product.id,
        mainImage: product.mainImage,
        color: product.color,
        brand: product.brand,
        price: product.price,
        sizes: product.sizes,
      })
      .then(() => {
        setCartLoading(false);
      });
  };

  const checkFirebaseItemExists = async (product, selectedSize, quantity) => {
    dbh
      .collection('cartItems')
      .where('userId', '==', userData.id)
      .where('selectedSize', '==', selectedSize)
      .where('productId', '==', product.id)
      .get()
      .then(function(querySnapshot) {
        if (!querySnapshot.docs.length) {
          addToFirebaseCart(userData.id, product, selectedSize, parseInt(quantity));
        } else {
          querySnapshot.forEach(function(doc) {
            const cartItem = dbh.collection('cartItems').doc(doc.id);
            cartItem.get().then(async doc => {
              const oldQuantity = doc.data().quantity;
              await cartItem.update({ quantity: parseInt(oldQuantity) + parseInt(quantity) });
            });
          });
        }
      })
      .catch(err => console.log(err));
  };

  const addItemToCart = async (product, selectedSize, quantity) => {
    if (userData.loggedIn) {
      checkFirebaseItemExists(product, selectedSize, quantity);
    } else {
      const cartItem = { ...product, selectedSize, quantity: parseInt(quantity) };
      const cart = JSON.parse(localStorage.getItem('shoppingCart'));
      if (cart && cart.length) {
        const cartCheckItem = cart.filter(
          item => item.id === cartItem.id && item.selectedSize === cartItem.selectedSize
        );
        if (!cartCheckItem.length) {
          await localStorage.setItem('shoppingCart', JSON.stringify([cartItem, ...cart]));
          setCart([...JSON.parse(localStorage.getItem('shoppingCart'))]);
        } else {
          cartCheckItem[0] = {
            ...product,
            quantity: parseInt(cartCheckItem[0].quantity) + parseInt(quantity),
            selectedSize: cartCheckItem[0].selectedSize,
          };
          let itemIndex;
          cart.forEach((item, index) => {
            if (item.id === cartItem.id && item.selectedSize === cartItem.selectedSize) {
              return (itemIndex = index);
            }
          });
          cart.splice(itemIndex, 1);
          cart.push(cartCheckItem[0]);
          await localStorage.setItem('shoppingCart', JSON.stringify([...cart]));
          setCart([...JSON.parse(localStorage.getItem('shoppingCart'))]);
        }
      } else {
        await localStorage.setItem('shoppingCart', JSON.stringify([cartItem]));
        setCart([...JSON.parse(localStorage.getItem('shoppingCart'))]);
      }
    }
  };

  const removeItemFromCart = async (index, cartItemId) => {
    if (window.confirm('Delete the item from your cart?')) {
      if (!userData.loggedIn) {
        const cartData = await JSON.parse(localStorage.getItem('shoppingCart'));
        await cartData.splice(index, 1);
        await localStorage.setItem('shoppingCart', JSON.stringify([...cartData]));
        setCart(JSON.parse(localStorage.getItem('shoppingCart')));
      } else {
        dbh
          .collection('cartItems')
          .doc(cartItemId)
          .delete()
          .then(async () => {})
          .catch(err => console.log(err));
      }
    }
  };

  const clearLocalCart = () => {
    localStorage.clear();
    setCart([]);
  };

  const editCartItem = async (product, quantity, selectedSize, index) => {
    if (userData.loggedIn) {
      dbh
        .collection('cartItems')
        .doc(product.cartItemId)
        .update({ quantity, selectedSize });
    } else {
      const cartItems = await JSON.parse(localStorage.getItem('shoppingCart'));
      console.log(cartItems);
      const item = cartItems[index];
      item.quantity = quantity;
      item.selectedSize = selectedSize;
      console.log(item);
      localStorage.setItem('shoppingCart', JSON.stringify(cartItems));
      setCart(JSON.parse(localStorage.getItem('shoppingCart')));
    }
  };

  const watchCart = () => {
    if (userData.loggedIn && !userLoading) {
      dbh
        .collection('cartItems')
        .where('userId', '==', userData.id)
        .onSnapshot(querySnapshot => {
          let cartItems = [];
          querySnapshot.forEach(doc => {
            console.log(doc.data());
            cartItems.push({ cartItemId: doc.ref.id, ...doc.data() });
          });
          setCart(cartItems);
        });
    } else if (!userData.loggedIn && !userLoading) {
      let cartItems = [];
      cartItems = JSON.parse(localStorage.getItem('shoppingCart')) || [];
      setCart(cartItems);
    } else {
      setCart([]);
    }
  };

  useEffect(() => {
    watchCart();
    return () => {
      watchCart();
    };
  }, [userLoading, userData]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addItemToCart,
        cartLoading,
        removeItemFromCart,
        clearLocalCart,
        editCartItem,
      }}>
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CartProvider;
