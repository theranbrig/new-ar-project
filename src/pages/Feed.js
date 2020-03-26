import React, { useContext, useEffect, useState } from 'react';

import FeedPhoto from '../components/FeedPhoto';
import { FirebaseContext } from '../context/Firebase';
import { Helmet } from 'react-helmet';
import LoadingSpinner from '../components/LoadingSpinner';
import TopTitle from '../components/TopTitle';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

export const UserStyles = styled.div`
  width: 500px;
  max-width: 95%;
  margin: 10vh auto 0;
  font-family: ${props => props.theme.fonts.main};
  text-align: center;
  min-height: 100vh;
`;

const Feed = () => {
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
      .get()
      .then(querySnapshot => {
        console.log(querySnapshot);
        querySnapshot.forEach(doc => {
          tempPhotos.push({ id: doc.id, ...doc.data() });
        });
        setPhotos(tempPhotos.sort((a, b) => b.addedOn.seconds - a.addedOn.seconds));
        setLoading(false);
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
      <Helmet>
        <title>YZED - FEED</title>
      </Helmet>
      <TopTitle title={'YZED Feed'} />
      {photos.map(photo => (
        <FeedPhoto photo={photo} key={photo.imageUrl} userData={userData} />
      ))}
    </UserStyles>
  );
};

export default Feed;
