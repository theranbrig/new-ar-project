import React from 'react';
import styled from 'styled-components';
import UserSVG from '../assets/icons/icon_user';

export const UserInfoStyles = styled.div`
  h1 {
    font-weight: 600;
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
  .user-photo {
    height: 100px;
    width: 100px;
    margin: 0 auto;
    box-shadow: 0 0 0 3px ${props => props.theme.colors.lightGrey};
    border-radius: 50%;
    border: 3px solid ${props => props.theme.colors.white};
    svg {
      height: 100%;
    }
  }
`;

const UserInfo = ({ userData, photos }) => {
  return (
    <UserInfoStyles>
      <section className='user-info'>
        <div className='user-photo'>
          {userData.photo ? <img src={userData.photo} /> : <UserSVG />}
        </div>
        <h1>@{userData.userName}</h1>
        {userData.description && <p>{userData.description}</p>}
        <div className='stats-item'>
          <h5>{photos.length}</h5>
          <h4>Pictures</h4>
        </div>
      </section>
    </UserInfoStyles>
  );
};

export default UserInfo;
