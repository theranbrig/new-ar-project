import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { products } from '../data';
import styled from 'styled-components';
import MediaViewer from '../components/ModelViewer';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ThreeDSVG from '../components/ThreeDSVG';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Helmet } from 'react-helmet';
import AddToCart from '../components/AddToCart';
import Reviews from '../components/Reviews';
import Accordion from '../components/Accordion';
import ProductBrand from '../components/ProductBrand';
import AddToCartSuccessModal from '../components/AddToCartSuccessModal';
import { ProductContext } from '../context/Product';

const ProductContainer = styled.div`
  min-height: 100vh;
  width: 500px;
  max-width: 95%;
  margin: 0 auto;
  font-family: Montserrat, sans-serif;
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
      background: #000000b3;
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
    grid-auto-rows: 1fr;
    grid-gap: 10px;
    img {
      width: 100px;
      height: 100px;
      max-width: 100%;
    }
  }
  .main-content-box {
    text-align: center;
    img {
      max-width: 90%;
    }
  }
  .title-section {
    margin-top: 30px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .title-name {
      width: 100%;
    }
    .title-price {
      text-align: right;
      margin-right: 2.5%;
      h2 {
        font-size: 1.4rem;
      }
    }
  }
  .accordions {
    margin: 30px 0 0;
  }
  .accordions img {
    width: 95%;
    margin: 0 2.5%;
  }
  .accordions p {
    width: 95%;
    margin: 20px 2.5%;
    font-weight: 300;
  }
  .back-button button {
    margin-top: 10px;
    border: none;
    background: white;
    .fa-chevron-left {
      font-size: 1.4rem;
    }
  }
  .lds-dual-ring {
    display: inline-block;
    width: 80px;
    height: 80px;
    margin-top: 50px;
    margin-left: calc(50% - 40px);
  }
  .lds-dual-ring:after {
    content: ' ';
    display: block;
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid black;
    border-color: black transparent black transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }
  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
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
  font-family: Montserrat, sans-serif;
  background: white;
  color: black;
  width: 95%;
  min-width: 284px;
`;

const Product = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [mainDisplay, setMainDisplay] = useState('model');

  const history = useHistory();

  const { id } = useParams();

  const { getProduct, firebaseProduct, setFirebaseProduct } = useContext(ProductContext);

  useEffect(() => {
    setFirebaseProduct(null);
    getProduct(id);
  }, []);

  if (!firebaseProduct || loading)
    return (
      <ProductContainer>
        <div class='lds-dual-ring'></div>
      </ProductContainer>
    );
  return (
    <ProductContainer>
      <Helmet>
        <title>YZED - {firebaseProduct.name}</title>
      </Helmet>
      {isAdded && <AddToCartSuccessModal setIsAdded={setIsAdded} />}
      <div className='back-button'>
        <button aria-label='Back Button' onClick={() => history.goBack()}>
          <i className='fa fa-chevron-left' aria-hidden='true'></i>
        </button>
      </div>
      <div className='title-section'>
        <div className='title-name'>
          <h3>{firebaseProduct.brand}</h3>
          <h1>{firebaseProduct.name}</h1>
        </div>
        <div className='title-price'>
          <h2>{`$${(firebaseProduct.price / 100).toFixed(2)}`}</h2>
        </div>
      </div>
      <div className='main-content-box'>
        {mainDisplay === 'model' ? (
          <MediaViewer
            glbFile={firebaseProduct.glbFile}
            usdzFile={firebaseProduct.usdzFile}
            poster={firebaseProduct.imageUrl}
          />
        ) : (
          <LazyLoadImage src={mainDisplay} />
        )}
      </div>
      <div className='picture-thumbs'>
        <div className='ar-pic'>
          <LazyLoadImage
            src={firebaseProduct.mainImage}
            onClick={() => setMainDisplay('model')}
            effect='blur'
            alt={firebaseProduct.mainImage}
          />
          <ThreeDSVG setMainDisplay={setMainDisplay} />
        </div>
        {firebaseProduct.pictures.map(image => (
          <LazyLoadImage
            key={image}
            src={image}
            onClick={() => setMainDisplay(image)}
            effect='blur'
            alt={image}
          />
        ))}
      </div>
      <WhiteButton onClick={() => document.querySelector('model-viewer').activateAR()}>
        VIEW IN AR
      </WhiteButton>
      <AddToCart
        sizes={firebaseProduct.sizes}
        productId={firebaseProduct.id}
        setIsAdded={setIsAdded}
      />
      <div className='accordions'>
        <Accordion title='PRODUCT INFORMATION' id='information-accordion'>
          <p>{firebaseProduct.productInformation}</p>
        </Accordion>
        <Accordion title={`SIZING TABLE`}>
          <LazyLoadImage
            src={
              'https://res.cloudinary.com/dq7uyauun/image/upload/v1579495625/size-guide-women-shoes.png'
            }
            alt='size-chart'
            effect='blur'
          />
        </Accordion>
      </div>
      <ProductBrand />
    </ProductContainer>
  );
};

export default Product;
