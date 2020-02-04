import React, { useContext, useEffect, useState } from 'react';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import AwesomeSliderStyles from 'react-awesome-slider/src/styled/cube-animation';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import { FirebaseContext } from '../context/Firebase';
import { Link } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

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
  const { getProducts, firebaseProducts } = useContext(FirebaseContext);

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
          console.log(products);
        })
        .catch(err => {
          console.log(err);
        });
    };
    getData();
  }, []);

  if (!products.length) return <LoadingSpinner />;

  return (
    <SliderStyles>
      <h4>Featured Products</h4>
      {products.length && (
        <AutoplaySlider
          animation='cubeAnimation'
          cssModule={AwesomeSliderStyles}
          play={true}
          interval={3000}
          infinite={true}>
          {products.map(product => (
            <div className='slider-cell content' key={product.id}>
              <Link to={`/product/${product.id}`}>
                <div className='product-info'>
                  <LazyLoadImage src={product.mainImage} alt={product.name} effect='blur' />
                  <h4>{product.name}</h4>
                </div>
              </Link>
            </div>
          ))}
        </AutoplaySlider>
      )}
    </SliderStyles>
  );
};

export default ShopCategoryCarousel;
