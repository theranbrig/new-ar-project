import React, { useState } from 'react';

import LoadingSpinner from './LoadingSpinner';
import ShoppingBagItems from './ShoppingBagItems';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

export const ModalStyles = styled.div`
  height: ${({ openBag }) => (openBag ? '270px' : '0px')};
  transform: ${({ openBag }) => (openBag ? 'scaleY(100%)' : 'scaleY(0)')};
  -webkit-box-shadow: 0px 10px 0px 0px rgba(0, 0, 3, 0.28);
  -moz-box-shadow: 0px 10px 0px 0px rgba(0, 0, 3, 0.28);
  box-shadow: 0px 10px 0px 0px rgba(0, 0, 3, 0.28);
  transition: 0.5s;
  background: #000000ee;
  position: fixed;
  top: 10vh;
  width: 100%;
  z-index: 501;

  .modal-shadow {
    height: ${({ openBag }) => (openBag ? 'calc(90vh - 270px)' : '5px')};
    background: #23232394;
    position: fixed;
    background-attachment: fixed;
    width: 100vw;
    left: 0;
    bottom: 0;
  }
  .modal-content {
    width: 500px;
    max-width: 95%;
    z-index: 505;
    margin: 0 auto;
    font-family: Montserrat, sans-serif;
    h3 {
      color: white;
      font-weight: 300;
      padding: 0 0 0 2.5%;
    }
  }
  .modal-buttons {
    display: grid;
    grid-template-columns: 1fr 6fr;
    width: 95%;
    margin: 20px 2.5%;
    grid-gap: 10px;
    button,
    a {
      border: 0px;
      width: 100%;
      padding: 10px 0;
      text-align: center;
      font-family: Montserrat, sans-serif;
      font-size: 1.1rem;
      line-height: 1.6rem;
      background: white;
      text-decoration: none;
      color: black;
    }
    .edit-button {
      font-size: 1.5rem;
      padding-left: 5px;
    }
  }
`;

const ShoppingBagModal = ({ openBag, shoppingBag, setValue, cartLoading, setOpenBag }) => {
  const [canEdit, setCanEdit] = useState(false);

  const history = useHistory();

  return (
    <ModalStyles openBag={openBag}>
      <div className='modal-content'>
        {cartLoading ? (
          <LoadingSpinner color={'white'} />
        ) : (
          <>
            <h3>My Shopping Bag ({shoppingBag.length})</h3>
            <ShoppingBagItems
              items={shoppingBag}
              cartLoading={cartLoading}
              canEdit={canEdit}
              setOpenBag={setOpenBag}
            />
            <div className='modal-buttons'>
              <button
                onClick={() => setCanEdit(!canEdit)}
                className='edit-button'
                aria-label='Edit Button'>
                <i className='fa fa-edit'></i>
              </button>
              <button
                onClick={() => {
                  setOpenBag(false);
                  history.push('/checkout');
                }}>
                PROCEED TO CHECKOUT
              </button>
            </div>
            <div
              className='modal-shadow'
              onClick={() => {
                setOpenBag(false);
              }}></div>
          </>
        )}
      </div>
    </ModalStyles>
  );
};

export default ShoppingBagModal;
