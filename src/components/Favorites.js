import React, { useContext, useEffect, useState } from 'react';

import { FirebaseContext } from '../context/Firebase';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import LikeFilledSVG from '../assets/icons/icon_like_filled';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const FavoritesStyles = styled.div`
  .favorite-items {
    width: 95%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 40px;
    align-items: center;
    grid-gap: 15px;
    padding: 10px 0;
    border-bottom: 1px solid ${props => props.theme.colors.lightGrey};
    a {
      display: grid;
      grid-template-columns: 65px 1fr;
      align-items: center;
      grid-gap: 15px;
      text-decoration: none;
      color: ${props => props.theme.colors.black};
    }
    img {
      justify-self: center;
      width: 100%;
    }
    h4,
    h3 {
      margin: 0;
      font-family: ${props => props.theme.fonts.main};
      text-align: left;
    }
    h3 {
      font-weight: 500;
    }
    h4 {
      font-weight: 300;
    }
    button {
      background: none;
      border: none;
      svg {
        height: 16px;
      }
    }
  }
  h3 {
    text-align: center;
    font-weight: 300;
    a {
      color: ${props => props.theme.colors.black};
    }
  }
`;

const Favorites = ({ favorites }) => {
  return (
    <FavoritesStyles>
      <h2>Favorites</h2>
      {!favorites.length && (
        <h3>
          Sorry. You have not added any products to your favorites list.{' '}
          <Link to='/featured'>Check out</Link> some of our awesome looks.
        </h3>
      )}
      {favorites.map(favorite => (
        <FavoriteItem item={favorite} key={favorite} />
      ))}
    </FavoritesStyles>
  );
};

const FavoriteItem = ({ item }) => {
  const [product, setProduct] = useState(null);
  const { dbh, userData, firebase } = useContext(FirebaseContext);

  useEffect(() => {
    dbh
      .collection('products')
      .doc(item)
      .get()
      .then(doc => {
        setProduct({ ...doc.data() });
      });
  }, []);

  const likeProduct = () => {
    if (window.confirm('Are you sure you want to remove this from your favorites?')) {
      dbh
        .collection('users')
        .doc(userData.id)
        .update({ favoriteProducts: firebase.firestore.FieldValue.arrayRemove(item) });
    }
  };

  return (
    <>
      {product && (
        <div className='favorite-items'>
          <Link to={`/item/${item}`}>
            <LazyLoadImage src={product.mainImage} />
            <div className='content'>
              <h3>{product.brand}</h3>
              <h4>{product.name}</h4>
            </div>
          </Link>
          <button
            className='favorite'
            onClick={() => {
              likeProduct();
            }}>
            <LikeFilledSVG />
          </button>
        </div>
      )}
    </>
  );
};

export default Favorites;
