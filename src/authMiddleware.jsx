// authMiddleware.js

const authMiddleware = {
    isAuthenticated: () => {
      // Check if the user is authenticated
      const token = localStorage.getItem('token');
      return token ? true : false;
    },
    getUserRole: () => {
      // Retrieve the user's role from the JWT token
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decodedToken = jwt.decode(token);
          return decodedToken.role;
        } catch (error) {
          console.error('Error decoding token:', error);
          return null;
        }
      } else {
        return null;
      }
    },
  };
  
  export default authMiddleware;
  