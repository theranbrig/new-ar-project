import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../data';
import styled from 'styled-components';
import MediaViewer from '../components/MediaViewer';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const ProductContainer = styled.div`
  min-height: 100vh;
  width: 500px;
  max-width: 90%;
  margin: 0 auto;
  model-viewer {
    width: 90%;
    height: 300px;
    margin: 0 auto;
  }
  .picture-thumbs {
    width: 90%;
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
  margin: 0 auto;
  font-size: 1.2rem;
  padding: 5px 80px;
  font-family: Montserrat;
  background: white;
  color: black;
  width: 90%;
  min-width: 284px;
  margin-bottom: 10px;
`;

const Product = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
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
      <h1>{product.name}</h1>
      <MediaViewer />
      <div className='picture-thumbs'>
        <LazyLoadImage src={product.imageUrl} />
        {product.pictures.map(image => (
          <LazyLoadImage src={image} />
        ))}
      </div>
      <WhiteButton onClick={() => document.querySelector('model-viewer').activateAR()}>
        VIEW IN AR
      </WhiteButton>
    </ProductContainer>
  );
};

export default Product;
