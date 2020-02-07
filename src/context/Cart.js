import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FirebaseContext } from './Firebase';

export const CartContext = React.createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartLoading, setCartLoading] = useState(false);

  const { userData, dbh } = useContext(FirebaseContext);

  const addToFirebaseCart = (userId, product, size, quantity) => {
    console.log(product);
    dbh
      .collection('cartItems')
      .doc()
      .set({ userId, ...product, size, quantity })
      .then(async () => {
        const newCart = await getFirebaseCart(userData);
        setCart(newCart);
        setCartLoading(false);
      });
  };

  const checkFirebaseItemExists = async (product, selectedSize, quantity) => {
    console.log(product);
    dbh
      .collection('cartItems')
      .where('userId', '==', userData.id)
      .where('size', '==', selectedSize)
      .where('product.id', '==', product.id)
      .get()
      .then(async function(querySnapshot) {
        console.log(querySnapshot);
        if (!querySnapshot.docs.length) {
          await addToFirebaseCart(userData.id, product, selectedSize, quantity);
        } else {
          querySnapshot.forEach(function(doc) {
            const cartItem = dbh.collection('cartItems').doc(doc.id);
            cartItem.get().then(async doc => {
              const oldQuantity = doc.data().quantity;
              await cartItem.update({ quantity: oldQuantity + quantity });
              const newCart = getFirebaseCart(userData);
              setCart(newCart);
              setCartLoading(false);
            });
          });
          setCartLoading(false);
        }
      })
      .catch(err => console.log(err));
    setCartLoading(false);
  };

  const addItemToCart = async (product, selectedSize, quantity) => {
    setCartLoading(true);
    if (userData) {
      await checkFirebaseItemExists(product, selectedSize, quantity);
      setCartLoading(false);
    } else {
      const cartItem = { ...product, selectedSize, quantity };
      console.log(cartItem);
      const cart = JSON.parse(localStorage.getItem('shoppingCart'));
      console.log(cart);
      if (cart && cart.length) {
        const cartCheckItem = cart.filter(
          item => item.id === cartItem.id && item.selectedSize === cartItem.selectedSize
        );
        if (!cartCheckItem.length) {
          localStorage.setItem('shoppingCart', JSON.stringify([cartItem, ...cart]));
          setCart(JSON.parse(localStorage.getItem('shoppingCart')));
          setCartLoading(false);
        } else {
          cartCheckItem[0] = {
            ...product,
            quantity: cartCheckItem[0].quantity + quantity,
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
          localStorage.setItem('shoppingCart', JSON.stringify([...cart]));
          setCart(JSON.parse(localStorage.getItem('shoppingCart')));
          setCartLoading(false);
        }
      } else {
        localStorage.setItem('shoppingCart', JSON.stringify([cartItem]));
        setCart(JSON.parse(localStorage.getItem('shoppingCart')));
        setCartLoading(false);
      }
    }
  };

  const removeItemFromCart = async (index, cartItemId) => {
    if (window.confirm('Delete the item from your cart?')) {
      if (!userData) {
        setCartLoading(true);
        const cartData = await JSON.parse(localStorage.getItem('shoppingCart'));
        await cartData.splice(index, 1);
        await localStorage.setItem('shoppingCart', JSON.stringify([...cartData]));
        setCart(JSON.parse(localStorage.getItem('shoppingCart')));
        setCartLoading(false);
      } else {
        setCartLoading(true);
        dbh
          .collection('cartItems')
          .doc(cartItemId)
          .delete()
          .then(async () => {
            const newCart = await getFirebaseCart(userData);
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

  const getFirebaseCart = async userData => {
    setCartLoading(true);
    let tempCart = [];
    await dbh
      .collection('cartItems')
      .where('userId', '==', userData.id)
      .get()
      .then(async querySnapshot => {
        console.log('QUERY', querySnapshot);
        await querySnapshot.forEach(function(doc) {
          tempCart.push({ cartItemId: doc.ref.id, ...doc.data() });
        });
      });
    console.log('CART', tempCart);
    setCart(tempCart);
    return tempCart;
  };

  useEffect(() => {
    setCartLoading(true);
    let cartItems = [];
    const fetchData = async () => {
      if (userData) {
        cartItems = await getFirebaseCart(userData);
        setCart(cartItems);
        setCartLoading(false);
      } else {
        cartItems = (await JSON.parse(localStorage.getItem('shoppingCart'))) || [];
        setCart(cartItems);
        setCartLoading(false);
      }
    };
    fetchData();
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
