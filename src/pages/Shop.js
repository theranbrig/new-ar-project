import React from 'react';
import styled from 'styled-components';
import ProductsPageSearch from '../components/ProductsPageSearch';
import ShopPageProductCarousel from '../components/ShopARCarousel';
import Accordion from '../components/Accordion';
import ShopCategoryAccordionContent from '../components/ShopCategoryAccordionContent';
import ShopThumbs from '../components/ShopThumbs';
import BrandAccordionContent from '../components/BrandAccordionContent';

export const ShopStyles = styled.div`
  width: 500px;
  max-width: 95%;
  margin: 0 auto 100px;
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
      <ProductsPageSearch />
      <Accordion title='Women'>
        <ShopCategoryAccordionContent title="women's" />
      </Accordion>
      <Accordion title='Men'>
        <ShopCategoryAccordionContent title="men's" />
      </Accordion>
      <Accordion title='Brands'>
        <BrandAccordionContent title='brands' />
      </Accordion>
      {/* <Accordion title='Sale'>
        <h1>Hi</h1>
      </Accordion> */}
      <ShopPageProductCarousel />
      <h3>RECOMMENDED FOR YOU</h3>
      <ShopThumbs />
    </ShopStyles>
  );
};

export default Shop;
