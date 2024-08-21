"use client"; // Mark the component as a Client Component

import React, { useState } from 'react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    // Creating the JSON object to be sent in the request
    const loginData = {
      email: email,
      password: password
    };

    try {
      // Sending the JSON data to the backend
      const response = await fetch('http://127.0.0.1:8080/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData), // Convert the JSON object to a string
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      console.log('Login successful, received token:', data.token);

      // Store the token in local storage or use it as needed
      localStorage.setItem('token', data.token);

      // Redirect to another page after successful login
      window.location.href = '/';
    } catch (error) {
      setError('Failed to log in. Please check your credentials and try again.');
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="w-full max-w-md p-10 space-y-8 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-3xl font-extrabold text-center text-white">Welcome back!</h2>
        <p className="text-center text-gray-400">We are so excited to see you again!</p>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form className="space-y-6 mt-6" onSubmit={handleLogin}>
          <div className="space-y-5">
            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-gray-300 mb-1">
                EMAIL OR PHONE NUMBER <span className="text-red-500">*</span>
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none block w-full px-3 py-2 border border-transparent text-gray-900 placeholder-gray-500 rounded-md bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Email or Phone Number"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                PASSWORD <span className="text-red-500">*</span>
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none block w-full px-3 py-2 border border-transparent text-gray-900 placeholder-gray-500 rounded-md bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="text-sm">
              <a href="#" className="font-medium text-indigo-500 hover:text-indigo-400">
                Forgot your password?
              </a>
            </div>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Log In
            </button>
          </div>
        </form>

        <div className="text-center text-sm text-gray-400 mt-6">
          Need an account?{' '}
          <a href="/register" className="font-medium text-indigo-500 hover:text-indigo-400">
            Register
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;