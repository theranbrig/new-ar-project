import { Link, useHistory, useLocation } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';

import CheckSVG from '../assets/icons/icon_success_check';
import Error from '../components/Error';
import { FirebaseContext } from '../context/Firebase';
import { Helmet } from 'react-helmet';
import LoadingSpinner from '../components/LoadingSpinner';
import VerificationSent from './VerificationSent';
import styled from 'styled-components';

export const VerificationStyles = styled.div`
  width: 500px;
  max-width: 95%;
  margin: 0 auto;
  min-height: 90vh;
  padding-top: 10vh;
  font-family: ${props => props.theme.fonts.main};
  color: ${props => props.theme.colors.black};
  h1 {
    text-align: center;
    margin: 20px auto;
    color: ${props => props.theme.colors.black};
  }
  p {
    text-align: center;
    font-weight: 300;
    font-size: 1.3rem;
    a {
      color: ${props => props.theme.colors.black};
      font-weight: 600;
    }
  }
  input {
    width: 90%;
    margin: 10px auto;
    display: block;
    height: 45px;
    font-size: 1.3rem;
    font-family: ${props => props.theme.fonts.main};
    border-radius: 25px;
    -webkit-appearance: none;
    border: 1px solid ${props => props.theme.colors.black};
    padding: 0 10px;
  }
  button {
    display: block;
    margin: 10px auto;
    border-radius: 25px;
    background: ${props => props.theme.colors.black};
    color: ${props => props.theme.colors.white};
    font-size: 1.3rem;
    width: 200px;
    height: 45px;
    &:disabled {
      color: ${props => props.theme.colors.grey};
    }
  }
  .confirm {
    svg {
      height: 100px;
      display: block;
      margin: 0 auto;
    }
    a {
      display: block;
      margin: 0 auto;
      width: 200px;
      text-align: center;
      height: 45px;
      line-height: 45px;
      font-size: 1.3rem;
      text-decoration: none;
      color: ${props => props.theme.colors.black};
      background: ${props => props.theme.colors.white};
      border: 2px solid ${props => props.theme.colors.black};
      border-radius: 45px;
    }
  }
`;

const VerificationConfirmed = props => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [resent, setReset] = useState(false);
  const [unverifiedUser, setUnverifiedUser] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [sendLoading, setSendLoading] = useState(false);
  const [sendClicked, setSendClicked] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [alreadyVerified, setAlreadyVerified] = useState(false);

  const { firebase, userData, onAuthStateChange, setUserData } = useContext(FirebaseContext);

  const oobCode = location.search.slice(
    location.search.indexOf('oobCode=') + 8,
    location.search.indexOf('apiKey=') - 1
  );

  const history = useHistory();

  const verify = async () => {
    setLoading(true);
    await firebase
      .auth()
      .applyActionCode(oobCode)
      .then(function(resp) {
        onAuthStateChange(setUserData);
        const user = firebase.auth().currentUser;
        console.log(user);
        setConfirmed(true);
        setLoading(false);
      })
      .catch(function(error) {
        setError('Oops. This token is either not valid or has been used.');
        setLoading(false);
      });
  };

  const resendEmailVerification = e => {
    setSendLoading(true);
    e.preventDefault();
    const user = firebase.auth().currentUser;
    console.log(user);
    user.sendEmailVerification();
    setSendClicked(true);
    setSendLoading(false);
  };

  const loginAndSendEmailVerification = e => {
    setSendLoading(true);
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setSendClicked(true);
        setSendLoading(false);
        window.reload();
      })
      .catch(function(error) {
        setLoginError(error.message);
        setSendLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    if (userData.loggedIn) {
      setAlreadyVerified(true);
      setTimeout(() => {
        history.push('/');
      }, 2000);
    } else {
      const verifyUser = async () => {
        await verify();
        const user = await firebase.auth().currentUser;
        setCurrentUser(user);
      };
      verifyUser();
      setLoading(false);
    }
  }, [currentUser, userData]);

  if (alreadyVerified)
    return (
      <VerificationStyles>
        <h1>Email address is verified. Redirecting back to YZED.</h1>
        <LoadingSpinner color='#272727' />
      </VerificationStyles>
    );

  if (loading)
    return (
      <VerificationStyles>
        <h1>Confirming Email Address</h1>
        <LoadingSpinner color='#272727' />
      </VerificationStyles>
    );

  return (
    <VerificationStyles>
      <Helmet>YZED - EMAIL VERIFICATION</Helmet>
      {!oobCode.length && !userData.loggedIn ? (
        <>
          <h1>Hi</h1>
          <p>
            Please enter your login information to send the validation email again. Shortly, a link
            will arrive in your inbox.
          </p>

          <form
            onSubmit={e => {
              loginAndSendEmailVerification(e);
            }}>
            <input
              type='text'
              name='email'
              placeholder='Enter Email'
              required
              onChange={e => setEmail(e.target.value)}
            />
            <input
              type='password'
              name='password'
              placeholder='Enter Password'
              required
              onChange={e => setPassword(e.target.value)}
            />
            <button type='submit' disabled={sendLoading || (!password.length && !email.length)}>
              SEND
            </button>
          </form>
          {loginError && <Error error={loginError} clearFunction={setLoginError} />}
          {sendLoading && <LoadingSpinner color='#272727' />}
        </>
      ) : (
        <>
          {error && !confirmed && !sendClicked && (
            <div>
              <h1>{error}</h1>
              {currentUser ? (
                <>
                  <p>
                    You have already signed up for an account, but have not verified your email
                    address yet. Please click below to resend the the verification email.
                  </p>
                  <form
                    onSubmit={e => {
                      resendEmailVerification(e);
                    }}>
                    <button type='submit' disabled={sendLoading || sendClicked}>
                      SEND
                    </button>
                    {sendLoading && <LoadingSpinner color='#272727' />}
                  </form>
                </>
              ) : (
                <>
                  <p>
                    Please enter your login information to send the validation email again. Shortly,
                    a link will arrive in your inbox.
                  </p>

                  <form
                    onSubmit={e => {
                      loginAndSendEmailVerification(e);
                    }}>
                    <input
                      type='text'
                      name='email'
                      placeholder='Enter Email'
                      required
                      onChange={e => setEmail(e.target.value)}
                    />
                    <input
                      type='password'
                      name='password'
                      placeholder='Enter Password'
                      required
                      onChange={e => setPassword(e.target.value)}
                    />
                    <button
                      type='submit'
                      disabled={sendLoading || (!password.length && !email.length)}>
                      SEND
                    </button>
                  </form>
                  {loginError && <Error error={loginError} clearFunction={setLoginError} />}
                  {sendLoading && <LoadingSpinner color='#272727' />}
                </>
              )}
            </div>
          )}
          {confirmed && (
            <div className='confirm'>
              <h1>Email Address Confirmed!</h1>
              <CheckSVG />
              <p>
                Thank you! You may now go and login with YZED. You may need to login again. Click
                below to go to the login page. If you are already logged in you will be taken to
                YZED.
              </p>
              <button>LOGIN</button>
            </div>
          )}
          {sendClicked && (
            <>
              <h1>Your request is on it's way.</h1>
              <p>Thanks for request. Check your inbox for a validation email.</p>
            </>
          )}
        </>
      )}
    </VerificationStyles>
  );
};

export default VerificationConfirmed;
