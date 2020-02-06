import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FirebaseContext } from './Firebase';
import { products } from '../data';
import { useCollection } from 'react-firebase-hooks/firestore';

export const CartContext = React.createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [count, setCount] = useState(0);
  const [cartLoading, setCartLoading] = useState(false);

  const { addToCart, userData, dbh } = useContext(FirebaseContext);

  const addToFirebaseCart = (userId, productId, size, quantity) => {
    setCart([]);
    dbh
      .collection('cartItems')
      .doc()
      .set({ userId, productId, size, quantity })
      .then(async () => {
        const fireCart = await getFirebaseCart(userData);
        const newCart = await getCartData(fireCart);
        console.log('NEW CART');
        setCart(newCart);
      });
  };

  const checkFirebaseItemExists = async (productId, selectedSize, quantity) => {
    setCart([]);
    dbh
      .collection('cartItems')
      .where('userId', '==', userData.id)
      .where('size', '==', selectedSize)
      .get()
      .then(async function(querySnapshot) {
        console.log('QUERY', querySnapshot);
        if (!querySnapshot.docs.length) {
          const item = await addToFirebaseCart(userData.id, productId, selectedSize, quantity);
        } else {
          querySnapshot.forEach(function(doc) {
            const cartItem = dbh.collection('cartItems').doc(doc.id);
            cartItem.get().then(async doc => {
              const oldQuantity = doc.data().quantity;
              await cartItem.update({ quantity: oldQuantity + quantity });
            });
          });
        }
      })
      .then(async () => {
        const cartItems = await getFirebaseCart(userData);
        await getCartData(cartItems);
      })
      .catch(err => console.log(err));
  };

  const addItemToCart = async (productId, selectedSize, quantity) => {
    setCart([]);
    setCartLoading(true);
    if (userData) {
      await checkFirebaseItemExists(productId, selectedSize, quantity);
    } else {
      const cartItem = { productId, selectedSize, quantity };
      const cart = JSON.parse(localStorage.getItem('shoppingCart'));
      if (cart && cart.length) {
        const cartCheckItem = cart.filter(
          item =>
            item.productId === cartItem.productId && item.selectedSize === cartItem.selectedSize
        );
        if (!cartCheckItem.length) {
          localStorage.setItem('shoppingCart', JSON.stringify([cartItem, ...cart]));
        } else {
          cartCheckItem[0] = {
            productId: cartCheckItem[0].productId,
            quantity: cartCheckItem[0].quantity + quantity,
            selectedSize: cartCheckItem[0].selectedSize,
          };
          let itemIndex;
          const cartIndex = cart.forEach((item, index) => {
            if (
              item.productId === cartItem.productId &&
              item.selectedSize === cartItem.selectedSize
            ) {
              return (itemIndex = index);
            }
          });
          cart.splice(itemIndex, 1);
          cart.push(cartCheckItem[0]);
          localStorage.setItem('shoppingCart', JSON.stringify([...cart]));
          getCartData(JSON.parse(localStorage.getItem('shoppingCart')));
        }
      } else {
        localStorage.setItem('shoppingCart', JSON.stringify([cartItem]));
        getCartData(JSON.parse(localStorage.getItem('shoppingCart')));
      }
    }
  };

  const removeItemFromCart = (index, cartItemId) => {
    if (window.confirm('Delete the item from your cart?')) {
      if (!userData) {
        setCartLoading(true);
        const cartData = JSON.parse(localStorage.getItem('shoppingCart'));
        cartData.splice(index, 1);
        localStorage.setItem('shoppingCart', JSON.stringify([...cartData]));
        getCartData(JSON.parse(localStorage.getItem('shoppingCart')));
      } else {
        setCartLoading(true);
        dbh
          .collection('cartItems')
          .doc(cartItemId)
          .delete()
          .then(async () => {
            const fireCart = await getFirebaseCart(userData);
            const newCart = await getCartData(fireCart);
            setCart(newCart);
            setCartLoading(false);
          })
          .catch(err => console.log(err));
      }
    }
  };

  const clearLocalCart = () => {
    localStorage.clear();
    setCart([]);
  };

  const getCartData = async arr => {
    setCart([]);
    const tempCart = await arr.reduce((accum, item) => {
      const prod = dbh
        .collection('products')
        .doc(item.productId)
        .get()
        .then(doc => {
          accum.push({ ...item, ...doc.data() });
        });
      return accum;
    }, []);
    setCartLoading(false);
    setCart(tempCart);
    return tempCart;
  };

  const getFirebaseCart = async userData => {
    setCartLoading(true);
    let tempCart = [];
    await dbh
      .collection('cartItems')
      .where('userId', '==', userData.id)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          tempCart.push({ id: doc.ref.id, ...doc.data() });
          console.log(doc.data());
        });
      });
    return tempCart;
  };

  useEffect(() => {
    let cartItems = [];
    const fetchData = async () => {
      if (userData) {
        cartItems = await getFirebaseCart(userData);
      } else {
        cartItems = (await JSON.parse(localStorage.getItem('shoppingCart'))) || [];
      }
      const newCart = await getCartData(cartItems);
      setCart(newCart);
    };
    fetchData();
    console.log(cart);
    setCartLoading(false);
  }, [userData, setCart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addItemToCart,
        cartLoading,
        removeItemFromCart,
        clearLocalCart,
        getCartData,
        count,
      }}>
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CartProvider;
