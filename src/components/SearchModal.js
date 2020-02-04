import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import DropdownSearch from './DropdownSearch';
import BackButton from '../components/BackButton';

export const ModalStyles = styled.div`
  height: ${({ openSearch }) => (openSearch ? '500px' : '0px')};
  transform: ${({ openSearch }) => (openSearch ? 'scaleY(100%)' : 'scaleY(0)')};
  -webkit-box-shadow: 0px 10px 0px 0px rgba(0, 0, 3, 0.28);
  -moz-box-shadow: 0px 10px 0px 0px rgba(0, 0, 3, 0.28);
  box-shadow: 0px 10px 0px 0px rgba(0, 0, 3, 0.28);
  transition: 0.5s;
  background: #000000ee;
  position: absolute;
  width: 100%;
  overflow-y: scroll;
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
  .modal-top {
    display: grid;
    grid-template-columns: 6fr 1fr;
    width: 95%;
    margin: 20px 2.5%;
    grid-gap: 10px;
    align-items: center;
    button,
    a {
      border: 0px;
      width: 100%;
      height: 30px;
      width: 30px;
      text-align: center;
      font-family: Montserrat, sans-serif;
      font-size: 1.1rem;
      line-height: 1.6rem;
      background: white;
      text-decoration: none;
      color: black;
      justify-self: right;
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
        <div className='modal-top'>
          <h3>TOP RESULTS ON YZED</h3>
          <button
            onClick={() => {
              setOpenSearch(false);
              history.push('/checkout');
            }}>
            <i className='fa fa-close' aria-hidden='true'></i>
          </button>
        </div>
        <DropdownSearch setOpenSearch={setOpenSearch} />
      </div>
      <div className='modal-shadow'></div>
    </ModalStyles>
  );
};

export default SearchModal;
