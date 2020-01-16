import React from 'react';
import { products } from '../data';

import styled from 'styled-components';

export const ProductThumbsStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px;
  margin: 0 auto;
  font-family: Montserrat;
  text-align: left;
  margin-top: 50px;
  img {
    width: 80%;
    margin-left: 10%;
  }
  h3,
  h4 {
    font-family: Montserrat;
    margin: 0 auto;
    margin-left: 10%;
  }
  h3 {
    font-weight: 400;
  }
`;

const ProductThumbs = ({ open }) => {
  return (
    <ProductThumbsStyles className='product-thumbs'>
      {products.map(product => (
        <div>
          <img src={product.imageUrl} alt={product.name} />
          <h4>{product.brand}</h4>
          <h3>{product.name}</h3>
        </div>
      ))}
    </ProductThumbsStyles>
  );
};

export default ProductThumbs;
