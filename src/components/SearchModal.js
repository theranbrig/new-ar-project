import React, { useState } from 'react';
import styled from 'styled-components';
import ShoppingBagItems from './ShoppingBagItems';
import { useHistory } from 'react-router-dom';
import Downshift from 'downshift';
import DownshiftSearch from './DownshiftSearch';

export const ModalStyles = styled.div`
  height: ${({ openSearch }) => (openSearch ? '270px' : '0px')};
  transform: ${({ openSearch }) => (openSearch ? 'scaleY(100%)' : 'scaleY(0)')};
  -webkit-box-shadow: 0px 10px 0px 0px rgba(0, 0, 3, 0.28);
  -moz-box-shadow: 0px 10px 0px 0px rgba(0, 0, 3, 0.28);
  box-shadow: 0px 10px 0px 0px rgba(0, 0, 3, 0.28);
  transition: 0.5s;
  background: #000000ee;
  position: absolute;
  width: 100%;
  z-index: 501;
  .modal-content {
    width: 500px;
    max-width: 95%;
    margin: 0 auto;
    font-family: Montserrat, sans-serif;
    h3 {
      color: white;
      font-weight: 300;
      padding: 0 0 0 2.5%;
    }
  }
  .modal-buttons {
    display: grid;
    grid-template-columns: 1fr 6fr;
    width: 95%;
    margin: 20px 2.5%;
    grid-gap: 10px;
    button,
    a {
      border: 0px;
      width: 100%;
      padding: 10px 0;
      text-align: center;
      font-family: Montserrat, sans-serif;
      font-size: 1.1rem;
      line-height: 1.6rem;
      background: white;
      text-decoration: none;
      color: black;
    }
    .edit-button {
      font-size: 1.5rem;
      padding-left: 5px;
    }
  }
`;

const SearchModal = ({ openSearch, setOpenSearch }) => {
  const history = useHistory();

  return (
    <ModalStyles openSearch={openSearch}>
      <div className='modal-content'>
        <h3>Search</h3>
        <div className='modal-buttons'>
          <button
            onClick={() => {
              setOpenSearch(false);
              history.push('/checkout');
            }}>
            <i className='fa fa-close' aria-open='true'></i>
          </button>
        </div>
        <DownshiftSearch />
      </div>
      <div className='modal-shadow'></div>
    </ModalStyles>
  );
};

export default SearchModal;
