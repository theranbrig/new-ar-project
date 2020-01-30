import React, { useState } from 'react';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import { products } from '../data';
import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import MediaViewer from './MediaViewer';

const SliderStyles = styled.div`
  .awssld__wrapper {
    height: 200px;
    margin-top: 40px;
    max-width: 90%;
    margin-left: 5%;
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
`;

const ShopPageProductCarousel = () => {
  const [currentARModel, setCurrentARModel] = useState(null);
  return (
    <SliderStyles>
      {currentARModel ? (
        <MediaViewer glbFile={currentARModel.glbFile} />
      ) : (
        <h1>Click items below to view more AR content</h1>
      )}
      <AwesomeSlider>
        {products.map(product => (
          <div className='slider-cell content' key={product.id}>
            <div className='product-info'>
              <LazyLoadImage
                src={product.imageUrl}
                alt={product.name}
                effect='blur'
                onClick={() => setCurrentARModel(product)}
              />
              <h4>{product.name}</h4>
            </div>
          </div>
        ))}
      </AwesomeSlider>
    </SliderStyles>
  );
};

export default ShopPageProductCarousel;
