import React from 'react';
import Check from '../assets/icons/subscription-check.png';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import CheckSVG from '../components/CheckSVG';

const SuccessStyles = styled.div`
  text-align: center;
  margin-top: 100px;
  min-height: calc(90vh - 100px);
  margin-top: calc(10vh + 50px);
  svg {
    width: 200px;
    @media (max-width: 576px) {
      width: 50%;
    }
  }
`;

const BottomWhiteButton = styled.div`
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
  margin: 50px auto 50px;
  text-align: center;
  a {
    color: black;
    text-decoration: none;
  }
`;

const OrderSuccess = () => {
  return (
    <SuccessStyles>
      <CheckSVG />
      <h1>ORDER SUCCESSFUL</h1>
      <BottomWhiteButton>
        <Link to='/'>BACK TO HOME</Link>
      </BottomWhiteButton>
    </SuccessStyles>
  );
};

export default OrderSuccess;
