import { Link, useHistory, useLocation } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';

import CheckSVG from '../assets/icons/icon_success_check';
import Div100vh from 'react-div-100vh';
import Error from '../components/Error';
import { FirebaseContext } from '../context/Firebase';
import { Helmet } from 'react-helmet';
import LoadingSpinner from '../components/LoadingSpinner';
import { LoginStyles } from './Login';
import TopTitle from '../components/TopTitle';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const ResetStyles = styled.div`
  width: 500px;
  min-height: 90vh;
  max-width: 95%;
  margin: 0 auto;
  padding-top: 10vh;
  input {
    width: 90%;
    display: block;
    margin: 10px auto;
    height: 45px;
    font-size: 1.2rem;
    padding: 0 10px;
    border: 1px solid ${props => props.theme.colors.black};
    -webkit-appearance: none;
    border-radius: 25px;
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
  h1 {
    text-align: center;
    font-size: 1.4rem;
  }
  a {
    color: ${props => props.theme.colors.grey};
    display: block;
    font-family: ${props => props.theme.fonts.main};
    font-size: 1.1rem;
    text-align: center;
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

const PasswordBox = styled.div`
  width: 90%;
  margin: 0 auto;
  div {
    padding: 0;
    list-style-type: none;
    p {
      font-family: ${props => props.theme.fonts.main};
      color: ${props => props.theme.colors.grey};
      font-size: 0.75rem;
      text-align: center;
    }
  }
`;

const ResetPassword = () => {
  const [loading, setLoading] = useState('');
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordValid, setPasswordValid] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const { firebase } = useContext(FirebaseContext);

  const history = useHistory();

  const location = useLocation();

  const oobCode = location.search.slice(
    location.search.indexOf('oobCode=') + 8,
    location.search.indexOf('continue') - 1
  );

  console.log(oobCode);
  const { registerUser, firebaseError, userData } = useContext(FirebaseContext);

  const checkPassword = value => {
    const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})');
    const check = strongRegex.test(value);
    if (check) {
      setPasswordValid(true);
    } else {
      setPasswordValid(false);
    }
    return check;
  };

  const resetPassword = () => {
    firebase
      .auth()
      .verifyPasswordResetCode(oobCode)
      .then(function(email) {
        var accountEmail = email;
        console.log(accountEmail);
        firebase
          .auth()
          .confirmPasswordReset(oobCode, password)
          .then(function(resp) {
            console.log(resp);
            setSuccess(true);
            setTimeout(() => {
              history.push('/login');
            }, 2000);
          })
          .catch(function(error) {
            console.log(error.message);
            setError(
              'Something went wrong. This link may have been used already. Resend link to reset password.'
            );
          });
      })
      .catch(function(error) {
        setError(
          'Something went wrong. This link may have been used already. Resend link to reset password.'
        );
      });
  };

  return (
    <motion.div
      exit={{ opacity: 0, x: '100vw' }}
      initial={{ opacity: 0, x: '-100vw' }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: 'spring', ease: 'easeIn', duration: 1, mass: 0.5 }}>
      <Div100vh>
        <ResetStyles>
          <Helmet>
            <title>YZED - RESET PASSWORD</title>
          </Helmet>
          {success ? (
            <div>
              <h1>Password Reset Successful</h1>
              <p>
                <Link to='/login'>CLICK HERE</Link> to login to your account.
              </p>
            </div>
          ) : (
            <>
              <h1>Reset Password</h1>
              <form
                className='register-form'
                onSubmit={async e => {
                  setLoading(true);
                  e.preventDefault();
                  resetPassword();
                  setLoading(false);
                }}>
                <div className={passwordValid ? 'form-input valid' : 'form-input invalid'}>
                  <input
                    placeholder='Password'
                    name='password'
                    type='password'
                    required
                    minLength='8'
                    maxLength='32'
                    aria-label='password'
                    onChange={e => {
                      checkPassword(e.target.value);
                      setPassword(e.target.value);
                    }}
                  />
                </div>
                <div
                  className={
                    password === confirmPassword ? 'form-input valid' : 'form-input invalid'
                  }>
                  <input
                    placeholder='Confirm Password'
                    name='Confirm Password'
                    type='password'
                    required
                    minLength='8'
                    maxLength='32'
                    aria-label='confirm password'
                    onChange={e => setConfirmPassword(e.target.value)}
                  />
                  <PasswordBox>
                    <div className='password-info'>
                      <p>
                        Password must be between 8 and 32 characters, and contain at least one
                        number and one special character.
                      </p>
                    </div>
                  </PasswordBox>
                </div>
                <BlackButton
                  disabled={password !== confirmPassword || !passwordValid || loading}
                  type='submit'>
                  {loading ? 'RESETTING PASSWORD' : 'RESET PASSWORD'}
                </BlackButton>
              </form>
              {(firebaseError || error) && (
                <div className='error'>
                  <Error error={firebaseError || error} clearFunction={setError} />
                  <Link to='/request_reset'>Resend password reset link.</Link>
                </div>
              )}
            </>
          )}
        </ResetStyles>
      </Div100vh>
    </motion.div>
  );
};

export default ResetPassword;
