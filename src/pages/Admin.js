import { Link, useHistory } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';

import FileUpload from '../components/FileUpload';
import { FirebaseContext } from '../context/Firebase';
import { Helmet } from 'react-helmet';
import LoadingSpinner from '../components/LoadingSpinner';
import { ProductContext } from '../context/Product';
import TopTitle from '../components/TopTitle';
import styled from 'styled-components';

export const LoginStyles = styled.div`
  width: 500px;
  max-width: 95%;
  margin: 0 auto;
  min-height: calc(90vh - 50px);
  margin-top: calc(10vh + 50px);
  ul {
    li {
      padding: 20px;
      a {
        display: block;
        color: black;
        font-size: 1.2rem;
      }
    }
  }
  h2 {
    margin-top: 50px;
    text-align: center;
  }
  a.create {
    background: ${props => props.theme.colors.black};
    color: ${props => props.theme.colors.white};
    text-decoration: none;
    width: 250px;
    height: 45px;
    display: block;
    margin: 0 auto;
    text-align: center;
    line-height: 45px;
    border-radius: 25px;
    margin-top: 50px;
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

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userData, dbh, userLoading } = useContext(FirebaseContext);
  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    if (!userLoading) {
      if (!userData.loggedIn || userData.role !== 'ADMIN') {
        history.push('/');
      } else {
        let tempProducts = [];
        dbh.collection('products').onSnapshot(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            tempProducts.push({ id: doc.id, ...doc.data() });
          });
          setProducts(tempProducts);
          setLoading(false);
        });
      }
    }
  }, [userLoading]);

  if (userLoading || loading) {
    return (
      <LoginStyles>
        <LoadingSpinner color='black' />
      </LoginStyles>
    );
  }

  return (
    <LoginStyles>
      <Helmet>
        <title>YZED - CREATE</title>
      </Helmet>
      <TopTitle title='Admin Page' />
      <Link to='/create' className='create'>
        CREATE NEW PRODUCT
      </Link>
      <h2>CHOOSE A PRODUCT TO EDIT</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <Link to={`/edit/${product.id}`}>{product.name}</Link>
          </li>
        ))}
      </ul>
    </LoginStyles>
  );
};

export default Admin;
