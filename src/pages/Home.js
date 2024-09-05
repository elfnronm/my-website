import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Home() {
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (address) {
      // Adresi Map sayfasına yönlendir ve URL parametresi olarak gönder
      navigate(`/map?address=${encodeURIComponent(address)}`);
    } else {
      alert('Please enter an address');
    }
  };

  return (
    <div className="home-container">
      <h1>Find Your Route</h1>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Where do you want to go?"
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>
    </div>
  );
}

export default Home;
