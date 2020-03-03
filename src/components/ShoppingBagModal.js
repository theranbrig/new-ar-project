import React, { useState } from 'react';

import LoadingSpinner from './LoadingSpinner';
import ShoppingBagItems from './ShoppingBagItems';
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
  z-index: 501;
  .modal-content {
    width: 500px;
    max-width: 95%;
    z-index: 505;
    margin: 0 auto;
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
    height: 15vh;

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
  }
`;

const ShoppingBagModal = ({ openBag, shoppingBag, setValue, cartLoading, setOpenBag }) => {
  const [canEdit, setCanEdit] = useState(true);

  const history = useHistory();

  return (
    <ModalStyles openBag={openBag}>
      <div className='modal-content'>
        {cartLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <ShoppingBagItems
              items={shoppingBag}
              cartLoading={cartLoading}
              canEdit={canEdit}
              setOpenBag={setOpenBag}
            />
            <div className='modal-buttons'>
              <button
                onClick={() => {
                  setOpenBag(false);
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
