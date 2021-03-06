import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-image-crop/dist/ReactCrop.css';

import React, { useCallback, useContext, useState } from 'react';

import BackButton from '../components/BackButton';
import CameraSVG from '../assets/icons/icon_photo';
import CheckSVG from '../assets/icons/icon_check';
import ChevronLeft from '../assets/icons/icon_chevron_left';
import DownloadSVG from '../assets/icons/icon_download';
import { FirebaseContext } from '../context/Firebase';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import PencilSVG from '../assets/icons/icon_pencil';
import ReactCrop from 'react-image-crop';
import RefreshSVG from '../assets/icons/icon_refresh';
import RotateSVG from '../assets/icons/icon_rotate';
import S3 from 'aws-s3-pro';
import UserSVG from '../assets/icons/icon_user';
import { convertFile } from '../utilities/coverting';
import shortid from 'shortid';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const UploadStyles = styled.div`
  width: 100%;
  margin: 0 0;
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
          height: 50px;
        }
        p {
          width: 80%;
          margin: 0 auto;
          font-weight: 300;
          color: #b9b9b9;
          font-size: 0.9rem;
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
    position: relative;
    height: 100px;
    width: 100px;
    margin: 20px auto;
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
    .edit-button {
      border: none;
      background: ${props => props.theme.colors.white};
      height: 35px;
      width: 35px;
      border-radius: 50%;
      -webkit-box-shadow: 0px 0px 6px 0px #27272727;
      -moz-box-shadow: 0px 0px 6px 0px #27272727;
      box-shadow: 0px 0px 6px 0px #27272727;
      position: absolute;
      right: 0px;
      bottom: 0px;
      line-height: 30px;
      text-align: center;
      svg {
        position: absolute;
        height: 26px;
        top: calc(5px);
        left: calc(11px);
      }
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
  .top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 20px 0;
    h1 {
      font-size: 1.5rem;
      margin: 0;
    }
    div {
      align-self: center !important;
      width: 50px;
    }
    button {
      background: none;
      border: none;
      svg {
        height: 16px;
      }
    }
  }
  .edit {
    h1 {
      border: 1px solid ${props => props.theme.colors.black};
      width: 80%;
      margin: 0 auto;
      padding: 0 20px;
      text-align: left;
      height: 45px;
      border-radius: 25px;
      line-height: 45px;
      font-size: 1.1rem;
      span {
        color: ${props => props.theme.colors.mediumGrey};
      }
    }
    .description {
      width: 80%;
      padding: 20px;
      margin: 20px auto;
      border: 1px solid ${props => props.theme.colors.black};
      border-radius: 25px;
      font-family: ${props => props.theme.fonts.main};
      p {
        margin: 0;
        text-align: left;
        color: ${props => props.theme.colors.grey};
      }
      textarea {
        margin: 0;
        padding: 0;
        width: 100%;
        border: none;
        background: ${props => props.theme.colors.white};
        font-family: ${props => props.theme.fonts.main};
      }
    }
  }
  .save-buttons {
    text-align: right;
    width: 90%;
    margin: 0 auto;
    button {
      margin: 0;
      width: 170px;
      border-radius: 25px;
      height: 45px;
      background: ${props => props.theme.colors.black};
      color: ${props => props.theme.colors.white};
      font-size: 1.1rem;
      font-family: ${props => props.theme.fonts.main};
      font-weight: 700;
      letter-spacing: 0.18rem;
      svg {
        height: 16px;
        vertical-align: middle;
        margin-bottom: 4px;
        margin-right: 10px;
      }
    }
  }
  button.refresh {
    display: block;
    width: 150px;
    background: black;
    color: white;
    height: 30px;
    border-radius: 15px;
    margin: 10px auto;
    font-size: 14px;
    svg {
      height: 16px;
      vertical-align: middle;
    }
  }
  p.max {
    color: tomato !important;
  }
  .landscape-mode {
    display: none;
    h2 {
      font-weight: 300;
    }
    svg {
      height: 40px;
    }
  }
  @media (orientation: landscape) and (max-width: 900px) {
    .portrait-mode {
      display: none;
    }
    .landscape-mode {
      display: block;
    }
  }
`;

