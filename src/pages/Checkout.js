import React, { useContext, useEffect, useState } from 'react';

import BackButton from '../components/BackButton';
import { CartContext } from '../context/Cart';
import { FirebaseContext } from '../context/Firebase';
import { Helmet } from 'react-helmet';
import LoadingSpinner from '../components/LoadingSpinner';
import ShoppingBagItems from '../components/ShoppingBagItems';
import { formatPrice } from '../utilities/formatting';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

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
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [cartTotal, setCartTotal] = useState('');
  const { cart, cartLoading, clearLocalCart } = useContext(CartContext);
  const { userData, userLoading } = useContext(FirebaseContext);

  const history = useHistory();

  useEffect(() => {
    const total = cart.reduce((accum, item) => {
      return accum + parseInt(item.price) * item.quantity;
    }, 0);
    setCartTotal(formatPrice(total));
    console.log(cart);
  }, [cart]);

  if ((cartLoading && !userData) || checkoutLoading || userLoading) {
    return (
      <CartStyles>
        <LoadingSpinner color='black' />
      </CartStyles>
    );
  }

  return (
    <CartStyles>
      <Helmet>
        <title>YZED - MY BAG ({`${cart.length}`})</title>
      </Helmet>
      <BackButton />
      <ShoppingBagItems canEdit={true} cartLoading={cartLoading} mode='light' />
      <div className='cart-details'>
        <h2>Total: {cartTotal}</h2>
      </div>
      <BlackButton
        disabled={!cart.length}
        onClick={() => {
          setCheckoutLoading(true);
          if (!userData) {
            clearLocalCart();
          }
          history.push('/order_success');
          setCheckoutLoading(false);
        }}>
        Checkout
      </BlackButton>
    </CartStyles>
  );
};

export default Checkout;
