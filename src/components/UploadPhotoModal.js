import { BlackButtonClick, WhiteButtonClick } from '../utilities/ReusableStyles';
import React, { useCallback, useContext, useState } from 'react';

import CameraSVG from '../assets/icons/icon_photo';
import ChevronLeft from '../assets/icons/icon_chevron_left';
import CloseSVG from '../assets/icons/icon_close';
import { FirebaseContext } from '../context/Firebase';
import LoadingSpinner from './LoadingSpinner';
import { ModalContext } from '../context/Modal';
import ReactCrop from 'react-image-crop';
import S3 from 'aws-s3-pro';
import SavePlusSVG from '../assets/icons/icon_save_plus';
import SearchSVG from '../assets/icons/icon_search';
import TextareaAutosize from 'react-textarea-autosize';
import { convertFile } from '../utilities/coverting';
import debounce from 'lodash.debounce';
import { formatProductName } from '../utilities/formatting';
import shortid from 'shortid';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const UploadStyles = styled.div`
  height: ${({ photoUploadOpen }) => (photoUploadOpen ? '90vh' : '0px')};
  transform: ${({ photoUploadOpen }) => (photoUploadOpen ? 'scaleY(100%)' : 'scaleY(0)')};
  transition: all 0.5s ease-in-out;
  transform-origin: left top;
  width: 100%;
  position: fixed;
  top: 10vh;
  height: 90vh;
  background: ${props => props.theme.colors.white};
  z-index: 1001;
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
      height: 75vh;
      margin: 0 auto;
      background: ${props => props.theme.colors.white};
      border-bottom-left-radius: 50px;
      border-bottom-right-radius: 50px;
      box-shadow: ${props => props.theme.boxShadows.bottom};
      .left-content {
        button {
          background: none;
          border: none;
          svg {
            height: 14px;
          }
        }
      }
      .title-buttons {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        height: 3vh;
        margin: 10px 0 20px;
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
            background: none;
            border: none;
            svg {
              height: 16px;
            }
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
        height: 340px;
        overflow: hidden;
        width: 100%;
        max-width: 225px;
        margin: 0px auto;
        svg {
          height: 50px;
        }
        p {
          width: 80%;
          margin: 0 auto;
          font-weight: 300;
          color: #b9b9b9;
          font-size: 1rem;
        }
      }
      .upload-btn-wrapper input[type='file'] {
        font-size: 1.2rem;
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
        font-size: 100px;
        width: 225px;
        height: 100%;
      }
    }
  }
  .selected-photo img {
    height: 340px;
  }
  .bottom-content {
    margin-top: 10px;
  }
  .tags {
    padding: 10px 0 20px;
    .add-tags {
      margin: 20px auto;
      width: 85%;
      display: grid;
      grid-template-columns: 60px 1fr;
      align-items: center;
      font-family: ${props => props.theme.fonts.main};
      border: 1px solid ${props => props.theme.colors.lightGrey};
      padding: 10px;
      grid-gap: 10px;
      .plus-icon {
        background: ${props => props.theme.colors.black};
        height: 60px;
      }
      h4 {
        margin: 0;
        font-weight: 600;
      }
      p {
        margin: 0;
        font-weight: 300;
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
    padding: 20px 0 10px;
    label {
      margin-left: calc(10% - 10px);
      display: block;
      margin-bottom: 5px;
      font-size: 1.2rem;
      color: ${props => props.theme.colors.black};
      font-weight: 700;
    }
    .description-input {
      border: 1px solid ${props => props.theme.colors.lightGrey};
      border-radius: 25px;
      background: green;
      width: 85%;
      padding: 10px;
      margin: 0 auto;
      background: ${props => props.theme.colors.white};
      p {
        width: 90%;
        margin: 0 auto;
        color: ${props => props.theme.colors.grey};
      }
      textarea {
        margin-top: 30px;
        padding: 5px;
        width: 90%;
        margin: 0 auto;
        display: block;
        resize: none;
        border: none;
        background: ${props => props.theme.colors.white};
        font-family: ${props => props.theme.fonts.main};
        font-size: 1rem;
      }
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
      -webkit-appearance: none;
      background: ${props => props.theme.colors.white};
      border: 1px solid ${props => props.theme.colors.lightGrey};
      @media (max-width: 480px) {
        padding-left: 40px;
      }
    }
  }
  .product-list {
    background: ${props => props.theme.colors.white};
    overflow-y: scroll;
    height: 50vh;
    h2 {
      width: 90%;
      margin: 0 auto 10px;
      font-weight: 500;
      font-size: 1.3rem;
      font-family: ${props => props.theme.fonts.main};
    }
  }
  .product-item {
    display: grid;
    padding: 5px;
    grid-template-columns: 70px 1fr 40px;
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
      width: 40px;
      svg {
        height: 16px;
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
  .ReactCrop {
    margin-bottom: 10px;
  }
  .next button {
    font-size: 1rem !important;
  }
`;

