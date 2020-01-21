import React from 'react';
import styled from 'styled-components';

export const ModalStyles = styled.div`
  height: ${({ openBag }) => (openBag ? '200px' : '0px')};
  color: ${({ openBag }) => (openBag ? 'blue' : 'green')};
`;

const ShoppingBagModal = ({ openBag }) => {
  return (
    <ModalStyles>
      {openBag && <h1>Hello</h1>}
      <h3>My Shopping Bag</h3>
    </ModalStyles>
  );
};

export default ShoppingBagModal;
