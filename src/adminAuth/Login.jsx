import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/api';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('admin/auth/login', formData);
      localStorage.setItem('adminTokenOrder', response.data.token);
      setMessage('Login successful!');
      setError('');
      navigate('/admin/order'); 
    } catch (err) {
      setMessage('');
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="login-container">
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
      <h2>Admin Login</h2>
      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
