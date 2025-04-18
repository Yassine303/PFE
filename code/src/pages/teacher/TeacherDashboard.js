import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Layout from './Layout';

const Navbar = () => {
  const [isNavToggled, setIsNavToggled] = useState(false);
  const [isFooterExpanded, setIsFooterExpanded] = useState(false);
  const [teacherId, setteacherId] = useState(null);

  useEffect(() => {
    // Retrieve the user object from localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.ID) {
      setteacherId(storedUser.ID);
    }
  }, []);

  return (
    <Layout>
      <div className="students-container">
        <div className="page-header">
          <h1>Teacher Dashboard</h1>
          {teacherId ? (
            <p>teacher ID: {teacherId}</p>
          ) : (
            <p>No teacher ID found. Please log in.</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Navbar;
