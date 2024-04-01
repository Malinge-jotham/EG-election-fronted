import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/egerton.png';
import { AuthContext } from '../contexts/AuthProvider'; // Import AuthContext for user role

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const  [userRole, setUserRole] = useState("") ; // Access userRole from AuthContext
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const updateRole = () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const payload = token.split('.')[1];
          const decodedPayload = atob(payload);
          const { role } = JSON.parse(decodedPayload);
          setUserRole(role);
          setLoggedIn(true);
          console.log('Decoded payload:', decodedPayload);
        } catch (error) {
          console.error('Error decoding payload:', error);
          setUserRole("");
          setLoggedIn(false);
        }
      } else {
        setUserRole("");
        setLoggedIn(false);
      }
    };
  
    // Call the updateRole function immediately
    updateRole();
  
    // If needed, set up a listener to update the user role whenever the token changes
    // You can use events, custom hooks, or context for this purpose
  
    // Cleanup function to remove any unnecessary listeners or subscriptions
    return () => {
      // Cleanup logic here if needed
    };
  }, []);
  
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const closeNavbar = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUserRole(""); // Clear user role when logging out
    setLoggedIn(false);
    navigate('/login');
  };

  return (
    <nav className="bg-blue-800">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="h-20 w-15 mr-2" />
          </div>
          <div className="text-center flex-grow">
            <h1 className="text-lg text-white font-bold">Egerton university</h1>
            <h1 className="text-lg text-orange-400 font-bold">Transforming Lives through Quality Education
</h1>
          </div>
          <div>
            {loggedIn ? (
              <div className="flex items-center">
                <span className="text-white mr-2">Logged in as: {userRole}</span>
                <span className="text-yellow-500 text-2xl font-bold mr-2">{userRole}</span>
                <button onClick={handleLogout} className="text-white bg-red-500 px-2 py-1 rounded-md">Logout</button>
              </div>
            ) : (
              <Link to="/login" className="text-white hover:bg-blue-600 px-2 py-1 rounded-md">Login</Link>
            )}
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 flex justify-center">
          <div className="flex items-center space-x-8">
            <Link to="/" className={`text-white hover:bg-blue-600 ${location.pathname === '/' ? 'active' : ''}`} onClick={closeNavbar}>Home</Link>
            <div className="hidden md:flex space-x-8">
              {userRole === 'admin' && (
                <>
                  <Link to="/register" className={`text-white hover:bg-blue-600 ${location.pathname === '/register' ? 'active' : ''}`} onClick={closeNavbar}>Register</Link>
                  <Link to="/vote" className={`text-white hover:bg-blue-600 ${location.pathname === '/vote' ? 'active' : ''}`} onClick={closeNavbar}>Vote</Link>
                  <Link to="/Cand-Register" className={`text-white hover:bg-blue-600 ${location.pathname === '/Cand-Register' ? 'active' : ''}`} onClick={closeNavbar}>Candidate Application</Link>
                  <Link to="/Reports" className={`text-white hover:bg-blue-600 ${location.pathname === '/Reports' ? 'active' : ''}`} onClick={closeNavbar}>Reports</Link>
                  <Link to="/Tally" className={`text-white hover:bg-blue-600 ${location.pathname === '/Tally' ? 'active' : ''}`} onClick={closeNavbar}>Tally</Link>
                  <Link to="/Approve" className={`text-white hover:bg-blue-600 ${location.pathname === '/Approve' ? 'active' : ''}`} onClick={closeNavbar}>Approve</Link> {/* Link to Approve page */}
                </>
              )}
              {userRole === 'user' && (
                <>
                  <Link to="/vote" className={`text-white hover:bg-blue-600 ${location.pathname === '/vote' ? 'active' : ''}`} onClick={closeNavbar}>Vote</Link>
                  <Link to="/results" className={`text-white hover:bg-blue-600 ${location.pathname === '/results' ? 'active' : ''}`} onClick={closeNavbar}>Results</Link>
                </>
              )}
              {userRole === 'candidate' && (
                <Link to="/candidates" className={`text-white hover:bg-blue-600 ${location.pathname === '/candidates' ? 'active' : ''}`} onClick={closeNavbar}>Candidates</Link>
              )}
            </div>
          </div>
          <div className="flex md:hidden items-center">
            <button onClick={toggleNavbar} className="text-white p-2 focus:outline-none">
              {isOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-blue-500">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className={`text-white block px-3 py-2 rounded-md text-base font-medium ${location.pathname === '/' ? 'active' : ''}`} onClick={closeNavbar}>Home</Link>
            {userRole === 'admin' && (
              <>
                <Link to="/register" className={`text-white block px-3 py-2 rounded-md text-base font-medium ${location.pathname === '/register' ? 'active' : ''}`} onClick={closeNavbar}>Register</Link>
                <Link to="/vote" className={`text-white block px-3 py-2 rounded-md text-base font-medium ${location.pathname === '/vote' ? 'active' : ''}`} onClick={closeNavbar}>Vote</Link>
                <Link to="/Cand-Register" className={`text-white block px-3 py-2 rounded-md text-base font-medium ${location.pathname === '/Cand-Register' ? 'active' : ''}`} onClick={closeNavbar}>Candidate Application</Link>
                <Link to="/Reports" className={`text-white block px-3 py-2 rounded-md text-base font-medium ${location.pathname === '/Reports' ? 'active' : ''}`} onClick={closeNavbar}>Reports</Link>
                <Link to="/Tally" className={`text-white block px-3 py-2 rounded-md text-base font-medium ${location.pathname === '/Tally' ? 'active' : ''}`} onClick={closeNavbar}>Tally</Link>
                <Link to="/Approve" className={`text-white block px-3 py-2 rounded-md text-base font-medium ${location.pathname === '/Approve' ? 'active' : ''}`} onClick={closeNavbar}>Approve</Link> {/* Link to Approve page */}
              </>
            )}
            {userRole === 'user' && (
              <>
                <Link to="/vote" className={`text-white block px-3 py-2 rounded-md text-base font-medium ${location.pathname === '/vote' ? 'active' : ''}`} onClick={closeNavbar}>Vote</Link>
                <Link to="/results" className={`text-white block px-3 py-2 rounded-md text-base font-medium ${location.pathname === '/results' ? 'active' : ''}`} onClick={closeNavbar}>Results</Link>
              </>
            )}
            {userRole === 'candidate' && (
              <Link to="/candidates" className={`text-white block px-3 py-2 rounded-md text-base font-medium ${location.pathname === '/candidates' ? 'active' : ''}`} onClick={closeNavbar}>Candidates</Link>
            )}
            {!loggedIn && (
              <Link to="/login" className={`text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-600 ${location.pathname === '/login' ? 'active' : ''}`} onClick={closeNavbar}>Login</Link>
            )}
            <Link to="/Apply" className={`text-white block px-3 py-2 rounded-md text-base font-medium ${location.pathname === '/Apply' ? 'active' : ''}`} onClick={closeNavbar}>Apply</Link> {/* Link to Apply page */}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
