import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className='login-container'>
      <h1>Log in</h1>

      <form>
        <div >

          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" />
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
