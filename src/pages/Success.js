import React from 'react';
import Check from '../assets/icons/subscription-check.png';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SuccessStyles = styled.div`
  text-align: center;
  margin-top: 100px;
  img {
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
  font-family: Montserrat;
  margin: 50px auto 50px;
  text-align: center;
  a {
    color: black;
    text-decoration: none;
  }
`;

const Success = () => {
  return (
    <SuccessStyles>
      <img src={Check} alt='success checkmark' />
      <h1>SUBSCRIPTION SUCCESSFUL</h1>
      <BottomWhiteButton>
        <Link to='/'>BACK TO HOME</Link>
      </BottomWhiteButton>
    </SuccessStyles>
  );
};

export default Success;
