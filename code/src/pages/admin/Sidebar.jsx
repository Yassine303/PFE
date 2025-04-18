import React from 'react';
import { Link, useLocation } from 'wouter';
import './Sidebar.css';

const Sidebar = () => {
  const [location] = useLocation();

  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <h2>Tableau de Bord</h2>
      </div>
      <ul className="sidebar-menu">
        <li className={location === "/demographiques" ? "active" : ""}>
          <Link href="/demographiques">
            <i className="fas fa-users"></i>
            <span>Données Démographiques</span>
          </Link>
        </li>
        <li className={location === "/medias-sociaux" ? "active" : ""}>
          <Link href="/medias-sociaux">
            <i className="fas fa-hashtag"></i>
            <span>Médias Sociaux</span>
          </Link>
        </li>
        <li className={location === "/plateformes" ? "active" : ""}>
          <Link href="/plateformes">
            <i className="fas fa-mobile-alt"></i>
            <span>Comportement Plateformes</span>
          </Link>
        </li>
        <li className={location === "/parents" ? "active" : ""}>
          <Link href="/parents">
            <i className="fas fa-home"></i>
            <span>Engagement Parental</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;