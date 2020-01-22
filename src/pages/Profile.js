import React, { useContext, useEffect } from 'react';
import { FirebaseContext } from '../context/Firebase';

const Profile = () => {
  const { userData } = useContext(FirebaseContext);
  useEffect(() => {
    console.log(userData);
  }, [userData]);
  if (!userData) return <h1>Loading</h1>;
  return <div></div>;
};

export default Profile;
