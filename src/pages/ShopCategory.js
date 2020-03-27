import BackButton from '../components/BackButton';
import { Helmet } from 'react-helmet';
import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

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

const ShopCategory = () => {
  const { category } = useParams();
  const formatedCategory = category.replace('-', "'s ").toUpperCase();
  const title = formatedCategory.slice(0, formatedCategory.indexOf("'")).toLowerCase();
  return (
    <ShopCategoryStyles>
      <Helmet>
        <title>{`YZED - SHOP ${title.toUpperCase()}`}</title>
      </Helmet>
      <BackButton />
    </ShopCategoryStyles>
  );
};

export default ShopCategory;
