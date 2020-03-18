import React, { useContext, useState } from 'react';

import EditUserInfo from './EditUserInfo';
import { FirebaseContext } from '../context/Firebase';
import { Helmet } from 'react-helmet';
import LoadingSpinner from './LoadingSpinner';
import styled from 'styled-components';

export const ProfileStyles = styled.div`
  width: 500px;
  max-width: 95%;
  margin: 0 auto;
  font-family: ${props => props.theme.fonts.main};
  text-align: center;
  min-height: 80vh;
  .buttons {
    width: 90%;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
`;

const EditProfile = ({ setEditProfile }) => {
  const [loading, setLoading] = useState(false);

  const { userData } = useContext(FirebaseContext);

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
        setEditProfile={setEditProfile}
      />
    </ProfileStyles>
  );
};

export default EditProfile;
