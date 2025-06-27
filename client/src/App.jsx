import React, { useState } from 'react';
import AuthForm from './components/AuthForm';

export default function App() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex min-h-screen  py-8 md:py-12">
      {/* Left image side */}
      <div className="hidden md:flex w-1/2 relative bg-gradient-to-br from-blue-600 to-indigo-700">
        <img
          src="https://source.unsplash.com/1200x900/?technology,abstract"
          alt="Authentication"
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />
        <div className="relative z-10 flex flex-col justify-center items-center w-full h-full p-10 text-white bg-black bg-opacity-30">
          <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
          <p className="max-w-xs text-center text-lg font-light">
            Securely access your account and manage your dashboard with ease.
          </p>
        </div>
      </div>

      {/* Right form side */}
      <div className="flex flex-col justify-center w-full md:w-1/2 bg-white px-10 py-16">
        <div className="max-w-md mx-auto w-full">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
            {isLogin ? 'Login to your account' : 'Create your account'}
          </h1>

          <AuthForm isLogin={isLogin} />

          <div className="mt-6 text-center text-gray-600">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="font-semibold text-blue-600 hover:underline"
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : 'Already have an account? Login'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
