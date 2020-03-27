import 'react-lazy-load-image-component/src/effects/blur.css';

import React, { useContext, useEffect, useState } from 'react';

import { FirebaseContext } from '../context/Firebase';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import styled from 'styled-components';

const SliderStyles = styled.div`
  .awssld__wrapper {
    height: 200px;
    max-width: 90%;
    margin-left: 5%;
    margin-bottom: 50px;
  }
  .awssld__content {
    background-color: white !important;
  }
  .slider-cell {
    height: 100%;
    .product-info img {
      height: 150px;
      margin: 0 auto;
    }
    .product-info {
      position: relative;
      text-align: center;
      width: 300px;
      margin: 0 auto;
    }
  }
  model-viewer {
    width: 90%;
    height: 300px;
    margin: 20px auto 0 !important;
  }
  h1 {
    min-height: 220px;
    margin-top: 100px !important;
    font-weight: 300;
  }
  a {
    color: black;
    font-weight: 300;
    text-decoration: none;
  }
  div .awssld__timer {
    background-color: transparent;
  }
`;

const ShopCategoryCarousel = () => {
  const [products, setProducts] = useState([]);

  const { dbh } = useContext(FirebaseContext);

  useEffect(() => {
    const getData = async () => {
      let fSProducts = [];
      await dbh
        .collection('products')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            fSProducts.push({ id: doc.ref.id, ...doc.data() });
          });
          setProducts(fSProducts);
        });
    };
    getData();
  }, []);

  if (!products.length) return <LoadingSpinner />;

  return (
    <SliderStyles>
      <h4>Featured Products</h4>
    </SliderStyles>
  );
};

export default ShopCategoryCarousel;
