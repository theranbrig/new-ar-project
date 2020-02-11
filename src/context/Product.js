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
    console.log(arrName);
    return arrName;
  };

  const keywordsFromPhrase = phrase => {
    const wordsArray = phrase.split(' ');
    let arrKeys = [];
    wordsArray.map(word => (arrKeys = [...createKeywords(word), ...arrKeys]));
    console.log(arrKeys);
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
