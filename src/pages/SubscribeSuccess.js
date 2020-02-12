import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FirebaseContext } from '../context/Firebase';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import CheckSVG from '../assets/icons/icon_success_check';

const SuccessStyles = styled.div`
  text-align: center;
  margin-top: 100px;
  margin: 0 auto;
  min-height: calc(90vh - 100px);
  margin-top: calc(10vh + 50px);
  width: 500px;
  max-width: 95%;
  font-family: Montserrat;
  h2 {
    font-weight: 300;
  }
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

const BlackButton = styled.div`
  width: 200px;
  border: 2px solid black;
  border-radius: 0px;
  height: 50px;
  line-height: 50px;
  display: block;
  margin: 0 auto;
  background: black;
  font-size: 1.2rem;
  padding: 0px 40px;
  font-family: Montserrat, sans-serif;
  margin: 50px auto 50px;
  text-align: center;
  a {
    color: white;
    text-decoration: none;
  }
`;

const Success = () => {
  const history = useHistory();
  const { userData } = useContext(FirebaseContext);

  useEffect(() => {
    if (userData) {
      history.push('/');
    }
  }, [userData]);
  return (
    <SuccessStyles>
      <Helmet>
        <title>YZED - SUBSCRIPTION SUCCESSFUL</title>
      </Helmet>
      <CheckSVG />
      <h1>SUBSCRIPTION SUCCESSFUL</h1>
      <h2>If you're not yet a member, register and get started with YZED today.</h2>
      <BlackButton>
        <Link to='/register'>REGISTER TODAY</Link>
      </BlackButton>
      <BottomWhiteButton>
        <Link to='/'>BACK TO HOME</Link>
      </BottomWhiteButton>
    </SuccessStyles>
  );
};

export default Success;
