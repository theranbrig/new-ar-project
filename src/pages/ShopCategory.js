import React from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductsPageSearch from '../components/ProductsPageSearch';
import ShopThumbs from '../components/ShopThumbs';
import styled from 'styled-components';

export const ShopCategoryStyles = styled.div`
  width: 500px;
  max-width: 95%;
  text-align: center;
  min-height: calc(90vh - 30px);
  margin: 0 auto 100px;
  font-family: Montserrat, sans-serif;
  .category-buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    grid-gap: 5px;
    color: white;
    background: black
    border-radius: 0px;
    a {
      background: black;
      color: white;
      padding: 10px 0;
      text-decoration: none;
    }
  }
  .all-link {
    margin-top: 5px;
    padding: 10px 0;
    background: black;
    width: 100%;
    a {
      color: white;
      text-decoration: none;
    }
  }

`;

const ShopCategory = () => {
  const { category } = useParams();
  const formatedCategory = category.replace('-', ' ').toUpperCase();
  const title = formatedCategory.slice(0, formatedCategory.indexOf(' ')).toLowerCase();
  return (
    <ShopCategoryStyles>
      <h1>{formatedCategory}</h1>
      <div className='category-buttons'>
        <Link to={`/shop/${title}-tops`}>TOPS</Link>
        <Link to={`/shop/${title}-bottoms`}>BOTTOMS</Link>
        <Link to={`/shop/${title}-hats`}>HATS</Link>
        <Link to={`/shop/${title}-bags`}>BAGS</Link>
        <Link to={`/shop/${title}-accessories`}>ACCESSORIES</Link>
        <Link to={`/shop/${title}-outerwear`}>OUTERWEAR</Link>
      </div>
      <div className='all-link'>
        <Link to={`/shop`}>BROWSE ALL PRODUCTS</Link>
      </div>
      <ProductsPageSearch>
        <ShopThumbs />
      </ProductsPageSearch>
    </ShopCategoryStyles>
  );
};

export default ShopCategory;
