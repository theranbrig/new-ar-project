import { Link, useParams } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';

import BackButton from '../components/BackButton';
import { FirebaseContext } from '../context/Firebase';
import { Helmet } from 'react-helmet';
import LoadingSpinner from '../components/LoadingSpinner';
import LogoYSVG from '../assets/icons/yzed_y_logo';
import ShopThumbs from '../components/ShopThumbs';
import styled from 'styled-components';

export const ShopCategoryStyles = styled.div`
  width: 500px;
  max-width: 95%;
  text-align: center;
  min-height: calc(80vh);
  margin: 0 auto 100px;
  font-family: Montserrat, sans-serif;
  margin-top: calc(10vh);
  .category-buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    grid-gap: 5px;
    color: white;
    background: black
    border-radius: 0px;
    a {
      background: black;
      color: white;
      padding: 10px 0;
      text-decoration: none;
    }
  }
  .all-link {
    margin-top: 5px;
    padding: 10px 0;
    background: black;
    width: 100%;
    a {
      color: white;
      text-decoration: none;
    }
  }
  p {
    margin-top: 100px;
    padding: 0 20px;
  }
`;

const BrandHeader = styled.div`
  background: ${({ headerImage }) => (headerImage ? `url('${headerImage}')` : '#272727')};
  height: 20vh;
  .brand-logo {
    background: ${props => props.theme.colors.white};
    height: 100px;
    width: 100px;
    border-radius: 50%;
    position: absolute;
    top: 25vh;
    margin-left: 40px;
    box-shadow: 0 0px 6px ${props => props.theme.colors.grey};
    overflow: hidden;
    svg {
      height: 50px;
      padding: 25px 20px;
    }
  }
  button {
    background: ${props => props.theme.colors.white};
    height: 50px;
    width: 200px;
    border-radius: 25px;
    position: absolute;
    font-size: 1rem;
    letter-spacing: 0.2rem;
    color: #955b80;
    top: 27vh;
    margin-right: 40px;
    box-shadow: 0 0px 6px ${props => props.theme.colors.grey};
    overflow: hidden;
    font-weight: 800;
  }
`;

const Brand = () => {
  const [brand, setBrand] = useState(null);
  const [loading, setLoading] = useState(false);
  const { name } = useParams();

  const { dbh } = useContext(FirebaseContext);

  useEffect(() => {
    setLoading(true);
    dbh
      .collection('brands')
      .where('name', '==', name)
      .get()
      .then(querySnapshot =>
        querySnapshot.forEach(snapshot => {
          console.log(snapshot.data());
          setBrand({ id: snapshot.id, ...snapshot.data() });
          setLoading(false);
        })
      );
  }, []);

  if (loading) {
    return (
      <ShopCategoryStyles>
        <LoadingSpinner color='black' />
      </ShopCategoryStyles>
    );
  }

  return (
    <ShopCategoryStyles>
      {brand && (
        <>
          <Helmet>
            <title>YZED - {brand.name.toUpperCase()} Brand</title>
          </Helmet>
          <BrandHeader headerImage={brand.headerImage}>
            <div className='brand-logo'>
              <LogoYSVG />
            </div>
            <button>FOLLOW</button>
          </BrandHeader>
          <p>
            Authentic XOXO lo-fi, sustainable retro +1 air plant pinterest. Franzen synth meggings
            blog bicycle rights hoodie. Tousled coloring book meditation cred taxidermy. Poutine
            austin cornhole photo booth retro raw denim cloud bread copper mug glossier. Occupy
            post-ironic artisan, four dollar toast gastropub kitsch chillwave keytar slow-carb banh
            mi. Poke chambray vegan single-origin coffee la croix food truck vice poutine PBR&B
            selvage post-ironic iceland waistcoat. Portland semiotics knausgaard, meh vape selfies
            vegan poke umami synth beard lomo.
          </p>
        </>
      )}
    </ShopCategoryStyles>
  );
};

export default Brand;
