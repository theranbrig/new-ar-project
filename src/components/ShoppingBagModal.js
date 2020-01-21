import React, { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import ShoppingBagItems from './ShoppingBagItems';
import { FirebaseContext } from '../context/Firebase';
import { products } from '../data';

export const ModalStyles = styled.div`
  height: ${({ openBag }) => (openBag ? '270px' : '0px')};
  transform: ${({ openBag }) => (openBag ? 'scaleY(100%)' : 'scaleY(0)')};
  -webkit-box-shadow: 0px 10px 0px 0px rgba(0, 0, 3, 0.28);
  -moz-box-shadow: 0px 10px 0px 0px rgba(0, 0, 3, 0.28);
  box-shadow: 0px 10px 0px 0px rgba(0, 0, 3, 0.28);
  transition: 0.5s;
  background: #000000ee;
  position: absolute;
  width: 100%;
  z-index: 501;
  .modal-content {
    width: 500px;
    max-width: 95%;
    margin: 0 auto;
    font-family: Montserrat, sans-serif;
    h3 {
      color: white;
    }
  }
  button {
    margin: 20px 10%;
    border: 0px;
    width: 80%;
    text-align: center;
    padding: 10px 40px;
    font-family: Montserrat, sans-serif;
    font-size: 1.1rem;
  }
`;

const ShoppingBagModal = ({ openBag, shoppingBag, setValue, cartLoading }) => {
  useEffect(() => {
    console.log(shoppingBag);
  }, [shoppingBag, cartLoading]);

  return (
    <ModalStyles openBag={openBag}>
      <div className='modal-content'>
        {cartLoading ? (
          <h3>Cart Loading...</h3>
        ) : (
          <>
            <h3>My Shopping Bag ({shoppingBag.length})</h3>

            <ShoppingBagItems items={shoppingBag} cartLoading={cartLoading} />
            <button>PROCEED TO CHECKOUT</button>
          </>
        )}
      </div>
    </ModalStyles>
  );
};

export default ShoppingBagModal;
