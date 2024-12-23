import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!emailPattern.test(email)) {
      setEmailError('Please enter a valid email address.');
      return; 
    }

    setEmailError(''); 

    try {
      let payload = { email, password };
      const response = await axios.post('http://localhost:3000/admin/login', payload);
      if (response.data.success) {
        localStorage.setItem('token', response.data.response.token);
        navigate('/dashboard');
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.log("reeeeeeeee",error.response.data.message)
      alert(error.response.data.message);
    }
  };

  return (
    <div className="login-component">
      <div className="login-container">
        <h2>Login</h2>
        <h4>Welcome to the portal!</h4>
        <form className="loginForm" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="loginButton" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
