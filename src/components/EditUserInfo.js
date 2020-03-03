import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-image-crop/dist/ReactCrop.css';

import { BlackButtonClick, WhiteButtonClick } from '../utilities/ReusableStyles';
import React, { useCallback, useContext, useState } from 'react';

import CameraSVG from '../assets/icons/icon_photo';
import { FirebaseContext } from '../context/Firebase';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ReactCrop from 'react-image-crop';
import S3 from 'aws-s3-pro';
import UserSVG from '../assets/icons/icon_user';
import { convertFile } from '../utilities/coverting';
import shortid from 'shortid';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const UploadStyles = styled.div`
  width: 100%;
  margin: calc(10vh + 50px) 0 0;
  background: ${props => props.theme.colors.white};
  z-index: 600;
  transition: 0.5s;
  font-family: ${props => props.theme.fonts.main};
  .upload-content {
    .top-content {
      width: 500px;
      max-width: 100%;
      margin: 0 auto;
      background: ${props => props.theme.colors.white};
      .upload-btn-wrapper {
        position: relative;
        overflow: hidden;
        display: inline-block;
        width: 90%;
        margin: 0 5%;
        text-align: center;
        padding-bottom: 20px;
      }
      .btn {
        border: 1px solid #b9b9b9;
        color: ${props => props.theme.colors.black};
        background-color: ${props => props.theme.colors.white};
        border-radius: 0px;
        font-size: 20px;
        font-weight: bold;
        height: 225px;
        overflow: hidden;
        width: 100%;
        max-width: 225px;
        margin: 10px auto;
        svg {
          height: 100px;
        }
        p {
          width: 50%;
          margin: 0 auto;
          font-weight: 300;
          color: #b9b9b9;
        }
      }
      .upload-btn-wrapper input[type='file'] {
        font-size: 1.2rem;
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
        font-size: 100px;
        width: 500px;
        height: 225px;
      }
    }
  }
  .selected-photo img {
    /* height: 350px; */
    width: 100%;
  }
  .selected {
    border: 1px solid ${props => props.theme.colors.black};
  }
  p {
    margin-top: 20px;
  }
  .comment-input {
    border: 1px solid ${props => props.theme.colors.lightGrey};
    padding: 5px;
    border-radius: 25px;
    textarea {
      display: block;
      margin: 0 auto;
      font-size: 16px;
      width: 90%;
      resize: none;
      border: none;
      padding: 5px;
      background: transparent;
    }
    button {
      background: transparent !important;
      margin: 10px 5%;
      font-weight: 700;
      width: 90% !important;
      text-align: left;
      padding: 0;
      font-size: 16px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      border: none;
      svg {
        align-self: center;
        height: 12px;
      }
    }
  }
  input.select-file {
    max-height: 340px;
  }
`;

export const EditUserStyles = styled.div`
  font-family: ${props => props.theme.fonts.main};
  width: 100%;
  textarea {
    width: 90%;
    font-family: ${props => props.theme.fonts.main};
    font-size: 1rem;
    resize: none;
    margin: 20px auto;
    padding: 5px;
    border-color: ${props => props.theme.colors.lightGrey};
  }
  .user-photo {
    height: 100px;
    width: 100px;
    margin: 0 auto;
    margin-top: calc(10vh + 50px);
    box-shadow: 0 0 0 3px ${props => props.theme.colors.lightGrey};
    border-radius: 50%;
    border: 3px solid ${props => props.theme.colors.white};
    svg {
      height: 100%;
    }
    img {
      height: 100px;
      width: 100px;
      border-radius: 50%;
    }
  }
  h1 {
    margin: 5px auto;
    font-weight: 600;
  }
  .photo-uploader {
    margin: 0 auto;
    width: 100%;
    button.cancel {
      border: none;
      background: transparent;
      font-size: 0.8rem;
      margin-top: 5px;
      display: block;
      margin: 0 auto;
    }
  }
`;

