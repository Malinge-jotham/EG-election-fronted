// CandidateApplicationForm.js

import React, { useState } from 'react';
import axios from 'axios';

const CandidateApplicationForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [post, setPost] = useState('');
  const [state, setState] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const formData = new FormData();
      formData.append('firstName', firstName);
      formData.append('lastName', lastName);
      formData.append('post', post);
      formData.append('state', state);
      formData.append('image', image);

      const response = await axios.post('http://localhost:3002/candidates', formData);
      setSuccess(response.data);
    } catch (err) {
      setError(err.response.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Candidate Application Form</h2>
      {error && <div>Error: {error}</div>}
      {success && <div>Success: {success}</div>}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        <input type="text" placeholder="Post" value={post} onChange={(e) => setPost(e.target.value)} />
        <input type="text" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} />
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <button type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit'}</button>
      </form>
    </div>
  );
};

export default CandidateApplicationForm;
