import React, { useContext, useEffect, useState } from 'react';
import { FirebaseContext } from '../context/Firebase';
import styled from 'styled-components';
import { useHistory, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import AddPhotoSVG from '../assets/icons/icon_add_photo';
import { ModalContext } from '../context/Modal';
import moment from 'moment';
import UserPhoto from '../components/UserPhoto';
import UserInfo from '../components/UserInfo';

export const UserStyles = styled.div`
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
  .photo {
    img {
      border: 1px solid ${props => props.theme.colors.lightGrey};
    }
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
`;

const User = () => {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [user, setUser] = useState(null);
  const { logoutUser, dbh } = useContext(FirebaseContext);

  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    let tempPhotos = [];
    dbh
      .collection('userPhotos')
      .where('userId', '==', id)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log(doc.data().addedOn.seconds);
          tempPhotos.push(doc.data());
        });
        setPhotos(tempPhotos.sort((a, b) => b.addedOn.seconds - a.addedOn.seconds));
        dbh
          .collection('users')
          .doc(id)
          .get()
          .then(doc => {
            setUser({ id: doc.id, ...doc.data() });
            setLoading(false);
          });
      });
  }, []);

  if (loading)
    return (
      <UserStyles>
        <h1>Loading...</h1>
      </UserStyles>
    );
  return (
    <UserStyles>
      {user && (
        <>
          <Helmet>
            <title>YZED - {user.userName}</title>
          </Helmet>
          <UserInfo photos={photos} userData={user} />
          {photos.map(photo => (
            <UserPhoto photo={photo} key={photo.imageUrl} userName={user.userName} />
          ))}
        </>
      )}
    </UserStyles>
  );
};

export default User;
