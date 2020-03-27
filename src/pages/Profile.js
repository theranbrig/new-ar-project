import React, { useContext, useEffect, useState } from 'react';

import Div100vh from 'react-div-100vh';
import EditProfile from '../components/ProfileEdit';
import Favorites from '../components/Favorites';
import { FirebaseContext } from '../context/Firebase';
import { Helmet } from 'react-helmet';
import LoadingSpinner from '../components/LoadingSpinner';
import PencilSVG from '../assets/icons/icon_pencil';
import UserInfo from '../components/UserInfo';
import UserPhoto from '../components/UserPhoto';
import { WhiteButtonClick } from '../utilities/ReusableStyles';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

export const ProfileStyles = styled.div`
  width: 500px;
  max-width: 95%;
  padding-top: 10vh;
  margin: 0 auto;
  font-family: ${props => props.theme.fonts.main};
  text-align: center;
  .buttons {
    width: 90%;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  .bottom-buttons {
    padding-bottom: 50px;
    button {
      width: 200px;
    }
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
  font-family: ${props => props.theme.fonts.main};import { Div100vh } from 'react-div-100vh';
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
      <Div100vh>
        <ProfileStyles>
          <LoadingSpinner color='black' />
        </ProfileStyles>
      </Div100vh>
    );

  return (
    <Div100vh>
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
            <Favorites favorites={userData.favoriteProducts} />
            <section className='bottom-buttons'>
              {userData.role === 'ADMIN' && (
                <WhiteButtonClick onClick={() => history.push('/admin')}>ADMIN</WhiteButtonClick>
              )}
              <WhiteButtonClick
                onClick={() => {
                  logoutUser();
                  history.push('/');
                }}>
                SIGN OUT
              </WhiteButtonClick>
            </section>
          </>
        ) : (
          <EditProfile setEditProfile={setEditProfile} />
        )}
      </ProfileStyles>
    </Div100vh>
  );
};

export default Profile;
