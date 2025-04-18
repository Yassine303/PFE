import React from 'react';
import Navbar from './Navbar';
import './Layout.css'; // Assuming you have some CSS for layout
const Layout = ({ children }) => {
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default Layout;