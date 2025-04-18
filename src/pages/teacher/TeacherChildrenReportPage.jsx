import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from './Layout';

const TeacherStudentDetail = ({ studentId, teacherId, onBack }) => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [analysis, setAnalysis] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [teacherSuggestionId, setTeacherSuggestionId] = useState(null);
  const [teacherFeedback, setTeacherFeedback] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudentDetails = async (id) => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/students/${id}`);
        setStudent(response.data);
      } catch (error) {
        console.error("Error fetching student details:", error);
        setError("Erreur lors de la récupération des détails de l'élève.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudentDetails(studentId);
  }, [studentId]);

  const generateAnalysis = async () => {
    if (!student) return;
    setAnalyzing(true);
    try {
      const API_KEY = "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"; // Replace with your actual key

      // Construct observation text from student data (excluding basic fields)
      const observationText = constructObservation(student);

      const prompt = `
En tant que spécialiste de l'enfance et de l'éducation axé sur l'orientation des enseignants, veuillez analyser les données de profil de l'élève suivant et créer un plan de 
remédiation complet adapté aux enseignants. Utilisez les informations fournies sur l'élève pour générer un plan comprenant des recommandations claires et réalisables ainsi que
 des activités de remédiation que les enseignants peuvent mettre en œuvre en classe pour soutenir le développement académique, émotionnel et social de l'enfant.

ID de l'élève: ${student.ID}
Âge: ${student.Age}
Sexe: ${student.Gender}
Niveau: ${student.Grade}

Données du profil de l'élève:
${observationText}

Votre réponse doit inclure:
1. Un plan détaillé pour l'implication de l'enseignant et la remédiation.
2. Des interventions ou activités spécifiques que les enseignants peuvent utiliser pour soutenir l'apprentissage et le bien-être de l'enfant.
3. Des stratégies pratiques pour améliorer les performances académiques et les interactions sociales de l'enfant.
4. Un calendrier suggéré ou une approche par phases pour la mise en œuvre de ces stratégies.

