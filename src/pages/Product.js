import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import MediaViewer from '../components/ModelViewer';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Helmet } from 'react-helmet';
import AddToCart from '../components/AddToCart';
import Accordion from '../components/Accordion';
import ProductBrand from '../components/ProductBrand';
import AddToCartSuccessModal from '../components/AddToCartSuccessModal';
import { FirebaseContext } from '../context/Firebase';
import LoadingSpinner from '../components/LoadingSpinner';
import ThreeDSVG from '../assets/icons/icon_ar_toggle';
import { RoundARButton } from '../utilities/ReusableStyles';
import BackButton from '../components/BackButton';
import { ModalContext } from '../context/Modal';

const LoadingContainer = styled.div`
  min-height: 100vh;
  width: 500px;
  max-width: 100%;
  margin: 0 auto;
  margin-top: calc(10vh + 25px);
  background: ${props => props.theme.colors.white};
  position: relative;
`;

const ProductContainer = styled.div`
  min-height: 100vh;
  width: 500px;
  max-width: 100%;
  margin: 0 auto;
  margin-top: calc(10vh + 25px);
  font-family: ${props => props.theme.fonts.main};
  background: ${props => props.theme.colors.lightGrey};
  position: relative;
  model-viewer {
    width: 95%;
    height: 400px;
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
      border: 1px solid ${props => props.theme.colors.lightGrey};
    }
    svg {
      width: 80%;
      height: 76%;
      padding: 7% 5%;
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
      border: 1px solid ${props => props.theme.colors.lightGrey};
    }
  }
  .selected-photo {
    border: 1px solid ${props => props.theme.colors.black} !important;
  }
  .main-content-box {
    text-align: center;
    img {
      max-width: 90%;
    }
  }
  .title-section {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .title-name {
      width: 100%;
      @media (max-width: 480px) {
        h1 {
          font-size: 1.4rem;
        }
      }
    }
    .title-price {
      text-align: right;
      margin-right: 2.5%;
      h2 {
        font-size: 1.1rem;
      }
    }
  }
  .accordions {
    position: relative;
    top: 0px;
    margin: 30px 0 0;
    padding: 50px 0;
    background: ${props => props.theme.colors.white};
    border-radius: 50px;
    z-index: 400;
    box-shadow: 0 -6px 6px -6px ${props => props.theme.colors.grey},
      0 6px 6px -6px ${props => props.theme.colors.grey};
    ul {
      list-style-type: none;
      padding: 0px;
      li {
        margin: 10px 20px;
      }
    }
  }
  .accordions img {
    width: 95%;
    margin: 0 2.5%;
  }
  .accordions p {
    width: 95%;
    margin: -70px 2.5% 20px;
    font-weight: 300;
  }
  .back-button {
    background: ${props => props.theme.colors.white};
    padding: 20px;
    .back-button button {
      margin-top: 10px;
      border: none;
      background: white;
      color: green;
      .fa-chevron-left {
        font-size: 1.4rem;
      }
    }
  }
  .product-information {
    li {
      font-weight: 300;
    }
  }
  .product-top {
    padding-bottom: 40px;
    margin-bottom: 50px;
    border-bottom-right-radius: 50px;
    border-bottom-left-radius: 50px;
    margin-top: 0;
    background: ${props => props.theme.colors.white};
    box-shadow: 0 6px 6px -6px ${props => props.theme.colors.grey};
  }
  .order-details {
    margin-top: -90px;
    padding: 70px 0 50px;
    z-index: 10;
    position: relative;
  }
`;

const Product = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [mainDisplay, setMainDisplay] = useState('model');

  const { id } = useParams();

  const { dbh } = useContext(FirebaseContext);
  const { setPhotoUploadOpen } = useContext(ModalContext);

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      await dbh
        .collection('products')
        .doc(id)
        .get()
        .then(doc => {
          const id = doc.id;
          const details = doc.data();
          setProduct({ id, ...details });
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
        });
    };
    getData();
    window.scrollTo(0, 0);
  }, [dbh, id]);

  if (!product || loading)
    return (
      <LoadingContainer>
        <LoadingSpinner color='black' />
      </LoadingContainer>
    );

  return (
    <ProductContainer>
      <Helmet>
        <title>YZED - {product.name.toUpperCase()}</title>
      </Helmet>
      {isAdded && <AddToCartSuccessModal setIsAdded={setIsAdded} />}

      <section className='product-top'>
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
              displayLink={false}
              productId={product.id}
            />
          ) : (
            <LazyLoadImage src={mainDisplay} />
          )}
        </div>
        <div className='picture-thumbs'>
          <div className='ar-pic'>
            <LazyLoadImage
              src={product.mainImage}
              onClick={() => setMainDisplay('model')}
              effect='blur'
              alt={product.mainImage}
              className={mainDisplay === 'model' && 'selected-photo'}
            />
            <ThreeDSVG setMainDisplay={setMainDisplay} />
          </div>
          {product.pictures.map(image => (
            <LazyLoadImage
              key={image}
              src={image}
              onClick={() => setMainDisplay(image)}
              effect='blur'
              className={mainDisplay === image ? 'selected-photo' : ''}
              alt={image}
            />
          ))}
        </div>
        <RoundARButton onClick={() => document.querySelector('model-viewer').activateAR()}>
          AR
        </RoundARButton>
      </section>
      <section className='order-details '>
        <AddToCart sizes={product.sizes} product={product} setIsAdded={setIsAdded} />
      </section>
      <div className='accordions'>
        <Accordion titleRegular='PRODUCT' titleStrong='INFORMATION' id='information-accordion'>
          <ul className='product-information'>
            {product.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </Accordion>
        <Accordion titleRegular='PRODUCT' titleStrong='SIZING'>
          <LazyLoadImage
            src={
              'https://res.cloudinary.com/dq7uyauun/image/upload/v1579495625/size-guide-women-shoes.png'
            }
            alt='size-chart'
            effect='blur'
          />
        </Accordion>
      </div>
      <ProductBrand brandId={product.brandId} />
    </ProductContainer>
  );
};

export default Product;
