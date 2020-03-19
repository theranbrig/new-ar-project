import React, { useContext, useEffect, useState } from 'react';

import CheckSVG from '../assets/icons/icon_success_check';
import CloseSVG from '../assets/icons/icon_close';
import FileUpload from '../components/FileUpload';
import { FirebaseContext } from '../context/Firebase';
import { Helmet } from 'react-helmet';
import LoadingSpinner from '../components/LoadingSpinner';
import { ProductContext } from '../context/Product';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

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
  const [sizes, setSizes] = useState(['S', 'M', 'L']);
  const [imageUploading, setImageUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [authorizedUser, setAuthorizedUser] = useState(false);

  const history = useHistory();

  const { firebaseError, userData, dbh, userLoading } = useContext(FirebaseContext);

  const { createProduct } = useContext(ProductContext);

  const checkValid = () => {
    const isValid =
      !name &&
      !brand &&
      !mainImage &&
      !color &&
      !price &&
      !sizes &&
      !glbFile &&
      !usdzFile &&
      !picture1 &&
      !picture2 &&
      !picture3 &&
      !allFeatures.length;
    return isValid;
  };

  const goBack = () => {
    history.goBack();
  };

  useEffect(() => {
    setLoading(true);
    if (!userLoading) {
      if (userData.role !== 'ADMIN') {
        history.push('/');
      } else {
        setAuthorizedUser(true);
        setLoading(false);
      }
    }
  }, [userLoading]);

  if (loading || userLoading) {
    return (
      <LoginStyles>
        <LoadingSpinner color='black' />
      </LoginStyles>
    );
  }

  if (!authorizedUser) {
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
          <label htmlFor='name'>NAME:</label>
          <input
            name='name'
            type='name'
            value={name}
            required
            onChange={e => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className='form-input'>
          <label htmlFor='brand'>BRAND:</label>
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
          <label htmlFor='color'>COLOR:</label>
          <input name='color' type='text' required onChange={e => setColor(e.target.value)} />
        </div>
        <div className='form-input'>
          <label htmlFor='price'>PRICE:</label>
          <input name='price' type='number' required onChange={e => setPrice(e.target.value)} />
        </div>
        <div className='form-input'>
          <label htmlFor='feature'>FEATURES: </label>
          <textarea
            value={feature}
            rows='3'
            type='text'
            name='feature'
            required
            className={!allFeatures.length && 'no-features'}
            onChange={e => setFeature(e.target.value)}
          />
          <button
            className='add-feature'
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
            <CheckSVG fill='#272727' />
          </button>
        </div>
        {!allFeatures.length && <p className='hint'>Be sure to add at least one feature.</p>}
        <ul className='features-list'>
          {allFeatures.map((feature, index) => (
            <li key={index}>
              <p>{feature}</p>
              <button
                onClick={() => {
                  const tempArr = allFeatures.map(feature => feature);
                  const removed = tempArr.splice(index, 1);
                  setAllFeatures(tempArr);
                }}>
                <CloseSVG />
              </button>
            </li>
          ))}
        </ul>
        <FileUpload
          name='main image'
          setFileUploading={setImageUploading}
          state={mainImage}
          setStateFunction={setMainImage}
          isImage={true}
        />
        <FileUpload
          name='picture 1'
          setFileUploading={setImageUploading}
          state={picture1}
          setStateFunction={setPicture1}
          isImage={true}
        />
        <FileUpload
          name='picture 2'
          setFileUploading={setImageUploading}
          state={picture2}
          setStateFunction={setPicture2}
          isImage={true}
        />
        <FileUpload
          name='picture 3'
          setFileUploading={setImageUploading}
          state={picture3}
          setStateFunction={setPicture3}
          isImage={true}
        />
        <FileUpload
          name='usdz'
          setFileUploading={setImageUploading}
          state={usdzFile}
          setStateFunction={setUsdzFile}
          isImage={false}
        />
        <FileUpload
          name='glb'
          setFileUploading={setImageUploading}
          state={glbFile}
          setStateFunction={setGlbFile}
          isImage={false}
        />
        {firebaseError ||
          (error && (
            <div className='error-message'>
              <h3>{error || firebaseError}</h3>
            </div>
          ))}
        <BlackButton
          onClick={async () => {
            if (checkValid()) {
              setError('Oops.  Something is not filled in.');
            } else {
              if (allFeatures.length) {
                createProduct(
                  name,
                  brand,
                  mainImage,
                  color,
                  parseInt(price),
                  sizes,
                  glbFile,
                  usdzFile,
                  [picture1, picture2, picture3],
                  allFeatures,
                  goBack
                );
              } else {
                setError('Ooops. Needs at least one feature.');
              }
            }
          }}>
          Submit
        </BlackButton>
      </div>
    </LoginStyles>
  );
};

export default CreateProduct;

export const LoginStyles = styled.div`
  width: 500px;
  max-width: 95%;
  margin: 0 auto;
  min-height: calc(90vh - 50px);
  margin-top: calc(10vh + 50px);
  margin-bottom: 50px;
  .user-form {
    border: 1px solid black;
    padding: 30px 20px;
    margin-top: 50px;
    font-family: ${props => props.theme.fonts.main};
    h1 {
      text-align: center;
    }
  }
  input,
  select {
    flex: 1;
    margin: 0 5px;
    border: none;
    border-radius: 0px !important;
    border-bottom: 1px solid ${props => props.theme.colors.lightGrey};
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
      border-bottom: 1px solid ${props => props.theme.colors.lightGrey};
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
  .add-feature {
    background: transparent;
    border: none;
    font-size: 1.5rem;
    svg {
      height: 16px;
    }
  }
  .features-list {
    li {
      display: grid;
      grid-template-columns: 1fr 30px;
      grid-gap: 5px;
      button {
        background: none;
        border: none;
        font-size: 1.5rem;
        color: tomato;
      }
    }
  }
  textarea {
    border: 1px solid ${props => props.theme.colors.lightGrey};
    resize: none;
    font-size: 16px;
    margin-left: 10px;
    width: 100%;
    padding: 5px;
  }
  .error-message {
    text-align: center;
    color: tomato;
  }
  input:invalid,
  textarea.no-features {
    border: 1px solid tomato;
  }
  .hint {
    color: tomato;
    text-align: center;
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
  &:disabled {
    color: ${props => props.theme.colors.grey};
  }
`;
