import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { FirebaseContext } from '../context/Firebase';
import { useHistory, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ProductContext } from '../context/Product';
import LoadingSpinner from '../components/LoadingSpinner';
import FileUpload from '../components/FileUpload';

export const LoginStyles = styled.div`
  width: 500px;
  max-width: 95%;
  margin: 0 auto;
  min-height: calc(90vh - 50px);
  margin-top: calc(10vh + 50px);
  ul {
    list-style-type: none;
    li {
      padding: 20px;
      a {
        display: block;
        color: black;
        text-decoration: none;
        font-size: 1.5rem;
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

const Admin = () => {
  const [products, setProducts] = useState([]);
  const { userData, dbh } = useContext(FirebaseContext);

  useEffect(() => {
    let tempProducts = [];
    dbh
      .collection('products')
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          tempProducts.push({ id: doc.id, ...doc.data() });
        });
        setProducts(tempProducts);
      });
  }, []);

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
      <Link to='/create'>Create New Product</Link>
      <h2>Choose a product to edit</h2>
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
