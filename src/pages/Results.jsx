// Results.js
import { Navigate } from 'react-router-dom';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import authMiddleware from '../authMiddleware';

const Results = () => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/results');
        setResults(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching results:', error.response.data);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Check if the user is authenticated
  const isAuthenticated = authMiddleware.isAuthenticated();

  if (!isAuthenticated) {
    // Redirect to the login page if the user is not authenticated
    return (
      <Navigate to="login" />

    )
     // Return null to prevent rendering the component
  }

  // Retrieve the user's role
  const userRole = authMiddleware.getUserRole();

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Election Results</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {results.map((result, index) => (
            <div key={index} className="border border-gray-300 rounded p-4">
              {/* Display the candidate's image */}
              <img src={`http://localhost:3002/${result.image}`} alt={result.name} className="w-24 h-24 object-cover rounded-full" />

              {/* Display candidate details */}
              <h3 className="text-lg font-semibold mb-2">{result.post}</h3>
              <p>{result.name}: {result.votes_count} votes</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Results;
