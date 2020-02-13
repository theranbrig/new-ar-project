import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { FirebaseContext } from '../context/Firebase';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ProductContext } from '../context/Product';
import shortid from 'shortid';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import LoadingSpinner from '../components/LoadingSpinner';

export const LoginStyles = styled.div`
  width: 500px;
  max-width: 95%;
  margin: 0 auto;
  min-height: calc(90vh - 50px);
  margin-top: calc(10vh + 50px);
  .user-form {
    border: 1px solid black;
    padding: 30px 20px;
    margin-top: 50px;
    font-family: Montserrat, sans-serif;
    h1 {
      text-align: center;
    }
  }
  input,
  select {
    flex: 2;
    margin: 0 5px;
    border: none;
    border-radius: 0px !important;
    border-bottom: 1px solid #c7c7c7;
    background: white;
    box-shadow: none;
    height: 25px;
    font-size: 1.1rem;
    -webkit-appearance: none;
    -webkit-border-radius: 0px;
    margin-left: 10px;
  }
  label {
    height: 25px;
    line-height: 25px;
    font-size: 1.1rem;
  }
  .form-input {
    display: flex;
    margin: 20px 0;
    input,
    select {
      flex: 2;
      margin: 0 5px;
      border: none;
      border-radius: 0px !important;
      border-bottom: 1px solid #c7c7c7;
      background: white;
      box-shadow: none;
      height: 25px;
      font-size: 1.1rem;
      -webkit-appearance: none;
      -webkit-border-radius: 0px;
      margin-left: 10px;
    }
    label {
      height: 25px;
      line-height: 25px;
      font-size: 1.1rem;
    }
  }
  .loading {
    position: fixed;
    display: grid;
    background: #2323234f;
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
    padding-top: 20vh;
  }
`;

const BlackButton = styled.button`
  border: 2px solid black;
  border-radius: 0px;
  height: 52px;
  display: block;
  margin: 0 auto;
  font-size: 1.2rem;
  padding: 5px 80px;
  font-family: Montserrat, sans-serif;
  background: black;
  color: white;
  min-width: 284px;
  margin-bottom: 10px;
`;

const BottomWhiteButton = styled.div`
  width: 200px;
  border: 2px solid black;
  border-radius: 0px;
  height: 50px;
  line-height: 50px;
  display: block;
  margin: 0 auto;
  font-size: 1.2rem;
  padding: 0px 40px;
  font-family: Montserrat, sans-serif;
  margin: 50px auto 50px;
  text-align: center;
  a {
    color: black;
    text-decoration: none;
  }
`;

