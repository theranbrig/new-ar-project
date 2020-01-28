import React, { useState } from 'react';
import Downshift from 'downshift';
import { products } from '../data';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

export const SearchStyles = styled.div`
  font-family: Montserrat;
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
  }
  input {
    background: transparent;
    color: white;
    width: 80%;
    margin: 0 10%;
    border: none;
    border-bottom: 1px solid white;
    height: 30px;
    line-height: 30px;
    font-size: 20px;
    &:focus {
      outline: 0;
    }
  }
`;

const DownshiftSearch = ({ setOpenSearch }) => {
  const history = useHistory();

  return (
    <Downshift
      onChange={selection => {
        setOpenSearch(false);
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
            <input aria-label='search' {...getInputProps()} placeholder='Find Products' />
          </div>
          <ul {...getMenuProps()}>
            {isOpen
              ? products
                  .slice(0, 4)
                  .filter(
                    item =>
                      !inputValue ||
                      item.name.toLowerCase().includes(inputValue.toLowerCase()) ||
                      item.brand.toLowerCase().includes(inputValue.toLowerCase())
                  )
                  .map((item, index) => (
                    <li
                      {...getItemProps({
                        key: item.name,
                        index,
                        item,
                        style: {
                          backgroundColor: highlightedIndex === index ? '#ffffff98' : 'transparent',
                          color: highlightedIndex === index ? 'black' : 'white',
                          fontWeight: highlightedIndex === index ? 'bold' : 'normal',
                        },
                      })}>
                      <img src={item.imageUrl} alt={item.name} />
                      {item.brand} - {item.name}
                      <h1>{itemCount}</h1>
                    </li>
                  ))
              : null}
          </ul>
        </SearchStyles>
      )}
    </Downshift>
  );
};

export default DownshiftSearch;
