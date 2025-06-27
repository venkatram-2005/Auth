import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/');

    axios.get(`${import.meta.env.VITE_API_URL}/auth/protected`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => setMessage(res.data.msg))
    .catch(() => {
      localStorage.removeItem('token');
      navigate('/');
    });
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-md text-center border border-gray-200 space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">{message}</h2>
      <button
        onClick={logout}
        className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md font-medium transition duration-150"
      >
        Logout
      </button>
    </div>
  );
}
