import '@google/model-viewer';

import { BlackButton, RoundARButton } from '../utilities/ReusableStyles';
import React, { useContext, useEffect, useState } from 'react';

import ArrowIcon from '../assets/images/down-arrow.png';
import { FirebaseContext } from '../context/Firebase';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import MainPageCarousel from '../components/PhotoCarousel';
import MediaViewer from '../components/ModelViewer';
import ProductThumbs from '../components/ProductThumbs';
import { formatPrice } from '../utilities/formatting';
import moment from 'moment';
import styled from 'styled-components';

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
    margin: 20px 2.5% 0;
    display: grid;
    grid-template-columns: 100px 1fr 100px;
    justify-items: center;

    align-content: center;
    .product-link {
      position: relative;
      width: 100px;
      height: 25px;
        align-self: center;
      a {
        color: ${props => props.theme.colors.grey};
        height: 16px;
        text-decoration: none;
        /* border-bottom: 1px solid ${props => props.theme.colors.mediumGrey}; */
        height: 1rem;
        font-size: 0.9rem;
        line-height: 1rem;
        padding: 3px 0;
        &:after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 5%;

          height: 1px;
          background: ${props => props.theme.colors.mediumGrey};
          display: block;
          width: 90px;
        }
      }
    }
    .square-area {
      width: 100px;
    }
    button {
      align-self: center;
    }
  }
  .connected-content {
    .join-section {
      width: 80%:
      font-family: ${props => props.theme.fonts.main};
      background: url('https://oneoone-resource.s3.ap-northeast-2.amazonaws.com/yzed/bg_home_1.jpg');
      background-size: cover;
      padding-top: 50px;
      padding-bottom: 80px;
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
        font-weight: 300;
        font-size: 1.1rem;
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
      box-shadow: 0 0 6px #27272722;
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
      padding: 20px 0 20px;
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
        width: 80%
        font-size: 1.1rem;
        padding: 0 7.5%;
          font-weight: 300;
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
        <>
          <div className='main-product-title'>
            <div className='date-and-price'>
              <h3>{displayDate}</h3>
            </div>
            <h3>
              <strong>{mainProduct.brand}</strong> {mainProduct.name}
            </h3>
          </div>
          <MediaViewer
            glbFile={mainProduct.glbFile}
            usdzFile={mainProduct.usdzFile}
            productId='5NlpClokHFwJG6Pl7IYz'
          />
        </>
      )}

      <section className='product-buttons'>
        <div className='square-area'></div>
        <RoundARButton
          aria-label='Start AR'
          onClick={() => {
            document.querySelector('model-viewer').activateAR();
          }}>
          A R
        </RoundARButton>
        <div className='product-link'>
          <Link to={mainProduct ? `/item/${mainProduct.id}` : '/featured'}>View product</Link>
        </div>
      </section>
      <section className='discover-box'>
        <h3>Discover YZED.</h3>
        <div className='down-arrow' />
      </section>
      <section className='connected-content'>
        <div className='join-section'>
          <h3>
            <strong>Explore</strong> AR
          </h3>
          <p>
            Select objects from our wide catalogue and place them anywhere in real life with the
            power of augmented reality.
          </p>
          <BlackButton>
            <Link to='/featured'>EXPLORE AR</Link>
          </BlackButton>
        </div>
        <div className='timeline'>
          <h3>
            <strong>Today's</strong> timeline
          </h3>
          <MainPageCarousel
            brand='YZED'
            title='BODY SUIT AND SKIRT'
            product='q9qdq22KRhtOBUnqUCSf'
          />
          <MainPageCarousel
            brand='YZED'
            title='VINYL TRENCH & LATEX DRESS'
            product='rxvt0XOGtaCl9n4Px9gp'
          />
        </div>
      </section>
      <footer>
        <div className='footer-content'>
          <h3>
            <strong>YZED</strong> Show it first
          </h3>
          <p>
            YZED is a platform for creative consumers to engage with their favourite brands through
            cutting edge technology.
          </p>

          <BlackButton>
            <Link to='/login'>BECOME A YZER</Link>
          </BlackButton>
        </div>
      </footer>
    </HomeStyles>
  );
};

export default Home;
