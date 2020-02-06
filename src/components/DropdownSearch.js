import React, { useState, useEffect, useContext } from 'react';
import Downshift from 'downshift';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { FirebaseContext } from '../context/Firebase';
import LoadingSpinner from './LoadingSpinner';

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
    &[aria-selected="true"] h3 {
      font-weight: 500;
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
  const [input, setInput] = useState('');

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
      onStateChange={(changes, state) => {
        if (changes.type === '__autocomplete_change_input__') {
          setInput(changes.inputValue);
        }
      }}
      onChange={selection => {
        setOpenSearch(false);
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
          {loading && <LoadingSpinner color='white' />}
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
                  .slice(0, 3)
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
                      <img src={item.mainImage} alt={item.name} />
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
