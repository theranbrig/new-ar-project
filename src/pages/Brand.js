import React from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductsPageSearch from '../components/ProductsPageSearch';
import ShopThumbs from '../components/ShopThumbs';
import styled from 'styled-components';
import BackButton from '../components/BackButton';
import { Helmet } from 'react-helmet';

export const ShopCategoryStyles = styled.div`
  width: 500px;
  max-width: 95%;
  text-align: center;
  min-height: calc(90vh - 30px);
  margin: 0 auto 100px;
  font-family: Montserrat, sans-serif;
  margin-top: calc(10vh + 50px);
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

const Brand = () => {
  const { name } = useParams();
  let brandName;
  let formatedName;
  if (name.indexOf('-') === -1) {
    console.log(true);
    brandName = name;
    formatedName = name;
  } else {
    console.log(false);
    brandName = name.slice(0, name.indexOf('-'));
    formatedName = name.replace('-', ' ');
  }
  return (
    <ShopCategoryStyles>
      <Helmet>
        <title>YZED - {brandName.toUpperCase()}</title>
      </Helmet>
      <BackButton />
      <h1>{`${formatedName.toUpperCase()}`}</h1>
      <div className='category-buttons'>
        <Link to={`/brand/${brandName}-tops`}>TOPS</Link>
        <Link to={`/brand/${brandName}-bottoms`}>BOTTOMS</Link>
        <Link to={`/brand/${brandName}-hats`}>HATS</Link>
        <Link to={`/brand/${brandName}-bags`}>BAGS</Link>
        <Link to={`/brand/${brandName}-accessories`}>ACCESSORIES</Link>
        <Link to={`/brand/${brandName}-outerwear`}>OUTERWEAR</Link>
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

export default Brand;
