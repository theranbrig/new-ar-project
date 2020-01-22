import React, { useContext, useEffect } from 'react';
import { FirebaseContext } from '../context/Firebase';
import styled from 'styled-components';

export const ProfileStyles = styled.div`
  width: 500px;
  max-width: 95%;
  margin: 0 auto;
  font-family: Montserrat, sans-serif;
  text-align: center;
  min-height: 70vh;
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

const Profile = () => {
  const { userData } = useContext(FirebaseContext);
  useEffect(() => {
    console.log(userData);
  }, [userData]);
  if (!userData)
    return (
      <ProfileStyles>
        <h1>Loading...</h1>
      </ProfileStyles>
    );
  return (
    <ProfileStyles>
      <h1>{userData.email}</h1>
      <BlackButton>
        <a href='/checkout'>VIEW MY CART</a>
      </BlackButton>
      <WhiteButton>
        <a href='/'>BACK HOME</a>
      </WhiteButton>
    </ProfileStyles>
  );
};

export default Profile;
