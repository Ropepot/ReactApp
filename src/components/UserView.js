import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import SearchByName from './SearchByName';

export default function UserView({ productsData }) {
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    setSearchResults(productsData);
  }, [productsData]);

  return (
    <>
      <h1 className="my-3 text-center">Products</h1>
      <div className="container">
        <div className="row">
          <div>
            <SearchByName setSearchResults={setSearchResults} productsData={productsData} />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          {searchResults
            .filter(product => product.isActive === true)
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(product => (
              <div className="col-md-4 mb-3" key={product._id}>
                <ProductCard productProp={product} />
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

