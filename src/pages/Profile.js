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
  .stats-item {
    margin: 10px auto;
    h4,
    h5 {
      margin: 0;
    }
    h5 {
      font-weight: 300;
    }
  }
  .buttons {
    width: 90%;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
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

const AddPhotoButton = styled.button`
  height: 45px;
  width: 100px;
  background: ${props => props.theme.colors.black};
  border-radius: 25px;
  margin-bottom: 20px;
  svg {
    height: 80%;
  }
`;

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [editProfile, setEditProfile] = useState(false);

  const { userData, logoutUser, dbh, myPhotos } = useContext(FirebaseContext);
  const { setPhotoUploadOpen } = useContext(ModalContext);

  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    console.log(myPhotos);
    if (userData || !myPhotos) {
      let tempPhotos = [];
      dbh
        .collection('userPhotos')
        .where('userId', '==', userData.id)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            console.log(doc.data());
            tempPhotos.push(doc.data());
            setLoading(false);
          });
          setPhotos(tempPhotos.sort((a, b) => b.addedOn.seconds - a.addedOn.seconds));
        });
    }
    if (userData && myPhotos) {
      setPhotos(myPhotos);
    }
  }, [userData, dbh, myPhotos]);

  if (!userData || loading)
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
      {!editProfile ? (
        <section className='user-info'>
          <h1>@{userData.userName}</h1>
          <div className='stats-item'>
            <h5>{photos.length}</h5>
            <h4>Pictures</h4>
          </div>
        </section>
      ) : (
        <section className='user-info edit'></section>
      )}
      <section className='buttons'>
        <AddPhotoButton
          onClick={() => {
            setEditProfile(!editProfile);
          }}>
          <SettingsSVG />
        </AddPhotoButton>
        <AddPhotoButton onClick={() => setPhotoUploadOpen(true)} aria-label='add photo'>
          <AddPhotoSVG fill='#fff' />
        </AddPhotoButton>
      </section>
      {photos.map(photo => (
        <UserPhoto photo={photo} userName={userData.userName} key={photo.imageUrl} />
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
    </ProfileStyles>
  );
};

export default Profile;