const EditUserInfo = ({
  description,
  photo,
  userName,
  userId,
  setEditProfile,
  updateProfilePicture,
}) => {
  const [editPhoto, setEditPhoto] = useState(false);
  const [newUserPhoto, setNewUserPhoto] = useState('');
  const [status, setStatus] = useState('SAVED');

  return (
    <EditUserStyles>
      <div className='top'>
        <div className='back'>
          <button
            onClick={() => {
              if (editPhoto) {
                setEditPhoto(false);
              } else {
                setEditProfile(false);
              }
            }}>
            <ChevronLeft />
          </button>
        </div>
        <h1>Edit public profile</h1>
        <div className='right-content'></div>
      </div>
      <div className='photo-uploader'>
        <SelectPhoto
          description={description}
          userName={userName}
          setEditPhoto={setEditPhoto}
          photo={photo}
          newUserPhoto={newUserPhoto}
          setNewUserPhoto={setNewUserPhoto}
          editPhoto={editPhoto}
          status={status}
          setStatus={setStatus}
        />
      </div>
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
  editPhoto,
  photo,
  newUserPhoto,
  status,
  setStatus,
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
      {!editPhoto ? (
        <div className='user-photo'>
          {photo || newUserPhoto ? (
            <LazyLoadImage effect='blur' src={newUserPhoto || photo} />
          ) : (
            <UserSVG />
          )}
          <button
            onClick={() => {
              setEditPhoto(true);
            }}
            className='edit-button'>
            <PencilSVG />
          </button>
        </div>
      ) : upImg ? (
        <>
          <ReactCrop
            src={upImg}
            onImageLoaded={onLoad}
            crop={crop}
            onChange={c => {
              setCrop(c);
              setStatus('SAVE');
            }}
            onComplete={makeClientCrop}
            ruleOfThirds
            circularCrop
          />
          <button className='refresh' onClick={() => setUpImg()}>
            <RefreshSVG fill='#fff' /> Refresh Photo
          </button>
        </>
      ) : (
        <>
          <div className='landscape-mode'>
            <RotateSVG />
            <h2>Please rotate to portrait mode to upload a photo.</h2>
          </div>
          <div className='portrait-mode'>
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
          </div>
        </>
      )}
      <section className='edit'>
        <h1>
          @<span>{userName}</span>
        </h1>
        <div className='description'>
          <textarea
            placeholder='Add a description of yourself...'
            rows='5'
            maxLength='150'
            value={editDescription}
            onChange={e => {
              setEditDescription(e.target.value);
              setStatus('SAVE');
            }}
          />
          <p className={editDescription.length === 150 ? 'max' : 'normal'}>
            {editDescription.length} / 150
          </p>
        </div>
      </section>
      <section className='save-buttons'>
        <button
          disabled={status === 'SAVED'}
          onClick={() => {
            uploadS3File(editDescription, setUpImg);
          }}>
          {status === 'SAVE' ? <DownloadSVG fill='#fff' /> : <CheckSVG fill='#fff' />}
          {status}
        </button>
      </section>
    </>
  );
};

const SelectPhoto = ({
  photoRef,
  photoId,
  setUploadPhotoComment,
  description,
  setEditPhoto,
  editPhoto,
  photo,
  status,
  setStatus,
  setNewUserPhoto,
  newUserPhoto,
  setUpdatedProfilePicture,
}) => {
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

  const uploadS3File = async (description, callback) => {
    if (imageString.length) {
      await S3Client.uploadFile(convertFile(imageString, newFileName), newFileName)
        .then(data => {
          setCurrentPictureUrl(data.location);
          setNewUserPhoto(data.location);
          dbh
            .collection('users')
            .doc(userData.id)
            .update({ description, photo: data.location })
            .then(() => {
              setEditPhoto(false);
              setStatus('SAVED');
              callback(null);
            });
        })
        .catch(err => console.error(err));
    } else {
      dbh
        .collection('users')
        .doc(userData.id)
        .update({ description })
        .then(() => {
          setEditPhoto(false);
          setStatus('SAVED');
        });
    }
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
                    photo={photo}
                    src={currentPictureUrl}
                    setImageString={setImageString}
                    uploadS3File={uploadS3File}
                    description={description}
                    userName={userData.userName}
                    setEditPhoto={setEditPhoto}
                    editPhoto={editPhoto}
                    status={status}
                    setStatus={setStatus}
                    newUserPhoto={newUserPhoto}
                    setNewUserPhoto={newUserPhoto}
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
