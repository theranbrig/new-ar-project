import { Link, useLocation } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';

import CheckSVG from '../assets/icons/icon_success_check';
import { FirebaseContext } from '../context/Firebase';
import { Helmet } from 'react-helmet';
import LoadingSpinner from '../components/LoadingSpinner';
import styled from 'styled-components';

export const VerificationStyles = styled.div`
  width: 500px;
  max-width: 95%;
  margin: 0 auto;
  min-height: 90vh;
  padding-top: 10vh;
  font-family: ${props => props.theme.fonts.main};
  h1 {
    text-align: center;
    margin: 20px auto;
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
    margin: 0 auto;
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

  const { firebase } = useContext(FirebaseContext);

  const oobCode = location.search.slice(
    location.search.indexOf('oobCode=') + 8,
    location.search.indexOf('apiKey=') - 1
  );

  const resendEmailVerification = e => {
    setSendLoading(true);
    e.preventDefault();
    const user = firebase.auth().currentUser;
    console.log(user);
    user.sendEmailVerification();
    setSendClicked(true);
    setSendLoading(false);
  };

  const verify = async () => {
    setLoading(true);
    await firebase
      .auth()
      .applyActionCode(oobCode)
      .then(function(resp) {
        setConfirmed(true);
        setLoading(false);
      })
      .catch(function(error) {
        setError(error.message);
        setLoading(false);
      });
  };

  const loginAndSendEmailVerification = () => {
    setLoading(true);
    firebase
      .auth()
      .applyActionCode(oobCode)
      .then(function(resp) {
        setConfirmed(true);
        setLoading(false);
      })
      .catch(function(error) {
        setError(error.message);

        setLoading(false);
      });
  };

  useEffect(() => {
    const verifyUser = async () => {
      await verify();
      const user = await firebase.auth().currentUser;
      console.log(user);
      setCurrentUser(user);
    };
    verifyUser();
  }, [currentUser]);

  if (loading)
    return (
      <VerificationStyles>
        <LoadingSpinner color='#272727' />
        <h1>Confirming Email Address</h1>
      </VerificationStyles>
    );

  return (
    <VerificationStyles>
      <Helmet>YZED - EMAIL VERIFICATION</Helmet>
      {error && !confirmed && (
        <div>
          <h1>{error}</h1>
          {currentUser ? (
            <>
              <p>
                You have already signed up for an account, but have not verified your email address
                yet. Please click below to resend the the verification email.
              </p>
              <form
                onSubmit={e => {
                  resendEmailVerification(e);
                }}>
                <button type='submit' disabled={sendLoading || sendClicked}>
                  SEND
                </button>
                {sendLoading && <LoadingSpinner color='#272727' />}
                {sendClicked && (
                  <p>Your request for email confirmation has been sent. Check your inbox.</p>
                )}
                )}
              </form>
            </>
          ) : (
            <>
              <p>
                Please enter your login information to send the confirmation email again. We will
                sned
              </p>
              <form
                onSubmit={e => {
                  loginAndSendEmailVerification(e);
                }}>
                <input
                  type='text'
                  name='email'
                  placeholder='email'
                  required
                  onChange={e => setEmail(e.target.value)}
                />
                <input
                  type='password'
                  name='email'
                  placeholder='email'
                  required
                  onChange={e => setEmail(e.target.value)}
                />
                <button>SEND</button>
              </form>
            </>
          )}
          {resent && <p>Thanks for request. Check your inbox for a confirmation email.</p>}
        </div>
      )}
      {confirmed && !error && (
        <div>
          <h1>Email Address Confirmed!</h1>
          <CheckSVG />
          <p>
            Thank you! You may now go and login with YZED. You may need to login again. Click below
            to go to the login page.
          </p>
          <Link to='/login'>Login</Link>
        </div>
      )}
    </VerificationStyles>
  );
};

export default VerificationConfirmed;
