import React, { useContext, useEffect, useState } from 'react';

import { FirebaseContext } from '../context/Firebase';
import Following from '../components/Following';
import { useParams } from 'react-router-dom';

const Threads = () => {
  const [lastVisit, setLastVisit] = useState(null);

  const { dbh, userData } = useContext(FirebaseContext);

  const { userId } = useParams();

  useEffect(() => {
    const date = new Date();
    var expires = new Date(Date.now() + 86400 * 100000).toUTCString();
    const match = document.cookie.match(new RegExp('(^| )' + 'lastVisitDate' + '=([^;]+)'));
    if (match) {
      if (match[2]) {
        document.cookie = 'previousVisitDate=' + match[2] + '; path=/threads; ;expires=' + expires;
      }
    }
    document.cookie = 'lastVisitDate=' + Date.now() + '; path=/threads; expires=' + expires;
    const lastLogin = document.cookie.match(new RegExp('(^| )' + 'previousVisitDate' + '=([^;]+)'));
    if (lastLogin) {
      setLastVisit(lastLogin[2]);
      dbh
        .collection('users')
        .doc(userId)
        .update({ lastLogin: lastLogin[2] });
    }
  }, []);

  return (
    <div>
      <h1>Following</h1>
      <Following userId={userId} />
    </div>
  );
};

export default Threads;
