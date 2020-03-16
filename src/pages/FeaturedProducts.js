import React, { useContext, useEffect, useState } from 'react';

import { FirebaseContext } from '../context/Firebase';
import LikeEmptySVG from '../assets/icons/icon_like_empty';
import LikeFilledSVG from '../assets/icons/icon_like_filled';
import { Link } from 'react-router-dom';
import { formatPrice } from '../utilities/formatting';
import styled from 'styled-components';

export const FeaturedStyles = styled.div`
  width: 500px;
  max-width: 95%;
  margin: 12vh auto 0;
  font-family: ${props => props.theme.fonts.main};
  .products {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(3, 1fr);
    grid-gap: 20px;
    .product {
      width: 100%;
      margin: 20px auto;
      position: relative;
      a {
        color: ${props => props.theme.colors.black};
        text-decoration: none;
      }

      img {
        border: 1px solid ${props => props.theme.colors.lightGrey};
        width: 100%;
      }
      h2,
      h3,
      h4 {
        margin: 0 auto;
        font-weight: 300;
      }
      h2 {
        font-size: 1.3rem;
        font-weight: 600;
      }
      h3 {
        font-size: 1.1rem;
      }
      h4 {
        margin-top: 10px;
        font-size: 1.1rem;
      }
      button {
        height: 40px;
        width: 40px;
        border-radius: 50%;
        background: ${props => props.theme.colors.white};
        position: absolute;
        top: 5px;
        right: 5px;
        svg {
          height: 18px;
          margin-top: 4px;
          @media (max-width: 480px) {
            margin-left: -2px;
          }
        }
      }
    }
  }
`;

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const { dbh, userData, userLoading, firebase } = useContext(FirebaseContext);

  const checkItems = () => {
    dbh
      .collection('products')
      .limit(12)
      .onSnapshot(querySnapshot => {
        let tempProducts = [];
        querySnapshot.forEach(doc => {
          let liked = false;
          if (userData.loggedIn) {
            liked = userData.favoriteProducts.some(product => product === doc.id);
          }
          console.log(doc.data());
          tempProducts.push({ id: doc.id, ...doc.data(), liked });
        });
        setProducts(tempProducts);
      });
  };

  const likeProduct = (productId, liked) => {
    if (!liked) {
      dbh
        .collection('users')
        .doc(userData.id)
        .update({ favoriteProducts: firebase.firestore.FieldValue.arrayUnion(productId) });
    } else {
      dbh
        .collection('users')
        .doc(userData.id)
        .update({ favoriteProducts: firebase.firestore.FieldValue.arrayRemove(productId) });
    }
  };

  useEffect(() => {
    checkItems();
    return () => {
      checkItems();
    };
  }, [userData, userLoading]);

  return (
    <FeaturedStyles>
      <div className='title'>
        <h1>Featured Products</h1>
      </div>
      <div className='products'>
        {products.map(product => (
          <div className='product' key={product.id}>
            <button
              disabled={!userData.loggedIn}
              className='favorite'
              onClick={() => {
                likeProduct(product.id, product.liked);
              }}>
              {product.liked ? <LikeFilledSVG /> : <LikeEmptySVG />}
            </button>
            <Link to={`/product/${product.id}`}>
              <img src={product.mainImage} alt={product.name} />
              <h2>{product.brand}</h2>
              <h3>{product.name}</h3>
              {/* <h4>{formatPrice(product.price)}</h4> */}
            </Link>
          </div>
        ))}
      </div>
    </FeaturedStyles>
  );
};

export default FeaturedProducts;
