import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminApprovalPage = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCandidates = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:3002/candidates');
        setCandidates(response.data);
      } catch (err) {
        setError(err.response.data);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  const handleApprove = async (id) => {
    setLoading(true);
    try {
      await axios.put(`http://localhost:3002/candidates/${id}/approve`);
      // Update candidates state to remove the approved candidate
      setCandidates(candidates.filter(candidate => candidate.id !== id));
    } catch (err) {
      setError(err.response.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Approval Page</h2>
      {error && <div className="text-red-500 mb-4">Error: {error}</div>}
      {loading && <div className="text-gray-500 mb-4">Loading...</div>}
      {candidates.map(candidate => (
        <div key={candidate.id} className="border rounded-md p-4 mb-4">
          <p className="text-lg font-semibold mb-2">Name: {candidate.firstName} {candidate.lastName}</p>
          <p className="text-gray-600">Post: {candidate.post}</p>
          <p className="text-gray-600">State: {candidate.state}</p>
          <p className="text-gray-600">Status: {candidate.status}</p>
          <div className="flex mt-2">
            <button
              onClick={() => handleApprove(candidate.id)}
              className="bg-green-500 text-white py-2 px-4 rounded-md mr-2"
            >
              Approve
            </button>
            <button className="bg-red-500 text-white py-2 px-4 rounded-md">Decline</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminApprovalPage;
