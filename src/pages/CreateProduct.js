import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { FirebaseContext } from '../context/Firebase';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';

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

const Login = () => {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [color, setColor] = useState('');
  const [price, setPrice] = useState(null);
  const [productInformation, setProductInformation] = useState('');
  const [mainImage, setMainImage] = useState('');
  const [glbFile, setGlbFile] = useState('');
  const [usdzFile, setUsdzFile] = useState('');
  const [picture1, setPicture1] = useState('');
  const [picture2, setPicture2] = useState('');
  const [picture3, setPicture3] = useState('');
  const [pictures, setPictures] = useState([]);
  const [sizes, setSizes] = useState(['S', 'M', 'L']);

  const history = useHistory();

  const { createProduct, firebaseError, userData, dbh, getProducts } = useContext(FirebaseContext);

  useEffect(() => {
    console.log(userData);
  }, [userData, history]);

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
          <input name='brand' type='brand' required onChange={e => setBrand(e.target.value)} />
        </div>
        <div className='form-input'>
          <label htmlFor='color'>Color</label>
          <input name='color' type='text' required onChange={e => setColor(e.target.value)} />
        </div>
        <div className='form-input'>
          <label htmlFor='mainImage'>Main Image</label>
          <input
            name='mainImage'
            type='text'
            required
            onChange={e => setMainImage(e.target.value)}
          />
        </div>
        <div className='form-input'>
          <label htmlFor='price'>Price</label>
          <input name='price' type='number' required onChange={e => setPrice(e.target.value)} />
        </div>
        <div className='form-input'>
          <label htmlFor='glbFile'>GLB File Link</label>
          <input name='glbFile' type='text' required onChange={e => setGlbFile(e.target.value)} />
        </div>
        <div className='form-input'>
          <label htmlFor='usdzFile'>USDZ File Link</label>
          <input name='usdzFile' type='text' required onChange={e => setUsdzFile(e.target.value)} />
        </div>
        <div className='form-input'>
          <label htmlFor='picture1'>Picture 1</label>
          <input
            name='picture1'
            type='text'
            required
            onChange={e => {
              setPicture1(e.target.value);
            }}
          />
        </div>
        <div className='form-input'>
          <label htmlFor='picture2'>Picture 2</label>
          <input
            name='picture2'
            type='text'
            required
            onChange={e => {
              setPicture2(e.target.value);
            }}
          />
        </div>
        <div className='form-input'>
          <label htmlFor='picture3'>Picture 3</label>
          <input
            name='picture3'
            type='text'
            required
            onChange={e => {
              setPicture3(e.target.value);
            }}
          />
        </div>
        <div className='form-input'>
          <label htmlFor='productInformation'>Product Information</label>
          <textarea
            name='productInformation'
            required
            onChange={e => setProductInformation(e.target.value)}
          />
        </div>
        <BlackButton
          onClick={async () => {
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
              productInformation
            );
            history.push('/shop');
          }}>
          Submit
        </BlackButton>
        <h1>{`${pictures}`}</h1>
        <h1>{`${picture1}`}</h1>
        <h1>{`${picture2}`}</h1>
        <h1>{`${picture3}`}</h1>
      </div>
      {firebaseError && (
        <div>
          <h3>{firebaseError}</h3>
        </div>
      )}
    </LoginStyles>
  );
};

export default Login;
