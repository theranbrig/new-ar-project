import { Link, useHistory } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import { formatPrice, formatProductName } from '../utilities/formatting';

import CloseSVG from '../assets/icons/icon_close';
import { FirebaseContext } from '../context/Firebase';
import Highlighter from 'react-highlight-words';
import { ModalContext } from '../context/Modal';
import SearchSVG from '../assets/icons/icon_search';
import debounce from 'lodash.debounce';
import styled from 'styled-components';

const FirebaseSearch = () => {
  const history = useHistory();
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);

  const { setOpenSearch, setBodyScroll, closeSearchAndClear } = useContext(ModalContext);

  const { dbh } = useContext(FirebaseContext);

  const clearSearch = () => {
    setSearchQuery('');
  };

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
      {/* <div className='modal-top'>
        <h3>TOP RESULTS ON YZED</h3>
        <button
          onClick={() => {
            closeSearchAndClear(clearSearch);
            setProducts([]);
          }}>
          <CloseSVG />
        </button>
      </div> */}
      <SearchStyles>
        <section className='search-box'>
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
          <SearchSVG fill={'#fff'} />
          {products.slice(0, 5).map(product => {
            return (
              <Link
                className='search-link'
                key={product.id}
                name={product.name}
                id={product.id}
                onClick={() => {
                  closeSearchAndClear(clearSearch);
                  setProducts([]);
                  history.push(`/item/${product.id}`);
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
        </section>

        <section className='products-list'>
          {products.slice(0, 5).map(product => (
            <Link
              to={`/item/${product.id}`}
              className='display-link'
              onClick={() => {
                closeSearchAndClear(clearSearch);
                setProducts([]);
                history.push(`/item/${product.id}`);
              }}>
              <img src={product.mainImage} alt={product.name} height='100px' width='100px' />
              <div className='link-info'>
                <h3>{product.brand}</h3>
                <h4>{product.name}</h4>
              </div>
              {/* PUT BACK IN WHEN PRICE IS NEEDED */}
              {/* <h5>{formatPrice(product.price)}</h5> */}
            </Link>
          ))}
        </section>
      </SearchStyles>
      <SearchLinkStyles>
        {products.length > 0 && (
          <Link
            to={`/search/${searchQuery}`}
            onClick={() => {
              closeSearchAndClear(clearSearch);
              setProducts([]);
            }}>
            SEE ALL RESULTS ({`${products.length}`})
          </Link>
        )}
      </SearchLinkStyles>
    </>
  );
};

export default FirebaseSearch;

const SearchStyles = styled.div`
  padding-top: 30px;
  .search-box {
    width: 500px;
    margin: 0 auto;
    max-width: 90%;
    position: relative;
    input {
      width: 500px;
      max-width: 100%;
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
      -webkit-border-radius: 0px;
    }
    svg {
      height: 25px;
      position: absolute;
      right: 0px;
      top: 5px;
    }
  }
  a.search-link {
    background: transparent;
    color: ${props => props.theme.colors.white};
    width: 95%;
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
    padding: 10px 0 22vh;
    a.display-link {
      width: 500px;
      max-width: 95%;
      margin: 0 auto;
      display: grid;
      /* FOR WHEN PRICE IS USED */
      /* grid-template-columns: 100px 3fr 1fr; */
      grid-template-columns: 100px 1fr;
      grid-gap: 10px;
      align-items: center;
      padding: 10px 0;
      background: ${props => props.theme.colors.white};
      text-decoration: none;
      border-bottom: 1px solid ${props => props.theme.colors.lightGrey};
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
      img {
        width: 65%;
      }
    }
    .products-list {
      width: 500px;
      max-width: 100%;
      margin: 0 auto;
      background: ${props => props.theme.colors.white};
      height: 100%;
      padding-bottom: 10vh;
      overflow-y: scroll !important;
    }
  }
`;
const SearchLinkStyles = styled.div`
  background: ${props => props.theme.colors.white};
  position: fixed;
  bottom: 0;
  left: 0;
  height: 15vh;
  width: 100%;
  text-align: center;
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  justify-content: center;
  a {
    height: 45px;
    width: 250px;
    line-height: 45px;
    margin: 20px auto;
    text-align: center;
    border-radius: 25px;
    background: ${props => props.theme.colors.black};
    color: ${props => props.theme.colors.white};
    text-decoration: none;
    font-family: ${props => props.theme.fonts.main};
    font-weight: 700;
    letter-spacing: 0.075rem;
  }
`;
