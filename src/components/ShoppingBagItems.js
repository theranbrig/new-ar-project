import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { CartContext } from '../context/Cart';
import { FirebaseContext } from '../context/Firebase';
import { Link } from 'react-router-dom';

export const ItemsStyles = styled.div`
  color: white;
  font-family: Montserrat;
  width: 98%;
  margin: 0 auto;
  height: ${({ mode }) => (mode === 'light' ? '100%' : '120px')};
  overflow-y: scroll;
  border-bottom: 1px solid white;
  .left-content {
    display: grid;
    grid-template-columns: 15px 1fr;
    align-items: center;
    grid-gap: 5px;
    h3 {
      margin: 0;
    }
  }
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
    grid-template-columns: 95px 1fr;
    grid-gap: 20px;
    align-items: center;
    padding: 0 10px;
    color: ${({ mode }) => (mode === 'light' ? 'black' : 'white')};
    img {
      width: 75px;
    }
    .item-info {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      h4 {
        align-self: center;
        font-size: 1.2rem;
      }
      h3 {
        padding: 0;
      }
      @media (max-width: 600px) {
        h2 {
          font-size: 1.2rem;
        }
        h3 {
          font-size: 0.9rem;
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
      font-size: 1.2rem;
    }
  }
`;

const ShoppingBagItems = ({ items, cartLoading, canEdit, mode }) => {
  const { cart, removeItemFromCart } = useContext(CartContext);

  const { userData, dbh } = useContext(FirebaseContext);

  useEffect(() => {
    console.log(items);
  }, [items]);

  if (cartLoading)
    return (
      <ItemsStyles>
        <h2>Cart Loading...</h2>
      </ItemsStyles>
    );

  return (
    <ItemsStyles mode={mode}>
      {!cart.length ? (
        <h2>Nothing in Shopping Bag...</h2>
      ) : (
        cart.map((item, index) => {
          let size = '';
          if (userData) {
            size = item.size;
          } else {
            size = item.selectedSize;
          }
          return (
            <div className='bag-item' key={index}>
              <div className='left-content'>
                <h3>{index + 1}</h3>
                <Link to={`/product/${item.productId}`}>
                  <img src={item.mainImage} alt={item.name} />
                </Link>
              </div>
              <div className='item-info'>
                <div>
                  <h2>{item.brand.toUpperCase()}</h2>
                  <h3>
                    {item.name.toUpperCase()} ({size}) <br /> QTY({item.quantity})
                  </h3>
                </div>
                <h4>{`$${(item.price / 100).toFixed(2)}`}</h4>
                {canEdit && (
                  <button
                    onClick={() => {
                      console.log(item.selectedSize);
                      removeItemFromCart(index, item.id, size);
                    }}
                    className='delete-item-button'
                    aria-label='delete-item'>
                    <i className='fa fa-times-circle' aria-hidden='true'></i>
                  </button>
                )}
              </div>
            </div>
          );
        })
      )}
    </ItemsStyles>
  );
};

export default ShoppingBagItems;
