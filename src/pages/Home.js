import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import ProductThumbs from '../components/ProductThumbs';
import '@google/model-viewer';
import ArrowIcon from '../assets/images/down-arrow.png';
import MainPageCarousel from '../components/MainPageUserCarousel';
import { Link } from 'react-router-dom';
import MediaViewer from '../components/ModelViewer';
import { Helmet } from 'react-helmet';
import { FirebaseContext } from '../context/Firebase';
import LoadingSpinner from '../components/LoadingSpinner';

const HomeStyles = styled.div`
  margin: 0 auto;
  text-align: center;
  font-family: ${props => props.theme.fonts.main};
  color: ${props => props.theme.black};
  margin-top: calc(5vh + 100px);
  max-width: 500px;
  background: ${props => props.theme.white};
  @media (max-width: 576px) {
    width: 100% !important ;
  }

  model-viewer {
    width: 450px;
    height: 300px;
    margin: 0 auto;
    z-index: 0;
    @media (max-width: 576px) {
      max-width: 90%;
    }
  }
  .main-product-title {
    width: 450px;
    text-align: left;
    margin: 0 auto;
    @media (max-width: 576px) {
      max-width: 90%;
    }
  }
  .main-product-title h2 {
    font-weight: 300;
    font-size: 2rem;
    margin: 0;
  }
  .main-product-title h3 {
    font-weight: 400;
    margin-bottom: 10px;
  }
  .main-product-title h4 {
    font-weight: 400;
    margin-bottom: 50px;
    margin-top: 10px;
    color: ${props => props.theme.colors.gray};
  }
  .discover-box {
    color: ${props => props.theme.colors.gray};
    h3 {
      margin: 50px 0 0;
      letter-spacing: 0.1rem;
      font-weight: 400;
    }
    img {
      height: 150px;
    }
  }
`;

const WhiteButton = styled.div`
  width: 200px;
  border: 2px solid ${props => props.theme.colors.black};
  border-radius: 0px;
  height: 50px;
  line-height: 50px;
  display: block;
  margin: 0 auto;
  font-size: 1.2rem;
  padding: 0px 40px;
  font-family: ${props => props.theme.fonts.main};
  a {
    color: black;
    text-decoration: none;
  }
`;

const BlackButton = styled.button`
  border: 2px solid ${props => props.theme.colors.black};
  border-radius: 0px;
  height: 52px;
  display: block;
  margin: 0 auto;
  font-size: 1.2rem;
  padding: 5px 80px;
  font-family: ${props => props.theme.fonts.main};
  background: ${props => props.theme.colors.black};
  color: white;
  min-width: 284px;
  margin-bottom: 10px;
`;

const BottomBlackButton = styled.div`
  width: 200px;
  border: 2px solid ${props => props.theme.colors.black};
  border-radius: 0px;
  height: 50px;
  line-height: 50px;
  display: block;
  margin: 0 auto;
  background: ${props => props.theme.colors.black};
  font-size: 1.2rem;
  padding: 0px 40px;
  font-family: ${props => props.theme.fonts.main};
  margin: 100px auto 50px;
  a {
    color: ${props => props.theme.colors.white};
    text-decoration: none;
  }
`;

const Home = () => {
  const [mainProduct, setMainProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [displayDate, setDisplayDate] = useState('');

  const { dbh } = useContext(FirebaseContext);

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      dbh
        .collection('products')
        .doc('5NlpClokHFwJG6Pl7IYz')
        .get()
        .then(doc => {
          setMainProduct({ id: doc.id, ...doc.data() });
          setLoading(false);
        });
    };
    fetchData();
  }, []);

  if (loading)
    return (
      <HomeStyles>
        <LoadingSpinner color='#272727' />
      </HomeStyles>
    );

  return (
    <HomeStyles>
      <Helmet>
        <title>YZED - HOME</title>
      </Helmet>
      {mainProduct && (
        <div className='main-product-title'>
          <h3>
            <strong>{mainProduct.brand}</strong> {mainProduct.name}
          </h3>
        </div>
      )}
      <MediaViewer
        glbFile='https://oneoone-resource.s3.ap-northeast-2.amazonaws.com/yzed/GLTF_TRENCH_COAT_RESIZED_ANDBAKED_4.gltf'
        usdzFile='https://oneoone-resource.s3.ap-northeast-2.amazonaws.com/yzed/GLTF_TRENCH_COAT_RESIZED_ANDBAKED_4.usdz#applePayButtonType=plain'
        displayLink={true}
        productId='5NlpClokHFwJG6Pl7IYz'
      />
      <div className='product-title-area'>
        <div className='top-buttons'>
          <BlackButton onClick={() => document.querySelector('model-viewer').activateAR()}>
            VIEW IN AR
          </BlackButton>
          <WhiteButton>
            <Link to='/subscribe'>BECOME A YZER</Link>
          </WhiteButton>
        </div>
        <div className='discover-box'>
          <h3>Discover YZED.</h3>
          <img src={ArrowIcon} alt='down-arrow' />
        </div>
        <h2>RECOMMENDED FOR YOU</h2>
        <ProductThumbs />
        <MainPageCarousel />
        <BottomBlackButton>
          <Link to='/subscribe'>BECOME A YZER</Link>
        </BottomBlackButton>
      </div>
    </HomeStyles>
  );
};

export default Home;
