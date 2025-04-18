import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const [isNavToggled, setIsNavToggled] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState({});
  const [activeRoute, setActiveRoute] = useState('');

  // Update active route when location changes
  useEffect(() => {
    setActiveRoute(location.pathname);
    // Close mobile menu when navigating
    setIsNavToggled(false);
  }, [location.pathname]);

  // Toggle submenu expanded state
  const toggleSubMenu = (menuKey) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuKey]: !prev[menuKey]
    }));
  };

  // Main navigation links data
  const mainNavLinks = [
    { to: "/admin-dashboard", icon: "fa-tachometer-alt", text: "Tableau de bord" },
    { to: "/analytics", icon: "fa-chart-line", text: "Analyses" },
    { 
      to: "/students", 
      icon: "fa-user-graduate", 
      text: "Étudiants"
 
    },
    { 
      to: "/teachers", 
      icon: "fa-chalkboard-teacher", 
      text: "Enseignants"
    },
    { to: "/parents", icon: "fa-users", text: "Parents" },
    
  
    { to: "/feedback", icon: "fa-comment-dots", text: "Commentaires" }
  ];

  return (
    <div className={`sidebar-navbar ${isNavToggled ? 'expanded' : 'collapsed'}`}>
      {/* Header */}
      <div className="sidebar-header">
        <Link to="/dashboard" className="sidebar-brand">
          <span className="brand-icon">🛡️</span>
          <span className="brand-text">AntiHarass</span>
        </Link>
        
        <button 
          className="sidebar-toggle" 
          onClick={() => setIsNavToggled(!isNavToggled)}
          aria-label="Toggle navigation"
        >
          <div className={`hamburger ${isNavToggled ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>

      {/* Main Navigation */}
      <div className="sidebar-nav">
        <div className="nav-section primary">
          {mainNavLinks.map(link => (
            <div key={link.to} className="nav-item-container">
              <Link
                to={link.to}
                className={`nav-item ${activeRoute === link.to ? 'active' : ''}`}
              >
                <i className={`fas ${link.icon}`}></i>
                <span className="nav-text">{link.text}</span>
                {link.hasSubmenu && (
                  <i 
                    className={`fas fa-chevron-${expandedMenus[link.to] ? 'up' : 'down'} submenu-icon`}
                    onClick={(e) => {
                      e.preventDefault();
                      toggleSubMenu(link.to);
                    }}
                  ></i>
                )}
              </Link>
              
              {link.hasSubmenu && expandedMenus[link.to] && (
                <div className="submenu">
                  <Link to={`${link.to}/list`} className="submenu-item">Liste</Link>
                  <Link to={`${link.to}/add`} className="submenu-item">Ajouter</Link>
                  <Link to={`${link.to}/manage`} className="submenu-item">Gérer</Link>
                </div>
              )}
            </div>
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