const CreateProduct = () => {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [color, setColor] = useState('');
  const [price, setPrice] = useState(null);
  const [feature, setFeature] = useState(null);
  const [allFeatures, setAllFeatures] = useState([]);
  const [mainImage, setMainImage] = useState();
  const [glbFile, setGlbFile] = useState('');
  const [usdzFile, setUsdzFile] = useState('');
  const [picture1, setPicture1] = useState('');
  const [picture2, setPicture2] = useState('');
  const [picture3, setPicture3] = useState('');
  const [pictures, setPictures] = useState([]);
  const [sizes, setSizes] = useState(['S', 'M', 'L']);
  const [keywords, setKeywords] = useState([]);
  const [imageUploading, setImageUploading] = useState(false);
  const [error, setError] = useState('');

  const history = useHistory();

  const { firebaseError, userData, dbh, getProducts, storage, firebase } = useContext(
    FirebaseContext
  );

  const storageRef = storage.ref();

  const { createProduct } = useContext(ProductContext);

  const uploadFile = (e, setStateFunction) => {
    setImageUploading(true);
    console.log('file upload event', e);

    const file = e.target.files[0];

    const uploadTask = storageRef.child(`images/${file.name}`).put(file);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      function(snapshot) {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      },
      function(error) {
        switch (error.code) {
          case 'storage/unauthorized':
            break;

          case 'storage/canceled':
            break;

          case 'storage/unknown':
            break;
        }
        setImageUploading(false);
      },
      function() {
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          console.log('File available at', downloadURL);
          setStateFunction(downloadURL);
          setImageUploading(false);
        });
      }
    );
  };

  const removeImage = url => {};

  if (!userData || userData.role !== 'ADMIN') {
    return (
      <LoginStyles>
        <h1>You don't have permission to be here. Scram.</h1>
      </LoginStyles>
    );
  }

  return (
    <LoginStyles>
      <Helmet>
        <title>YZED - CREATE</title>
      </Helmet>
      {imageUploading && (
        <div className='loading'>
          <LoadingSpinner color='black' />
        </div>
      )}
      <div className='user-form'>
        <h1>Create Product</h1>
        <div className='form-input'>
          <label htmlFor='name'>Name</label>
          <input
            name='name'
            type='name'
            value={name}
            required
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className='form-input'>
          <label htmlFor='brand'>Brand</label>
          <input
            name='brand'
            type='brand'
            required
            onChange={e => {
              setBrand(e.target.value);
            }}
          />
        </div>
        <div className='form-input'>
          <label htmlFor='color'>Color</label>
          <input name='color' type='text' required onChange={e => setColor(e.target.value)} />
        </div>
        <div className='form-input'>
          <label htmlFor='price'>Price</label>
          <input name='price' type='number' required onChange={e => setPrice(e.target.value)} />
        </div>
        <div className='form-input'>
          <label htmlFor='mainImage'>Main Image</label>
          {!mainImage ? (
            <input
              name='mainImage'
              type='file'
              required
              onChange={e => uploadFile(e, setMainImage)}
            />
          ) : (
            <img src={mainImage} alt='Main Image Preview' />
          )}
        </div>
        <div className='form-input'>
          <label htmlFor='mainImage'>Picture 1</label>
          {!picture1 ? (
            <input
              name='picture 1'
              type='file'
              required
              onChange={e => uploadFile(e, setPicture1)}
            />
          ) : (
            <img src={picture1} alt='Main Image Preview' />
          )}
        </div>
        <div className='form-input'>
          <label htmlFor='mainImage'>Picture 2</label>
          {!picture2 ? (
            <input
              name='picture 2'
              type='file'
              required
              onChange={e => uploadFile(e, setPicture2)}
            />
          ) : (
            <img src={picture2} alt='Main Image Preview' />
          )}
        </div>
        <div className='form-input'>
          <label htmlFor='mainImage'>Picture 3</label>
          {!picture3 ? (
            <input
              name='picture 3'
              type='file'
              required
              onChange={e => uploadFile(e, setPicture3)}
            />
          ) : (
            <img src={picture3} alt='Main Image Preview' />
          )}
        </div>
        <div className='form-input'>
          <label htmlFor='mainImage'>USDZ File</label>
          {!usdzFile ? (
            <input
              name='usdz file'
              type='file'
              required
              onChange={e => uploadFile(e, setUsdzFile)}
            />
          ) : (
            <h3>File Uploaded!</h3>
          )}
        </div>
        <div className='form-input'>
          <label htmlFor='usdz'>GLB File</label>
          {!glbFile ? (
            <input name='glb file' type='file' required onChange={e => uploadFile(e, setGlbFile)} />
          ) : (
            <h3>File Uploaded!</h3>
          )}
        </div>

        <div className='form-input'>
          <label htmlFor='feature'>Features</label>
          <input
            value={feature}
            type='text'
            name='feature'
            required
            onChange={e => setFeature(e.target.value)}
          />
          <button
            onClick={() => {
              if (allFeatures.length < 5) {
                if (!feature) {
                  setError('Oops. You must enter something first.');
                } else {
                  setAllFeatures([...allFeatures, feature]);
                  setFeature('');
                }
              } else {
                setError('Oops. You can only have five features at this time.');
              }
            }}>
            Add Feature
          </button>
        </div>
        <div>
          <ul>
            {allFeatures.map(feature => (
              <li>{feature}</li>
            ))}
          </ul>
        </div>
        <BlackButton
          onClick={async () => {
            if (allFeatures.length) {
              createProduct(
                name,
                brand,
                mainImage,
                color,
                price,
                sizes,
                glbFile,
                usdzFile,
                [picture1, picture2, picture3],
                allFeatures
              );
            } else {
              setError('Ooops. Needs at least one feature.');
            }
          }}>
          Submit
        </BlackButton>
      </div>
      {firebaseError ||
        (error && (
          <div>
            <h3>{error || firebaseError}</h3>
          </div>
        ))}
    </LoginStyles>
  );
};

export default CreateProduct;
