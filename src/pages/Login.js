import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { FirebaseContext } from '../context/Firebase';
import { useHistory } from 'react-router-dom';

export const LoginStyles = styled.div`
  width: 500px;
  max-width: 95%;
  margin: 0 auto;
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const history = useHistory();

  const { firebase, loginUser, firebaseError, userData } = useContext(FirebaseContext);

  useEffect(() => {
    console.log(userData);
    if (userData) {
      history.push('/');
    }
  }, [userData]);

  return (
    <LoginStyles>
      <form>
        <input
          name='email'
          type='email'
          value={email}
          required
          onChange={e => setEmail(e.target.value)}
        />
        <input
          name='password'
          type='password'
          required
          onChange={e => setPassword(e.target.value)}
        />
        <button onSubmit={() => loginUser(email, password)}>Submit</button>
      </form>
      <h1>{email}</h1>
      <h1>{password}</h1>
      {firebaseError && (
        <div>
          <h3>{firebaseError}</h3>
        </div>
      )}
    </LoginStyles>
  );
};

export default Login;
