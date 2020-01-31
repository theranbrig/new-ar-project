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

const BrandAccordionContent = ({ title, products }) => {
  return (
    <CategoryAccordionContent>
      <div className='category-buttons'>
        <Link to={`/sale/10`}>CHANEL</Link>
        <Link to={`/sale/30`}>DIOR</Link>
        <Link to={`/sale/70`}>NIKE</Link>
      </div>
      <ShopCategoryCarousel />
    </CategoryAccordionContent>
  );
};

export default BrandAccordionContent;
