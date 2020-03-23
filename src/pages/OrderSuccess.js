import CheckSVG from '../assets/icons/icon_success_check';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';

const SuccessStyles = styled.div`
  text-align: center;
  min-height: calc(90vh);

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
      <Helmet>
        <title>YZED - ORDER SUCCESS</title>
      </Helmet>
      <CheckSVG />
      <h1>ORDER SUCCESSFUL</h1>
      <BottomWhiteButton>
        <Link to='/'>BACK TO HOME</Link>
      </BottomWhiteButton>
    </SuccessStyles>
  );
};

export default OrderSuccess;
