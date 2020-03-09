import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-image-crop/dist/ReactCrop.css';

import React, { useCallback, useContext, useState } from 'react';

import CameraSVG from '../assets/icons/icon_photo';
import ChevronRight from '../assets/icons/icon_chevron_right';
import CloseSVG from '../assets/icons/icon_close';
import { FirebaseContext } from '../context/Firebase';
import ReactCrop from 'react-image-crop';
import S3 from 'aws-s3-pro';
import TextareaAutosize from 'react-textarea-autosize';
import { convertFile } from '../utilities/coverting';
import shortid from 'shortid';
import styled from 'styled-components';

const UploadStyles = styled.div`
  width: 500px;
  max-width: 95%;
  margin: 10vh 0 0;
  height: 90vh;
  background: ${props => props.theme.colors.white};
  z-index: 600;
  transition: 0.5s;
  font-family: ${props => props.theme.fonts.main};
  .upload-content {
    .top-content {
      width: 500px;
      max-width: 100%;
      height: 65vh;
      margin: 0 auto;
      background: ${props => props.theme.colors.white};
      .title-buttons {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        height: 5vh;
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
            border: 1px solid ${props => props.theme.colors.grey};
            height: 32px;
            width: 32px;
            background: none;
            border-radius: 16px;

            svg {
              margin-top: 2px;
              height: 16px;
            }
          }
        }
      }
      .upload-btn-wrapper {
        position: relative;
        overflow: hidden;
        display: inline-block;
        width: 90%;
        margin: 0 5%;
        height: 100%;
        max-height: 600px;
        text-align: center;
        padding-bottom: 200px;
      }
      .btn {
        border: 1px solid #b9b9b9;
        color: ${props => props.theme.colors.black};
        background-color: ${props => props.theme.colors.white};
        border-radius: 0px;
        font-size: 20px;
        font-weight: bold;
        height: 340px;
        overflow: hidden;
        width: 100%;
        max-width: 225px;
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
`;

const CropperComponent = ({ src, setImageString, uploadS3File, comment, setComment }) => {
  const [upImg, setUpImg] = useState();
  const [imgRef, setImgRef] = useState(null);
  const [crop, setCrop] = useState({
    unit: '%',
    width: 50,
    aspect: 10 / 16,
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
    <div className='App'>
      {upImg ? (
        <>
          <ReactCrop
            src={upImg}
            onImageLoaded={onLoad}
            crop={crop}
            onChange={c => setCrop(c)}
            onComplete={makeClientCrop}
            ruleOfThirds
          />
          <p>Please select the photo area above and add a comment below to submit.</p>
          <div className='comment-input'>
            <TextareaAutosize
              placeholder='Tap to write..'
              name='comment'
              value={comment}
              minRows='1'
              maxRows='3'
              onChange={e => {
                setComment(e.target.value);
              }}
            />
            {comment && result && (
              <button
                disabled={!comment || !result}
                onClick={() => {
                  uploadS3File();
                }}>
                Add Photo...
                <ChevronRight />
              </button>
            )}
          </div>
        </>
      ) : (
        <>
          <button className='btn'>
            <CameraSVG />
            <p>Click here to browse your camera roll</p>
          </button>
          <input type='file' name='file upload' accept='image/*' onChange={onSelectFile} />
        </>
      )}
    </div>
  );
};

const SelectPhoto = ({ photoRef, photoId, setUploadPhotoComment }) => {
  const [comment, setComment] = useState('');

  const [imageString, setImageString] = useState('');

  const [currentPictureUrl, setCurrentPictureUrl] = useState('');

  const { userData } = useContext(FirebaseContext);

  const config = {
    bucketName: 'oneoone-resource',
    dirName: 'yzed',
    region: 'ap-northeast-2',
    accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY,
  };

  const S3Client = new S3(config);

  const newFileName = shortid.generate();

  const uploadS3File = async () => {
    console.log(convertFile(imageString, newFileName));
    await S3Client.uploadFile(convertFile(imageString, newFileName), newFileName)
      .then(data => {
        console.log(data);
        setCurrentPictureUrl(data.location);
        photoRef
          .collection('comments')
          .doc()
          .set({
            comment,
            photoId,
            user: { id: userData.id, userName: userData.userName, photo: userData.photo },
            addedOn: new Date(),
            upVotes: [],
            photo: data.location,
          });
        setUploadPhotoComment(false);
      })
      .catch(err => console.error(err));
  };

  return (
    <UploadStyles>
      <div className='upload-content'>
        <div className='top-content'>
          <div className='title-buttons'>
            <div className='left-content'></div>
            <h1>Select Picture</h1>
            <div className='right-content'>
              <button
                aria-label='close'
                onClick={() => {
                  setUploadPhotoComment(false);
                }}>
                <CloseSVG />
              </button>
            </div>
          </div>
          <div className='select-photo'>
            <div className='upload-btn-wrapper'>
              <div className='selected-photo'>
                <div className='crop-area'>
                  <CropperComponent
                    src={currentPictureUrl}
                    setImageString={setImageString}
                    uploadS3File={uploadS3File}
                    comment={comment}
                    setComment={setComment}
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

export default SelectPhoto;
