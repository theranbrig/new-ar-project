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
import { BlackButton, RoundARButton } from '../utilities/ReusableStyles';

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
        font-size: 1rem;
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
    color: ${props => props.theme.colors.mediumGrey};
    h3 {
      font-size: 0.9rem;
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
      height: 16px;
      text-decoration: none;
      border-bottom: 1px solid ${props => props.theme.colors.mediumGrey};
      height: 1rem;
      font-size: 0.9rem;
      line-height: 1rem;
      align-self: center;
      min-width: 100px;
    }
    .square-area {
      width: 100px;
    }
  }
  .connected-content {
    .join-section {
      font-family: ${props => props.theme.fonts.main};
      background: url('https://oneoone-resource.s3.ap-northeast-2.amazonaws.com/yzed/bg_home_1.jpg');
      background-size: cover;
      padding: 20px 30px 100px;
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
        font-size: 1rem;
        padding: 0 20px;
      }
    }
    .timeline {
      position: relative;
      margin-top: -70px;
      margin-bottom: -70px;
      width: 100%;
      border-radius: 50px;
      padding-bottom: 20px;
      background-color: ${props => props.theme.colors.white};
      box-shadow: ${props => props.theme.boxShadows.topAndBottom};
      h3 {
        padding-top: 30px;
        font-size: 1.5rem;
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
    border-bottom: 2px solid ${props => props.theme.colors.mediumGrey};
    border-right: 2px solid ${props => props.theme.colors.mediumGrey};
    margin: 0 auto;
    margin-bottom: 20px;
  }
  footer {
    .footer-content {
      font-family: ${props => props.theme.fonts.main};
      background: url('https://oneoone-resource.s3.ap-northeast-2.amazonaws.com/yzed/bg_home_2.jpg');
      background-size: cover;
      padding: 20px 30px 20px;
      color: ${props => props.theme.colors.black};
      h3 {
        margin-top: 80px;
        font-size: 1.8rem;
        font-weight: 300;
        strong {
          font-weight: 700;
        }
      }
      p {
        font-size: 1rem;
        padding: 0 20px;
      }
    }
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
        usdzFile='https://oneoone-resource.s3.ap-northeast-2.amazonaws.com/yzed/GLTF_TRENCH_COAT_RESIZED_ANDBAKED_4.usdz'
        productId='5NlpClokHFwJG6Pl7IYz'
      />

      <section className='product-buttons'>
        <div className='square-area'></div>
        <RoundARButton onClick={() => document.querySelector('model-viewer').activateAR()}>
          AR
        </RoundARButton>
        <Link to={mainProduct ? `/product/${mainProduct.id}` : '/shop'}>View Product</Link>
      </section>
      <section className='discover-box'>
        <h3>Discover YZED.</h3>
        <div className='down-arrow' />
      </section>
      <section className='connected-content'>
        <div className='join-section'>
          <h3>
            <strong>YZED</strong> Show it first
          </h3>
          <p>
            YZED is a platform for creative consumers to engage with their favourite brands through
            cutting edge technology.
          </p>
          <BlackButton>
            <Link to='/register'>BECOME A YZER</Link>
          </BlackButton>
        </div>
        <div className='timeline'>
          <h3>
            <strong>Today's</strong> timeline
          </h3>
          <MainPageCarousel />
        </div>
      </section>
      <footer>
        <div className='footer-content'>
          <h3>
            <strong>Explore</strong> AR
          </h3>
          <p>
            Select Objects and place them anywhere in real life with the power of augmented reality.
          </p>
          <BlackButton>
            <Link to='/shop'>EXPLORE AR</Link>
          </BlackButton>
        </div>
      </footer>
    </HomeStyles>
  );
};

export default Home;
