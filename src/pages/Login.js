import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  // Username, password ve hata mesajı için state'ler
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();  // Formun yenilenmesini engeller

    try {
      // Backend'e login isteği gönderiyoruz
      const response = await axios.post('http://localhost:3001/login', {
        username,
        password
      });

      // Başarılı giriş durumunda mesajı temizliyoruz ve başarılı mesajı gösteriyoruz
      setErrorMessage('');
      alert('Login successful');  // İsteğe bağlı: token ile işlem yapılabilir
    } catch (error) {
      // Backend'den gelen hataları yakalayıp errorMessage state'ine yazıyoruz
      if (error.response && error.response.status === 404) {
        setErrorMessage('User not found. Please register.');
      } else if (error.response && error.response.status === 401) {
        setErrorMessage('Invalid password. Please try again.');
      } else {
        setErrorMessage('An unexpected error occurred.');
      }
    }
  };

  return (
    <div className='login-container'>
      <h1>Log in</h1>

      {/* Hata mesajını göstermek için */}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Log in</button>
      </form>

      <p style={{ marginTop: '20px' }}>
        Don't have an account? <Link to="/register">Create an Account</Link>
      </p>
    </div>
  );
}

export default Login;
