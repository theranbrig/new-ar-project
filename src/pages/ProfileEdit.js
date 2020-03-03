import React, { useContext, useEffect, useState } from 'react';

import EditUserInfo from '../components/EditUserInfo';
import { FirebaseContext } from '../context/Firebase';
import { Helmet } from 'react-helmet';
import LoadingSpinner from '../components/LoadingSpinner';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

export const ProfileStyles = styled.div`
  width: 500px;
  max-width: 95%;
  margin: 0 auto;
  margin-top: 10vh;
  font-family: Montserrat, sans-serif;
  text-align: center;
  min-height: 90vh;

  .buttons {
    width: 90%;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
`;

const EditProfile = () => {
  const [loading, setLoading] = useState(false);

  const { userData } = useContext(FirebaseContext);

  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    window.scrollTo(0, 0);
    if (userData.loggedIn) {
      setLoading(false);
    } else {
      history.push('/login');
    }
  }, [userData]);

  if (!userData.loggedIn || loading)
    return (
      <ProfileStyles>
        <LoadingSpinner color='black' />
      </ProfileStyles>
    );
  return (
    <ProfileStyles>
      <Helmet>
        <title>YZED - Edit {userData.userName.toUpperCase()}</title>
      </Helmet>
      <EditUserInfo
        description={userData.description ?? ''}
        userName={userData.userName}
        userId={userData.id}
        photo={userData.photo ?? ''}
      />
    </ProfileStyles>
  );
};

export default EditProfile;
