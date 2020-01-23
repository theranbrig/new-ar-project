import React from 'react';
import { products } from '../data';
import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Link } from 'react-router-dom';

export const ProductThumbsStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px;
  margin: 0 auto;
  font-family: Montserrat, sans-serif;
  text-align: left;
  margin-top: 50px;
  img {
    width: 80%;
    margin-left: 10%;
  }
  h3,
  h4 {
    font-family: Montserrat, sans-serif;
    margin: 0 auto;
    margin-left: 10%;
  }
  h3 {
    font-weight: 300;
    font-size: 1.1rem;
  }
  a {
    color: black;
    text-decoration: none;
  }
`;

const ShopThumbs = ({ open }) => {
  return (
    <ProductThumbsStyles className='product-thumbs'>
      {products.map(product => (
        <div className='product-thumb' key={product.name}>
          <Link to={`product/${product.name}`}>
            <LazyLoadImage src={product.imageUrl} alt={product.name} effect='blur' />
            <h4>{product.brand}</h4>
            <h3>{product.name}</h3>
            <h3>{`$${(product.price / 100).toFixed(2)}`}</h3>
          </Link>
        </div>
      ))}
    </ProductThumbsStyles>
  );
};

export default ShopThumbs;