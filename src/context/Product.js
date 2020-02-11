import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import '@firebase/firestore';
import 'firebase/auth';
import { FirebaseContext } from './Firebase';

export const ProductContext = React.createContext();

const ProductProvider = ({ children }) => {
  const { setFirebaseError, dbh } = useContext(FirebaseContext);

  // FIREBASE PRODUCT MUTATIONS

  const createKeywords = name => {
    const arrName = [];
    let curName = '';
    name.split('').forEach(letter => {
      curName += letter;
      arrName.push(curName.toLowerCase());
    });
    return arrName;
  };

  const generateKeywords = (brandName, productName) => {
    const brandKeywords = createKeywords(brandName.toLowerCase());
    const productKeywords = createKeywords(productName.toLowerCase());
    const combinedKeywords = createKeywords(
      `${brandName.toLowerCase()} ${productName.toLowerCase()}`
    );
    return [...new Set([...brandKeywords, ...productKeywords, ...combinedKeywords])];
  };

  const createProduct = async (
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
    const keywords = await generateKeywords(brand, name);
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
        keywords,
      })
      .catch(err => setFirebaseError(err));
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
