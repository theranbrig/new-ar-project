import React from 'react';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import { products } from '../data';
import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import AwesomeSliderStyles from 'react-awesome-slider/src/styled/cube-animation';
import withAutoplay from 'react-awesome-slider/dist/autoplay';

const AutoplaySlider = withAutoplay(AwesomeSlider);

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
  div .awssld__timer {
    background-color: transparent;
  }
`;

const ShopCategoryCarousel = () => {
  return (
    <SliderStyles>
      <h4>Featured Products</h4>
      <AutoplaySlider
        animation='cubeAnimation'
        cssModule={AwesomeSliderStyles}
        play={true}
        interval={3000}
        infinite={true}>
        {products.map(product => (
          <div className='slider-cell content' key={product.id}>
            <div className='product-info'>
              <LazyLoadImage src={product.imageUrl} alt={product.name} effect='blur' />
              <h4>{product.name}</h4>
            </div>
          </div>
        ))}
      </AutoplaySlider>
    </SliderStyles>
  );
};

export default ShopCategoryCarousel;
