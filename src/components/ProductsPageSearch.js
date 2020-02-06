import React, { useState, useEffect, useContext } from 'react';
import Downshift from 'downshift';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { FirebaseContext } from '../context/Firebase';
import LoadingSpinner from './LoadingSpinner';

export const SearchStyles = styled.div`
  font-family: Montserrat, sans-serif;
  width: 500px;
  text-align: center;
  max-width: 95%;
  margin: 0 auto;
  margin-top: 50px;
  li {
    padding: 5px;
    list-style: none;
    background: transparent;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 90%:
    margin: 0 auto;
    &[aria-selected="true"] h3 {
      font-weight: 500;
    }
    img {
      height: 50px;
    }
    h3 {
      font-size: 1.2rem;
      font-weight: 300;
      color: black;
    }

  }
  ul {
    padding: 0;
  }
  input {
    background: transparent;
    color: black;
    width: 80%;
    margin: 0 10%;
    border: none;
    border-bottom: 1px solid black;
    -webkit-border-radius:0px;
    border-radius: 0px;
    height: 30px;
    line-height: 30px;
    font-size: 20px;
    &:focus {
      outline: 0;
    }
  }

`;

const ProductPageSearch = ({ setOpenSearch, children }) => {
  const history = useHistory();
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
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
        });
    };
    getData();
  }, []);

  if (loading) return <LoadingSpinner color='white' />;

  return (
    <Downshift
      onChange={selection => {
        history.push(`/product/${selection.id}`);
      }}
      itemToString={item => (item ? item.value : '')}>
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        getMenuProps,
        isOpen,
        inputValue,
        highlightedIndex,
        selectedItem,
        getRootProps,
        itemCount,
      }) => (
        <SearchStyles>
          <div {...getRootProps({}, { suppressRefError: true })}>
            <input aria-label='search' {...getInputProps()} placeholder='Search YZED' />
            <i className='fa fa-close-circle' aria-hidden='true'></i>
          </div>
          <ul {...getMenuProps()}>
            {isOpen
              ? products
                  .filter(
                    item =>
                      !inputValue ||
                      `${item.brand} ${item.name}`.toLowerCase().includes(inputValue.toLowerCase())
                  )
                  .map((item, index) => (
                    <li
                      {...getItemProps({
                        key: item.name,
                        index,
                        item,
                        style: {
                          backgroundColor: highlightedIndex === index ? '#00000016' : 'transparent',
                        },
                      })}>
                      <img src={item.mainImage} alt={item.name} />
                      <h3>
                        {item.brand} - {item.name}
                      </h3>
                    </li>
                  ))
              : null}
          </ul>
          {children}
        </SearchStyles>
      )}
    </Downshift>
  );
};

export default ProductPageSearch;
