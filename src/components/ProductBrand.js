import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const ProductBrand = ({ brand }) => {
  return (
    <div>
      <div className='brand-image'>
        <LazyLoadImage src={brand.image} alt={brand.name}/>
      <div className='brand-info'>
        <h3>{brand.name}</h3>
      </div>
    </div>
  );
};

export default ProductBrand;
