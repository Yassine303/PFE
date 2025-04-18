import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from './Layout';

const StudentDetail = ({ student, onBack }) => {
  const [analysis, setAnalysis] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);

  const generateAnalysis = async () => {
    if (!student) return;
    setAnalyzing(true);
    try {
      // Use our backend endpoint instead of calling Hugging Face directly
      const response = await fetch("http://localhost:5000/api/generate-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          studentId: student.ID,
          observations: constructObservation(student),
          studentAge: student.Age,
          studentGender: student.Gender,
          studentGrade: student.Grade
        })
      });
  
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Erreur inconnue' }));
        console.error("API error response:", errorData);
        
        if (response.status === 503) {
          setAnalysis("Le modèle est en cours de chargement. Veuillez réessayer dans quelques instants.");
        } else {
          setAnalysis(`Erreur lors de la génération: ${errorData.error || response.statusText}`);
        }
        return;
      }
      
      const result = await response.json();
      
      if (!result.analysis) {
        throw new Error("Réponse vide du serveur");
      }
      
      setAnalysis(result.analysis);
      // No need to call storeSuggestion as it's handled in the backend
    } catch (error) {
      console.error("Analysis error:", error);
      setAnalysis("Erreur lors de la génération de l'analyse. Veuillez réessayer plus tard.");
    } finally {
      setAnalyzing(false);
    }
  };

  const storeSuggestion = async (suggestionText) => {
    try {
      const response = await fetch("http://localhost:5000/api/ai-suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ childId: student.ID, suggestion: suggestionText })
      });
      const data = await response.json();
      console.log("Suggestion stored in DB:", data);
    } catch (error) {
      console.error("Error storing suggestion:", error);
    }
  };

  const constructObservation = (studentData) => {
    const fields = [];
    Object.entries(studentData).forEach(([key, value]) => {
      if (!["ID", "Age", "Gender", "Grade"].includes(key) && value !== null) {
        fields.push(`${key.replace(/_/g, " ")}: ${value}`);
      }
    });
    return fields.join("\n");
  };

  const downloadAnalysis = () => {
    if (!student || !analysis) return;
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Rapport d'Analyse de l'Élève - ID: ${student.ID}</title>
        <style>
          body { font-family: Arial; padding: 20px; }
          .report-header { margin-bottom: 20px; }
          .report-content { line-height: 1.6; }
          h3, h4 { color: #2c3e50; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          table, th, td { border: 1px solid #ddd; }
          th, td { padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
          .disclaimer { margin-top: 20px; font-size: 12px; color: #777; border-top: 1px solid #eee; padding-top: 10px; }
        </style>
      </head>
      <body>
        <div class="report-header">
          <h3>Rapport d'Analyse de l'Élève</h3>
          <table>
            <tr><th>Champ</th><th>Information</th></tr>
            <tr><td>ID de l'Élève</td><td>${student.ID}</td></tr>
            <tr><td>Âge</td><td>${student.Age}</td></tr>
            <tr><td>Genre</td><td>${student.Gender}</td></tr>
            <tr><td>Classe</td><td>${student.Grade}</td></tr>
          </table>
        </div>
        <div class="report-content">
          <h4>Rapport d'Analyse:</h4>
          <div class="analysis-text">
            ${analysis.replace(/\n/g, '<br>')}
          </div>
          <div class="disclaimer">
            <p><strong>Important:</strong> Cette analyse est basée sur une interprétation par IA et doit être utilisée uniquement comme outil d'accompagnement.</p>
          </div>
        </div>
        <div style="margin-top: 30px; font-size: 12px; color: #7f8c8d;">
          <p>Généré le ${new Date().toLocaleString()}</p>
          <p>CONFIDENTIEL: À manipuler avec précaution.</p>
        </div>
      </body>
      </html>
    `;
    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Eleve_${student.ID}_Analyse.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Function to render child grade and gender with appropriate styling
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
        {gender === 'male' ? 'Masculin' : gender === 'female' ? 'Féminin' : gender}
      </span>
    );
  };

  return (
    <div className="modal-overlay">
      <div className="modal" style={{ position: 'relative', maxWidth: '800px' }}>
        <div className="modal-header">
          <h2>
            <i className="fas fa-clipboard-list"></i>
            <span>Recommandations pour l'Enfant</span>
          </h2>
          <button className="close-button" onClick={onBack}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="modal-content">
          <div className="child-detail-header">
            <div className="child-avatar large">
              {student.Name ? student.Name.charAt(0).toUpperCase() : 'E'}
            </div>
            <h3>{student.Name || 'Enfant ' + student.ID}</h3>
          </div>
          
          <div className="detail-grid">
            <div className="detail-item">
              <div className="detail-label">
                <i className="fas fa-id-card"></i>
                <span>ID</span>
              </div>
              <div className="detail-value">{student.ID}</div>
            </div>
            
            <div className="detail-item">
              <div className="detail-label">
                <i className="fas fa-birthday-cake"></i>
                <span>Âge</span>
              </div>
              <div className="detail-value">{student.Age} ans</div>
            </div>
            
            <div className="detail-item">
              <div className="detail-label">
                <i className="fas fa-graduation-cap"></i>
                <span>Classe</span>
              </div>
              <div className="detail-value">
                {renderGrade(student.Grade)}
              </div>
            </div>
            
            <div className="detail-item">
              <div className="detail-label">
                <i className="fas fa-venus-mars"></i>
                <span>Genre</span>
              </div>
              <div className="detail-value">
                {renderGender(student.Gender)}
              </div>
            </div>
          </div>

          <div className="recommendation-actions">
            <button 
              className="button primary"
              onClick={generateAnalysis} 
              disabled={analyzing}
            >
              <i className="fas fa-brain"></i>
              <span>{analyzing ? "Génération en cours..." : "Générer des Recommandations"}</span>
            </button>
            
            {analysis && (
              <button 
                className="button secondary"
                onClick={downloadAnalysis}
              >
                <i className="fas fa-download"></i>
                <span>Télécharger le Rapport</span>
              </button>
            )}
          </div>
          
          {analysis && (
            <div className="analysis-container">
              <div className="analysis-header">
                <i className="fas fa-lightbulb"></i>
                <h3>Analyse et Recommandations</h3>
              </div>
              <div className="analysis-content">
                {analysis.split("\n").map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="modal-footer">
          <button 
            type="button" 
            className="button secondary" 
            onClick={onBack}
          >
            <i className="fas fa-arrow-left"></i>
            <span>Retour à la Liste des Enfants</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const ChildrenReportPage = () => {
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedChildId, setSelectedChildId] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Retrieve parent's data from localStorage
  const parent = JSON.parse(localStorage.getItem("user"));
  const parentId = parent ? parent.ID : null;

  useEffect(() => {
    if (!parentId) {
      setError("Aucun parent connecté.");
      setLoading(false);
      return;
    }
    fetch(`http://localhost:5000/api/children/${parentId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Erreur lors de la récupération des enfants");
        return res.json();
      })
      .then((data) => {
        setChildren(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching children:", err);
        setError("Erreur lors de la récupération des enfants.");
        setLoading(false);
      });
  }, [parentId]);

  useEffect(() => {
    if (selectedChildId) {
      const fetchStudentDetails = async (id) => {
        try {
          const response = await axios.get(`http://localhost:5000/api/students/${id}`);
          setSelectedStudent(response.data);
        } catch (error) {
          console.error("Error fetching student details:", error);
          setError("Erreur lors de la récupération des détails de l'élève.");
        }
      };

      fetchStudentDetails(selectedChildId);
    } else {
      setSelectedStudent(null);
    }
  }, [selectedChildId]);

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
        {gender === 'male' ? 'Masculin' : gender === 'female' ? 'Féminin' : gender}
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

  if (error && !selectedStudent) {
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
      {selectedStudent ? (
        <StudentDetail
          student={selectedStudent}
          onBack={() => setSelectedChildId(null)}
        />
      ) : (
        <div className="page-container">
          <div className="page-header">
            <div className="header-content">
              <h1>
                <i className="fas fa-clipboard-list"></i>
                <span>Rapports des Enfants</span>
              </h1>
              <p className="header-description">
                Générez des recommandations personnalisées pour vos enfants
              </p>
            </div>
            
            <div className="header-actions">
              {/* You can add buttons here if needed */}
            </div>
          </div>

          <div className="data-card">
            {children.length === 0 ? (
              <div className="empty-state">
                <i className="fas fa-child"></i>
                <p>Aucun enfant trouvé. Veuillez contacter l'administrateur de votre école si c'est une erreur.</p>
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
                            <span>{child.Name || 'Enfant ' + child.ID}</span>
                          </div>
                        </td>
                        <td>{child.Age}</td>
                        <td>{renderGrade(child.Grade)}</td>
                        <td>{renderGender(child.Gender)}</td>
                        <td>
                          <div className="action-buttons">
                            <button 
                              className="icon-button primary"
                              onClick={() => setSelectedChildId(child.ID)}
                              title="Générer des Recommandations"
                            >
                              <i className="fas fa-lightbulb"></i>
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
      )}
    </Layout>
  );
};

export default ChildrenReportPage;