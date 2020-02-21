import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { ModalContext } from '../context/Modal';
import S3FileUpload from 'react-s3';
import { uploadFile } from 'react-s3';
import S3 from 'aws-s3-pro';
import shortid from 'shortid';
import CameraSVG from '../assets/icons/icon_photo';
import LoadingSpinner from './LoadingSpinner';
import { BlackButtonClick, WhiteButtonClick } from '../utilities/ReusableStyles';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import SavePlusSVG from '../assets/icons/icon_save_plus';
import SearchSVG from '../assets/icons/icon_search';
import debounce from 'lodash.debounce';
import { FirebaseContext } from '../context/Firebase';
import { formatProductName } from '../utilities/formatting';
import { useHistory } from 'react-router-dom';

const UploadStyles = styled.div`
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
    margin-top: 20px;
    button {
      width: 80%;
    }
  }
  .tags {
    .add-tags {
      margin: 0 auto;
      width: 80%;
      display: grid;
      grid-template-columns: 100px 1fr;
      align-items: center;
      border: 1px solid ${props => props.theme.colors.lightGrey};
      padding: 10px;
      grid-gap: 10px;
      .plus-icon {
        background: ${props => props.theme.colors.black};
        height: 100px;
      }
    }
    h3 {
      margin-left: calc(10% - 10px);
      margin-bottom: 5px;
      font-size: 1.2rem;
      color: ${props => props.theme.colors.black};
      font-weight: 700;
    }
  }
  .description {
    label {
      margin-left: calc(10% - 10px);
      display: block;
      margin-bottom: 5px;
      font-size: 1.2rem;
      color: ${props => props.theme.colors.black};
      font-weight: 700;
    }
    textarea {
      margin-top: 30px;
      padding: 10px;
      width: 80%;
      margin: 0 auto;
      display: block;
      border-color: ${props => props.theme.colors.lightGrey};
      resize: none;
      background: ${props => props.theme.colors.white};
      font-family: ${props => props.theme.fonts.main};
      font-size: 1rem;
    }
  }
  .search-bar {
    height: 10vh;
    svg {
      height: 1.5rem;
      position: absolute;
      margin-left: 40px;
      margin-top: 8px;
      @media (max-width: 480px) {
        margin-left: 25px;
      }
    }
    input {
      margin: 0 auto;
      display: block;
      width: 80%;
      font-size: 1.5rem;
      font-family: ${props => props.theme.fonts.main};
      padding: 5px 10px 5px 50px;
      border-radius: 25px;
      box-shadow: none;
      border: 1px solid ${props => props.theme.colors.lightGrey};
      @media (max-width: 480px) {
        padding-left: 40px;
      }
    }
  }
  .product-list {
    background: ${props => props.theme.colors.white};
    overflow-y: scroll;
    height: 70vh;
  }
  .product-item {
    display: grid;
    padding: 5px;
    grid-template-columns: 70px 1fr 30px;
    grid-gap: 10px;
    border: 1px solid ${props => props.theme.colors.lightGrey};
    width: calc(80% + 10px);
    margin: 0 auto 10px;
    align-items: center;
    img {
      width: 100%;
    }
    h3,
    h4 {
      margin: 0;
      font-size: 1rem;
    }
    h3 {
      font-weight: 600;
    }
    h4 {
      font-weight: 300;
    }
    button {
      background: none;
      border: none;
      i {
        color: tomato;
        font-size: 1.5rem;
      }
    }
  }
  .selected {
    border: 1px solid ${props => props.theme.colors.black};
  }
  .add-another {
    margin: 0 auto;
    display: block;
    border: none;
    border-bottom: 1px solid ${props => props.theme.colors.grey};
    color: ${props => props.theme.colors.grey};
    background: none;
  }
`;

