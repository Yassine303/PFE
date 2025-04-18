import React, { useState, useEffect } from 'react';
import Layout from './Layout';

const TeacherFeedbackFormPage = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState('');
  const [feedback, setFeedback] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Get teacher info
  const teacher = JSON.parse(localStorage.getItem('user'));
  const teacherId = teacher ? teacher.ID : null;

  useEffect(() => {
    if (!teacherId) {
      setError("Aucun enseignant connecté.");
      setLoading(false);
      return;
    }
    
    setLoading(true);
    fetch(`http://localhost:5000/api/suggestions/for-teacher/${teacherId}`)
      .then(res => {
        if (!res.ok) throw new Error("Erreur lors de la récupération des suggestions");
        return res.json();
      })
      .then(data => {
        setSuggestions(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erreur lors de la récupération des suggestions:', err);
        setError("Erreur lors de la récupération des suggestions.");
        setLoading(false);
      });
  }, [teacherId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedSuggestion || !feedback) {
      setMessage("Veuillez sélectionner une suggestion et fournir un commentaire.");
      return;
    }
    
    setLoading(true);
    fetch('http://localhost:5000/api/teacher-feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        suggestion_id: selectedSuggestion,
        teacher_id: teacherId,
        feedback
      })
    })
    .then(res => {
      if (!res.ok) throw new Error("Erreur lors de l'envoi du commentaire");
      return res.json();
    })
    .then(data => {
      setMessage("Retour d'information envoyé avec succès !");
      setFeedback('');
      setSelectedSuggestion('');
      setLoading(false);
    })
    .catch(err => {
      console.error('Erreur lors de l\'envoi du retour d\'information:', err);
      setMessage("Erreur lors de l'envoi du retour d'information.");
      setLoading(false);
    });
  };

  if (loading && suggestions.length === 0) {
    return (
      <Layout>
        <div className="page-container">
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Chargement des suggestions...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error && suggestions.length === 0) {
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
              <i className="fas fa-comment-dots"></i>
              <span>Commentaires des enseignants sur les recommandations</span>
            </h1>
            <p className="header-description">
              Aidez-nous à améliorer nos suggestions d'IA en apportant votre expertise pédagogique
            </p>
          </div>
        </div>

        <div className="data-card">
          {suggestions.length === 0 ? (
            <div className="empty-state">
              <i className="fas fa-lightbulb"></i>
              <p>Aucune recommandation trouvée pour votre révision pour le moment.</p>
            </div>
          ) : (
            <div className="form-container">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="suggestionSelect">Sélectionnez une recommandation :</label>
                  <select
                    id="suggestionSelect"
                    value={selectedSuggestion}
                    onChange={(e) => setSelectedSuggestion(e.target.value)}
                    className="form-control"
                    disabled={loading}
                  >
                    <option value="">-- Sélectionnez une recommandation --</option>
                    {suggestions.map(s => (
                      <option key={s.suggestion_id} value={s.suggestion_id}>
                        {s.student_name || 'Étudiant ' + s.student_id} - {s.suggestion ? (s.suggestion.substring(0, 50) + '...') : 'Pas de texte de suggestion'}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="feedbackText">Votre commentaire :</label>
                  <textarea
                    id="feedbackText"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="form-control"
                    rows="6"
                    placeholder="Veuillez partager votre évaluation professionnelle de cette recommandation. Est-elle pédagogiquement solide ? Quelles améliorations suggéreriez-vous ?"
                    disabled={loading}
                  ></textarea>
                </div>
                
                <div className="form-actions">
                  <button 
                    type="submit" 
                    className="button primary"
                    disabled={loading || !selectedSuggestion || !feedback}
                  >
                    <i className="fas fa-paper-plane"></i>
                    <span>{loading ? "Envoi..." : "Envoyer le commentaire"}</span>
                  </button>
                </div>
                
                {message && (
                  <div className={`message ${message.includes("Erreur") ? "error" : "success"}`}>
                    <i className={`fas ${message.includes("Erreur") ? "fa-exclamation-circle" : "fa-check-circle"}`}></i>
                    <span>{message}</span>
                  </div>
                )}
              </form>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default TeacherFeedbackFormPage;
