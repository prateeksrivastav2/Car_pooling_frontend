import React, { useState } from 'react';
import axios from 'axios';

const MapSearchComponent = () => {
  const [inputValue, setInputValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (event) => {
    setInputValue(event.target.value);
    // Call the API whenever the input value changes
    fetchSearchResults(event.target.value);
  };

  const fetchSearchResults = async (query) => {
    try {
      const response = await fetch(`/api/places/search/json?query=${query}`, {
        headers: {
          Authorization: 'Bearer 20e4db11-06a7-480e-ba0c-ab474f5a6c10'
        }
      });
      setSearchResults(response.data.results);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Search places..."
      />
      <ul>
        {searchResults.map((result, index) => (
          <li key={index}>{result.placeName}</li>
        ))}
      </ul>
    </div>
  );
};

export default MapSearchComponent;
