import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Voting = () => {
  const [posts, setPosts] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedPost, setSelectedPost] = useState('');
  const [selectedCandidates, setSelectedCandidates] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsResponse = await axios.get('http://localhost:3002/posts');
        setPosts(postsResponse.data);

        const candidatesResponse = await axios.get('http://localhost:3002/candidates');
        setCandidates(candidatesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error.response.data);
      }
    };

    fetchData();
  }, []);

  const handlePostChange = (e) => {
    setSelectedPost(e.target.value);
    setSelectedCandidates([]); // Reset selected candidates when post changes
  };

  const handleCandidateSelect = (candidateId) => {
    const updatedCandidates = [...selectedCandidates];
    const index = updatedCandidates.indexOf(candidateId);
    if (index === -1) {
      updatedCandidates.push(candidateId);
    } else {
      updatedCandidates.splice(index, 1);
    }
    setSelectedCandidates(updatedCandidates);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const promises = selectedCandidates.map(candidateId => {
        return axios.post('http://localhost:3002/vote', {
          candidate_id: candidateId,
          post: selectedPost
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
      });

      await Promise.all(promises);
      setSuccess('Votes submitted successfully!');
    } catch (err) {
      setError(err.response.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Vote Form</h2>
      {error && <div className="bg-red-100 text-red-700 p-3 mb-4">{error}</div>}
      {success && <div className="bg-green-100 text-green-700 p-3 mb-4">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="post" className="text-lg font-semibold">Select Post:</label>
          <select
            id="post"
            value={selectedPost}
            onChange={handlePostChange}
            className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
          >
            <option value="">Select a post</option>
            {posts.map(post => (
              <option key={post} value={post}>{post}</option>
            ))}
          </select>
        </div>
        {selectedPost && (
          <div className="mb-6">
            <label className="text-lg font-semibold">Select Candidate(s):</label>
            <div className="grid gap-2">
              {candidates
                .filter(candidate => candidate.post === selectedPost)
                .map(candidate => (
                  <div key={candidate.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={candidate.id}
                      checked={selectedCandidates.includes(candidate.id)}
                      onChange={() => handleCandidateSelect(candidate.id)}
                      className="form-checkbox h-5 w-5 text-blue-500"
                    />
                    <label htmlFor={candidate.id} className="ml-2">{candidate.name}</label>
                  </div>
                ))}
            </div>
          </div>
        )}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md transition duration-300 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400"
            disabled={loading || !selectedPost || selectedCandidates.length === 0}
          >
            {loading ? 'Submitting...' : 'Submit Votes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Voting;
