import React, { useState, useEffect, useContext } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Brands } from '../data';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { BlackLink } from '../utilities/ReusableStyles';
import LogoYSVG from '../assets/icons/yzed_y_logo';
import { FirebaseContext } from '../context/Firebase';
import LoadingSpinner from '../components/LoadingSpinner';
import { formatNumberWithCommas } from '../utilities/formatting';

export const BrandStyles = styled.div`
  font-family: ${props => props.theme.fonts.main};
  margin: -40px auto 0;
  padding: 60px 30px;
  background: url('https://oneoone-resource.s3.ap-northeast-2.amazonaws.com/yzed/bg_brand_1.jpg');
  h3.brand-title {
    margin: 20px 2.5% 10px;
    font-size: 1.6rem;
    text-align: center;
    font-weight: 300;
    strong {
      font-weight: 600;
    }
  }
  .brand-info {
    display: grid;
    grid-template-columns: 1fr 5fr;
    width: 95%;
    margin: 0 auto;
    grid-gap: 20px;
    align-items: center;
    a {
      margin-top: 10px;
    }
  }
  .brand-image {
    width: 120px;
    height: 120px;
    border: 1px solid ${props => props.theme.colors.black};
    background: ${props => props.theme.colors.white};
    svg {
      height: 60%;
      margin: 20% 5%;
    }
  }
  .brand-stats {
    h4 {
      font-size: 1.2rem;
      font-weight: 300;
      margin: 3px 0;
      span {
        font-weight: 600;
      }
    }
    @media (max-width: 500px) {
      a {
        font-size: 1rem;
      }
      h4 {
        font-size: 1.1rem;
      }
    }
    @media (max-width: 400px) {
      a {
        font-size: 0.8rem;
      }
      h4 {
        font-size: 1.1rem;
      }
    }
    .brand-link {
      margin-top: 20px;
    }
  }
`;

const ProductBrand = ({ brandId }) => {
  const [brand, setBrand] = useState(null);
  const [loading, setLoading] = useState(false);

  const { dbh } = useContext(FirebaseContext);

  useEffect(() => {
    setLoading(true);
    dbh
      .collection('brands')
      .doc(brandId)
      .get()
      .then(doc => {
        console.log(doc.data());
        setBrand(doc.data());
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <BrandStyles>
        <LoadingSpinner color='black' />
      </BrandStyles>
    );

  return (
    <BrandStyles>
      {brand && (
        <>
          <h3 className='brand-title'>
            About <strong>{brand.name}</strong>
          </h3>
          <div className='brand-info'>
            <div className='brand-image'>
              <LogoYSVG />
            </div>
            <div className='brand-stats'>
              <h4>
                <span>{formatNumberWithCommas(brand.followers)}</span> FOLLOWERS
              </h4>
              <h4>
                <span>{formatNumberWithCommas(brand.products)}</span> PRODUCTS
              </h4>
              <h4>
                <span>{brand.challenges}</span> CHALLENGES
              </h4>
              <BlackLink className='brand-link'>
                <Link to={`/brand/${brand.name}`}>{brand.name} PROFILE</Link>
              </BlackLink>
            </div>
          </div>
        </>
      )}
    </BrandStyles>
  );
};

export default ProductBrand;
