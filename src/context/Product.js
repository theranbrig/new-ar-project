import * as firebase from 'firebase/app';
import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import '@firebase/firestore';
import 'firebase/auth';
import { FirebaseContext } from './Firebase';

export const ProductContext = React.createContext();

const ProductProvider = ({ children }) => {
  const [firebaseProducts, setFirebaseProducts] = useState([]);
  const [firebaseProduct, setFirebaseProduct] = useState(null);

  const { firebaseError, setFirebaseError, dbh } = useContext(FirebaseContext);

  const getProducts = async () => {
    let products = [];
    dbh
      .collection('products')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          products.push({ id: doc.ref.id, ...doc.data() });
        });
        console.log(products);
        setFirebaseProducts(products);
        return products;
      })
      .catch(err => {
        console.log(err);
        setFirebaseError(err);
      });
  };

  const getProduct = id => {
    const query = dbh.collection('products').doc(id);
    let product;
    query
      .get()
      .then(doc => {
        if (doc.exists) {
          product = doc.data();
          setFirebaseProduct(product);
          console.log('PROD', product);
          console.log('FIRE', firebaseProduct);
          return product;
        } else {
          console.log('No document found');
        }
      })
      .catch(err => console.log(err));
  };

  // FIREBASE PRODUCT MUTATIONS

  const createProduct = (
    name,
    brand,
    mainImage,
    color,
    price,
    sizes,
    glbFile,
    usdzFile,
    pictures,
    productInformation
  ) => {
    dbh
      .collection('products')
      .doc()
      .set({
        name,
        brand,
        mainImage,
        color,
        price,
        sizes,
        glbFile,
        usdzFile,
        pictures,
        productInformation,
      })
      .catch(err => console.log(err));
  };

  return (
    <ProductContext.Provider
      value={{
        createProduct,
        getProducts,
        firebaseProducts,
        getProduct,
        firebaseProduct,
        setFirebaseProduct,
      }}>
      {children}
    </ProductContext.Provider>
  );
};

ProductProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProductProvider;
