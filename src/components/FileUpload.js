import React from 'react';
import S3FileUpload from 'react-s3';
import { uploadFile } from 'react-s3';
import S3 from 'aws-s3-pro';
import styled from 'styled-components';
import shortid from 'shortid';

export const FileInputStyles = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 10px 0px;
  label {
    align-self: center;
  }
  .upload-btn-wrapper {
    position: relative;
    overflow: hidden;
    display: inline-block;
  }
  .btn {
    border: 1px solid ${props => props.theme.colors.black};
    color: ${props => props.theme.colors.black};
    background-color: ${props => props.theme.colors.white};
    border-radius: 0px;
    font-size: 20px;
    font-weight: bold;
  }
  .upload-btn-wrapper input[type='file'] {
    font-size: 1.2rem;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
  }
  .remove-button {
    background: transparent;
    border: none;
    color: tomato;
    font-size: 1.4rem;
  }
  p {
    font-size: 0.8rem;
    align-self: center;
    text-align: right;
  }
`;

const FileUpload = ({ name, setFileUploading, state, setStateFunction, isImage }) => {
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
    const file = e.target.files[0];
    S3Client.uploadFile(file, newFileName)
      .then(data => {
        console.log(data);
        setStateFunction(data.location);
        setFileUploading(false);
      })
      .catch(err => console.error(err));
  };

  const removeS3File = () => {
    setFileUploading(true);
    S3Client.deleteFile(newFileName)
      .then(response => {
        console.log(response);
        setStateFunction('');
        setFileUploading(false);
      })
      .catch(err => console.error(err));
  };

  return (
    <FileInputStyles>
      <label htmlFor={name}>{name.toUpperCase()}:</label>
      {!state ? (
        <div class='upload-btn-wrapper'>
          <button class='btn'>Upload A File</button>
          <input type='file' name={name} onChange={e => uploadS3File(e)} />
        </div>
      ) : isImage ? (
        <>
          <img src={state} alt={`${name} Preview`} height='100px' width='100px' />
          <button className='remove-button' onClick={() => removeS3File()}>
            <i className='fa fa-times-circle'></i>
          </button>
        </>
      ) : (
        <>
          <p>{state}</p>
          <button className='remove-button' onClick={() => removeS3File()}>
            <i className='fa fa-times-circle'></i>
          </button>
        </>
      )}
    </FileInputStyles>
  );
};

export default FileUpload;
