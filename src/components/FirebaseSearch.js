import React, { useState, useEffect, useContext } from 'react';
import { debounce } from 'debounce';
import { FirebaseContext } from '../context/Firebase';

const FirebaseSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);

  const { dbh } = useContext(FirebaseContext);

  const searchForProduct = () => {
    const snapshot = () =>
      dbh
        .collection('products')
        .orderBy('name')
        .where('product', 'array-contains', searchQuery)
        .get()
        .then(querySnapshot => console.log(querySnapshot));

    snapshot();
  };

  return (
    <div>
      <input type='text' onChange={() => debounce(searchForProduct())} />
    </div>
  );
};

export default FirebaseSearch;
