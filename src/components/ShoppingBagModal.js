import React, { useContext, useEffect, useState } from 'react';

import { CartContext } from '../context/Cart';
import LoadingSpinner from './LoadingSpinner';
import { ModalContext } from '../context/Modal';
import ShoppingBagItems from './ShoppingBagItems';
import { formatPrice } from '../utilities/formatting';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

export const ModalStyles = styled.div`
  height: ${({ openBag }) => (openBag ? '90vh' : '0px')};
  transform: ${({ openBag }) => (openBag ? 'scaleY(100%)' : 'scaleY(0)')};
  -webkit-box-shadow: 0px 10px 0px 0px rgba(0, 0, 3, 0.28);
  -moz-box-shadow: 0px 10px 0px 0px rgba(0, 0, 3, 0.28);
  box-shadow: 0px 10px 0px 0px rgba(0, 0, 3, 0.28);
  transition: 0.5s;
  background: ${props => props.theme.colors.white};
  position: fixed;
  top: 10vh;
  width: 100%;
  z-index: 1001;
  .modal-content {
    width: 500px;
    max-width: 95%;
    z-index: 505;
    margin: 0 auto;
    height: 70vh;
    overflow-y: scroll;
    font-family: ${props => props.theme.fonts.main};
    color: ${props => props.theme.colors.black};
    h3 {
      font-weight: 300;
      padding: 0 0 0 2.5%;
    }
  }
  .modal-buttons {
    width: 500px;
    max-width: 95%;
    margin: 0 auto;
    position: fixed;
    bottom: 0;
    height: 20vh;
    font-family: ${props => props.theme.fonts.main};
    background: ${props => props.theme.colors.white};
    button,
    a {
      border: 0px;
      width: 80%;
      display: block;
      margin: 20px auto 0;
      padding: 10px 0;
      text-align: center;
      font-family: ${props => props.theme.fonts.main};
      font-size: 1.1rem;
      line-height: 1.6rem;
      background: white;
      height: 45px;
      border-radius: 25px;
      text-decoration: none;
      color: ${props => props.theme.colors.white};
      background-color: ${props => props.theme.colors.black};
    }
    .edit-button {
      font-size: 1.5rem;
      padding-left: 5px;
    }
    .total {
      padding: 0 20px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      border-top: 1px solid ${props => props.theme.colors.lightGrey};
      border-bottom: 1px solid ${props => props.theme.colors.lightGrey};
      margin: 5px 0;
      h2 {
        text-align: right;
        font-weight: 300;
        margin: 5px 0;
      }
      .number {
        font-weight: 500;
      }
    }
  }
`;

const ShoppingBagModal = () => {
  const [canEdit, setCanEdit] = useState(true);
  const [total, setTotal] = useState(0);
  const history = useHistory();

  const { cart, removeItemFromCart, editCartItems, cartLoading } = useContext(CartContext);
  const { openBag, setOpenBag, setBodyScroll } = useContext(ModalContext);

  useEffect(() => {
    setTotal(
      cart.reduce((accum, item) => {
        return accum + parseInt(item.price) * item.quantity;
      }, 0)
    );
  }, [cart]);

  return (
    <ModalStyles openBag={openBag}>
      <div className='modal-content'>
        {cartLoading ? (
          <LoadingSpinner color='black' />
        ) : (
          <>
            <ShoppingBagItems
              canEdit={canEdit}
              setOpenBag={setOpenBag}
              setBodyScroll={setBodyScroll}
            />
            <div className='modal-buttons'>
              <div className='total'>
                <h2 className='text'>Total:</h2>
                <h2 className='number'>{formatPrice(total)}</h2>
              </div>
              <button
                onClick={() => {
                  setOpenBag(false);
                  setBodyScroll(false);
                  history.push('/checkout');
                }}>
                PROCEED TO CHECKOUT
              </button>
            </div>
          </>
        )}
      </div>
    </ModalStyles>
  );
};

export default ShoppingBagModal;
