import React, { useState, useEffect, useContext } from 'react';
import { debounce } from 'debounce';
import { FirebaseContext } from '../context/Firebase';
import { Link } from 'react-router-dom';
import { formatProductName } from '../utilities/formatting';

const FirebaseSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);

  const { dbh } = useContext(FirebaseContext);

  const searchForProduct = query => {
    let tempItems = [];
    const queryDB = async () => {
      await dbh
        .collection('products')
        .orderBy('name')
        .startAt(query)
        .endAt(query + '\uf8ff')
        .get()
        .then(querySnapshot => {
          querySnapshot.docs.forEach(doc => {
            const { name, price, mainImage, brand } = doc.data();
            tempItems.push({
              id: doc.id,
              name: formatProductName(name),
              price,
              mainImage,
              brand: brand.toUpperCase(),
            });
          });
          setProducts(tempItems);
        });
      await dbh
        .collection('products')
        .orderBy('brand')
        .startAt(query)
        .endAt(query + '\uf8ff')
        .get()
        .then(querySnapshot => {
          querySnapshot.docs.forEach(doc => {
            const { name, price, mainImage, brand } = doc.data();
            tempItems.push({
              id: doc.id,
              name: formatProductName(name),
              price,
              mainImage,
              brand: brand.toUpperCase(),
            });
          });
          setProducts(tempItems);
        });
    };
    debounce(queryDB(), 500);
  };

  return (
    <div>
      <input
        value={searchQuery}
        onChange={e => {
          if (e.target.value === '') {
            setProducts([]);
          } else {
            searchForProduct(e.target.value);
          }
          setSearchQuery(e.target.value);
        }}
        type='text'
      />
      <ul>
        {products.slice(0, 5).map(product => (
          <div key={product.id}>
            <Link to={`/product/${product.id}`}>{product.name}</Link>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default FirebaseSearch;
