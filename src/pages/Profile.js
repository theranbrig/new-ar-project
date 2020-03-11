import React, { useContext, useEffect, useState } from 'react';

import EditProfile from '../components/ProfileEdit';
import { FirebaseContext } from '../context/Firebase';
import { Helmet } from 'react-helmet';
import LoadingSpinner from '../components/LoadingSpinner';
import PencilSVG from '../assets/icons/icon_pencil';
import SettingsSVG from '../assets/icons/icon_settings';
import UserInfo from '../components/UserInfo';
import UserPhoto from '../components/UserPhoto';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

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

const AddPhotoButton = styled.button`
  width: 200px;
  background: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.black};
  font-size: 1rem;
  line-height: 45px;
  border-radius: 25px;
  margin-bottom: 20px;
  border: 1px solid ${props => props.theme.colors.lightGrey} !important;
  font-family: ${props => props.theme.fonts.main};
  font-weight: 600;
  svg {
    height: 80%;
    margin-right: 5px;
  }
`;

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [editProfile, setEditProfile] = useState(false);

  const { userData, logoutUser, dbh, userLoading } = useContext(FirebaseContext);

  const history = useHistory();

  const checkPhotos = () => {
    if (!userLoading) {
      if (userData.loggedIn) {
        dbh
          .collection('userPhotos')
          .where('userId', '==', userData.id)
          .onSnapshot(querySnapshot => {
            let tempPhotos = [];
            querySnapshot.forEach(doc => {
              tempPhotos.push({ id: doc.id, ...doc.data() });
            });
            setPhotos(tempPhotos.sort((a, b) => b.addedOn.seconds - a.addedOn.seconds));
            setLoading(false);
          });
      } else {
        history.push('/login');
      }
    }
  };

  useEffect(() => {
    setLoading(true);
    checkPhotos();
    return () => {
      checkPhotos();
    };
  }, [userData, userLoading]);

  if (loading || userLoading)
    return (
      <ProfileStyles>
        <LoadingSpinner color='black' />
      </ProfileStyles>
    );

  return (
    <ProfileStyles>
      <Helmet>
        <title>YZED - {userData.userName.toUpperCase()}</title>
      </Helmet>
      {!editProfile ? (
        <>
          <UserInfo userData={userData} photos={photos} />
          <section className='buttons'>
            <AddPhotoButton
              onClick={() => {
                setEditProfile(true);
              }}>
              <PencilSVG /> EDIT PROFILE
            </AddPhotoButton>
          </section>
          {photos.map(photo => (
            <UserPhoto
              photo={photo}
              userName={userData.userName}
              key={photo.id}
              userData={userData}
            />
          ))}
          {userData.role === 'ADMIN' && (
            <BlackButton>
              <a href='/admin'>ADMIN</a>
            </BlackButton>
          )}
          <WhiteLogoutButton
            onClick={() => {
              logoutUser();
              history.push('/');
            }}>
            SIGN OUT
          </WhiteLogoutButton>
        </>
      ) : (
        <EditProfile setEditProfile={setEditProfile} />
      )}
    </ProfileStyles>
  );
};

export default Profile;
