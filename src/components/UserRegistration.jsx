import React, { useState } from 'react';
import axios from 'axios';
import Loader from './Loader'; // Import the Loader component
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const UserRegistration = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('user'); // State for user role selection
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');
        if (password !== confirmPassword) {
            setError("Passwords don't match");
            setLoading(false);
            return;
        }
        try {
            const response = await axios.post('http://localhost:3002/register', { username, password, role }); // Include role in the request body
            setSuccess(response.data);
            setUsername('');
            setPassword('');
            setConfirmPassword('');
            onLogin();
        } catch (error) {
            setError(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`w-full max-w-md mx-auto p-4 bg-white shadow-md rounded-lg ${loading && 'relative'}`}>
            {loading && (
                <div className="absolute inset-0 bg-gray-400 bg-opacity-50 flex justify-center items-center z-50">
                    <Loader />
                </div>
            )}
            <h2 className="text-center text-2xl font-bold mb-4 text-blue-500">User Registration</h2>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            {success && <div className="text-green-500 mb-4">{success}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <input type="text" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="mb-4">
                    <input type="password" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="mb-4">
                    <input type="password" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <div className="mb-4">
                    <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500">
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                        <option value="candidate">Candidate</option>
                    </select>
                </div>
                <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2 transition duration-300 ease-in-out">
                    {loading ? <Loader /> : 'Register'}
                </button>
            </form>
            <p className="text-center mt-4">
                Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login here</Link>
            </p>
        </div>
    );
};

export default UserRegistration;
