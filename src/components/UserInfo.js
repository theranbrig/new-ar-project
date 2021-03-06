import React from 'react';
import UserSVG from '../assets/icons/icon_user';
import styled from 'styled-components';

export const UserInfoStyles = styled.div`
  font-family: ${props => props.theme.fonts.main};
  padding: 30px 0;
  p {
    width: 70%;
    margin: 0 auto;
    font-size: 1.3rem;
    font-weight: 300;
  }
  h1 {
    font-weight: 600;
  }
  .stats-item {
    margin: 10px auto;
    h4,
    h5 {
      margin: 0;
      font-size: 1.3rem;
    }
    h4 {
      font-weight: 300;
    }
  }
  .user-stats {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
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
    img {
      height: 100%;
      border-radius: 50%;
    }
  }
`;

const UserInfo = ({ userData, photos, updatedProfilePicture }) => {
  return (
    <UserInfoStyles>
      <section className='user-info'>
        <div className='user-photo'>
          {userData.photo ? <img src={userData.photo} alt={userData.userName} /> : <UserSVG />}
        </div>
        <h1>@{userData.userName}</h1>
        {userData.description && (
          <p>
            {userData.description.split('\n').map((item, key) => {
              return (
                <span key={key}>
                  {item}
                  <br />
                </span>
              );
            })}
          </p>
        )}
        <section className='user-stats'>
          <div className='stats-item'>
            <h5>{photos.length}</h5>
            <h4>Pictures</h4>
          </div>
          <div className='stats-item'>
            <h5>{userData.followers.length}</h5>
            <h4>Followers</h4>
          </div>
        </section>
      </section>
    </UserInfoStyles>
  );
};

export default UserInfo;
