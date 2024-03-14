import React, { useState } from 'react';

export default function SearchByName({ setSearchResults, productsData }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = event => {
    setSearchTerm(event.target.value);
    if (!event.target.value) {
      setSearchResults(productsData);
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    fetch(`${process.env.REACT_APP_API_BASE_URL}/products/searchByName`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: searchTerm })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to search for products');
      }
      return response.json();
    })
    .then(data => {
      setSearchResults(data);
    })
    .catch(error => {
      console.error('Error searching for products:', error.message);
      // Handle error
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter product name"
            value={searchTerm}
            onChange={handleChange}
          />
          <div className="input-group-append">
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

