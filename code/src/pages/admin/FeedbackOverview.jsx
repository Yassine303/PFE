import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import './admin.css';

const FeedbackOverview = () => {
  const [feedbackData, setFeedbackData] = useState({
    parentFeedback: [],
    teacherFeedback: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('parent');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = () => {
    setLoading(true);
    fetch('http://localhost:5000/api/feedback/all')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Erreur HTTP ! statut : ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        const parentFeedback = data.parentFeedback || [];
        const teacherFeedback = data.teacherFeedback || [];
        setFeedbackData({ parentFeedback, teacherFeedback });
        setLoading(false);
      })
      .catch((err) => {
        console.error('Erreur lors de la récupération des feedbacks :', err);
        setError(err.message);
        setLoading(false);
      });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(`Recherche : ${searchTerm}`);
  };

  const filteredParentFeedback = feedbackData.parentFeedback.filter(item =>
    item.ai_suggestion.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.parent_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.feedback.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTeacherFeedback = feedbackData.teacherFeedback.filter(item =>
    item.ai_suggestion.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.teacher_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.feedback.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="page-container">
        <div className="page-header">
          <div className="header-content">
            <h1>
              <i className="fas fa-comments"></i>
              <span>Vue d’ensemble des retours</span>
            </h1>
            <p className="header-description">
              Vue combinée des retours des parents et des enseignants sur les suggestions générées par l’IA
            </p>
          </div>

          <div className="header-actions">
            <div className="search-container">
              <form onSubmit={handleSearch}>
                <div className="search-input-group">
                  <i className="fas fa-search search-icon"></i>
                  <input
                    type="text"
                    placeholder="Rechercher un retour..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                  <button type="submit" className="search-button">
                    Rechercher
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="tab-navigation">
          <button
            className={`tab-button ${activeTab === 'parent' ? 'active' : ''}`}
            onClick={() => setActiveTab('parent')}
          >
            <i className="fas fa-user-friends"></i>
            <span>Retours des parents</span>
          </button>
          <button
            className={`tab-button ${activeTab === 'teacher' ? 'active' : ''}`}
            onClick={() => setActiveTab('teacher')}
          >
            <i className="fas fa-chalkboard-teacher"></i>
            <span>Retours des enseignants</span>
          </button>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Chargement des retours...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <i className="fas fa-exclamation-triangle"></i>
            <p>Erreur : {error}</p>
          </div>
        ) : (
          <div className="data-card">
            <div className="table-container">
              {activeTab === 'parent' ? (
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Nom du parent</th>
                      <th>Suggestion de l’IA</th>
                      <th>Retour</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredParentFeedback.length > 0 ? (
                      filteredParentFeedback.map((item) => (
                        <tr key={`parent-${item.id}`}>
                          <td>
                            <div className="user-info">
                              <div className="user-avatar">
                                {item.parent_name.charAt(0).toUpperCase()}
                              </div>
                              <span>{item.parent_name}</span>
                            </div>
                          </td>
                          <td>{item.ai_suggestion}</td>
                          <td>{item.feedback}</td>
                          <td>{new Date(item.created_at).toLocaleString()}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="no-results">
                          <div className="empty-state">
                            <i className="fas fa-search"></i>
                            <p>Aucun retour de parent disponible.</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              ) : (
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Nom de l’enseignant</th>
                      <th>Suggestion de l’IA</th>
                      <th>Retour</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTeacherFeedback.length > 0 ? (
                      filteredTeacherFeedback.map((item) => (
                        <tr key={`teacher-${item.id}`}>
                          <td>
                            <div className="user-info">
                              <div className="user-avatar">
                                {item.teacher_name.charAt(0).toUpperCase()}
                              </div>
                              <span>{item.teacher_name}</span>
                            </div>
                          </td>
                          <td>{item.ai_suggestion}</td>
                          <td>{item.feedback}</td>
                          <td>{new Date(item.created_at).toLocaleString()}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="no-results">
                          <div className="empty-state">
                            <i className="fas fa-search"></i>
                            <p>Aucun retour d’enseignant disponible.</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default FeedbackOverview;
