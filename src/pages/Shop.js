import React, { useEffect } from 'react';

import Accordion from '../components/Accordion';
import BrandAccordionContent from '../components/BrandAccordionContent';
import { Helmet } from 'react-helmet';
import SaleAccordionContent from '../components/SaleAccordionContent';
import ShopCategoryAccordionContent from '../components/ShopCategoryAccordionContent';
import ShopPageProductCarousel from '../components/ShopARCarousel';
import ShopThumbs from '../components/ShopThumbs';
import styled from 'styled-components';

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
      <Helmet>
        <title>YZED - SHOP</title>
      </Helmet>
      <h1>SHOP YZED</h1>

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