Assurez-vous que les recommandations sont claires, pratiques et adaptées spécifiquement au rôle de l'enseignant dans le soutien de son élève.
      `;

      const response = await fetch(
        "https://api-inference.huggingface.co/models/gpt2",
        {
          headers: { 
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
          },
          method: "POST",
          body: JSON.stringify({ 
            inputs: prompt,
            parameters: {
              max_length: 2000,
              temperature: 0.3,
              top_p: 0.95
            }
          })
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "API request failed");
      }
      
      const result = await response.json();
      let analysisText = result[0].generated_text;
      
      // Remove the prompt portion so only the analysis remains.
      if (analysisText.startsWith(prompt)) {
        analysisText = analysisText.slice(prompt.length).trim();
      } else {
        analysisText = analysisText.replace(prompt, '').trim();
      }
      
      setAnalysis(analysisText);
      // After generating analysis, store the suggestion.
      await storeTeacherSuggestion(analysisText);
    } catch (error) {
      console.error("Analysis error:", error);
      setAnalysis("Erreur lors de la génération de l'analyse. Veuillez réessayer plus tard.");
    } finally {
      setAnalyzing(false);
    }
  };

  // Store the teacher-generated suggestion in the suggestion_teachers table.
  const storeTeacherSuggestion = async (suggestionText) => {
    try {
      const response = await fetch("http://localhost:5000/api/ai-teacher-suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ childId: student.ID, teacherId, suggestion: suggestionText })
      });
      const data = await response.json();
      console.log("Teacher suggestion stored:", data);
      // Save the returned suggestion ID for later feedback.
      setTeacherSuggestionId(data.suggestionId);
    } catch (error) {
      console.error("Error storing teacher suggestion:", error);
    }
  };

  // Submit additional teacher feedback in the feedback_teachers table.
  const submitTeacherFeedback = async () => {
    if (!teacherSuggestionId || !teacherFeedback) {
      setFeedbackMessage("Veuillez générer une suggestion et saisir des commentaires.");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/api/teacher-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          suggestionId: teacherSuggestionId,
          teacherId,
          feedback: teacherFeedback
        })
      });
      const data = await response.json();
      console.log("Teacher feedback stored:", data);
      setFeedbackMessage("Commentaires soumis avec succès !");
      setTeacherFeedback("");
    } catch (error) {
      console.error("Error submitting teacher feedback:", error);
      setFeedbackMessage("Erreur lors de la soumission des commentaires.");
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
            <tr><td>Sexe</td><td>${student.Gender}</td></tr>
            <tr><td>Niveau</td><td>${student.Grade}</td></tr>
          </table>
        </div>
        <div class="report-content">
          <h4>Rapport d'Analyse:</h4>
          <div class="analysis-text">
            ${analysis.replace(/\n/g, '<br>')}
          </div>
          <div class="disclaimer">
            <p><strong>Important:</strong> Cette analyse est basée sur une interprétation IA et ne doit être utilisée qu'à titre d'outil de soutien.</p>
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

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Chargement des détails de l'élève...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <div className="error-container">
          <div className="error-icon">
            <i className="fas fa-exclamation-triangle"></i>
          </div>
          <h3>Erreur</h3>
          <p>{error}</p>
          <button className="btn primary" onClick={onBack}>
            <i className="fas fa-arrow-left"></i> Retour à la Liste des Élèves
          </button>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="page-container">
        <div className="error-container">
          <div className="error-icon">
            <i className="fas fa-user-slash"></i>
          </div>
          <h3>Élève Non Trouvé</h3>
          <p>Les informations de l'élève demandé n'ont pas pu être trouvées.</p>
          <button className="btn primary" onClick={onBack}>
            <i className="fas fa-arrow-left"></i> Retour à la Liste des Élèves
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="header-content">
          <h1>
            <i className="fas fa-user-graduate"></i>
            <span>Rapport et Recommandations de l'Élève</span>
          </h1>
          <p className="header-description">
            Générer et gérer des recommandations pour l'élève ID: {student.ID}
          </p>
        </div>
        
        <div className="header-actions">
          <button className="btn secondary" onClick={onBack}>
            <i className="fas fa-arrow-left"></i> Retour à la Liste des Élèves
          </button>
        </div>
      </div>

      <div className="data-card">
        <div className="data-card-header">
          <h2>Informations de l'Élève</h2>
        </div>
        <div className="data-card-content">
          <div className="student-info-grid">
            <div className="info-item">
              <span className="info-label">ID:</span>
              <span className="info-value">{student.ID}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Âge:</span>
              <span className="info-value">{student.Age}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Sexe:</span>
              <span className="info-value">{student.Gender}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Niveau:</span>
              <span className="info-value">{student.Grade}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="action-panel">
        <button 
          className={`btn ${analyzing ? 'disabled' : 'primary'}`} 
          onClick={generateAnalysis} 
          disabled={analyzing}
        >
          {analyzing ? (
            <>
              <div className="spinner-small"></div>
              <span>Génération des Recommandations...</span>
            </>
          ) : (
            <>
              <i className="fas fa-brain"></i> Générer des Recommandations
            </>
          )}
        </button>
        
        {analysis && (
          <button className="btn secondary" onClick={downloadAnalysis}>
            <i className="fas fa-download"></i> Télécharger le Rapport
          </button>
        )}
      </div>

      {analysis && (
        <div className="data-card">
          <div className="data-card-header">
            <h2>Analyse et Recommandations</h2>
          </div>
          <div className="data-card-content analysis-content">
            {analysis.split("\n").map((paragraph, index) => (
              paragraph ? <p key={index}>{paragraph}</p> : <br key={index} />
            ))}
          </div>
        </div>
      )}

      {analysis && teacherSuggestionId && (
        <div className="data-card">
          <div className="data-card-header">
            <h2>Commentaires de l'Enseignant</h2>
          </div>
          <div className="data-card-content">
            <p className="feedback-description">
              Ajoutez vos observations et commentaires supplémentaires pour compléter les recommandations générées.
            </p>
            <div className="feedback-form">
              <textarea
                className="feedback-textarea"
                value={teacherFeedback}
                onChange={(e) => setTeacherFeedback(e.target.value)}
                placeholder="Saisissez vos commentaires professionnels et observations..."
                rows={5}
              ></textarea>
              
              <div className="feedback-actions">
                <button className="btn primary" onClick={submitTeacherFeedback}>
                  <i className="fas fa-paper-plane"></i> Soumettre les Commentaires
                </button>
                
                {feedbackMessage && (
                  <div className={`feedback-message ${feedbackMessage.includes("succès") ? "success" : "error"}`}>
                    {feedbackMessage}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const TeacherChildrenReportPage = () => {
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedChildId, setSelectedChildId] = useState(null);
  
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
        if (!res.ok) throw new Error("Erreur lors de la récupération des élèves");
        return res.json();
      })
      .then((data) => {
        setChildren(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching children:", err);
        setError("Erreur lors de la récupération des élèves.");
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
        {isNaN(grade) ? grade : `Niveau ${grade}`}
      </span>
    );
  };
  
  const renderGender = (gender) => {
    const color = gender.toLowerCase() === 'male' ? '#3b82f6' : 
                 gender.toLowerCase() === 'female' ? '#ec4899' : '#6c757d';
    
    return (
      <span className="gender-badge" style={{ backgroundColor: color }}>
        {gender === 'Male' ? 'Masculin' : gender === 'Female' ? 'Féminin' : gender}
      </span>
    );
  };

  if (loading) {
    return (
      <Layout>
        <div className="page-container">
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Chargement des données des élèves...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (selectedChildId) {
    return (
      <Layout>
        <TeacherStudentDetail
          studentId={selectedChildId}
          teacherId={teacherId}
          onBack={() => setSelectedChildId(null)}
        />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page-container">
        <div className="page-header">
          <div className="header-content">
            <h1>
              <i className="fas fa-file-medical-alt"></i>
              <span>Recommandations pour les Élèves</span>
            </h1>
            <p className="header-description">
              Générez des recommandations et interventions personnalisées pour vos élèves
            </p>
          </div>
          
          <div className="header-actions">
            {/* Add any teacher-specific actions here if needed */}
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
              <p>Aucun élève ne vous est actuellement assigné. Veuillez contacter l'administrateur de votre école si c'est une erreur.</p>
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
                            {child.Name ? child.Name.charAt(0).toUpperCase() : 'É'}
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
                            title="Générer des Recommandations"
                            onClick={() => setSelectedChildId(child.ID)}
                          >
                            <i className="fas fa-file-medical-alt"></i>
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

export default TeacherChildrenReportPage;