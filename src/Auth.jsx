import { useState, useEffect } from 'react';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [message, setMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Check if token exists in local storage
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []); // Run this effect only once on component mount

  const login = async (username, password) => {
    try {
      const response = await fetch('http://localhost:3002/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Set token to local storage
        localStorage.setItem('token', data.token);
        setIsAuthenticated(true);
        // Show success message
        setMessage('Login successful!');
      } else {
        // Handle login failure
        setMessage('Login failed');
      }
      // Show the pop-up
      setShowPopup(true);
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const logout = () => {
    // Remove token from local storage
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return { isAuthenticated, login, logout, message, showPopup, setShowPopup };
};

export default useAuth;
