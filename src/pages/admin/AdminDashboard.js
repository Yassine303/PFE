import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import './admin.css';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Layout>
      <div className="page-container">
        <div className="page-header">
          <div className="header-content">
            <h1>
              <i className="fas fa-tachometer-alt"></i>
              <span>Admin Dashboard</span>
            </h1>
          </div>
        </div>
        
        <div className="data-navigation">
         
          <div className="button-container">

          <button 
              className="data-button demographics"
              onClick={() => handleNavigation('/Demographics')}
            >
              <i className="fas fa-user-graduate"></i>
              Données Démographiques
            </button>

            <button 
              className="data-button parent"
              onClick={() => handleNavigation('/ParentEngagementDashboard')}
            >
              <i className="fas fa-users"></i>
              Engagement Parental
            </button>

            <button 
              className="data-button platform"
              onClick={() => handleNavigation('/PlatformBehaviorDashboard')}
            >
              <i className="fas fa-mobile-alt"></i>
              Comportement Plateformes
            </button>

            <button 
              className="data-button social-media"
              onClick={() => handleNavigation('/SocialMediaChangesDashboard')}
            >
              <i className="fas fa-share-alt"></i>
              Médias Sociaux
            </button>
            
            
            
            
            
            
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;