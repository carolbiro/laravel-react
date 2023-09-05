import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8000';

const PropertySearch = () => {
  const [searchCriteria, setSearchCriteria] = useState({
    name: '',
    bedrooms: '',
    bathrooms: '',
    storeys: '',
    garages: '',
    min_price: '',
    max_price: '',
  });

  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false); // Added loading state

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchCriteria({ ...searchCriteria, [e.target.name]: e.target.value });
  };

  const handleSearch = async () => {
    try {
      const nonEmptySearchTerms = Object.fromEntries(Object.entries(searchCriteria).filter(([_, v]) => v != ''));
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/properties/search`, {
        params: nonEmptySearchTerms
      });
      setSearchResults(response.data);
      setLoading(false); // Set loading state to false when results are received
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false); // Set loading state to false on error
    }
  };

  return (
    <div>
      <h2>Property Search</h2>
      
      <div className="search-form">
        <div>
          <input
            type="text"
            name="name"
            placeholder="Property Name"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <input
            type="number"
            name="bedrooms"
            placeholder="Bedrooms"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <input
            type="number"
            name="bathrooms"
            placeholder="Bathrooms"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <input
            type="number"
            name="storeys"
            placeholder="Storeys"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <input
            type="number"
            name="garages"
            placeholder="Garages"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <input
            type="number"
            name="min_price"
            placeholder="Min Price"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <input
            type="number"
            name="max_price"
            placeholder="Max Price"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>
      {loading ? (
          <p>Loading...</p> // Display loading indicator when loading is true
        ) : (
        <div className="search-results">
          <h3>Search Results</h3>
          {searchResults.length === 0 ? (
            <div>No Results Found.</div>
          ) : (          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Bedrooms</th>
                <th>Bathrooms</th>
                <th>Storeys</th>
                <th>Garages</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((property: any) => (
                <tr key={property.id}>
                  <td>{property.name}</td>
                  <td>{property.bedrooms}</td>
                  <td>{property.bathrooms}</td>
                  <td>{property.storeys}</td>
                  <td>{property.garages}</td>
                  <td>${property.price}</td>
                </tr>
              ))}
            </tbody>
          </table>)}

        </div>)
      }
    </div>
  );
};

export default PropertySearch;
