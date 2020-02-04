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
      }}>
      {children}
    </ProductContext.Provider>
  );
};

ProductProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProductProvider;
