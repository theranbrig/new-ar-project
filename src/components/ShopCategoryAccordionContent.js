import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ShopCategoryCarousel from './ShopCategoryCarousel';

export const CategoryAccordionContent = styled.div`
  font-family: Montserrat, sans-serif;
  margin: 10px auto;
  width: 95%;
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
`;

const ShopCategoryAccordionContent = ({ title, products }) => {
  return (
    <CategoryAccordionContent>
      <div className='category-buttons'>
        <Link to={`/shop/${title}-tops`}>TOPS</Link>
        <Link to={`/shop/${title}-bottoms`}>BOTTOMS</Link>
        <Link to={`/shop/${title}-hats`}>HATS</Link>
        <Link to={`/shop/${title}-bags`}>BAGS</Link>
        <Link to={`/shop/${title}-accessories`}>ACCESSORIES</Link>
        <Link to={`/shop/${title}-outerwear`}>OUTERWEAR</Link>
      </div>
      <ShopCategoryCarousel />
    </CategoryAccordionContent>
  );
};

export default ShopCategoryAccordionContent;
