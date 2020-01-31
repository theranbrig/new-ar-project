import React, { useEffect, useState } from 'react';
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

  let { id } = useParams();

  useEffect(() => {
    setLoading(true);
    const filteredProducts = products.filter(prod => prod.name === id);
    setProduct(filteredProducts[0]);
    setLoading(false);
    console.log(product);
  }, [product, id]);

  if (!product || loading) return <h1>Loading...</h1>;
  return (
    <ProductContainer>
      <Helmet>
        <title>YZED - {product.name}</title>
      </Helmet>
      {isAdded && <AddToCartSuccessModal setIsAdded={setIsAdded} />}
      <div className='back-button'>
        <button aria-label='Back Button' onClick={() => history.goBack()}>
          <i className='fa fa-chevron-left' aria-hidden='true'></i>
        </button>
      </div>
      <div className='title-section'>
        <div className='title-name'>
          <h3>{product.brand}</h3>
          <h1>{product.name}</h1>
        </div>
        <div className='title-price'>
          <h2>{`$${(product.price / 100).toFixed(2)}`}</h2>
        </div>
      </div>
      <div className='main-content-box'>
        {mainDisplay === 'model' ? (
          <MediaViewer
            glbFile={product.glbFile}
            usdzFile={product.usdzFile}
            poster={product.imageUrl}
          />
        ) : (
          <LazyLoadImage src={mainDisplay} />
        )}
      </div>
      <div className='picture-thumbs'>
        <div className='ar-pic'>
          <LazyLoadImage
            src={product.imageUrl}
            onClick={() => setMainDisplay('model')}
            effect='blur'
            alt={product.imageUrl}
          />
          <ThreeDSVG setMainDisplay={setMainDisplay} />
        </div>
        {product.pictures.map(image => (
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
      <AddToCart sizes={product.sizes} productId={product.id} setIsAdded={setIsAdded} />
      <div className='accordions'>
        <Accordion title='PRODUCT INFORMATION' id='information-accordion'>
          <p>{product.productInformation}</p>
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
        <Accordion title={`REVIEWS (${product.reviews.length})`} last={true}>
          <Reviews reviews={product.reviews} />
        </Accordion>
      </div>
      <ProductBrand />
    </ProductContainer>
  );
};

export default Product;
