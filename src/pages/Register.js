import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { FirebaseContext } from '../context/Firebase';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export const LoginStyles = styled.div`
  width: 500px;
  max-width: 95%;
  margin: 0 auto;
  min-height: calc(90vh - 50px);
  margin-top: calc(10vh + 50px);
  .register-form {
    border: 1px solid black;
    padding: 30px 20px;
    margin-top: 50px;
    font-family: Montserrat, sans-serif;
    h1 {
      text-align: center;
    }
  }
  input,
  select {
    flex: 2;
    margin: 0 5px;
    border: none;
    border-radius: 0px !important;
    border-bottom: 1px solid #c7c7c7;
    background: white;
    box-shadow: none;
    height: 25px;
    font-size: 1.1rem;
    -webkit-appearance: none;
    -webkit-border-radius: 0px;
    margin-left: 10px;
  }
  label {
    height: 25px;
    line-height: 25px;
    font-size: 1.1rem;
  }
  .form-input {
    display: flex;
    margin: 20px 0;
    input,
    select {
      flex: 2;
      margin: 0 5px;
      border: none;
      border-radius: 0px !important;
      border-bottom: 1px solid #c7c7c7;
      background: white;
      box-shadow: none;
      height: 25px;
      font-size: 1.1rem;
      -webkit-appearance: none;
      -webkit-border-radius: 0px;
      margin-left: 10px;
    }
    label {
      height: 25px;
      line-height: 25px;
      font-size: 1.1rem;
    }
  }
`;

const BlackButton = styled.button`
  border: 2px solid black;
  border-radius: 0px;
  height: 52px;
  display: block;
  margin: 0 auto;
  font-size: 1.2rem;
  padding: 5px 80px;
  font-family: Montserrat, sans-serif;
  background: black;
  color: white;
  min-width: 284px;
  margin-bottom: 10px;
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

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const userName = 'userPerson';
  const firstName = 'Bill';
  const lastName = 'Brasky';

  const history = useHistory();

  const { registerUser, firebaseError, userData } = useContext(FirebaseContext);

  useEffect(() => {
    if (userData) {
      history.push('/');
    }
  }, [userData, history]);

  return (
    <LoginStyles>
      <Helmet>
        <title>YZED - Login</title>
      </Helmet>
      <div className='register-form'>
        <h1>Register Today</h1>
        <div className='form-input'>
          <label htmlFor='email'>Email</label>
          <input
            name='email'
            type='email'
            value={email}
            required
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className='form-input'>
          <label htmlFor='password'>Password</label>
          <input
            name='password'
            type='password'
            required
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className='form-input'>
          <label htmlFor='confirmPassword'>Password</label>
          <input
            name='confirmPassword'
            type='password'
            required
            onChange={e => setConfirmPassword(e.target.value)}
          />
        </div>
        <BlackButton
          disabled={password !== confirmPassword}
          onClick={async () => {
            await registerUser(email, password, userName, firstName, lastName);
          }}>
          Submit
        </BlackButton>
      </div>
      {firebaseError && (
        <div>
          <h3>{firebaseError}</h3>
        </div>
      )}
      <BottomWhiteButton onClick={() => history.push('/login')}>
        Already A Member?
      </BottomWhiteButton>
      <BottomWhiteButton onClick={() => history.push('/')}>Back To Home</BottomWhiteButton>
    </LoginStyles>
  );
};

export default Register;
