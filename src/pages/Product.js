import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../data';
import styled from 'styled-components';
import MediaViewer from '../components/MediaViewer';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ThreeDSVG from '../components/ThreeDSVG';
import 'react-lazy-load-image-component/src/effects/blur.css';

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
    top: 0;import ThreeDSVG from '../components/ThreeDSVG';
    left: 0;
    img {
      position: relative;
    }
    svg {
      background: #f3f3f380;
      width: 80%;
      height: 76%;
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
  .main-content-box {
    text-align: center;
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
      <div className='main-content-box'>
        {mainDisplay === 'model' ? <MediaViewer /> : <LazyLoadImage src={mainDisplay} />}
      </div>
      <div className='picture-thumbs'>
        <div className='ar-pic'>
          <LazyLoadImage
            src={product.imageUrl}
            onClick={() => setMainDisplay('model')}
            effect='blur'
          />
          <ThreeDSVG setMainDisplay={setMainDisplay} />
        </div>
        {product.pictures.map(image => (
          <LazyLoadImage src={image} onClick={() => setMainDisplay(image)} effect='blur' />
        ))}
      </div>
      <WhiteButton onClick={() => document.querySelector('model-viewer').activateAR()}>
        VIEW IN AR
      </WhiteButton>
    </ProductContainer>
  );
};

export default Product;
