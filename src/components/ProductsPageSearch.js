import React from 'react';
import Downshift from 'downshift';
import { products } from '../data';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

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
    img {
      height: 50px;
    }
    h3 {
      font-size: 1.2rem;
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

  return (
    <Downshift
      onChange={selection => {
        history.push(`/product/${selection.name}`);
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
                          color: highlightedIndex === index ? 'black' : 'white',
                          fontWeight: highlightedIndex === index ? '300 !important' : '600',
                        },
                      })}>
                      <img src={item.imageUrl} alt={item.name} />
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
