import { Link, useHistory } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';

import BackButton from '../components/BackButton';
import { FirebaseContext } from '../context/Firebase';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

export const LoginStyles = styled.div`
  width: 500px;
  max-width: 95%;
  margin: 0 auto;
  min-height: calc(90vh - 50px);
  margin-top: calc(10vh);
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
  font-size: 1.1rem;
  &:disabled {
    color: ${props => props.theme.colors.grey};
  }
`;

const BottomWhiteButton = styled.div``;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  const { loginUser, firebaseError, userData } = useContext(FirebaseContext);

  useEffect(() => {
    console.log(userData);
    if (userData.loggedIn) {
      history.push('/');
    }
  }, [userData, history]);

  return (
    <LoginStyles>
      <Helmet>
        <title>YZED - LOGIN</title>
      </Helmet>
      <div className='top'>
        <BackButton />
        <h1>Sign In</h1>
        <div className='right'></div>
      </div>
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
            required
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className='form-input'>
          <input
            aria-label='password'
            name='password'
            type='password'
            required
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <BlackButton type='submit'>SIGN IN</BlackButton>
      </form>
      <div className='forgot'>
        <Link to='/reset'>I forgot my password.</Link>
      </div>
      {firebaseError && (
        <div className='error'>
          <h3>{firebaseError}</h3>
        </div>
      )}
      <div className='bottom'>
        <p>Want to become a YZER?</p>
        <Link to='/register'>Sign Up Now</Link>
      </div>
    </LoginStyles>
  );
};

export default Login;
