import React, { useState } from 'react';
import Downshift from 'downshift';
import { products } from '../data';
import { useHistory, Link, useParams } from 'react-router-dom';
import styled from 'styled-components';

export const SearchStyles = styled.div`
  font-family: Montserrat, sans-serif;
  width: 500px;
  text-align: center;
  max-width: 95%;
  margin: 0 auto;
  margin-top: 50px;
  min-height: calc(90vh - 50px);
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
    border-radius: 0px;
    -webkit-border-radius:0px;
    height: 30px;
    line-height: 30px;
    font-size: 20px;
    &:focus {
      outline: 0;
    }
  }
   a {
     background: black;
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

const WhiteButton = styled.div`
  width: 500px;
  max-width: 95%;
  a {
    border: 2px solid black;
    border-radius: 0px;
    height: 52px;
    display: block;
    margin: 70px auto 20px;
    font-size: 1.2rem;
    padding: 5px 80px;
    font-family: Montserrat, sans-serif;
    background: white;
    color: black;
    width: 95%;
    min-width: 284px;
  }
`;

const DownshiftScreenSearch = ({ setOpenSearch }) => {
  const { query } = useParams();

  const history = useHistory();
  const [displayedItems, setDisplayedItems] = useState([]);

  return (
    <Downshift
      onChange={selection => {
        history.push(`/product/${selection.name}`);
      }}
      itemToString={item => (item ? item.value : '')}
      initialInputValue={query}
      initialIsOpen={true}>
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
                  .map((item, index) => (
                    <li
                      {...getItemProps({
                        key: item.name,
                        index,
                        item,
                        style: {
                          backgroundColor: highlightedIndex === index ? '#ffffff98' : 'transparent',
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
          <WhiteButton>
            <Link>BROWSE MORE</Link>
          </WhiteButton>
        </SearchStyles>
      )}
    </Downshift>
  );
};

export default DownshiftScreenSearch;
