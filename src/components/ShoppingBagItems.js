import React, { useContext, useState } from 'react';

import { CartContext } from '../context/Cart';
import { FirebaseContext } from '../context/Firebase';
import { Link } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import styled from 'styled-components';

export const ItemsStyles = styled.div`
  color: ${props => props.theme.colors.black};
  font-family: ${props => props.theme.fonts.main};
  width: 98%;
  margin: 0 auto;
  overflow-y: scroll;
  margin: 30px auto;
  padding-bottom: 100px;
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
    grid-template-columns: 111px 1fr;
    grid-gap: 20px;
    align-items: center;
    padding: 20px 10px;
    color: ${props => props.theme.colors.black};
    img {
      width: 100%;
      border: 1px solid ${props => props.theme.colors.lightGrey};
    }
    .item-info {
      display: grid;
      grid-template-rows: 1fr 50px;
      font-family: ${props => props.theme.fonts.main};
      width: 100%;
      .contents {
        text-align: left;
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 30px;
        h2 {
          font-weight: 700;
          text-align: left;
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
      button.delete-item-button {
        background: transparent;
        border: none;
        color: pink;
        width: 30px;
        height: 30px;
        font-size: 1.2rem;
      }
    }
    border-bottom: 1px solid ${props => props.theme.colors.lightGrey};
  }
  .selectWrapper {
    border-radius: 36px;
    display: inline-block;
    overflow: hidden;
    background: ${props => props.theme.colors.white};
    border: 1px solid ${props => props.theme.colors.black};
    box-shadow: ${props => props.theme.boxShadows.allAround};
    margin: 5px 10px 0px 0px;
    padding-left: 4px;
  }
  .selectBox {
    width: 60px;
    height: 40px;
    border: 0px;
    outline: none;
    background: transparent;
    box-shadow: none;
    font-size: 1rem;
    font-family: ${props => props.theme.fonts.main};

    text-indent: 10px;
  }
  h2 {
    text-align: center;
  }
`;

const ShoppingBagItems = ({ canEdit, mode, setOpenBag, setBodyScroll }) => {
  const { cart, removeItemFromCart, editCartItems, cartLoading } = useContext(CartContext);
  const { userLoading } = useContext(FirebaseContext);

  return (
    <ItemsStyles mode={mode}>
      {cart.length ? (
        cart.map((item, index) => {
          return (
            <div className='bag-item' key={index}>
              <div className='left-content'>
                <Link
                  onClick={() => {
                    setBodyScroll(false);
                    setOpenBag(false);
                  }}
                  to={`/item/${item.productId}`}>
                  <img src={item.mainImage} alt={item.name} />
                </Link>
              </div>
              <div className='item-info'>
                <div className='contents'>
                  <div className='text'>
                    <h2>{item.brand.toUpperCase()}</h2>
                    <h3>{item.name}</h3>
                    <h4>{`$${(item.price / 100).toFixed(2)}`}</h4>
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
                <ItemUpdate item={item} index={index} cart={cart} />
              </div>
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

const ItemUpdate = ({ item, index, cart }) => {
  const selectedSizes = cart.map(cartItem => {
    if (cartItem.productId === item.productId) {
      return cartItem.selectedSize;
    }
  });
  const remainingSizes = item.sizes.filter(itemSize => {
    return (
      !selectedSizes.some(selectedSize => selectedSize === itemSize) ||
      itemSize === item.selectedSize
    );
  });
  const { editCartItem } = useContext(CartContext);
  const [currentSize, setCurrentSize] = useState(item.selectedSize);
  const [currentQuantity, setCurrentQuantity] = useState(item.quantity);
  const quantities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className='change-items'>
      <div className='selectWrapper'>
        <select
          className='selectBox'
          value={currentSize}
          name='select size'
          onChange={e => {
            setCurrentSize(e.target.value);
            editCartItem(item, currentQuantity, e.target.value, index);
          }}>
          {remainingSizes.map(size => (
            <option key={size}>{size}</option>
          ))}
        </select>
      </div>
      <div className='selectWrapper'>
        <select
          className='selectBox'
          onChange={e => {
            setCurrentQuantity(e.target.value);
            editCartItem(item, e.target.value, currentSize, index);
          }}
          value={currentQuantity}
          name='select quantity'>
          {quantities.map(quantity => (
            <option key={quantity}>{quantity}</option>
          ))}
        </select>
      </div>
    </div>
  );
};
