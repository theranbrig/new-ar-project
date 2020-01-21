import React from 'react';
import styled from 'styled-components';

export const ModalStyles = styled.div`
  height: ${({ openBag }) => (openBag ? '200px' : '0px')};
  transform: ${({ openBag }) => (openBag ? 'scaleY(100%)' : 'scaleY(0)')};
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
`;

const ShoppingBagModal = ({ openBag }) => {
  return (
    <ModalStyles openBag={openBag}>
      <div className='modal-content'>
        <h3>My Shopping Bag</h3>
      </div>
    </ModalStyles>
  );
};

export default ShoppingBagModal;
