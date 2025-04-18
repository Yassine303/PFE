import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Layout from './Layout';

const Navbar = () => {
  const [isNavToggled, setIsNavToggled] = useState(false);
  const [isFooterExpanded, setIsFooterExpanded] = useState(false);
  const [parentId, setParentId] = useState(null);

  useEffect(() => {
    // Retrieve the user object from localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.ID) {
      setParentId(storedUser.ID);
    }
  }, []);

  return (
    <Layout>
      <div className="students-container">
        <div className="page-header">
          <h1>Parent Dashboard</h1>
          {parentId ? (
            <p>Parent ID: {parentId}</p>
          ) : (
            <p>No parent ID found. Please log in.</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Navbar;
