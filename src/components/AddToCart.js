import React, { useContext, useState } from 'react';

import { CartContext } from '../context/Cart';
import styled from 'styled-components';

export const AddToCartStyles = styled.div`
  width: 80%;
  margin: 0 auto;
  .select-wrapper {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    select {
      border-radius: 0px;
      border: 1px solid ${props => props.theme.colors.black};
      font-family: ${props => props.theme.fonts.main};
      background: ${props => props.theme.colors.white};
      box-shadow: none;
      height: 25px;
      font-size: 1rem;
      -webkit-appearance: none;
      -webkit-border-radius: 0px;
      width: 100%;
      height: 50px;
      font-size: 20px;
      padding: 0 0 0 20px;
      border-top-left-radius: 25px;
      border-bottom-left-radius: 25px;
    }
  }
  p {
    text-align: center;
  }
  .size-buttons {
    margin: 0 auto;
    text-align: center;
    button {
      color: ${props => props.theme.colors.black};
      background: transparent;
      border: none;
      font-family: ${props => props.theme.fonts.main};
      font-size: 1.1rem;
      margin: 0 20px;
      height: 52px;
      width: 52px;
      line-height: 52px;
      text-align: center;
    }
    .active {
      color: ${props => props.theme.colors.white};
      background: ${props => props.theme.colors.black};
      border-radius: 50%;
    }
  }
`;

const BlackButton = styled.button`
  border: 1px solid ${props => props.theme.colors.black};
  border-radius: 0px;
  height: 50px;
  display: block;
  margin: -1px auto 0;
  font-size: 1rem;
  font-family: ${props => props.theme.fonts.main};
  background: ${props => props.theme.colors.black};
  color: white;
  width: 100%;
  display: inline;
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
  &:disabled {
    color: #989898;
  }
`;

const AddToCart = ({ sizes, product, setIsAdded }) => {
  const [selectedSize, setSelectedSize] = useState('S');
  const [quantity, setQuantity] = useState('');

  const { addItemToCart } = useContext(CartContext);

  const quantities = [1, 2, 3, 4, 5, 6, 7, 8, 10];

  return (
    <AddToCartStyles>
      <p>Select size</p>
      <div className='size-buttons'>
        {sizes.map(size => (
          <button
            key={size}
            onClick={() => setSelectedSize(size)}
            className={selectedSize === size ? 'active size-button' : 'size-button'}>
            {size.toUpperCase()}
          </button>
        ))}
      </div>
      <p>Select quanity</p>
      <div className='select-wrapper'>
        <select
          aria-label='select quantity'
          onChange={e => setQuantity(e.target.value)}
          value={quantity}
          name='quantity'>
          ><option value={''}>SELECT</option>
          {quantities.map(quantity => (
            <option key={quantity} value={quantity}>
              {quantity}
            </option>
          ))}
        </select>
        <BlackButton
          disabled={!selectedSize || !quantity}
          onClick={() => {
     
            addItemToCart(product, selectedSize, quantity);
            setIsAdded(true);
          }}>
          ADD TO BAG
        </BlackButton>
      </div>
    </AddToCartStyles>
  );
};

export default AddToCart;
