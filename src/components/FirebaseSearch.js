import React, { useState, useEffect, useContext } from 'react';
import debounce from 'lodash.debounce';
import { FirebaseContext } from '../context/Firebase';
import { Link, useHistory } from 'react-router-dom';
import { formatProductName } from '../utilities/formatting';
import Highlighter from 'react-highlight-words';
import styled from 'styled-components';
import { BackButtonStyles } from './BackButton';

export const SearchStyles = styled.div`
  input {
    border: none;
    background: transparent;
    border-bottom: 1px solid white;
    color: white;
    width: 80%;
    margin: 0 10% 30px;
    height: 30px;
    line-height: 30px;
    font-size: 1.2rem;
    font-family: Montserrat, sans-serif;
    padding: 3px;
  }
  button {
    background: transparent;
    color: white;
    width: 100%;
    font-family: Montserrat, sans-serif;
    font-size: 1.2rem;
    border: none;
    margin: 10px 0;
    text-align: left;
    font-weight: 300;
    letter-spacing: 0.05rem;
    .highlighted-text {
      background: transparent;
      font-weight: 600;
      color: white;
    }
  }
`;

const FirebaseSearch = ({ setOpenSearch }) => {
  const history = useHistory();
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);

  const { dbh } = useContext(FirebaseContext);

  const searchForProduct = debounce(query => {
    let tempItems = [];
    dbh
      .collection('products')
      .where('keywords', 'array-contains', query.toLowerCase())
      .limit(5)
      .get()
      .then(querySnapshot => {
        querySnapshot.docs.forEach(doc => {
          const { name, price, mainImage, brand } = doc.data();
          tempItems.push({
            id: doc.id,
            name: formatProductName(name),
            price,
            mainImage,
            brand: brand.toUpperCase(),
          });
        });
        setProducts(tempItems);
      });
  }, 150);

  return (
    <SearchStyles>
      <input
        aria-label='search input'
        value={searchQuery}
        onChange={e => {
          if (e.target.value === '') {
            setProducts([]);
          } else {
            searchForProduct(e.target.value);
          }
          setSearchQuery(e.target.value);
        }}
        type='text'
      />
      {products.map(product => {
        return (
          <div key={product.id}>
            <button
              name={product.name}
              id={product.id}
              onClick={() => {
                setOpenSearch(false);
                setSearchQuery('');
                setProducts([]);
                history.push(`/product/${product.id}`);
              }}>
              <Highlighter
                highlightClassName='highlighted-text'
                searchWords={[searchQuery]}
                autoEscape={true}
                textToHighlight={`${product.brand} ${product.name}`}
              />
            </button>
          </div>
        );
      })}
    </SearchStyles>
  );
};

export default FirebaseSearch;
