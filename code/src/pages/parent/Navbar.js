import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const [isNavToggled, setIsNavToggled] = useState(false);
  const [isProfileExpanded, setIsProfileExpanded] = useState(false);
  const [activeRoute, setActiveRoute] = useState('');

  // Mise à jour de la route active lorsque l'emplacement change
  useEffect(() => {
    setActiveRoute(location.pathname);
    // Fermer le menu mobile lors de la navigation
    setIsNavToggled(false);
  }, [location.pathname]);

  // Données des liens de navigation
  const mainNavLinks = [
  
    { to: "/children", icon: "fas fa-images", text: "Enfants" },
    { to: "/children-report", icon: "fas fa-user-tie", text: "Suggestions" },
    { to: "/give-feedback", icon: "fas fa-heart", text: "Commentaires" }
  ];

  return (
    <div className={`sidebar-navbar ${isNavToggled ? 'expanded' : 'collapsed'}`}>
      {/* En-tête */}
      <div className="sidebar-header">
        <Link to="/dashboard" className="sidebar-brand">
          <span className="brand-icon">🛡️</span>
          <span className="brand-text">AntiHarass</span>
        </Link>
        
        <button 
          className="sidebar-toggle" 
          onClick={() => setIsNavToggled(!isNavToggled)}
          aria-label="Basculer la navigation"
        >
          <div className={`hamburger ${isNavToggled ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>

      {/* Navigation Principale */}
      <div className="sidebar-nav">
        <div className="nav-section primary">
          {mainNavLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`nav-item ${activeRoute === link.to ? 'active' : ''}`}
            >
              <i className={link.icon}></i>
              <span className="nav-text">{link.text}</span>
              {activeRoute === link.to && <span className="active-marker"></span>}
            </Link>
          ))}
        </div>
        
        <div className="nav-section secondary">
          <Link
            to="/logout"
            className={`nav-item logout ${activeRoute === '/logout' ? 'active' : ''}`}
          >
            <i className="fas fa-sign-out-alt"></i>
            <span className="nav-text">Déconnexion</span>
          </Link>
        </div>
      </div>

      
    </div>
  );
};

export default Navbar;