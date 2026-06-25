import React, { useState, useContext } from 'react';
import axios from 'axios';
import { PlayerContext } from '../context/PlayerContext';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const { setUser } = useContext(PlayerContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/register', {
        username,
        email,
        password,
      });
      // successful registration – navigate to login
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-spotifyDarkGray via-spotifyLightBlack to-spotifyDarkGray">
      <form onSubmit={handleSubmit} className="bg-spotifyLightBlack bg-opacity-80 backdrop-blur-lg p-8 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Create Spotify Account</h2>
        {error && (
          <p className="text-red-400 text-center mb-4" role="alert">{error}</p>
        )}
        <div className="mb-4">
          <label className="block text-spotifyGray mb-1" htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-4 py-2 bg-spotifyDarkGray rounded focus:outline-none focus:ring-2 focus:ring-spotifyGreen transition"
          />
        </div>
        <div className="mb-4">
          <label className="block text-spotifyGray mb-1" htmlFor="email">Email</label>
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
          <label className="block text-spotifyGray mb-1" htmlFor="password">Password</label>
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
          Sign Up
        </button>
        <p className="mt-4 text-center text-spotifyGray">
          Already have an account?{' '}
          <Link to="/login" className="text-spotifyGreen font-semibold hover:underline">Log In</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
