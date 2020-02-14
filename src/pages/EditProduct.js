import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { FirebaseContext } from '../context/Firebase';
import { useHistory, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ProductContext } from '../context/Product';
import LoadingSpinner from '../components/LoadingSpinner';
import FileUpload from '../components/EditFileUpload';

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
  .add-feature {
    background: transparent;
    border: none;
    font-size: 1.5rem;
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
        color: pink;
      }
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

const EditProduct = () => {
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

  const { product } = useParams();

  const { userData, dbh, userLoading, firebaseError } = useContext(FirebaseContext);

  const { editProduct } = useContext(ProductContext);

  useEffect(() => {
    dbh
      .collection('products')
      .doc(product)
      .get()
      .then(doc => {
        console.log(doc.data().brand);
        const {
          name,
          brand,
          color,
          price,
          mainImage,
          pictures,
          glbFile,
          usdzFile,
          features,
        } = doc.data();
        setName(name);
        setBrand(brand);
        setPrice(price);
        setColor(color);
        setMainImage(mainImage);
        setPicture1(pictures[0]);
        setPicture2(pictures[1]);
        setPicture3(pictures[2]);
        setUsdzFile(usdzFile);
        setGlbFile(glbFile);
        setAllFeatures(features);
      });
  }, []);

  if (userLoading)
    return (
      <LoginStyles>
        <LoadingSpinner color='black' />
      </LoginStyles>
    );

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
      {product ? (
        <div className='user-form'>
          <h1>Edit Product</h1>
          <div className='form-input'>
            <label htmlFor='name'>NAME:</label>
            <input
              name='name'
              type='text'
              value={name}
              required
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className='form-input'>
            <label htmlFor='brand'>BRAND:</label>
            <input
              name='brand'
              type='text'
              value={brand}
              required
              onChange={e => {
                setBrand(e.target.value);
              }}
            />
          </div>
          <div className='form-input'>
            <label htmlFor='color'>COLOR</label>
            <input
              name='color'
              type='text'
              value={color}
              required
              onChange={e => setColor(e.target.value)}
            />
          </div>
          <div className='form-input'>
            <label htmlFor='price'>Price</label>
            <input
              name='price'
              type='number'
              value={price}
              required
              onChange={e => setPrice(e.target.value)}
            />
          </div>

          <div className='form-input'>
            <label htmlFor='feature'>FEATURES</label>
            <input
              value={feature}
              type='text'
              name='feature'
              required
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
              <i className='fa fa-plus-circle'></i>
            </button>
          </div>
          {!allFeatures.length && <p>Be sure to add at least one feature.</p>}

          <ul className='features-list'>
            {allFeatures.map((feature, index) => (
              <li key={index}>
                <p>{feature}</p>
                <button
                  onClick={() => {
                    console.log(index);
                    const tempArr = allFeatures.map(feature => feature);
                    const removed = tempArr.splice(index, 1);
                    setAllFeatures(tempArr);
                  }}>
                  <i className='fa fa-times-circle'></i>
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
            name='usdz file'
            setFileUploading={setImageUploading}
            state={usdzFile}
            setStateFunction={setUsdzFile}
            isImage={false}
          />
          <FileUpload
            name='glb file'
            setFileUploading={setImageUploading}
            state={glbFile}
            setStateFunction={setGlbFile}
            isImage={false}
          />
          {firebaseError ||
            (error && (
              <div>
                <h3>{error || firebaseError}</h3>
              </div>
            ))}
          <BlackButton
            onClick={async () => {
              if (allFeatures.length) {
                editProduct(
                  product,
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
      ) : (
        <h1>No product found.</h1>
      )}
    </LoginStyles>
  );
};

export default EditProduct;
