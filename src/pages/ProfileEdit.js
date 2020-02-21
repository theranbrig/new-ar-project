import React, { useContext, useEffect, useState } from 'react';
import { FirebaseContext } from '../context/Firebase';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import AddPhotoSVG from '../assets/icons/icon_add_photo';
import { ModalContext } from '../context/Modal';
import moment from 'moment';
import UserPhoto from '../components/UserPhoto';
import SettingsSVG from '../assets/icons/icon_settings';
import UserSVG from '../assets/icons/icon_user';
import UserInfo from '../components/UserInfo';
import EditUserInfo from '../components/EditUserInfo';
import LoadingSpinner from '../components/LoadingSpinner';

export const ProfileStyles = styled.div`
  width: 500px;
  max-width: 95%;
  margin: 0 auto;
  margin-top: calc(10vh + 50px);
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

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [editProfile, setEditProfile] = useState(false);
  const [updated, setUpdated] = useState(false);

  const { userData, logoutUser, dbh, myPhotos } = useContext(FirebaseContext);
  const { setPhotoUploadOpen } = useContext(ModalContext);

  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    if (userData) {
      setLoading(false);
    }
  }, [userData]);

  if (!userData || loading)
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

export default Profile;
