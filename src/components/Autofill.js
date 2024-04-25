import React, { useState } from 'react';
import axios from 'axios';

const MapSearchComponent = () => {
  const [inputValue, setInputValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = async (event) => {
    setInputValue(event.target.value);
    // Call the API whenever the input value changes
    await fetchSearchResults(event.target.value);
  };

  const fetchSearchResults = async (query) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/places/search`);
      setSearchResults(response.data); // Assuming response.data contains an array of search results
      console.log(response.data);
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
        {/* {searchResults.map((result, index) => (
          <li key={index}>{result.placeName}</li>
        ))} */}
      </ul>
    </div>
  );
};

export default MapSearchComponent;
