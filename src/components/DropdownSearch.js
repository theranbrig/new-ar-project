import React, { useState } from 'react';
import Downshift from 'downshift';
import { products } from '../data';
import { useHistory, Link } from 'react-router-dom';
import styled from 'styled-components';

export const SearchStyles = styled.div`
  font-family: Montserrat;
  font-family: Montserrat, sans-serif;
  width: 500px;
  text-align: center;
  max-width: 95%;
  margin: 0 auto;

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
    }
  }
  ul {
    padding: 0;
  }
  input {
    background: transparent;
    background: transparent;
    color: white !important;
    width: 80%;
    margin: 0 10%;
    border: none;
    border-bottom: 1px solid white;
    border-radius: 0px;
    -webkit-border-radius:0px;
    height: 30px;
    line-height: 30px;
    font-size: 20px;
    &:focus {
      outline: 0;
    }
  }
   button {
     background: white;
     color: black;
     min-width: 300px;
     width: 90%;
     margin: 0 auto;
     padding: 5px 40px;
     text-decoration: none;
     text-align: center;
     font-size: 1.2rem;
   }

`;

const ModalSearch = ({ setOpenSearch }) => {
  const history = useHistory();
  const [displayedItems, setDisplayedItems] = useState([]);
  const [input, setInput] = useState('');

  return (
    <Downshift
      onStateChange={(changes, state) => {
        if (changes.type === '__autocomplete_change_input__') {
          setInput(changes.inputValue);
        }
      }}
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
            <input
              className='modal-search-input'
              aria-label='search'
              {...getInputProps()}
              placeholder='Search YZED'
            />
            <h1>{itemCount}</h1>
          </div>
          <ul {...getMenuProps()}>
            {isOpen
              ? products
                  .filter(
                    item =>
                      !inputValue ||
                      `${item.brand} ${item.name}`.toLowerCase().includes(inputValue.toLowerCase())
                  )
                  .slice(0, 4)
                  .map((item, index) => (
                    <li
                      {...getItemProps({
                        key: item.name,
                        index,
                        item,
                        style: {
                          backgroundColor: highlightedIndex === index ? '#00000045' : 'transparent',
                          color: highlightedIndex === index ? 'black' : 'white',
                          fontWeight: highlightedIndex === index ? '400' : '600',
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
          {input && (
            <button
              onClick={() => {
                setOpenSearch(false);
                history.push(`/search/${input}`);
              }}>
              VIEW ALL ITEMS
            </button>
          )}
        </SearchStyles>
      )}
    </Downshift>
  );
};

export default ModalSearch;
