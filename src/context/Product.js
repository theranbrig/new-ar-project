import '@firebase/firestore';
import 'firebase/auth';

import React, { useContext } from 'react';

import { FirebaseContext } from './Firebase';
import PropTypes from 'prop-types';

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

  const keywordsFromPhrase = phrase => {
    const wordsArray = phrase.split(' ');
    let arrKeys = [];
    wordsArray.map(word => (arrKeys = [...createKeywords(word), ...arrKeys]));
    return arrKeys;
  };

  const generateKeywords = (brandName, productName) => {
    const brand = brandName.toLowerCase();
    const product = productName.toLowerCase();
    const brandSplitKeywords = keywordsFromPhrase(brand);
    const productSplitKeywords = keywordsFromPhrase(product);
    const brandKeywords = createKeywords(brand);
    const productKeywords = createKeywords(product);
    const combinedKeywords = createKeywords(`${brand} ${product}`);
    return [
      ...new Set([
        ...brandKeywords,
        ...productKeywords,
        ...combinedKeywords,
        ...brandSplitKeywords,
        ...productSplitKeywords,
      ]),
    ];
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
    features,
    callback
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
        features,
        featured: true,
        keywords,
      })
      .then(() => callback())
      .catch(err => setFirebaseError(err));
  };

  const editProduct = async (
    id,
    name,
    brand,
    mainImage,
    color,
    price,
    sizes,
    glbFile,
    usdzFile,
    pictures,
    features,
    featured,
    callback
  ) => {
    const keywords = await generateKeywords(brand, name);
    dbh
      .collection('products')
      .doc(id)
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
        features,
        featured: true,
        keywords,
      })
      .then(() => callback())
      .catch(err => setFirebaseError(err));
  };

  return (
    <ProductContext.Provider
      value={{
        createProduct,
        editProduct,
      }}>
      {children}
    </ProductContext.Provider>
  );
};

ProductProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProductProvider;
