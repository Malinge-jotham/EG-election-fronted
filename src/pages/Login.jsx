import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../Auth';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();
  const { login, message, showPopup, setShowPopup } = useAuth(); // Use the login function from useAuth hook

  // Handle login
  const handleLogin = async () => {
    try {
      await login(username, password);
      // Display success notification
      setNotification(message);
      // Reset username and password fields
      setUsername('');
      setPassword('');
      // Redirect to the home page
      navigate('/');
    } catch (error) {
      // Display error notification
      setNotification(message);
    }
    // Show the notification pop-up
    setShowPopup(true);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Login</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Username:</label>
          <input
            type="text"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Password:</label>
          <input
            type="password"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="button"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          onClick={handleLogin}
        >
          Login
        </button>
      </form>
      {/* Notification pop-up */}
      {showPopup && (
        <div className="absolute inset-x-0 bottom-0 mb-4 flex justify-center">
          <div className="bg-white border border-gray-300 p-4 rounded-md shadow-md">
            <p className="text-gray-700">{notification}</p>
            <button
              className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      <div className="mt-4">
        Don't have an account? <Link to="/Register">Register</Link>
      </div>
    </div>
  );
};

export default Login;
