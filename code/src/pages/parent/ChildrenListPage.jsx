import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import './all.css';

const ChildrenListPage = () => {
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedChild, setSelectedChild] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const parent = JSON.parse(localStorage.getItem('user'));
  const parentId = parent ? parent.ID : null;

  useEffect(() => {
    if (!parentId) {
      setError("Parent non connecté.");
      setLoading(false);
      return;
    }

    fetch(`http://localhost:5000/api/children/${parentId}`)
      .then(res => {
        if (!res.ok) throw new Error("Erreur lors de la récupération des enfants");
        return res.json();
      })
      .then(data => {
        setChildren(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [parentId]);

  const viewChildDetails = (child) => {
    setSelectedChild(child);
    setShowDetailModal(true);
  };

  const renderGrade = (grade) => {
    const gradeColors = {
      'K': '#8b5cf6', '1': '#3b82f6', '2': '#10b981', '3': '#f59e0b',
      '4': '#ef4444', '5': '#6366f1', '6': '#ec4899', '7': '#f97316',
      '8': '#14b8a6', '9': '#8b5cf6', '10': '#3b82f6', '11': '#10b981', '12': '#ef4444',
    };

    const color = gradeColors[grade] || '#6c757d';

    return (
      <span className="grade-badge" style={{ backgroundColor: color }}>
        {isNaN(grade) ? grade : `Niveau ${grade}`}
      </span>
    );
  };

  const renderGender = (gender) => {
    const color = gender.toLowerCase() === 'male' ? '#3b82f6' :
                 gender.toLowerCase() === 'female' ? '#ec4899' : '#6c757d';

    return (
      <span className="gender-badge" style={{ backgroundColor: color }}>
        {gender.toLowerCase() === 'male' ? 'Garçon' : gender.toLowerCase() === 'female' ? 'Fille' : gender}
      </span>
    );
  };

  if (loading) {
    return (
      <Layout>
        <div className="page-container">
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Chargement des données des enfants...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="page-container">
          <div className="error-container">
            <div className="error-icon">
              <i className="fas fa-exclamation-triangle"></i>
            </div>
            <h3>Erreur</h3>
            <p>{error}</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page-container">
        <div className="page-header">
          <div className="header-content">
            <h1>
              <i className="fas fa-child"></i>
              <span>Vos enfants</span>
            </h1>
            <p className="header-description">
              Consultez et gérez les informations concernant vos enfants
            </p>
          </div>
        </div>

        <div className="data-card">
          {children.length === 0 ? (
            <div className="empty-state">
              <i className="fas fa-child"></i>
              <p>Aucun enfant trouvé. Veuillez contacter l'administration scolaire si cela est une erreur.</p>
            </div>
          ) : (
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nom</th>
                    <th>Âge</th>
                    <th>Niveau</th>
                    <th>Sexe</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {children.map(child => (
                    <tr key={child.ID}>
                      <td>{child.ID}</td>
                      <td>
                        <div className="user-info">
                          <div className="user-avatar child-avatar">
                            {child.Name ? child.Name.charAt(0).toUpperCase() : 'E'}
                          </div>
                          <span>{child.Name || 'Enfant ' + child.ID}</span>
                        </div>
                      </td>
                      <td>{child.Age}</td>
                      <td>{renderGrade(child.Grade)}</td>
                      <td>{renderGender(child.Gender)}</td>
                      <td>
                        <div className="action-buttons">
                          <button
                            className="icon-button view"
                            onClick={() => viewChildDetails(child)}
                            title="Voir les détails"
                          >
                            <i className="fas fa-eye"></i>
                          </button>
                          <button
                            className="icon-button reports"
                            title="Voir les rapports"
                          >
                            <i className="fas fa-chart-bar"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {showDetailModal && selectedChild && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>
                <i className="fas fa-child"></i>
                <span>Détails de l'enfant</span>
              </h2>
              <button className="close-button" onClick={() => setShowDetailModal(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="modal-content">
              <div className="child-detail-header">
                <div className="child-avatar large">
                  {selectedChild.Name ? selectedChild.Name.charAt(0).toUpperCase() : 'E'}
                </div>
                <h3>{selectedChild.Name || 'Enfant ' + selectedChild.ID}</h3>
              </div>

              <div className="detail-grid">
                <div className="detail-item">
                  <div className="detail-label">
                    <i className="fas fa-id-card"></i>
                    <span>ID</span>
                  </div>
                  <div className="detail-value">{selectedChild.ID}</div>
                </div>

                <div className="detail-item">
                  <div className="detail-label">
                    <i className="fas fa-birthday-cake"></i>
                    <span>Âge</span>
                  </div>
                  <div className="detail-value">{selectedChild.Age} ans</div>
                </div>

                <div className="detail-item">
                  <div className="detail-label">
                    <i className="fas fa-graduation-cap"></i>
                    <span>Niveau</span>
                  </div>
                  <div className="detail-value">
                    {renderGrade(selectedChild.Grade)}
                  </div>
                </div>

                <div className="detail-item">
                  <div className="detail-label">
                    <i className="fas fa-venus-mars"></i>
                    <span>Sexe</span>
                  </div>
                  <div className="detail-value">
                    {renderGender(selectedChild.Gender)}
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="button secondary"
                  onClick={() => setShowDetailModal(false)}
                >
                  <i className="fas fa-times"></i>
                  <span>Fermer</span>
                </button>

                <button
                  type="button"
                  className="button primary"
                >
                  <i className="fas fa-chart-line"></i>
                  <span>Voir les rapports</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ChildrenListPage;
