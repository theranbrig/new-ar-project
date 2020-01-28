import React from 'react';
import Downshift from 'downshift';
import { products } from '../data';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

export const SearchStyles = styled.div`
  li {
    background: transparent;
  }
`;

const DownshiftSearch = () => {
  const history = useHistory();

  return (
    <Downshift
      onChange={selection =>
        alert(selection ? `You selected ${selection.value}` : 'Selection Cleared')
      }
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
      }) => (
        <SearchStyles>
          <label {...getLabelProps()}>Search YZED</label>
          <div
            style={{ display: 'inline-block' }}
            {...getRootProps({}, { suppressRefError: true })}>
            <input
              {...getInputProps({
                onKeyDown: event => {
                  if (event.key === 'Enter') {
                    // Prevent Downshift's default 'Enter' behavior.
                    event.nativeEvent.preventDownshiftDefault = true;
                    history.push('/');
                  }
                },
              })}
            />
          </div>
          <ul {...getMenuProps()}>
            {isOpen
              ? products
                  .filter(
                    product =>
                      !inputValue ||
                      product.name.toLowerCase().includes(inputValue.toLowerCase()) ||
                      product.brand.toLowerCase().includes(inputValue.toLowerCase())
                  )
                  .map((product, index) => (
                    <li
                      {...getItemProps({
                        key: product.name,
                        index,
                        product,
                        style: {
                          backgroundColor: highlightedIndex === index ? 'lightgray' : 'white',
                          fontWeight: selectedItem === product ? 'bold' : 'normal',
                        },
                      })}
                      onClick={() => {
                        history.push(`/product/${product.name}`);
                      }}>
                      {product.name}
                      <img src={product.imageUrl} alt={product.name} />
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
