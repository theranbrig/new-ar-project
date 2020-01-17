import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../data';
import styled from 'styled-components';
import MediaViewer from '../components/MediaViewer';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const ProductContainer = styled.div`
  min-height: 100vh;
  width: 500px;
  max-width: 95%;
  margin: 0 auto;
  font-family: Montserrat;
  model-viewer {
    width: 95%;
    height: 300px;
    margin: 0 auto;
  }
  h1,
  h3 {
    width: 95%;
    margin: 0 auto;
    text-transform: uppercase;
  }
  h3 {
    margin-top: 50px;
  }
  h1 {
    margin-bottom: 30px;
    font-weight: 300;
  }
  div.ar-pic {
    position: relative !important;
    top: 0;
    left: 0;
    img {
      position: relative;
    }
    svg {
      background: #34343434;
      width: 80%;
      padding: 10%;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
  .picture-thumbs {
    width: 95%;
    margin: 10px auto;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 10px;
    img {
      max-width: 100%;
    }
  }
`;

const WhiteButton = styled.button`
  border: 2px solid black;
  border-radius: 0px;
  height: 52px;
  display: block;
  margin: 20px auto;
  font-size: 1.2rem;
  padding: 5px 80px;
  font-family: Montserrat;
  background: white;
  color: black;
  width: 95%;
  min-width: 284px;
`;

const Product = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mainDisplay, setMainDisplay] = useState('model');

  let { id } = useParams();

  useEffect(() => {
    setLoading(true);
    const filteredProducts = products.filter(prod => prod.name === id);
    setProduct(filteredProducts[0]);
    setLoading(false);
    console.log(product);
  }, [product]);

  if (!product || loading) return <h1>Loading...</h1>;
  return (
    <ProductContainer>
      <div className='title-section'>
        <h3>{product.brand}</h3>
        <h1>{product.name}</h1>
      </div>
      {mainDisplay === 'model' ? <MediaViewer /> : <LazyLoadImage src={mainDisplay} />}
      <div className='picture-thumbs'>
        <div className="ar-pic">
          <LazyLoadImage src={product.imageUrl} onClick={() => setMainDisplay('model')} />
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" onClick={() => setMainDisplay('model')}><title>Virtual Reality icons</title><path d="M145,57h41a10,10,0,0,1,10,10V175a10,10,0,0,1-10,10H14A10,10,0,0,1,4,175V67A10,10,0,0,1,14,57H55.5" fill="none" stroke="#220728" stroke-miterlimit="10" stroke-width="8"/><line x1="163.03" y1="56.97" x2="163.03" y2="185.03" fill="none" stroke="#220728" stroke-miterlimit="10" stroke-width="8"/><line x1="36.97" y1="56.97" x2="36.97" y2="185.03" fill="none" stroke="#220728" stroke-miterlimit="10" stroke-width="8"/><line x1="100" y1="62.23" x2="100" y2="110.23" fill="none" stroke="#ffc548" stroke-miterlimit="10" stroke-width="8"/><line x1="56" y1="35.8" x2="100" y2="62.79" fill="none" stroke="#ffc548" stroke-miterlimit="10" stroke-width="7.94"/><line x1="144" y1="35.8" x2="100" y2="62.79" fill="none" stroke="#ffc548" stroke-miterlimit="10" stroke-width="8"/><polygon points="144 35.8 144 84.58 100 111.9 56 84.91 56 35.8 99.5 8.7 144 35.8" fill="none" stroke="#ffc548" stroke-miterlimit="10" stroke-width="8"/><line x1="74" y1="131" x2="126" y2="131" fill="none" stroke="#220728" stroke-miterlimit="10" stroke-width="8"/></svg>
        </div>
        {product.pictures.map(image => (
          <LazyLoadImage src={image} onClick={() => setMainDisplay(image)} />
        ))}
      </div>
      <WhiteButton onClick={() => document.querySelector('model-viewer').activateAR()}>
        VIEW IN AR
      </WhiteButton>
    </ProductContainer>
  );
};

export default Product;