const UploadPhotoModal = () => {
  const [uploadState, setUploadState] = useState(1);
  const [loading, setLoading] = useState(false);
  const [taggedProducts, setTaggedProducts] = useState([]);
  const [description, setDescription] = useState('');
  const [query, setQuery] = useState('');
  const [searchProducts, setSearchProducts] = useState([]);
  const [currentPictureUrl, setCurrentPictureUrl] = useState('');
  const [error, setError] = useState('');

  const { photoUploadOpen, setPhotoUploadOpen } = useContext(ModalContext);
  const { dbh, userData, uploadUserPhoto } = useContext(FirebaseContext);

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

  const productSearch = debounce(query => {
    let tempItems = [];
    dbh
      .collection('products')
      .where('keywords', 'array-contains', query.toLowerCase())
      .get()
      .then(querySnapshot => {
        querySnapshot.docs.forEach(doc => {
          if (!checkIfTagged(doc.id)) {
            const { name, price, mainImage, brand } = doc.data();
            tempItems.push({
              id: doc.id,
              name: formatProductName(name),
              mainImage,
              brand: brand.toUpperCase(),
            });
          }
        });
        setSearchProducts(tempItems);
      });
  }, 150);

  const uploadPhoto = async () => {
    setError('');
    setLoading(true);
    if (currentPictureUrl.length && userData && description.length && taggedProducts.length) {
      await uploadUserPhoto(currentPictureUrl, description, taggedProducts);
      setPhotoUploadOpen(false);
      setLoading(false);
      setUploadState(1);
      setTaggedProducts([]);
      setDescription('');
      setCurrentPictureUrl('');
      history.push('/profile');
    }
    if (!description.length) {
      setError('Please enter a description.');
    }
    if (!taggedProducts.length) {
      setError('Please select a product to tag.');
    }
  };

  const addToTagList = product => {
    setTaggedProducts([...taggedProducts, product]);
  };

  const checkIfTagged = id => {
    return taggedProducts.some(product => product.id === id);
  };

  return (
    <UploadStyles photoUploadOpen={photoUploadOpen}>
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
                  <LazyLoadImage src={currentPictureUrl} alt='chosen image' effect='blur' />
                </div>
              </div>
            </div>
          )}
          {uploadState === 3 && (
            <div className='top-content'>
              <div className='title-buttons'>
                <div className='left-content'></div>
                <h1>Picture Details</h1>
                <div className='right-content'></div>
              </div>
              <section className='description'>
                <label>Description</label>
                <textarea
                  rows='4'
                  name='description'
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  required
                />
              </section>
              <section className='tags'>
                <h3>Products in this picture</h3>
                {taggedProducts.length ? (
                  <>
                    <div className='tagged-products'>
                      {taggedProducts.map((product, index) => (
                        <div key={product.id} className='product-item'>
                          <img src={product.mainImage} alt={product.name} />
                          <div className='button-content'>
                            <h3>{product.brand}</h3>
                            <h4>{product.name}</h4>
                          </div>
                          <button
                            onClick={() => {
                              setTaggedProducts(
                                taggedProducts.filter(item => item.id !== product.id)
                              );
                            }}>
                            <i className='fa fa-times-circle-o'></i>
                          </button>
                        </div>
                      ))}
                    </div>
                    {taggedProducts.length < 3 && (
                      <button onClick={() => setUploadState(4)} className='add-another'>
                        Add another product
                      </button>
                    )}
                  </>
                ) : (
                  <div className='add-tags'>
                    <button
                      className='plus-icon'
                      aria-label='Search products to tag'
                      onClick={() => setUploadState(4)}>
                      <SavePlusSVG />
                    </button>
                    <div className='content'>
                      <h4>Show 'em what you got!</h4>
                      <p>Hit the search icon to add featured products to your post</p>
                    </div>
                  </div>
                )}
              </section>
            </div>
          )}
          {uploadState === 4 && (
            <div className='top-content'>
              <div className='title-buttons'>
                <div className='left-content'></div>
                <h1>Search</h1>
                <div className='right-content'></div>
              </div>
              <section className='search-bar'>
                <SearchSVG />
                <input
                  type='text'
                  value={query}
                  onChange={e => {
                    setQuery(e.target.value);
                    productSearch(e.target.value);
                  }}
                  aria-label='Search for product'
                  placeholder='Search'
                />
              </section>
              <section className='product-list'>
                {searchProducts.map(product => (
                  <div
                    key={product.id}
                    className={checkIfTagged(product.id) ? 'product-item selected' : 'product-item'}
                    onClick={() => {
                      if (!checkIfTagged(product.id) && taggedProducts.length <= 2) {
                        addToTagList(product);
                        setQuery('');
                        setSearchProducts([]);
                        setUploadState(3);
                      }
                    }}>
                    <img src={product.mainImage} alt={product.name} />
                    <div className='button-content'>
                      <h3>{product.brand}</h3>
                      <h4>{product.name}</h4>
                    </div>
                  </div>
                ))}
              </section>
            </div>
          )}
          <div className='bottom-content'>
            {uploadState === 2 && (
              <BlackButtonClick onClick={() => setUploadState(3)}>NEXT STEP (2/2)</BlackButtonClick>
            )}
            {uploadState === 3 && (
              <>
                <WhiteButtonClick onClick={() => setUploadState(2)}>
                  Previous Step (2/2)
                </WhiteButtonClick>
                <BlackButtonClick
                  onClick={() => {
                    uploadPhoto();
                  }}>
                  Upload Picture
                </BlackButtonClick>
              </>
            )}
          </div>
        </div>
      )}
    </UploadStyles>
  );
};

export default UploadPhotoModal;