const CropperComponent = ({
  src,
  setImageString,
  setUploadState,
  upImg,
  imgRef,
  setUpImg,
  setImgRef,
  crop,
  setCrop,
}) => {
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
      {upImg || imgRef ? (
        <>
          <ReactCrop
            src={upImg}
            onImageLoaded={onLoad}
            crop={crop}
            onChange={c => setCrop(c)}
            onComplete={makeClientCrop}
            ruleOfThirds
          />
          {result ? (
            <div className='next'>
              <BlackButtonClick
                onClick={() => {
                  setUploadState(2);
                }}>
                {`NEXT STEP (1/2)`}
              </BlackButtonClick>
            </div>
          ) : (
            <p>Please select the photo area.</p>
          )}
        </>
      ) : (
        <>
          <button className='btn'>
            <CameraSVG />
            <p>Click here to browse your camera roll</p>
          </button>
          <input
            type='file'
            name='file upload'
            accept='image/*'
            onChange={onSelectFile}
            aria-label='add photo'
          />
        </>
      )}
    </>
  );
};

const UploadPhotoModal = () => {
  const initialCrop = {
    unit: '%',
    width: 50,
    height: 50,
    x: 25,
    y: 15,
    aspect: 10 / 16,
  };

  const [upImg, setUpImg] = useState();
  const [imgRef, setImgRef] = useState(null);
  const [uploadState, setUploadState] = useState(1);
  const [imageString, setImageString] = useState('');
  const [loading, setLoading] = useState(false);
  const [taggedProducts, setTaggedProducts] = useState([]);
  const [description, setDescription] = useState('');
  const [query, setQuery] = useState('');
  const [searchProducts, setSearchProducts] = useState([]);
  const [currentPictureUrl, setCurrentPictureUrl] = useState('');
  const [error, setError] = useState('');
  const [crop, setCrop] = useState(initialCrop);

  const clearState = () => {
    setOpenPhotoUpload(false);
    setLoading(false);
    setUploadState(1);
    setTaggedProducts([]);
    setDescription('');
    setCurrentPictureUrl('');
    setBodyScroll(false);
    setCrop(initialCrop);
    setUpImg();
    setImgRef(null);
    setImageString('');
  };

  const { openPhotoUpload, setOpenPhotoUpload, setBodyScroll } = useContext(ModalContext);
  const { dbh, userData, uploadUserPhoto } = useContext(FirebaseContext);

  const commentLimit = 200;

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

  const uploadS3File = () => {
    setLoading(true);
    S3Client.uploadFile(convertFile(imageString, newFileName), newFileName)
      .then(data => {
        setCurrentPictureUrl(data.location);
        uploadPhoto(data.location);
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
            const { name, mainImage, brand } = doc.data();
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

  const uploadPhoto = async photoUrl => {
    setError('');
    setLoading(true);
    if (photoUrl.length && userData.loggedIn && description.length && taggedProducts.length) {
      await uploadUserPhoto(photoUrl, description, taggedProducts);
      clearState();
      setBodyScroll(false);
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
    <UploadStyles photoUploadOpen={openPhotoUpload}>
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
                  <button
                    aria-label='close'
                    onClick={() => {
                      clearState();
                      setBodyScroll(false);
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
                        setUploadState={setUploadState}
                        upImg={upImg}
                        imgRef={imgRef}
                        setUpImg={setUpImg}
                        setImgRef={setImgRef}
                        crop={crop}
                        setCrop={setCrop}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {uploadState === 2 && (
            <div className='top-content'>
              <div className='title-buttons'>
                <div className='left-content'></div>
                <h1>Picture Details</h1>
                <div className='right-content'></div>
              </div>
              <section className='description'>
                <label>Description</label>
                <div className='description-input'>
                  <TextareaAutosize
                    minRows={3}
                    maxRows={5}
                    name='description'
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    required
                    maxLength={commentLimit}
                  />
                  <p>
                    {description.length}/{commentLimit}
                  </p>
                </div>
              </section>
              <section className='tags'>
                <h3>Product in this picture</h3>
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
                            <CloseSVG fill='tomato' />
                          </button>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className='add-tags'>
                    <button
                      className='plus-icon'
                      aria-label='Search products to tag'
                      onClick={() => {
                        productSearch('YZED');
                        setUploadState(3);
                      }}>
                      <SavePlusSVG />
                    </button>
                    <div className='content'>
                      <h4>Show 'em what you got!</h4>
                      <p>Hit the search icon to add featured products to your post</p>
                    </div>
                  </div>
                )}
              </section>
              <div className='bottom-content'>
                {uploadState === 2 && (
                  <>
                    {error && <p>{error}</p>}
                    <div className='next'>
                      <WhiteButtonClick onClick={() => setUploadState(1)}>
                        PREVIOUS STEP (1/2)
                      </WhiteButtonClick>
                    </div>
                    {imageString.length > 0 && description.length > 0 && taggedProducts.length > 0 && (
                      <BlackButtonClick
                        onClick={async () => {
                          uploadS3File();
                        }}>
                        Upload Picture
                      </BlackButtonClick>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
          {uploadState === 3 && (
            <div className='top-content'>
              <div className='title-buttons'>
                <div className='left-content'>
                  <button onClick={() => setUploadState(2)}>
                    <ChevronLeft />
                  </button>
                </div>
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
                <h2>Featured Products</h2>
                {searchProducts.map(product => (
                  <div
                    key={product.id}
                    className={checkIfTagged(product.id) ? 'product-item selected' : 'product-item'}
                    onClick={() => {
                      if (!checkIfTagged(product.id) && taggedProducts.length <= 2) {
                        addToTagList(product);
                        setQuery('');
                        setSearchProducts([]);
                        setUploadState(2);
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
        </div>
      )}
    </UploadStyles>
  );
};

export default UploadPhotoModal;
