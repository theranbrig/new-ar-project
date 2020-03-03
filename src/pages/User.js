import React, { useContext, useEffect, useState } from 'react';

import { FirebaseContext } from '../context/Firebase';
import { Helmet } from 'react-helmet';
import LoadingSpinner from '../components/LoadingSpinner';
import UserInfo from '../components/UserInfo';
import UserPhoto from '../components/UserPhoto';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

export const UserStyles = styled.div`
  width: 500px;
  max-width: 95%;
  margin: 0 auto;
  margin-top: calc(10vh + 50px);
  font-family: Montserrat, sans-serif;
  text-align: center;
  min-height: 90vh;
`;

const User = () => {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [user, setUser] = useState(null);
  const { dbh, userLoading, userData } = useContext(FirebaseContext);

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
          tempPhotos.push({ id: doc.id, ...doc.data() });
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
  }, [dbh, id]);

  if (loading || userLoading)
    return (
      <UserStyles>
        <LoadingSpinner color='black' />
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
            <UserPhoto
              photo={photo}
              key={photo.imageUrl}
              userName={user.userName}
              userData={userData}
            />
          ))}
        </>
      )}
    </UserStyles>
  );
};

export default User;
