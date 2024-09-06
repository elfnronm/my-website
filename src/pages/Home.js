import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (origin && destination) {
      // Adresleri Map sayfasına yönlendir ve URL parametreleri olarak gönder
      navigate(`/map?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`);
    } else {
      alert('Please enter both the origin and destination');
    }
  };

  return (
    <div className="home-container">
      <h1>Find Your Route</h1>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          placeholder="Enter your current location"
          className="search-input"
        />
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Enter your destination"
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>
    </div>
  );
}

export default Home;
