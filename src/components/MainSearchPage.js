import { Link, useHistory, useParams } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import { formatPrice, formatProductName } from '../utilities/formatting';

import BackButton from '../components/BackButton';
import { FirebaseContext } from '../context/Firebase';
import { ModalContext } from '../context/Modal';
import SearchSVG from '../assets/icons/icon_search';
import TopTitle from '../components/TopTitle';
import debounce from 'lodash.debounce';
import styled from 'styled-components';

const MainPageSearch = () => {
  const [products, setProducts] = useState([]);

  const { closeSearchAndClear } = useContext(ModalContext);

  const { dbh } = useContext(FirebaseContext);

  const clearSearch = () => {
    setSearchQuery('');
  };

  const history = useHistory();
  const { query } = useParams();

  const [searchQuery, setSearchQuery] = useState(query || '');

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

  useEffect(() => {
    searchForProduct(query);
  }, []);

  return (
    <>
      <SearchStyles>
        <TopTitle title='Top Search Results' />
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
          <SearchSVG />
        </section>
        <section className='products-list'>
          {products.map(product => (
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
    </>
  );
};

export default MainPageSearch;

const SearchStyles = styled.div`
  padding-top: 30px;
  min-height: 90vh;
  margin-top: 10vh;
  .top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 500px;
    margin: 0 auto;
    max-width: 90%;
    margin-bottom: 30px;
    div {
      width: 40px;
      align-self: center;
    }
    h1 {
      font-size: 1.3rem;
    }
  }
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
      border-bottom: 1px solid ${props => props.theme.colors.black};
      color: ${props => props.theme.colors.black};
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
    padding: 10px 0 50px;
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
        margin: 0 auto;
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
