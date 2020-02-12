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
import moment from 'moment';
import { formatPrice } from '../utilities/formatting';

const HomeStyles = styled.div`
  margin: 0 auto;
  text-align: center;
  font-family: ${props => props.theme.fonts.main};
  color: ${props => props.theme.colors.black};
  margin-top: calc(5vh + 100px);
  max-width: 500px;
  background: ${props => props.theme.colors.white};
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
    .date-and-price {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      h3,
      h4 {
        margin: 0;
      }
      h3 {
        color: ${props => props.theme.colors.grey};
      }
      h4 {
        color: ${props => props.theme.colors.black};
        font-weight: 700;
      }
    }
  }
  .main-product-title h3 {
    font-weight: 400;
    margin: 0 0 10px;
  }
  .main-product-title h4 {
    font-weight: 400;
    margin-bottom: 50px;
    margin-top: 10px;
    color: ${props => props.theme.colors.grey};
  }
  .discover-box {
    color: ${props => props.theme.colors.grey};
    h3 {
      margin: 50px 0 0;
      letter-spacing: 0.1rem;
      font-weight: 400;
    }
    img {
      height: 150px;
    }
  }
  .product-buttons {
    padding: 10px 0;
    width: 95%;
    margin: 0 2.5%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    a {
      color: ${props => props.theme.colors.grey};
      padding: 3px 0;
      text-decoration: none;
      border-bottom: 1px solid ${props => props.theme.colors.grey};
      height: 1.4rem;
      font-size: 1rem;
      line-height: 1rem;
      align-self: center;
    }
    .square-area {
      width: 104px;
    }
  }
  .connected-content {
    .join-section {
      font-family: ${props => props.theme.fonts.main};
      background: url('https://oneoone-resource.s3.ap-northeast-2.amazonaws.com/yzed/bg_home_1.jpg');
      background-size: cover;
      padding: 20px 20px 100px;
      color: ${props => props.theme.colors.black};
      h3 {
        margin-top: 30px;
        font-size: 1.8rem;
        font-weight: 300;
        strong {
          font-weight: 700;
        }
      }
      p {
        font-size: 1.3rem;
      }
    }
    .timeline {
      position: relative;
      margin-top: -70px;
      width: 100%;
      border-top-right-radius: 50px;
      border-top-left-radius: 50px;
      background-color: ${props => props.theme.colors.white};
      h3 {
        padding-top: 30px;
        font-size: 1.8rem;
        font-weight: 300;
        strong {
          font-weight: 700;
        }
      }
    }
  }
  .down-arrow {
    width: 15px;
    height: 15px;
    transform: rotate(45deg);
    border-bottom: 2px solid ${props => props.theme.colors.grey};
    border-right: 2px solid ${props => props.theme.colors.grey};
    margin: 0 auto;
    margin-bottom: 20px;
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

const RoundARButton = styled.button`
  border: 2px solid ${props => props.theme.colors.white};
  border-radius: 0px;
  height: 75px;
  width: 75px;
  line-height: 75px;
  display: block;
  margin: 30px auto;
  font-size: 1.2rem;
  font-weight: 700;
  border-radius: 50%;
  font-family: ${props => props.theme.fonts.main};
  background: ${props => props.theme.colors.lightGrey};
  color: ${props => props.theme.black};
  margin-bottom: 10px;
  box-shadow: 0 0 0 8px ${props => props.theme.colors.lightGrey};
`;

const BlackButton = styled.div`
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
  font-weight: 600;
  font-family: ${props => props.theme.fonts.main};
  margin: 0 auto 30px;
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
          setDisplayDate(moment().format('YYYY.MM.DD'));
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
        <h3 className='main-product-title'>
          <div className='date-and-price'>
            <h3>{displayDate}</h3>
            <h4>{formatPrice(mainProduct.price)}</h4>
          </div>
          <h3>
            <strong>{mainProduct.brand}</strong> {mainProduct.name}
          </h3>
        </h3>
      )}
      <MediaViewer
        glbFile='https://oneoone-resource.s3.ap-northeast-2.amazonaws.com/yzed/GLTF_TRENCH_COAT_RESIZED_ANDBAKED_4.gltf'
        usdzFile='https://oneoone-resource.s3.ap-northeast-2.amazonaws.com/yzed/GLTF_TRENCH_COAT_RESIZED_ANDBAKED_4.usdz#applePayButtonType=plain'
        displayLink={true}
        productId='5NlpClokHFwJG6Pl7IYz'
      />

      <section className='product-buttons'>
        <div className='square-area'></div>
        <RoundARButton onClick={() => document.querySelector('model-viewer').activateAR()}>
          AR
        </RoundARButton>
        <Link>View Product</Link>
      </section>
      <section className='discover-box'>
        <h3>Discover YZED.</h3>
        <div className='down-arrow' />
      </section>
      <div className='connected-content'>
        <section className='join-section'>
          <h3>
            <strong>YZED</strong> Show it first
          </h3>
          <p>
            YZED is a platform for creative consumers to engage with their favourite brands through
            cutting edge technology.
          </p>
          <BlackButton>
            <Link to='/subscribe'>BECOME A YZER</Link>
          </BlackButton>
        </section>
        <section className='timeline'>
          <h3>
            <strong>Today's</strong> timeline
          </h3>
          <MainPageCarousel />
        </section>
      </div>
      <BlackButton>
        <Link to='/subscribe'>BECOME A YZER</Link>
      </BlackButton>
    </HomeStyles>
  );
};

export default Home;
