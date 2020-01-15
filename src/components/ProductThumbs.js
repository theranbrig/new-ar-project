import React from 'react';
import { products } from '../data';

import styled from 'styled-components';

export const ProductThumbsStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  width: 50%;
  margin: 0 auto;
  font-family: Montserrat;
`;

const ProductThumbs = () => {
  return (
    <ProductThumbsStyles className='product-thumbs'>
      {products.map(product => (
        <div>
          <h4>{product.brand}</h4>
          <h3>{product.name}</h3>
        </div>
      ))}
    </ProductThumbsStyles>
  );
};

export default ProductThumbs;
