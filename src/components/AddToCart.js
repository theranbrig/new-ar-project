import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { FirebaseContext } from '../context/Firebase';

export const AddToCartStyles = styled.div`
  width: 95%;
  margin: 0 auto;
  .select-wrapper {
    width: 50%;
    display: inline-block;
    position: relative;
    top: 1px;
    select {
      border-radius: 0px;
      border: 2px solid black;
      font-family: Montserrat, sans-serif;
      border-radius: 0px !important;
      background: white;
      box-shadow: none;
      height: 25px;
      font-size: 1.1rem;
      -webkit-appearance: none;
      -webkit-border-radius: 0px;
      width: 100%;
      height: 52px;
      font-size: 20px;
      padding: 0 0 0 20px;
    }
  }
  .select-wrapper:after {
    font-family: FontAwesome;
    content: '\f107';
    font-size: 28px;
    position: absolute;
    top: 12px;
    right: 20px;
    color: #434b67;
    pointer-events: none;
  }
`;

const BlackButton = styled.button`
  border: 2px solid black;
  border-radius: 0px;
  height: 52px;
  display: block;
  margin: 0 auto;
  font-size: 1.2rem;
  padding: 5px auto;
  font-family: Montserrat, sans-serif;
  background: black;
  color: white;
  width: 50%;
  display: inline;
  &:disabled {
    color: #989898;
  }
`;

const AddToCart = ({ sizes, productId }) => {
  const [selectedSize, setSelectedSize] = useState('');
  const { addToCart, userData } = useContext(FirebaseContext);

  const addItemToCart = () => {
    if (userData) {
      addToCart(userData.email, productId, selectedSize);
    } else {
      const cartItem = { productId, selectedSize };
      const cart = JSON.parse(localStorage.getItem('shoppingCart'));
      console.log(cart);
      if (cart && cart.length) {
        localStorage.setItem('shoppingCart', JSON.stringify([cartItem, ...cart]));
      } else {
        localStorage.setItem('shoppingCart', JSON.stringify([cartItem]));
      }
    }
  };

  useEffect(() => {
    console.log('user', userData);
  }, [userData]);

  return (
    <AddToCartStyles>
      <div className='select-wrapper'>
        <select
          aria-label='Select Size'
          onChange={e => setSelectedSize(e.target.value)}
          value={selectedSize}
          name='selectedSize'>
          ><option value={''}>Size...</option>
          {sizes.map(size => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
      <BlackButton disabled={!selectedSize} onClick={() => addItemToCart()}>
        Add To Cart
      </BlackButton>
    </AddToCartStyles>
  );
};

export default AddToCart;
