import 'react-lazy-load-image-component/src/effects/blur.css';

import React, { useContext, useEffect, useState } from 'react';

import { FirebaseContext } from '../context/Firebase';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import LoadingSpinner from '../components/LoadingSpinner';
import MediaViewer from './ModelViewer';
import styled from 'styled-components';

const SliderStyles = styled.div`
  margin-top: 30px;
  .awssld__wrapper {
    height: 200px;
    margin-top: 40px;
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

const ShopPageProductCarousel = () => {
  const [currentARModel, setCurrentARModel] = useState(null);
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
          console.log(products);
        })
        .catch(err => {
          console.log(err);
        });
    };
    getData();
  }, []);

  if (!products.length) return <LoadingSpinner color='black' />;

  return (
    <SliderStyles>
      {currentARModel ? (
        <MediaViewer
          glbFile={currentARModel.glbFile}
          usdzFile={currentARModel.usdzFile}
          displayLink={true}
          productId={currentARModel.id}
        />
      ) : (
        <h1>Click items below to view more AR content</h1>
      )}
    </SliderStyles>
  );
};

export default ShopPageProductCarousel;
