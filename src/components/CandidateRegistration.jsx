import React, { useState } from 'react';
import axios from 'axios';
import Loader from '../components/Loader'; // Import Loader component

const CandidateRegistration = () => {
    const [name, setName] = useState('');
    const [post, setPost] = useState('');
    const [school, setSchool] = useState('');
    const [image, setImage] = useState(null); // State to store the selected image file
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false); // State to track loading state

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading state to true when form is submitted
        try {
            const formData = new FormData(); // Create FormData object
            formData.append('name', name);
            formData.append('post', post);
            formData.append('school', school);
            formData.append('image', image); // Append the selected image file to the FormData object

            const response = await axios.post('http://localhost:3002/candidates', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data' // Set content type to multipart/form-data for file upload
                }
            });
            setMessage(response.data);
        } catch (error) {
            console.error('Error registering candidate:', error.response.data);
            setMessage('Error registering candidate');
        }
        setLoading(false); // Set loading state to false after form submission
    };

    // Function to handle image file selection
    const handleImageChange = (e) => {
        setImage(e.target.files[0]); // Set the selected image file
    };

    return (
        <div className="container mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-4">Candidate Registration</h2>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="mb-4">
                    <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>
                <div className="mb-4">
                    <input type="text" placeholder="Post" value={post} onChange={(e) => setPost(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>
                <div className="mb-4">
                    <input type="text" placeholder="School" value={school} onChange={(e) => setSchool(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>
                {/* Input field for image upload */}
                <div className="mb-4">
                    <input type="file" accept="image/*" onChange={handleImageChange} className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>
                {/* Conditionally render the loader and blur background while loading */}
                {loading && (
                    <div className="fixed top-0 left-0 w-full h-full bg-gray-400 bg-opacity-50 flex justify-center items-center z-50">
                        <Loader />
                    </div>
                )}
                {/* Conditionally render the button or the loader based on the loading state */}
                <button type="submit" className={`bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 ${loading && 'pointer-events-none'}`}>Register</button>
            </form>
            {message && <p className="text-red-500 mt-2">{message}</p>}
        </div>
    );
};

export default CandidateRegistration;
