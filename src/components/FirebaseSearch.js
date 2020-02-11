import React, { useState, useEffect, useContext } from 'react';
import { debounce } from 'debounce';
import { FirebaseContext } from '../context/Firebase';
import { Link, useHistory } from 'react-router-dom';
import { formatProductName } from '../utilities/formatting';

const FirebaseSearch = ({ setOpenSearch }) => {
  const history = useHistory();
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);

  const { dbh } = useContext(FirebaseContext);

  const searchForProduct = debounce(query => {
    let tempItems = [];
    dbh
      .collection('products')
      .where('keywords', 'array-contains', query.toLowerCase())
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
  }, 250);

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
        {products.slice(0, 5).map(product => {
          const searchTerm = searchQuery;
          return (
            <div key={product.id}>
              <button
                name={product.name}
                id={product.id}
                onClick={() => {
                  setOpenSearch(false);
                  setSearchQuery('');
                  setProducts([]);
                  history.push(`/product/${product.id}`);
                }}>
                {product.name}
              </button>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default FirebaseSearch;
