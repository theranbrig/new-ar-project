import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { ModalContext } from '../context/Modal';
import S3FileUpload from 'react-s3';
import { uploadFile } from 'react-s3';
import S3 from 'aws-s3-pro';
import shortid from 'shortid';
import CameraSVG from '../assets/icons/icon_photo';

export const UploadStyles = styled.div`
  height: ${({ photoUploadOpen }) => (photoUploadOpen ? '90vh' : '0px')};
  transform: ${({ photoUploadOpen }) => (photoUploadOpen ? 'scaleY(100%)' : 'scaleY(0)')};
  position: fixed;
  width: 100%;
  top: 10vh;
  background: ${props => props.theme.colors.white};
  z-index: 600;
  transition: 0.5s;
  font-family: ${props => props.theme.fonts.main};
  .select-photo {
    width: 90%;
    margin: 0 auto;
  }
  .upload-btn-wrapper {
    position: relative;
    overflow: hidden;
    display: inline-block;
    width: 400px;
    margin-left: 5%;
    height: 600px;
    text-align: center;
  }
  .btn {
    border: 1px solid #b9b9b9;
    color: ${props => props.theme.colors.black};
    background-color: ${props => props.theme.colors.white};
    border-radius: 0px;
    font-size: 20px;
    font-weight: bold;
    height: 450px;
    overflow: hidden;
    width: 100%;
    max-width: 90%;
    margin: 0 auto;
    svg {
      height: 20%;
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
    height: 100%;
  }
  .top-content {
    width: 500px;
    margin: 0 auto;
    height: 70vh;
    position: absolute;
    left: calc(50% - 250px);
    background: ${props => props.theme.colors.white};
    border-bottom-left-radius: 80px;
    border-bottom-right-radius: 80px;
    z-index: 650;
  }
  .title-buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .left-content {
      width: 100px;
    }
    .right-content {
      width: 100px;
      align-self: center;
    }
  }
  .bottom-content {
    background: ${props => props.theme.colors.lightGrey};
    position: fixed;
    bottom: 0;
    width: 500px;
    left: calc(50% - 250px);
    text-align: center;
    height: 30vh;
    z-index: 600;

    button {
      margin-top: 12vh;
    }
  }
`;

const UploadPhotoModal = () => {
  const [appState, setAppState] = useState(1);
  const { photoUploadOpen, setPhotoUploadOpen } = useContext(ModalContext);
  const [loading, setLoading] = useState(false);

  const config = {
    bucketName: 'oneoone-resource',
    dirName: 'yzed',
    region: 'ap-northeast-2',
    accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY,
  };

  const S3Client = new S3(config);

  const newFileName = shortid.generate();

  const uploadS3File = e => {
    setLoading(true);
    const file = e.target.files[0];
    S3Client.uploadFile(file, newFileName)
      .then(data => {
        console.log(data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  };

  return (
    <UploadStyles photoUploadOpen={photoUploadOpen}>
      <div className='top-content'>
        <div className='title-buttons'>
          <div className='left-content'></div>
          <h1>Select Picture</h1>
          <div className='right-content'>
            <button onClick={() => setPhotoUploadOpen(false)}>X</button>
          </div>
        </div>
        {appState === 1 && (
          <div className='select-photo'>
            <div class='upload-btn-wrapper'>
              <button class='btn'>
                <CameraSVG />
                <p>Click here to browse your camera roll</p>
              </button>
              <input type='file' name='file upload' onChange={e => uploadS3File(e)} />
            </div>
          </div>
        )}
      </div>
      <div className='bottom-content'>
        <button>I'm the bottom</button>
      </div>
    </UploadStyles>
  );
};

export default UploadPhotoModal;
