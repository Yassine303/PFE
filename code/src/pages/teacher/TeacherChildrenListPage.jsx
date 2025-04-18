import React, { useState, useEffect } from 'react';
import Layout from './Layout';

const TeacherChildrenListPage = () => {
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Retrieve teacher's data from localStorage
  const teacher = JSON.parse(localStorage.getItem("user"));
  const teacherId = teacher ? teacher.ID : null;
  
  useEffect(() => {
    if (!teacherId) {
      setError("Aucun enseignant connecté.");
      setLoading(false);
      return;
    }
    fetch(`http://localhost:5000/api/teacher/children/${teacherId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Erreur lors de la récupération des enfants");
        return res.json();
      })
      .then((data) => {
        setChildren(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur lors de la récupération des enfants:", err);
        setError("Erreur lors de la récupération des enfants.");
        setLoading(false);
      });
  }, [teacherId]);

  // Functions to render child grade and gender with appropriate styling
  const renderGrade = (grade) => {
    const gradeColors = {
      'K': '#8b5cf6', // Kindergarten - purple
      '1': '#3b82f6', // 1st grade - blue
      '2': '#10b981', // 2nd grade - green
      '3': '#f59e0b', // 3rd grade - amber
      '4': '#ef4444', // 4th grade - red
      '5': '#6366f1', // 5th grade - indigo
      '6': '#ec4899', // 6th grade - pink
      '7': '#f97316', // 7th grade - orange
      '8': '#14b8a6', // 8th grade - teal
      '9': '#8b5cf6', // 9th grade - purple
      '10': '#3b82f6', // 10th grade - blue
      '11': '#10b981', // 11th grade - green
      '12': '#ef4444', // 12th grade - red
    };
    
    const color = gradeColors[grade] || '#6c757d';
    
    return (
      <span className="grade-badge" style={{ backgroundColor: color }}>
        {isNaN(grade) ? grade : `Classe ${grade}`}
      </span>
    );
  };
  
  const renderGender = (gender) => {
    const color = gender.toLowerCase() === 'male' ? '#3b82f6' : 
                 gender.toLowerCase() === 'female' ? '#ec4899' : '#6c757d';
    
    return (
      <span className="gender-badge" style={{ backgroundColor: color }}>
        {gender}
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

  return (
    <Layout>
      <div className="page-container">
        <div className="page-header">
          <div className="header-content">
            <h1>
              <i className="fas fa-chalkboard-teacher"></i>
              <span>Élèves assignés</span>
            </h1>
            <p className="header-description">
              Consultez et gérez les élèves qui vous sont assignés
            </p>
          </div>
          
          <div className="header-actions">
            {/* Ajoutez ici toute action spécifique à l'enseignant si nécessaire */}
          </div>
        </div>

        <div className="data-card">
          {error && (
            <div className="error-container">
              <div className="error-icon">
                <i className="fas fa-exclamation-triangle"></i>
              </div>
              <h3>Erreur</h3>
              <p>{error}</p>
            </div>
          )}
          
          {!error && children.length === 0 ? (
            <div className="empty-state">
              <i className="fas fa-user-graduate"></i>
              <p>Aucun élève ne vous est actuellement assigné. Veuillez contacter votre administrateur scolaire si cela est une erreur.</p>
            </div>
          ) : (
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nom</th>
                    <th>Âge</th>
                    <th>Classe</th>
                    <th>Genre</th>
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
                          <span>{child.Name || 'Élève ' + child.ID}</span>
                        </div>
                      </td>
                      <td>{child.Age}</td>
                      <td>{renderGrade(child.Grade)}</td>
                      <td>{renderGender(child.Gender)}</td>
                      <td>
                        <div className="action-buttons">
                          <button 
                            className="icon-button primary"
                            title="Voir les détails de l'élève"
                          >
                            <i className="fas fa-eye"></i>
                          </button>
                          <button 
                            className="icon-button secondary"
                            title="Ajouter des notes"
                          >
                            <i className="fas fa-sticky-note"></i>
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
    </Layout>
  );
};

export default TeacherChildrenListPage;
