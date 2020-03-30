import React, { useContext, useEffect } from 'react';

import CheckSVG from '../assets/icons/icon_success_check';
import { FirebaseContext } from '../context/Firebase';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const SuccessStyles = styled.div`
  text-align: center;
  margin-top: 100px;
  margin: 0 auto;
  min-height: calc(90vh - 100px);
  margin-top: calc(10vh + 50px);
  width: 500px;
  max-width: 95%;
  background: ${props => props.theme.colors.white};
  font-family: ${props => props.theme.fonts.main};
  h2 {
    font-weight: 300;
    color: ${props => props.theme.colors.black};
  }
  h1,
  h2 {
    color: ${props => props.theme.colors.black};
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
  border: 2px solid ${props => props.theme.colors.black};
  border-radius: 25px;
  height: 45px;
  line-height: 45px;
  display: block;
  margin: 0 auto;
  font-size: 1.2rem;
  padding: 0px 40px;
  font-family: ${props => props.theme.fonts.main};
  margin: 50px auto 50px;
  text-align: center;
  background: ${props => props.theme.colors.white};
  a {
    color: ${props => props.theme.colors.black};
    text-decoration: none;
  }
`;

const BlackButton = styled.div`
  width: 200px;
  border: 2px solid ${props => props.theme.colors.black};
  border-radius: 25px;
  height: 45px;
  line-height: 45px;
  display: block;
  margin: 0 auto;
  background: ${props => props.theme.colors.black};
  font-size: 1.2rem;
  padding: 0px 40px;
  font-family: ${props => props.theme.fonts.main};
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
    if (userData.loggedIn) {
      history.push('/');
    }
  }, [userData]);

  return (
    <motion.div
      exit={{ opacity: 0, x: '-100vw' }}
      initial={{ opacity: 0, x: '100vw' }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: 'spring', ease: 'easeIn', duration: 1, mass: 0.5 }}>
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
    </motion.div>
  );
};

export default Success;
