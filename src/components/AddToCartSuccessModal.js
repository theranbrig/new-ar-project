import React from 'react';
import Check from '../assets/icons/subscription-check.png';
import styled from 'styled-components';
import CheckSVG from './CheckSVG';

const SuccessStyles = styled.div`
  text-align: center;
  padding-top: 200px;
  left: 0;
  min-height: calc(100vh);
  position: fixed;
  top: 0;
  width: 100%;
  background: #00000045;
  z-index: 502;
  svg {
    width: 200px;
    @media (max-width: 576px) {
      width: 50%;
    }
  }
  .modal-content {
    background: white;
    padding: 20px;
    max-width: 85%;
    width: 400px;
    margin: 0 auto;
    border: 2px solid black;
  }
`;

const BottomWhiteButton = styled.button`
  width: 200px;
  border: 2px solid black;
  border-radius: 0px;
  height: 50px;
  line-height: 50px;
  display: block;
  margin: 0 auto;
  font-size: 1.2rem;
  padding: 0px 40px;
  font-family: Montserrat, sans-serif;
  margin: 50px auto 0;
  text-align: center;
  a {
    color: black;
    text-decoration: none;
  }
`;

const AddToCartSuccessModal = ({ setIsAdded }) => {
  return (
    <SuccessStyles onClick={() => setIsAdded(false)}>
      <div className='modal-content'>
        <CheckSVG />
        <h1>ADDED TO SHOPPING BAG</h1>
        <BottomWhiteButton>CLOSE</BottomWhiteButton>
      </div>
    </SuccessStyles>
  );
};

export default AddToCartSuccessModal;
