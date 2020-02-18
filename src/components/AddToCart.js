import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { CartContext } from '../context/Cart';

export const AddToCartStyles = styled.div`
  width: 95%;
  margin: 0 auto;
  .select-wrapper {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-content: center;
    align-items: center;
    select {
      border-radius: 0px;
      border: 2px solid ${props => props.theme.colors.black};
      font-family: ${props => props.theme.fonts.main};
      background: ${props => props.theme.colors.white};
      box-shadow: none;
      height: 25px;
      font-size: 1.1rem;
      -webkit-appearance: none;
      -webkit-border-radius: 0px;
      width: 100%;
      height: 52px;
      font-size: 20px;
      padding: 0 0 0 20px;
      border-top-left-radius: 25px;
      border-bottom-left-radius: 25px;
    }
  }
  /* .select-wrapper:after {
    font-family: FontAwesome;
    content: '\f107';
    font-size: 28px;
    position: absolute;
    top: 12px;
    right: 20px;
    color: #434b67;
    pointer-events: none;
  } */
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
      font-size: 1.5rem;
      margin: 0 20px;
      height: 52px;
      width: 50px;
      line-height: 50px;
    }
    .active {
      color: ${props => props.theme.colors.white};
      background: ${props => props.theme.colors.black};
      border-radius: 50%;
    }
  }
`;

const BlackButton = styled.button`
  border: 2px solid ${props => props.theme.colors.black};
  border-radius: 0px;
  height: 52px;
  display: block;
  margin: -1px auto 0;
  font-size: 1.2rem;
  padding: 5px auto;
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
  const [quantity, setQuantity] = useState(null);

  const { addItemToCart } = useContext(CartContext);

  const quantities = [1, 2, 3, 4, 5, 6, 7, 8, 10];

  return (
    <AddToCartStyles>
      <p>Select size</p>
      <div className='size-buttons'>
        {sizes.map(size => (
          <button
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
          Add To Cart
        </BlackButton>
      </div>
    </AddToCartStyles>
  );
};

export default AddToCart;
