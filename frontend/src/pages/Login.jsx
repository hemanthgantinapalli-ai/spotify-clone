import React, { useState, useContext } from 'react';
import axios from 'axios';
import { PlayerContext } from '../context/PlayerContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { setUser } = useContext(PlayerContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });
      // Store token and user info
      const userData = { name: data.username, role: data.role };
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      navigate('/'); // redirect to home after login
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-spotifyDarkGray via-spotifyLightBlack to-spotifyDarkGray">
      <form
        onSubmit={handleSubmit}
        className="bg-spotifyLightBlack/80 backdrop-blur-lg p-8 rounded-xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Login to Spotify</h2>
        {error && (
          <p className="text-red-400 text-center mb-4" role="alert">
            {error}
          </p>
        )}
        <div className="mb-4">
          <label className="block text-spotifyGray mb-1" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 bg-spotifyDarkGray rounded focus:outline-none focus:ring-2 focus:ring-spotifyGreen transition"
          />
        </div>
        <div className="mb-6">
          <label className="block text-spotifyGray mb-1" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 bg-spotifyDarkGray rounded focus:outline-none focus:ring-2 focus:ring-spotifyGreen transition"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-spotifyGreen text-black font-bold py-2 rounded hover:scale-105 transition"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Login;
