import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import './admin.css';

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [assignment, setAssignment] = useState({ teacherId: '', parentId: '' });
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchStudents = () => {
    setLoading(true);
    fetch(`http://localhost:5000/api/students?page=${page}&limit=10${searchTerm ? `&search=${searchTerm}` : ''}`)
      .then((res) => res.json())
      .then((data) => {
        setStudents(data.students);
        setTotalPages(data.totalPages);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Erreur lors du chargement des élèves:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchStudents();
  }, [page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchStudents();
  };

  const openAssignmentModal = (student) => {
    setSelectedStudent(student);
    setAssignment({ teacherId: student.TeacherID || '', parentId: student.ParentID || '' });
    setShowModal(true);
  };

  const handleAssignmentChange = (e) => {
    const { name, value } = e.target;
    setAssignment((prev) => ({ ...prev, [name]: value }));
  };

  const submitAssignment = () => {
    if (!selectedStudent) return;
    setLoading(true);
    fetch(`http://localhost:5000/api/students/${selectedStudent.ID}/assign`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        teacherId: assignment.teacherId || null,
        parentId: assignment.parentId || null
      })
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setShowModal(false);
        fetchStudents();
      })
      .catch((err) => {
        console.error('Erreur lors de l\'assignation de l\'élève:', err);
        setLoading(false);
      });
  };

  return (
    <Layout>
      <div className="page-container">
        <div className="page-header">
          <div className="header-content">
            <h1>
              <i className="fas fa-user-graduate"></i>
              <span>Gestion des élèves</span>
            </h1>
            <p className="header-description">
              Gérer les profils et les affectations des élèves
            </p>
          </div>

          <div className="header-actions">
            <div className="search-container">
              <form onSubmit={handleSearch}>
                <div className="search-input-group">
                  <i className="fas fa-search search-icon"></i>
                  <input
                    type="text"
                    placeholder="Rechercher par ID ou niveau..."
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

        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Chargement des élèves...</p>
          </div>
        ) : (
          <div className="data-card">
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Âge</th>
                    <th>Sexe</th>
                    <th>Niveau</th>
                    <th>Statut</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.length > 0 ? (
                    students.map((student) => (
                      <tr key={student.ID}>
                        <td>{student.ID}</td>
                        <td>{student.Age}</td>
                        <td>{student.Gender}</td>
                        <td>
                          <span className={`grade-badge grade-${student.Grade}`}>
                            {student.Grade}
                          </span>
                        </td>
                        <td>
                          <span className={`status-indicator ${student.Active ? 'active' : 'inactive'}`}>
                            {student.Active ? 'Actif' : 'Inactif'}
                          </span>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button 
                              className="icon-button assign"
                              onClick={() => openAssignmentModal(student)}
                              title="Assigner un enseignant/un parent"
                            >
                              <i className="fas fa-user-plus"></i>
                            </button>
                            <button 
                              className="icon-button view"
                              title="Voir les détails"
                            >
                              <i className="fas fa-eye"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="no-results">
                        <div className="empty-state">
                          <i className="fas fa-search"></i>
                          <p>Aucun élève trouvé. Essayez de modifier votre recherche.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="pagination">
              <button 
                className="pagination-button"
                onClick={() => setPage(1)} 
                disabled={page === 1}
              >
                <i className="fas fa-angle-double-left"></i>
              </button>
              <button 
                className="pagination-button"
                onClick={() => setPage(page > 1 ? page - 1 : 1)} 
                disabled={page === 1}
              >
                <i className="fas fa-angle-left"></i>
              </button>

              <div className="pagination-info">
                Page <span className="current-page">{page}</span> sur <span>{totalPages}</span>
              </div>

              <button 
                className="pagination-button"
                onClick={() => setPage(page < totalPages ? page + 1 : totalPages)} 
                disabled={page === totalPages}
              >
                <i className="fas fa-angle-right"></i>
              </button>
              <button 
                className="pagination-button"
                onClick={() => setPage(totalPages)} 
                disabled={page === totalPages}
              >
                <i className="fas fa-angle-double-right"></i>
              </button>
            </div>
          </div>
        )}
      </div>

      {showModal && selectedStudent && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>
                <i className="fas fa-user-plus"></i>
                <span>Assigner un enseignant et un parent</span>
              </h2>
              <button className="close-button" onClick={() => setShowModal(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="modal-content">
              <div className="student-info">
                <div className="info-card">
                  <div className="info-label">ID Élève :</div>
                  <div className="info-value">{selectedStudent.ID}</div>
                </div>
                <div className="info-card">
                  <div className="info-label">Niveau :</div>
                  <div className="info-value">
                    <span className={`grade-badge grade-${selectedStudent.Grade}`}>
                      {selectedStudent.Grade}
                    </span>
                  </div>
                </div>
                <div className="info-card">
                  <div className="info-label">Âge :</div>
                  <div className="info-value">{selectedStudent.Age}</div>
                </div>
              </div>

              <form>
                <div className="form-group">
                  <label htmlFor="teacherId">
                    <i className="fas fa-chalkboard-teacher"></i>
                    <span>ID Enseignant</span>
                  </label>
                  <input
                    id="teacherId"
                    type="text"
                    name="teacherId"
                    value={assignment.teacherId}
                    onChange={handleAssignmentChange}
                    placeholder="Entrer l'ID de l'enseignant"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="parentId">
                    <i className="fas fa-user-friends"></i>
                    <span>ID Parent</span>
                  </label>
                  <input
                    id="parentId"
                    type="text"
                    name="parentId"
                    value={assignment.parentId}
                    onChange={handleAssignmentChange}
                    placeholder="Entrer l'ID du parent"
                  />
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <button 
                type="button" 
                className="button secondary" 
                onClick={() => setShowModal(false)}
              >
                <i className="fas fa-times"></i>
                <span>Annuler</span>
              </button>

              <button 
                type="button" 
                className="button primary"
                onClick={submitAssignment}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="spinner-small"></div>
                    <span>Enregistrement...</span>
                  </>
                ) : (
                  <>
                    <i className="fas fa-save"></i>
                    <span>Enregistrer</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default StudentsPage;
