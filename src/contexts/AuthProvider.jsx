import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    // Decode token and extract user role
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = decodeToken(token);
      setUserRole(decodedToken.role);
    }
  }, []);

  // Function to handle logout
  const logout = () => {
    // Clear user role from state
    setUserRole('');
    // Optionally, clear token from local storage
    localStorage.removeItem('token');
  };

  // Function to decode JWT token
  const decodeToken = (token) => {
    const payload = token.split('.')[1];
    const decodedPayload = decodeURIComponent(
      atob(payload)
        .split('')
        .map((char) => '%' + ('00' + char.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(decodedPayload);
  };

  return (
    <AuthContext.Provider value={{ userRole, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
