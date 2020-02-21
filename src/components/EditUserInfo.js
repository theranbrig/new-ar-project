import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { BlackButtonClick } from '../utilities/ReusableStyles';
import UserSVG from '../assets/icons/icon_user';
import Avatar from 'react-avatar-edit';
import S3 from 'aws-s3-pro';
import shortid from 'shortid';
import { convertFile } from '../utilities/coverting';
var base64 = require('base64image');

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

const EditUserInfo = ({ description, photo, userName }) => {
  const [editDescription, setEditDescription] = useState(description);
  const [editPhoto, setEditPhoto] = useState(true);
  const [preview, setPreview] = useState(null);
  const [newUserPhoto, setNewUserPhoto] = useState('');

  const editorRef = useRef();

  const uploadProfilePicture = () => {
    const canvas = editorRef.getImage();
    console.log(canvas);
  };

  const config = {
    bucketName: 'oneoone-resource',
    dirName: 'yzed',
    region: 'ap-northeast-2',
    accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY,
  };

  const newFileName = shortid.generate();

  const S3Client = new S3(config);

  const uploadS3File = () => {
    const file = preview.image;
    S3Client.uploadFile(convertFile(file), newFileName)
      .then(data => {
        console.log(data);
      })
      .catch(err => console.error(err));
  };

  const onCrop = image => {
    setPreview({ image });
    console.log(preview);
  };

  return (
    <EditUserStyles>
      {editPhoto ? (
        <div className='photo-uploader'>
          <Avatar width={390} height={295} src={photo ?? null} onCrop={image => onCrop(image)} />
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
            {photo ? <img src={photo} /> : <UserSVG />}
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
          uploadS3File();
        }}>
        UPDATE
      </BlackButtonClick>
    </EditUserStyles>
  );
};

export default EditUserInfo;
