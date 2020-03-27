import { Link, useHistory } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';

import Div100vh from 'react-div-100vh';
import Error from '../components/Error';
import { FirebaseContext } from '../context/Firebase';
import { Helmet } from 'react-helmet';
import TopTitle from '../components/TopTitle';
import { motion } from 'framer-motion';
import styled from 'styled-components';

export const LoginStyles = styled.div`
  width: 500px;
  max-width: 95%;
  margin: 0 auto;
  background: ${props => props.theme.colors.white};
  padding-top: calc(10vh);
  font-family: ${props => props.theme.fonts.main};
  form {
    width: 90%;
    margin: 0 auto;
    input {
      font-family: ${props => props.theme.fonts.main};
      display: block;
      width: calc(90% - 20px);
      height: 40px;
      border-radius: 20px;
      box-shadow: none;
      border: 1px solid ${props => props.theme.colors.black};
      font-size: 1.1rem;
      margin: 10px auto;
      padding: 0 10px;
      background: ${props => props.theme.colors.white};
      -webkit-appearance: none;
    }
    .invalid input {
      color: tomato;
    }
    .valid input {
      color: mediumSeaGreen;
    }
    ::placeholder {
      color: ${props => props.theme.colors.lightGrey};
      font-weight: 300;
    }
  }
  .error {
    width: 90%;
    margin: 0 auto;
    h3 {
      color: tomato;
      font-family: ${props => props.theme.fonts.main};
      font-weight: 300;
      font-size: 0.9rem;
      text-align: center;
    }
  }
  .forgot {
    text-align: center;
    margin-top: 30px;
    a {
      text-decoration: none;
      border-bottom: 1px solid ${props => props.theme.colors.grey};
      margin: 0 auto;
      text-align: center;
      padding: 0 0 5px 0;
      color: ${props => props.theme.colors.grey};
    }
  }

  .bottom {
    position: fixed;
    bottom: 0;
    width: 500px;
    max-width: 100%;
    border-top: 1px solid ${props => props.theme.colors.lightGrey};
    height: 15vh;
    text-align: center;
    background: ${props => props.theme.colors.white};
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr;
    justify-content: center;
    align-items: center;

    a {
      text-decoration: none;
      border-bottom: 1px solid ${props => props.theme.colors.grey};
      margin: 0 auto;
      text-align: center;
      padding: 0 0 5px 0;
      color: ${props => props.theme.colors.grey};
    }
    p {
      text-align: center;
      font-weight: 300;
      max-width: 90%;
      margin: 0 auto;
      padding-bottom: 20px;
    }
  }
`;

const BlackButton = styled.button`
  font-family: ${props => props.theme.fonts.main};
  font-weight: 500;
  background: ${props => props.theme.colors.black};
  color: ${props => props.theme.colors.white};
  width: 90%;
  margin: 0 auto;
  display: block;
  height: 45px;
  border-radius: 25px;
  font-weight: 700;
  letter-spacing: 0.1rem;
  font-size: 1.1rem;
  &:disabled {
    color: ${props => props.theme.colors.grey};
  }
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  const { loginUser, firebaseError, userData } = useContext(FirebaseContext);

  useEffect(() => {
    if (userData.loggedIn) {
      history.push('/');
    }
  }, [userData, history]);

  return (
    <motion.div
      exit={{ opacity: 0, x: '-100vw' }}
      initial={{ opacity: 0, x: '100vw' }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: 'tween', ease: 'anticipate', duration: 1 }}>
      <Div100vh>
        <LoginStyles>
          <Helmet>
            <title>YZED - LOGIN</title>
          </Helmet>
          <section className='top'>
            <TopTitle title='Log In' />
            <form
              className='user-form'
              onSubmit={e => {
                e.preventDefault();
                loginUser(email, password);
              }}>
              <div className='form-input'>
                <input
                  aria-label='email'
                  name='email'
                  type='email'
                  value={email}
                  placeholder='Enter Email'
                  required
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div className='form-input'>
                <input
                  aria-label='password'
                  name='password'
                  type='password'
                  placeholder='Enter Password'
                  required
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              <BlackButton type='submit' disabled={!password.length || !email.length}>
                SIGN IN
              </BlackButton>
            </form>
            <div className='forgot'>
              <Link to='/request_reset'>I forgot my password.</Link>
            </div>
            {firebaseError && (
              <div className='error'>
                <Error error={firebaseError} />
              </div>
            )}
          </section>
          <div className='bottom'>
            <div className='bottom-content'>
              <p>Want to become a YZER?</p>
              <Link to='/register'>Sign Up Now</Link>
            </div>
          </div>
        </LoginStyles>
      </Div100vh>
    </motion.div>
  );
};

export default Login;
