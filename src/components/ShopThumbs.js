import 'react-lazy-load-image-component/src/effects/blur.css';

import React, { useContext, useEffect, useState } from 'react';

import { FirebaseContext } from '../context/Firebase';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import styled from 'styled-components';

export const ProductThumbsStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px;
  margin: 0 auto;
  font-family: ${props => props.theme.fonts.main}
  text-align: left;
  margin-top: 50px;
  img {
    width: 80%;
    margin-left: 10%;
  }
  h3,
  h4 {
    font-family: ${props => props.theme.fonts.main}
    margin: 0 auto;
    margin-left: 10%;
  }
  h3 {
    font-weight: 300;
    font-size: 1.1rem;
  }
  a {
    color: black;
    text-decoration: none;
  }
`;

const ShopThumbs = ({ open }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { dbh } = useContext(FirebaseContext);

  useEffect(() => {
    setLoading(true);
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
        })
        .catch(err => {
          console.log(err);
        });
    };
    getData();
    setLoading(false);
  }, [dbh]);

  if (loading) return <LoadingSpinner />;

  return (
    <ProductThumbsStyles className='product-thumbs'>
      {products.map(product => (
        <div className='product-thumb' key={product.id}>
          <Link to={`/product/${product.id}`}>
            <LazyLoadImage src={product.mainImage} alt={product.name} effect='blur' />
            <h4>{product.brand}</h4>
            <h3>{product.name}</h3>
            <h3>{`$${(product.price / 100).toFixed(2)}`}</h3>
          </Link>
        </div>
      ))}
    </ProductThumbsStyles>
  );
};

export default ShopThumbs;
