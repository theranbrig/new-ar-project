import React, { useState, useContext } from 'react';
import debounce from 'lodash.debounce';
import { FirebaseContext } from '../context/Firebase';
import { Link, useHistory } from 'react-router-dom';
import { formatProductName, formatPrice } from '../utilities/formatting';
import Highlighter from 'react-highlight-words';
import styled from 'styled-components';

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
    <>
      <SearchStyles>
        <div className='search-box'>
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
          {products.slice(0, 5).map(product => {
            return (
              <Link
                className='search-link'
                key={product.id}
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
              </Link>
            );
          })}
        </div>
        <div className='products-list'>
          {products.slice(0, 5).map(product => (
            <Link
              to={`/product/${product.id}`}
              className='display-link'
              onClick={() => {
                setOpenSearch(false);
                setSearchQuery('');
                setProducts([]);
                history.push(`/product/${product.id}`);
              }}>
              <img src={product.mainImage} alt={product.name} height='100px' width='100px' />
              <div className='link-info'>
                <h3>{product.brand}</h3>
                <h4>{product.name}</h4>
              </div>
              <h5>{formatPrice(product.price)}</h5>
            </Link>
          ))}
        </div>
      </SearchStyles>
      <SearchLinkStyles>
        <Link
          to={`/search/${searchQuery}`}
          onClick={() => {
            setOpenSearch(false);
            setSearchQuery('');
            setProducts([]);
          }}>
          SEE ALL RESULTS ({`${products.length}`})
        </Link>
      </SearchLinkStyles>
    </>
  );
};

export default FirebaseSearch;

const SearchStyles = styled.div`
  .search-box {
    width: 500px;
    margin: 0 auto;
    input {
      width: 500px;
      max-width: 95%;
      border: none;
      background: transparent;
      border-bottom: 1px solid ${props => props.theme.colors.white};
      color: white;
      margin: 0 0 20px;
      height: 30px;
      line-height: 30px;
      font-size: 1.2rem;
      font-family: ${props => props.theme.fonts.main};
      padding: 3px;
    }
  }
  a.search-link {
    background: transparent;
    color: ${props => props.theme.colors.white};
    width: 100%;
    font-family: ${props => props.theme.fonts.main};
    font-size: 1.4rem;
    border: none;
    padding: 10px 0;
    text-align: left;
    font-weight: 300;
    letter-spacing: 0.05rem;
    text-decoration: none;
    display: block;
    .highlighted-text {
      background: transparent;
      font-weight: 600;
      color: ${props => props.theme.colors.white};
    }
  }
  .products-list {
    width: 100%;
    background: ${props => props.theme.colors.white};
    height: 100%;
    a.display-link {
      width: 500px;
      max-width: 95%;
      margin: 0 auto;
      padding: 10px 20px;
      display: grid;
      grid-template-columns: 100px 3fr 1fr;
      grid-gap: 10px;
      align-items: center;
      background: ${props => props.theme.colors.white};
      text-decoration: none;
      h3,
      h4,
      h5 {
        color: ${props => props.theme.colors.black};
        font-family: ${props => props.theme.fonts.main};
        margin: 0;
      }
      h3,
      h5 {
        font-weight: 600;
        padding-left: 0px;
        font-size: 1.2rem;
      }
      h4 {
        font-weight: 300;
        font-size: 1.2rem;
      }
      h5 {
        font-size: 1.2rem;
      }
    }
  }
`;
const SearchLinkStyles = styled.div`
  background: ${props => props.theme.colors.white};
  position: fixed;
  bottom: 0;
  left: 0;
  height: 10vh;
  width: 100%;
  text-align: center;
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  justify-content: center;
  a {
    padding: 0px 20px;
    line-height: 50px;
    margin: 20px auto;
    text-align: center;
    border-radius: 25px;
    background: ${props => props.theme.colors.black};
    color: ${props => props.theme.colors.white};
    text-decoration: none;
    font-family: ${props => props.theme.fonts.main};
  }
`;
