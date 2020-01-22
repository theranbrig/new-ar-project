import React, { useContext, useEffect } from 'react';
import { CartContext } from '../context/Cart';
import ShoppingBagItems from '../components/ShoppingBagItems';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

export const CartStyles = styled.div`
  width: 500px;
  max-width: 95%;
  margin: 50px auto;
  color: black !important;
  min-height: 70import { useHistory } from 'react-router-dom';
vh;
  font-family: Montserrat, sans-serif;
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
`;

const Checkout = () => {
  const [cartTotal, setCartTotal] = React.useState('');
  const { cart, cartLoading, clearLocalCart } = useContext(CartContext);

  const history = useHistory();

  useEffect(() => {
    if (cart.length) {
      const total = cart.reduce((accum, item) => item.price + accum, 0);
      setCartTotal(total);
    }
  }, [cart]);

  return (
    <CartStyles>
      <ShoppingBagItems canEdit={true} items={cart} cartLoading={cartLoading} mode='light' />
      <div className='cart-details'>
        <h2>Total: {`$${(cartTotal / 100).toFixed(2)}`}</h2>
      </div>
      <BlackButton
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
