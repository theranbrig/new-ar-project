import React, { useContext } from 'react';

import FirebaseSearch from './FirebaseSearch';
import { ModalContext } from '../context/Modal';
import styled from 'styled-components';

export const ModalStyles = styled.div`
  height: ${({ openSearch }) => (openSearch ? '80vh' : '0px')};
  transform: ${({ openSearch }) => (openSearch ? 'scaleY(100%)' : 'scaleY(0)')};
  -webkit-box-shadow: 0px 10px 0px 0px rgba(0, 0, 3, 0.28);
  -moz-box-shadow: 0px 10px 0px 0px rgba(0, 0, 3, 0.28);
  box-shadow: 0px 10px 0px 0px rgba(0, 0, 3, 0.28);
  transition: all 0.5s ease-in-out;
  transform-origin: left top;
  background: ${props => props.theme.colors.white};
  position: fixed;
  top: 10vh;
  width: 100%;
  overflow-y: scroll;
  z-index: 1005;
  .modal-bottom {
    height: ${({ openSearch }) => (openSearch ? 'calc(10vh)' : '5px')};
    background: ${props => props.theme.colors.white};
    position: fixed;
    background-attachment: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
    a {
      width: 200px;
    }
  }
  .modal-content {
    width: 100%;

    margin: 0 auto;
    font-family: ${props => props.theme.fonts.main};
    background: ${props => props.theme.colors.black};
    h3 {
      color: white;
      font-weight: 300;
      padding: 0 0 0 2.5%;
    }
  }
  .modal-top {
    display: grid;
    grid-template-columns: 6fr 1fr;
    width: 500px;
    max-width: 90%;
    margin: 0 auto 20px;
    grid-gap: 10px;
    align-items: center;
    button,
    a {
      border: 0px;
      width: 100%;
      height: 30px;
      width: 30px;
      text-align: center;
      font-family: ${props => props.theme.fonts.main};
      font-size: 1.1rem;
      line-height: 1.6rem;
      background: ${props => props.theme.colors.white};
      text-decoration: none;
      color: black;
      justify-self: right;
      svg {
        margin-top: 6px;
      }
    }
    .edit-button {
      font-size: 1.5rem;
      padding-left: 5px;
    }
  }
`;

const SearchModal = ({ clearSearch }) => {
  const { openSearch } = useContext(ModalContext);

  return (
    <ModalStyles openSearch={openSearch}>
      <div className='modal-content'>
        <FirebaseSearch />
      </div>
    </ModalStyles>
  );
};

export default SearchModal;
