import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Link } from 'react-router-dom';
import { FirebaseContext } from '../context/Firebase';

export const ProductThumbsStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px;
  margin: 0 auto;
  font-family: Montserrat, sans-serif;
  text-align: left;
  margin-top: 50px;
  img {
    width: 80%;
    margin-left: 10%;
  }
  h3,
  h4 {
    font-family: Montserrat, sans-serif;
    margin: 0 auto;
    margin-left: 10%;
  }
  h3 {
    font-weight: 400;
    font-size: 1.1rem;
  }
  .product-thumb a {
    color: black;
    text-decoration: none;
  }
`;

const ProductThumbs = ({ open }) => {
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
        })
        .catch(err => {
          console.log(err);
        });
    };
    getData();
  }, [dbh]);

  return (
    <ProductThumbsStyles className='product-thumbs'>
      {products.map(product => (
        <div className='product-thumb' key={product.id}>
          <Link to={`product/${product.id}`}>
            <LazyLoadImage src={product.mainImage} alt={product.name} effect='blur' />
            <h4>{product.brand}</h4>
            <h3>{product.name}</h3>
          </Link>
        </div>
      ))}
    </ProductThumbsStyles>
  );
};

export default ProductThumbs;
