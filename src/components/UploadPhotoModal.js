import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { ModalContext } from '../context/Modal';
import S3FileUpload from 'react-s3';
import { uploadFile } from 'react-s3';
import S3 from 'aws-s3-pro';
import shortid from 'shortid';
import CameraSVG from '../assets/icons/icon_photo';
import LoadingSpinner from './LoadingSpinner';
import { BlackButtonClick } from '../utilities/ReusableStyles';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export const UploadStyles = styled.div`
  height: ${({ photoUploadOpen }) => (photoUploadOpen ? '90vh' : '0px')};
  transform: ${({ photoUploadOpen }) => (photoUploadOpen ? 'scaleY(100%)' : 'scaleY(0)')};
  width: 100%;
  position: fixed;
  top: 10vh;
  height: 90vh;
  background: ${props => props.theme.colors.white};
  z-index: 600;
  transition: 0.5s;
  font-family: ${props => props.theme.fonts.main};
  .upload-content {
    width: 500px;
    max-width: 100%;
    background: ${props => props.theme.colors.lightGrey};
    margin: 0 auto;
    height: 90vh;
    .top-content {
      width: 500px;
      max-width: 100%;
      height: 70vh;
      margin: 0 auto;
      background: ${props => props.theme.colors.white};
      border-bottom-left-radius: 50px;
      border-bottom-right-radius: 50px;
      box-shadow: ${props => props.theme.boxShadows.bottom};
      .title-buttons {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        height: 10vh;
        .left-content {
          width: 60px;
        }
        h1 {
          font-size: 1.5rem;
          align-self: center;
        }
        .right-content {
          width: 60px;
          align-self: center;
          button {
            border: none;
            font-size: 1.5rem;
          }
        }
      }
      .upload-btn-wrapper {
        position: relative;
        overflow: hidden;
        display: inline-block;
        width: 70%;
        margin: 30px 15%;
        height: 80%;
        max-height: 600px;
        text-align: center;
      }
      .btn {
        border: 1px solid #b9b9b9;
        color: ${props => props.theme.colors.black};
        background-color: ${props => props.theme.colors.white};
        border-radius: 0px;
        font-size: 20px;
        font-weight: bold;
        height: 350px;
        overflow: hidden;
        width: 100%;
        max-width: 250px;
        margin: 20px auto 60px;
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
        height: 100%;
      }
    }
  }
  .selected-photo img {
    height: 350px;
    width: 100%;
  }
  .bottom-content {
    margin-top: 30px;
  }
`;

const UploadPhotoModal = () => {
  const [uploadState, setUploadState] = useState(2);
  const [loading, setLoading] = useState(false);
  const [currentPictureUrl, setCurrentPictureUrl] = useState(
    'https://oneoone-resource.s3.ap-northeast-2.amazonaws.com/yzed/1LB6OI5uf.jpeg'
  );

  const { photoUploadOpen, setPhotoUploadOpen } = useContext(ModalContext);

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
        setCurrentPictureUrl(data.location);
        setLoading(false);
        setUploadState(2);
      })
      .catch(err => console.error(err));
  };

  return (
    <UploadStyles photoUploadOpen={true}>
      {loading ? (
        <LoadingSpinner color='black' />
      ) : (
        <div className='upload-content'>
          {uploadState === 1 && (
            <div className='top-content'>
              <div className='title-buttons'>
                <div className='left-content'></div>
                <h1>Select Picture</h1>
                <div className='right-content'>
                  <button onClick={() => setPhotoUploadOpen(false)}>X</button>
                </div>
              </div>
              <div className='select-photo'>
                <div class='upload-btn-wrapper'>
                  <button class='btn'>
                    <CameraSVG />
                    <p>Click here to browse your camera roll</p>
                  </button>
                  <input type='file' name='file upload' onChange={e => uploadS3File(e)} />
                </div>
              </div>
            </div>
          )}
          {uploadState === 2 && (
            <div className='top-content'>
              <div className='title-buttons'>
                <div className='left-content'></div>
                <h1>Select Picture</h1>
                <div className='right-content'>
                  <button onClick={() => setPhotoUploadOpen(false)}>X</button>
                </div>
              </div>
              <div className='selected-photo'>
                <div class='upload-btn-wrapper'>
                  <LazyLoadImage src={currentPictureUrl} alt='chosen image' />
                </div>
              </div>
            </div>
          )}
          <div className='bottom-content'>
            {uploadState === 2 && <BlackButtonClick>NEXT STEP (2/2)</BlackButtonClick>}
          </div>
        </div>
      )}
    </UploadStyles>
  );
};

export default UploadPhotoModal;
