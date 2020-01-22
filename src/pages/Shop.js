import React from 'react';
import ShopThumbs from '../components/ShopThumbs';
import styled from 'styled-components';

export const ShopStyles = styled.div`
  width: 500px;
  max-width: 95%;
  margin: 0 auto;
  font-family: Montserrat, sans-serif;
  font-weight: 400;
  min-height: calc(90vh - 30px);
  text-align: center;
  h1 {
    margin-top: 30px;
  }
`;

const Shop = () => {
  return (
    <ShopStyles>
      <h1>SHOP YZED</h1>
      <ShopThumbs />
    </ShopStyles>
  );
};

export default Shop;
