import { Link, useHistory } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';

import Div100vh from 'react-div-100vh';
import Error from '../components/Error';
import { FirebaseContext } from '../context/Firebase';
import { Helmet } from 'react-helmet';
import LoadingSpinner from '../components/LoadingSpinner';
import { LoginStyles } from './Login';
import TopTitle from '../components/TopTitle';
import { motion } from 'framer-motion';
import styled from 'styled-components';

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

const Register = () => {
  const [loading, setLoading] = useState('');
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordValid, setPasswordValid] = useState(false);
  const [error, setError] = useState('');

  const history = useHistory();

  const { registerUser, firebaseError, userData, emailLogin } = useContext(FirebaseContext);

  useEffect(() => {
    if (userData.loggedIn) {
      history.push('/profile');
    }
  }, [userData, history]);

  const checkForm = () => {
    const check = /^\S+$/.test(userName);
    if (!check) {
      setError('No spaces allowed in usernames');
    }
    return check;
  };

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

  return (
    <motion.div
      exit={{ opacity: 0, x: '100vw' }}
      initial={{ opacity: 0, x: '-100vw' }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: 'spring', ease: 'easeIn', duration: 1, mass: 0.5 }}>
      <Div100vh>
        <LoginStyles>
          <Helmet>
            <title>YZED - REGISTER</title>
          </Helmet>
          <TopTitle title='Register Today' />
          <form
            className='register-form'
            onSubmit={async e => {
              setLoading(true);
              e.preventDefault();
              await emailLogin(email);
              setLoading(false);
            }}>
            <div className='form-input'>
              <input
                placeholder='Email Address'
                name='email'
                type='email'
                value={email}
                required
                aria-label='email'
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <BlackButton type='submit'>{loading ? 'BECOMING A YZER' : 'BECOME A YZER'}</BlackButton>
          </form>
          {(firebaseError || error) && (
            <div className='error'>
              <Error error={firebaseError || error} clearFunction={setError} />
            </div>
          )}
          {loading && <LoadingSpinner color='black' />}
          <div className='forgot'>
            <Link to='/login'>Already a member?</Link>
          </div>
          <div className='bottom'>
            <p>
              If you join our platform and become a YZER you accept our terms of use and privacy
              policy.
            </p>
          </div>
        </LoginStyles>
      </Div100vh>
    </motion.div>
  );
};

export default Register;
