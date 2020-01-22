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
  .modal-buttons {
    display: grid;
    grid-template-columns: 1fr 6fr;
    width: 95%;
    margin: 20px 2.5%;
    grid-gap: 10px;
    button {
      border: 0px;
      width: 100%;
      padding: 10px 0;
      text-align: center;
      font-family: Montserrat, sans-serif;
      font-size: 1.1rem;
    }
    .edit-button {
      font-size: 1.5rem;
    }
  }
  /* .modal-shadow {
    position: sticky;
    top: 0;
    background: #000000a4;
    height: calc(90vh - 250px);
  } */
`;

const ShoppingBagModal = ({ openBag, shoppingBag, setValue, cartLoading }) => {
  const [canEdit, setCanEdit] = useState(false);
  return (
    <ModalStyles openBag={openBag}>
      <div className='modal-content'>
        {cartLoading ? (
          <h3>Cart Loading...</h3>
        ) : (
          <>
            <h3>My Shopping Bag ({shoppingBag.length})</h3>
            <ShoppingBagItems items={shoppingBag} cartLoading={cartLoading} canEdit={canEdit} />
            <div className='modal-buttons'>
              <button onClick={() => setCanEdit(!canEdit)} className='edit-button'>
                <i className='fa fa-edit'></i>
              </button>
              <button>PROCEED TO CHECKOUT</button>
            </div>
          </>
        )}
      </div>
      <div className='modal-shadow'></div>
    </ModalStyles>
  );
};

export default ShoppingBagModal;
