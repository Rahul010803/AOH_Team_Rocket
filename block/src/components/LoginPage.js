// LoginPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });
      const token = response.data.token;
      // Store token in local storage or state for authentication
      console.log('User logged in successfully');
    } catch (error) {
      console.error('Login error:', error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br></br>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br></br>
        <button type="submit">Login</button>
        <br></br>
        <Link to="/register">Don't have an account? Register here</Link> 
    
      </form>
    </div>
  );
}

export default LoginPage;
