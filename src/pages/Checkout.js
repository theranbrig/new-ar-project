import React, { useContext, useEffect } from 'react';
import { CartContext } from '../context/Cart';
import ShoppingBagItems from '../components/ShoppingBagItems';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { FirebaseContext } from '../context/Firebase';
import BackButton from '../components/BackButton';
import LoadingSpinner from '../components/LoadingSpinner';

export const CartStyles = styled.div`
  width: 500px;
  max-width: 95%;
  margin: 50px auto;
  color: black !important;
  min-height: calc(90vh - 100px);
  font-family: Montserrat, sans-serif;
  margin-top: calc(10vh + 50px);
  h1 {
    font-weight: 400;
    text-align: center;
  }
  .cart-details {
    width: 95%;
    margin: 0 auto;
    border-top: 1px solid #989898;
    h2 {
      text-align: right;
      padding-right: 10px;
      font-weight: 600;
    }
  }
`;

const BlackButton = styled.button`
  border: 2px solid black;
  border-radius: 0px;
  height: 52px;
  display: block;
  margin: 0 auto;
  font-size: 1.2rem;
  padding: 5px 80px;
  font-family: Montserrat, sans-serif;
  background: black;
  color: white;
  min-width: 284px;
  margin-bottom: 10px;
  &:disabled {
    color: #989898;
  }
`;

const Checkout = () => {
  const [cartTotal, setCartTotal] = React.useState('');
  const [cartItems, setCartItems] = React.useState([]);
  const { cart, cartLoading, clearLocalCart } = useContext(CartContext);
  const { userData, dbh } = useContext(FirebaseContext);

  const history = useHistory();

  useEffect(() => {
    const fetchCart = async () => {
      let tempCart = [];
      if (userData) {
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
        const cartDetails = await tempCart.reduce((accum, item) => {
          const prod = dbh
            .collection('products')
            .doc(item.productId)
            .get()
            .then(doc => {
              accum.push({ ...item, ...doc.data() });
            });
          return accum;
        }, []);
        console.log('DEETS', cartDetails);
        await setCartItems(cartDetails);
      } else {
        tempCart = (await JSON.parse(localStorage.getItem('shoppingCart'))) || [];
        const cartDetails = await tempCart.reduce((accum, item) => {
          const prod = dbh
            .collection('products')
            .doc(item.productId)
            .get()
            .then(doc => {
              accum.push({ ...item, ...doc.data() });
            });
          return accum;
        }, []);
        console.log('DEETS', cartDetails);
        await setCartItems([...cartDetails]);
      }
    };
    fetchCart();
    console.log('ITEMS', cartItems);
  }, [userData, cart]);

  if (cartLoading && !userData) {
    return (
      <CartStyles>
        <LoadingSpinner />
      </CartStyles>
    );
  }

  return (
    <CartStyles>
      <BackButton />
      {!cart.length && <h1>No Items in Bag...</h1>}
      <ShoppingBagItems items={cart} canEdit={true} cartLoading={cartLoading} mode='light' />
      <div className='cart-details'>
        <h2>Total: {`$${(cartTotal / 100).toFixed(2)}`}</h2>
      </div>
      <BlackButton
        disabled={!cart.length}
        onClick={() => {
          clearLocalCart();
          history.push('/order_success');
        }}>
        Checkout
      </BlackButton>
    </CartStyles>
  );
};

export default Checkout;
