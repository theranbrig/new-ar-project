import React, { useContext, useEffect } from 'react';
import { FirebaseContext } from '../context/Firebase';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export const ProfileStyles = styled.div`
  width: 500px;
  max-width: 95%;
  margin: 0 auto;
  margin-top: calc(10vh + 50px);
  font-family: Montserrat, sans-serif;
  text-align: center;
  min-height: 90vh;
  h1 {
    font-weight: 300;
  }
`;

const WhiteButton = styled.div`
  border: 2px solid black;
  border-radius: 0px;
  height: 50px;
  line-height: 50px;
  display: block;
  margin: 0 auto;
  font-size: 1.2rem;
  font-family: Montserrat, sans-serif;
  text-align: center;
  width: 50%;
  a {
    color: black;
    text-decoration: none;
  }
`;

const BlackButton = styled.div`
  border: 2px solid black;
  border-radius: 0px;
  height: 50px;
  line-height: 50px;
  display: block;
  margin: 0 auto;
  font-size: 1.2rem;
  font-family: Montserrat, sans-serif;
  text-align: center;
  width: 50%;
  background: black;
  margin-bottom: 20px;
  a {
    color: white;
    text-decoration: none;
  }
`;

const WhiteLogoutButton = styled.button`
  border: 2px solid black;
  border-radius: 0px;
  height: 54px;
  line-height: 50px;
  display: block;
  margin: 150px auto;
  font-size: 1.2rem;
  font-family: Montserrat, sans-serif;
  text-align: center;
  width: calc(50% + 4px);
  a {
    color: black;
    text-decoration: none;
  }
`;

const Profile = () => {
  const { userData, logoutUser } = useContext(FirebaseContext);

  const history = useHistory();

  useEffect(() => {}, []);

  if (!userData)
    return (
      <ProfileStyles>
        <h1>Loading...</h1>
      </ProfileStyles>
    );
  return (
    <ProfileStyles>
      <Helmet>
        <title>YZED - {userData.userName.toUpperCase()}</title>
      </Helmet>
      <h1>
        {userData.firstName} {userData.lastName}
      </h1>
      <h1>{userData.userName}</h1>
      <h1>{userData.email}</h1>
      <BlackButton>
        <a href='/checkout'>VIEW MY CART</a>
      </BlackButton>
      {userData.role === 'ADMIN' && (
        <BlackButton>
          <a href='/admin'>ADMIN</a>
        </BlackButton>
      )}
      <WhiteButton>
        <a href='/'>BACK HOME</a>
      </WhiteButton>
      <WhiteLogoutButton
        onClick={() => {
          logoutUser();
          history.push('/');
        }}>
        SIGN OUT
      </WhiteLogoutButton>
    </ProfileStyles>
  );
};

export default Profile;
