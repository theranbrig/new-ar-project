import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Brands } from '../data';
import styled from 'styled-components';

export const BrandStyles = styled.div`
  font-family: Montserrat, sans-serif;
  width: 95%;
  margin: 0 auto;
  border-bottom: 1px solid #989898;
  margin-bottom: 50px;
  h3.brand-title {
    margin: 20px 2.5% 10px;
    font-size: 1.4rem;
  }
  .brand-info {
    display: grid;
    grid-template-columns: 120px 5fr;
    width: 95%;
    margin: 0 auto;
    grid-gap: 20px;
    align-items: center;
    margin-bottom: 20px;
  }
  img {
    padding: 10px;
    width: 100px;
    margin: 0;
    border: 1px solid #989898;
  }
  .brand-stats {
    h4 {
      font-size: 1.2rem;
      font-weight: 300;
      margin: 3px 0;
      span {
        font-weight: 600;
      }
    }
    a {
      text-decoration: none;
      font-size: 1.4rem;
      color: rgb(40, 135, 208);
      font-weight: 800;
      letter-spacing: 0.15rem;
      i {
        margin-left: 10px;
      }
    }
    @media (max-width: 500px) {
      a {
        font-size: 1rem;
      }
      h4 {
        font-size: 1.1rem;
      }
    }
    @media (max-width: 400px) {
      a {
        font-size: 0.8rem;
      }
      h4 {
        font-size: 1.1rem;
      }
    }
  }
`;

const ProductBrand = ({ brand }) => {
  brand = Brands[0];
  return (
    <BrandStyles>
      <h3 className='brand-title'>{brand.name}</h3>
      <div className='brand-info'>
        <div className='brand-image'>
          <LazyLoadImage src={brand.imageUrl} alt={brand.name} effect='blur' />
        </div>
        <div className='brand-stats'>
          <h4>
            <span>{brand.followers}</span> FOLLOWERS
          </h4>
          <h4>
            <span>{brand.products}</span> PRODUCTS
          </h4>
          <h4>
            <span>{brand.challenges}</span> CHALLENGES
          </h4>
          <a href='/brand/adidas'>
            BRAND PROFILE <i className='fa fa-chevron-right'></i>
          </a>
        </div>
      </div>
    </BrandStyles>
  );
};

export default ProductBrand;
