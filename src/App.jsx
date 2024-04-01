import { Buffer } from 'buffer';

// Your application code here

import { Outlet } from "react-router-dom";
import React from 'react'
import "./App.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider } from './contexts/AuthProvider';



function App() {
  return (
    <AuthProvider>

    <React.Fragment>
      <div>
        <Navbar />
      </div>
      <Outlet />
    <Footer />
    </React.Fragment>
    </AuthProvider>
  );
}

export default App;
