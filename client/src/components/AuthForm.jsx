import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function AuthForm({ isLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    if (!email || !password) {
      toast.error('All fields are required');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.warning('Please enter a valid email');
      return false;
    }
    if (password.length < 6) {
      toast.warning('Password must be at least 6 characters');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const endpoint = isLogin ? 'login' : 'signup';

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/${endpoint}`, {
        email,
        password
      });

      if (isLogin) {
        localStorage.setItem('token', response.data.token);
        toast.success('Login successful');
        navigate('/dashboard');
      } else {
        toast.success('Signup successful! Please login.');
        setEmail('');
        setPassword('');
      }
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Something went wrong');
    }
  };

  return (
    <form className="space-y-5 text-left" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Password</label>
        <input
          type="password"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold transition duration-150"
      >
        {isLogin ? 'Login' : 'Sign Up'}
      </button>
    </form>
  );
}
