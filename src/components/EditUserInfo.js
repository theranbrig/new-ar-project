import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { BlackButtonClick, WhiteButtonClick } from '../utilities/ReusableStyles';
import UserSVG from '../assets/icons/icon_user';
import Avatar from 'react-avatar-edit';
import S3 from 'aws-s3-pro';
import shortid from 'shortid';
import { convertFile } from '../utilities/coverting';
import { FirebaseContext } from '../context/Firebase';
import { useHistory } from 'react-router-dom';

export const EditUserStyles = styled.div`
  font-family: ${props => props.theme.fonts.main};

  textarea {
    width: 80%;
    font-family: ${props => props.theme.fonts.main};
    font-size: 1rem;
    resize: none;
    margin: 20px;
    padding: 5px;
    border-color: ${props => props.theme.colors.lightGrey};
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
      height: 100px;
      width: 100px;
    }
  }
  h1 {
    margin: 5px auto;
    font-weight: 600;
  }
  .photo-uploader {
    margin: 0 auto;
    width: 80%;
    button.cancel {
      border: none;
      background: transparent;
      font-size: 0.8rem;
      margin-top: 5px;
    }
  }
`;

const EditUserInfo = ({ description, photo, userName, userId, setEditProfile }) => {
  const [editDescription, setEditDescription] = useState(description);
  const [editPhoto, setEditPhoto] = useState(false);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [newUserPhoto, setNewUserPhoto] = useState('');

  const { dbh } = useContext(FirebaseContext);

  const config = {
    bucketName: 'oneoone-resource',
    dirName: 'yzed',
    region: 'ap-northeast-2',
    accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY,
  };
  const history = useHistory();

  const newFileName = shortid.generate();

  const S3Client = new S3(config);

  const updateProfile = () => {
    setLoading(true);
    if (preview && preview.image) {
      const file = preview.image;
      S3Client.uploadFile(convertFile(file, newFileName), newFileName)
        .then(data => {
          setNewUserPhoto(data.location);
          dbh
            .collection('users')
            .doc(userId)
            .update({ photo: data.location, description: editDescription })
            .then(() => {
              setEditPhoto(false);
              history.push('/profile');
              window.location.reload(true);
              setLoading(false);
            });
        })
        .catch(err => console.error(err));
    } else {
      dbh
        .collection('users')
        .doc(userId)
        .update({ description: editDescription })
        .then(() => {
          history.push('/profile');
          window.location.reload(true);
          setEditPhoto(false);
          setLoading(false);
        })
        .catch(err => console.error(err));
    }
  };

  const onCrop = image => {
    setPreview({ image });
  };

  return (
    <EditUserStyles>
      {editPhoto ? (
        <div className='photo-uploader'>
          <Avatar
            width={390}
            height={290}
            src={photo ?? null}
            cropRadius={145}
            onCrop={image => onCrop(image)}
            onImageLoad={image => onCrop(image)}
          />
          <button
            className='cancel'
            onClick={() => {
              setEditPhoto(false);
            }}>
            Cancel Update Photo
          </button>
        </div>
      ) : (
        <>
          <div
            className='user-photo'
            onClick={() => {
              setEditPhoto(true);
            }}>
            {photo || newUserPhoto ? <img src={newUserPhoto || photo} /> : <UserSVG />}
          </div>
          <p>Click Photo to Edit</p>
        </>
      )}
      <h1>@{userName}</h1>
      <textarea
        placeholder='Add a description of yourself...'
        rows='5'
        max='300'
        value={editDescription}
        onChange={e => {
          setEditDescription(e.target.value);
        }}
      />
      <BlackButtonClick
        onClick={() => {
          updateProfile();
        }}>
        UPDATE
      </BlackButtonClick>
      <WhiteButtonClick
        disabled={loading}
        onClick={() => {
          history.push('/profile');
        }}>
        CANCEL
      </WhiteButtonClick>
    </EditUserStyles>
  );
};

export default EditUserInfo;
