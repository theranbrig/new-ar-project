import React, { useEffect } from 'react';
import styled from 'styled-components';
import ProductsPageSearch from '../components/ProductsPageSearch';
import ShopPageProductCarousel from '../components/ShopARCarousel';
import Accordion from '../components/Accordion';
import ShopCategoryAccordionContent from '../components/ShopCategoryAccordionContent';
import ShopThumbs from '../components/ShopThumbs';
import BrandAccordionContent from '../components/BrandAccordionContent';
import SaleAccordionContent from '../components/SaleAccordionContent';

export const ShopStyles = styled.div`
  width: 500px;
  max-width: 95%;
  margin: 0 auto 100px;
  font-family: Montserrat, sans-serif;
  font-weight: 400;
  min-height: calc(90vh - 30px);
  text-align: center;
  margin-top: calc(10vh + 50px);
  h1 {
    margin-top: 30px;
  }
`;

const Shop = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ShopStyles>
      <h1>SHOP YZED</h1>
      <ProductsPageSearch />
      <Accordion title='Women'>
        <ShopCategoryAccordionContent title='women' />
      </Accordion>
      <Accordion title='Men'>
        <ShopCategoryAccordionContent title='men' />
      </Accordion>
      <Accordion title='Brands'>
        <BrandAccordionContent title='brands' />
      </Accordion>
      <Accordion title='Sale' last={true}>
        <SaleAccordionContent title='sale' />
      </Accordion>
      <ShopPageProductCarousel />
      <h3>RECOMMENDED FOR YOU</h3>
      <ShopThumbs />
    </ShopStyles>
  );
};

export default Shop;