const EditUserInfo = ({ description, photo, userName, userId, setEditProfile }) => {
  const [editPhoto, setEditPhoto] = useState(false);
  const [newUserPhoto, setNewUserPhoto] = useState('');

  return (
    <EditUserStyles>
      {editPhoto ? (
        <div className='photo-uploader'>
          <SelectPhoto description={description} userName={userName} setEditPhoto={setEditPhoto} />
        </div>
      ) : (
        <>
          <div
            className='user-photo'
            onClick={() => {
              setEditPhoto(true);
            }}>
            {photo || newUserPhoto ? (
              <LazyLoadImage effect='blur' src={newUserPhoto || photo} />
            ) : (
              <UserSVG />
            )}
          </div>
          <p>Click Photo to Edit</p>
          <h1>@{userName}</h1>
          <p>{description}</p>
        </>
      )}
    </EditUserStyles>
  );
};

const CropperComponent = ({
  src,
  setImageString,
  uploadS3File,
  comment,
  setComment,
  userName,
  description,
  setEditPhoto,
}) => {
  const [editDescription, setEditDescription] = useState(description);
  const [upImg, setUpImg] = useState();
  const [imgRef, setImgRef] = useState(null);
  const [crop, setCrop] = useState({
    unit: '%',
    width: 50,
    aspect: 1 / 1,
  });
  const [result, setResult] = useState();

  const onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onLoad = useCallback(img => {
    setImgRef(img);
  }, []);

  const makeClientCrop = crop => {
    if (imgRef && crop.width && crop.height) {
      const croppedImageUrl = getCroppedImg(imgRef, crop, 'newFile.jpeg');
      setResult(croppedImageUrl);
    }
  };

  const getCroppedImg = (image, crop, fileName) => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = Math.ceil(crop.width * scaleX);
    canvas.height = Math.ceil(crop.height * scaleY);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );

    const imageFile = canvas.toDataURL('image/png');
    setImageString(imageFile);
    return imageFile;
  };

  return (
    <>
      {upImg ? (
        <>
          <ReactCrop
            src={upImg}
            onImageLoaded={onLoad}
            crop={crop}
            onChange={c => setCrop(c)}
            onComplete={makeClientCrop}
            ruleOfThirds
            circularCrop
          />
        </>
      ) : (
        <>
          <button className='btn'>
            <CameraSVG />
            <p>Click here to browse your camera roll</p>
          </button>
          <input
            className='select-file'
            type='file'
            name='file upload'
            accept='image/*'
            onChange={onSelectFile}
          />
        </>
      )}
      <button
        className='cancel'
        onClick={() => {
          setEditPhoto(false);
        }}>
        Cancel Update Photo
      </button>
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
          uploadS3File(editDescription);
        }}>
        UPDATE
      </BlackButtonClick>
      <WhiteButtonClick
        onClick={() => {
          setEditPhoto(false);
        }}>
        CANCEL
      </WhiteButtonClick>
    </>
  );
};

const SelectPhoto = ({ photoRef, photoId, setUploadPhotoComment, description, setEditPhoto }) => {
  const [imageString, setImageString] = useState('');

  const [currentPictureUrl, setCurrentPictureUrl] = useState('');

  const { dbh, userData } = useContext(FirebaseContext);

  const config = {
    bucketName: 'oneoone-resource',
    dirName: 'yzed',
    region: 'ap-northeast-2',
    accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY,
  };

  const history = useHistory();

  const S3Client = new S3(config);

  const newFileName = shortid.generate();

  const uploadS3File = async description => {
    console.log(convertFile(imageString, newFileName));

    await S3Client.uploadFile(convertFile(imageString, newFileName), newFileName)
      .then(data => {
        setCurrentPictureUrl(data.location);
        dbh
          .collection('users')
          .doc(userData.id)
          .update({ description, photo: data.location })
          .then(() => {
            setEditPhoto(false);
            history.push('/profile');
            window.location.reload(true);
          });
      })
      .catch(err => console.error(err));
  };

  return (
    <UploadStyles>
      <div className='upload-content'>
        <div className='top-content'>
          <div className='select-photo'>
            <div className='upload-btn-wrapper'>
              <div className='selected-photo'>
                <div className='crop-area'>
                  <CropperComponent
                    src={currentPictureUrl}
                    setImageString={setImageString}
                    uploadS3File={uploadS3File}
                    description={description}
                    userName={userData.userName}
                    setEditPhoto={setEditPhoto}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UploadStyles>
  );
};

export default EditUserInfo;
