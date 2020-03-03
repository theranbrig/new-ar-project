import React, { useContext, useEffect, useState } from 'react';

import { CartContext } from '../context/Cart';
import { FirebaseContext } from '../context/Firebase';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const ItemsStyles = styled.div`
  color: ${props => props.theme.colors.black};
  font-family: ${props => props.theme.fonts.main};
  width: 98%;
  margin: 0 auto;
  overflow-y: scroll;
  margin: 30px auto;
  h2 {
    font-size: 1.4rem;
    margin-bottom: 0px;
    font-weight: 300;
  }
  h3 {
    font-size: 1.2rem;
    margin-top: 0px;
    font-weight: 300;
  }
  .bag-item {
    display: grid;
    grid-template-columns: 111px 1fr 30px;
    grid-gap: 20px;
    align-items: center;
    padding: 20px 10px;
    color: ${props => props.theme.colors.black};
    img {
      width: 100%;
      border: 1px solid ${props => props.theme.colors.lightGrey};
    }
    .item-info {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      font-family: ${props => props.theme.fonts.main};
      width: 100%;
      .contents {
        width: 100%;
        h2 {
          font-weight: 700;
          margin: 0;
        }
        h4 {
          align-self: center;
          font-size: 1.2rem;
          margin: 0;
          font-weight: 500;
        }
        h3 {
          padding: 0;
          margin: 0;
        }

        @media (max-width: 600px) {
          h2 {
            font-size: 1.2rem;
          }

          h4 {
            font-size: 1rem;
          }
        }
      }
    }
    button.delete-item-button {
      background: transparent;
      border: none;
      color: pink;
      font-size: 1.2rem;
    }
    border-bottom: 1px solid ${props => props.theme.colors.mediumGrey};
  }
  .selectWrapper {
    border-radius: 36px;
    display: inline-block;
    overflow: hidden;
    background: ${props => props.theme.colors.white};
    border: 1px solid ${props => props.theme.colors.black};
    box-shadow: ${props => props.theme.boxShadows.allAround};
    margin: 20px 10px 0px 0px;
    padding-left: 4px;
  }
  .selectBox {
    width: 100px;
    height: 40px;
    border: 0px;
    outline: none;
    background: transparent;
    box-shadow: none;
    font-size: 1rem;
    font-family: ${props => props.theme.fonts.main};
  }
`;

const ShoppingBagItems = ({ cartLoading, canEdit, mode, setOpenBag }) => {
  const { cart, removeItemFromCart, editCartItems } = useContext(CartContext);
  if (cartLoading)
    return (
      <ItemsStyles>
        <h2>Cart Loading...</h2>
      </ItemsStyles>
    );

  return (
    <ItemsStyles mode={mode}>
      {cart.length ? (
        cart.map((item, index) => {
          return (
            <div className='bag-item' key={index}>
              <div className='left-content'>
                <Link to={`/product/${item.productId}`}>
                  <img src={item.mainImage} alt={item.name} />
                </Link>
              </div>
              <div className='item-info'>
                <div className='contents'>
                  <h2>{item.brand.toUpperCase()}</h2>
                  <h3>{item.name}</h3>
                  <h4>{`$${(item.price / 100).toFixed(2)}`}</h4>
                  <ItemUpdate item={item} index={index} />
                </div>
              </div>
              <button
                onClick={() => {
                  removeItemFromCart(index, item.cartItemId, item.selectedSize);
                }}
                className='delete-item-button'
                aria-label='delete-item'>
                <i className='fa fa-times-circle' aria-hidden='true'></i>
              </button>
            </div>
          );
        })
      ) : (
        <h2>Nothing in Cart...</h2>
      )}
    </ItemsStyles>
  );
};

export default ShoppingBagItems;

const ItemUpdate = ({ item, index }) => {
  const { editCartItem } = useContext(CartContext);
  const [currentSize, setCurrentSize] = useState(item.selectedSize);
  const [currentQuantity, setCurrentQuantity] = useState(item.quantity);
  const quantities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className='change-items'>
      <div class='selectWrapper'>
        <select
          className='selectBox'
          value={currentSize}
          name='select size'
          onChange={e => {
            setCurrentSize(e.target.value);
            editCartItem(item, currentQuantity, e.target.value, index);
          }}>
          {item.sizes.map(size => (
            <option key={size}>{size}</option>
          ))}
        </select>
      </div>
      <div class='selectWrapper'>
        <select
          className='selectBox'
          onChange={e => {
            setCurrentQuantity(e.target.value);
            editCartItem(item, e.target.value, currentSize, index);
          }}
          value={currentQuantity}
          name='select quantity'>
          {quantities.map(quantity => (
            <option key={quantity}>
              {quantity} {quantity === 1 ? 'PC' : 'PCS'}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
