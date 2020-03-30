import React, { useContext, useEffect, useState } from 'react';

import CheckSVG from '../assets/icons/icon_success_check';
import Div100vh from 'react-div-100vh';
import Error from '../components/Error';
import { FirebaseContext } from '../context/Firebase';
import { Helmet } from 'react-helmet';
import TopTitle from '../components/TopTitle';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const LoginStyles = styled.div`
  width: 500px;
  max-width: 95%;
  margin: 0 auto;
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
  .top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    button {
      align-self: center;
    }
    .right {
      width: 16px;
    }
    div {
      align-self: center;
    }
    h1 {
      font-size: 1.4rem;
      font-family: ${props => props.theme.fonts.main};
      font-weight: 500;
    }
  }
  .forgot {
    text-align: center;
    margin: 30px auto;
    p {
      width: 70%;
      margin: 0 auto;
      text-align: center;
      padding: 0 0 5px 0;
      color: ${props => props.theme.colors.black};
    }
  }
  .bottom {
    position: fixed;
    bottom: 0;
    width: 500px;
    max-width: 95%;
    border-top: 1px solid ${props => props.theme.colors.lightGrey};
    min-height: 15vh;
    padding: 10px 0;
    text-align: center;
    background: ${props => props.theme.colors.white};
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
      margin: 10px auto;
    }
  }
  .success {
    p {
      width: 80%;
      margin: 30px auto;
      text-align: center;
    }
    .check {
      width: 100%;
      svg {
        display: block;
        margin: 0 auto;
        height: 80px;
      }
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

const Reset = () => {
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const history = useHistory();

  const { firebaseError, userData, forgotEmail } = useContext(FirebaseContext);

  useEffect(() => {
    if (userData.loggedIn) {
      history.push('/');
    }
  }, [userData]);

  return (
    <motion.div
      exit={{ opacity: 0, x: '100vw' }}
      initial={{ opacity: 0, x: '-100vw' }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: 'spring', ease: 'easeIn', duration: 1, mass: 0.5 }}>
      <Div100vh>
        <LoginStyles>
          <Helmet>
            <title>YZED - FORGOT PASSWORD</title>
          </Helmet>
          {submitted ? (
            <div className='success'>
              <TopTitle title='Forgot Password' />
              <div className='check'>
                <p>
                  If any account is connected to the email address {email}, then there will be an
                  email with a magic link in your inbox within 24 hours.
                </p>
                <CheckSVG />
              </div>
            </div>
          ) : (
            <>
              <TopTitle title='Forgot Password' />
              <div className='forgot'>
                <p>
                  Forgot your password? Don’t worry, we’ve got you! Enter your email address and we
                  will send you a magic link.
                </p>
              </div>
              <form
                className='user-form'
                onSubmit={e => {
                  e.preventDefault();
                  forgotEmail(email, setSubmitted);
                }}>
                <div className='form-input'>
                  <input
                    aria-label='email'
                    placeholder='Email Address'
                    name='email'
                    type='email'
                    value={email}
                    required
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
                <BlackButton disabled={!email.length} type='submit'>
                  SEND LINK
                </BlackButton>
              </form>
              {(firebaseError || error) && (
                <div className='error'>
                  <Error error={firebaseError || error} clickFunction={setError} />
                </div>
              )}
            </>
          )}
        </LoginStyles>
      </Div100vh>
    </motion.div>
  );
};

export default Reset;
