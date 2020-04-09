import { Link, useLocation } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';

import CheckSVG from '../assets/icons/icon_success_check';
import { FirebaseContext } from '../context/Firebase';
import { Helmet } from 'react-helmet';
import LoadingSpinner from '../components/LoadingSpinner';
import styled from 'styled-components';

export const VerificationStyles = styled.div``;

const VerificationConfirmed = props => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [resent, setReset] = useState(false);

  const { firebase } = useContext(FirebaseContext);

  const oobCode = location.search.slice(
    location.search.indexOf('oobCode=') + 8,
    location.search.indexOf('apiKey=') - 1
  );

  const resendEmailVerification = () => {};

  const verify = () => {
    setLoading(true);
    console.log(oobCode);
    firebase
      .auth()
      .applyActionCode(oobCode)
      .then(function(resp) {
        console.log(resp);
        setConfirmed(true);
        setLoading(false);
      })
      .catch(function(error) {
        console.log(error.message);
        setError(error.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    verify();
  }, []);

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
          <p>
            Enter your email address to resend the confirmation email or{' '}
            <Link to='/register'>CLICK HERE</Link> to register.
          </p>
          <form
            onSubmit={() => {
              resendEmailVerification();
            }}>
            <input />
            <button>SEND</button>
          </form>
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
