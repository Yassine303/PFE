import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import './admin.css';

const TeachersPage = () => {
  const [teachers, setTeachers] = useState([]);
  const [formData, setFormData] = useState({
    full_name: '',
    username: '',
    password: '',
    email: '',
    phone_number: ''
  });
  const [loading, setLoading] = useState(true);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  const fetchTeachers = () => {
    setLoading(true);
    fetch('http://localhost:5000/api/teachers')
      .then((res) => res.json())
      .then((data) => {
        setTeachers(data);
        setFilteredTeachers(data);
        setTotalPages(Math.ceil(data.length / itemsPerPage));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur lors du chargement des enseignants :", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredTeachers(teachers);
      setTotalPages(Math.ceil(teachers.length / itemsPerPage));
    } else {
      const lowercaseTerm = searchTerm.toLowerCase();
      const filtered = teachers.filter(
        teacher => 
          teacher.full_name?.toLowerCase().includes(lowercaseTerm) ||
          teacher.email?.toLowerCase().includes(lowercaseTerm) ||
          teacher.username?.toLowerCase().includes(lowercaseTerm)
      );
      setFilteredTeachers(filtered);
      setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    }
    setPage(1);
  }, [searchTerm, teachers]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const url = selectedTeacher
      ? `http://localhost:5000/api/teachers/${selectedTeacher.ID}`
      : 'http://localhost:5000/api/teachers';

    const method = selectedTeacher ? 'PUT' : 'POST';

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then((res) => res.json())
      .then((data) => {
        fetchTeachers();
        setShowModal(false);
        resetForm();
      })
      .catch((err) => {
        console.error("Erreur lors de l'enregistrement de l'enseignant :", err);
        setLoading(false);
      });
  };

  const resetForm = () => {
    setFormData({
      full_name: '',
      username: '',
      password: '',
      email: '',
      phone_number: ''
    });
    setSelectedTeacher(null);
  };

  const openAddTeacherModal = () => {
    resetForm();
    setShowModal(true);
  };

  const openEditTeacherModal = (teacher) => {
    setSelectedTeacher(teacher);
    setFormData({
      full_name: teacher.full_name || '',
      username: teacher.username || '',
      password: '',
      email: teacher.email || '',
      phone_number: teacher.phone_number || ''
    });
    setShowModal(true);
  };

  const deleteTeacher = (teacherId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet enseignant ?")) {
      setLoading(true);
      fetch(`http://localhost:5000/api/teachers/${teacherId}`, {
        method: 'DELETE',
      })
        .then((res) => res.json())
        .then(() => {
          fetchTeachers();
        })
        .catch((err) => {
          console.error("Erreur lors de la suppression :", err);
          setLoading(false);
        });
    }
  };

  const indexOfLastTeacher = page * itemsPerPage;
  const indexOfFirstTeacher = indexOfLastTeacher - itemsPerPage;
  const currentTeachers = filteredTeachers.slice(indexOfFirstTeacher, indexOfLastTeacher);

  return (
    <Layout>
      <div className="page-container">
        <div className="page-header">
          <div className="header-content">
            <h1>
              <i className="fas fa-chalkboard-teacher"></i>
              <span>Gestion des enseignants</span>
            </h1>
            <p className="header-description">
              Gérer les comptes et informations des enseignants
            </p>
          </div>

          <div className="header-actions">
            <div className="search-container">
              <form onSubmit={handleSearch}>
                <div className="search-input-group">
                  <i className="fas fa-search search-icon"></i>
                  <input
                    type="text"
                    placeholder="Rechercher par nom ou email..."
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

            <button className="action-button primary" onClick={openAddTeacherModal}>
              <i className="fas fa-plus"></i>
              <span>Ajouter un enseignant</span>
            </button>
          </div>
        </div>

        {loading && !teachers.length ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Chargement des enseignants...</p>
          </div>
        ) : (
          <div className="data-card">
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nom complet</th>
                    <th>Nom d'utilisateur</th>
                    <th>Email</th>
                    <th>Téléphone</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentTeachers.length > 0 ? (
                    currentTeachers.map((teacher) => (
                      <tr key={teacher.ID} className="teacher-row">
                        <td>{teacher.ID}</td>
                        <td>
                          <div className="user-info">
                            <div className="user-avatar">
                              {teacher.full_name?.charAt(0).toUpperCase() || 'E'}
                            </div>
                            <span>{teacher.full_name}</span>
                          </div>
                        </td>
                        <td>{teacher.username}</td>
                        <td>
                          <a href={`mailto:${teacher.email}`} className="email-link">
                            {teacher.email}
                          </a>
                        </td>
                        <td>{teacher.phone_number || '-'}</td>
                        <td>
                          <div className="action-buttons">
                            <button className="icon-button edit" onClick={() => openEditTeacherModal(teacher)} title="Modifier">
                              <i className="fas fa-edit"></i>
                            </button>
                            <button className="icon-button view" title="Voir les détails">
                              <i className="fas fa-eye"></i>
                            </button>
                            <button className="icon-button delete" onClick={() => deleteTeacher(teacher.ID)} title="Supprimer">
                              <i className="fas fa-trash-alt"></i>
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
                          <p>{searchTerm ? 'Aucun enseignant ne correspond à votre recherche.' : 'Aucun enseignant disponible.'}</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {filteredTeachers.length > 0 && (
              <div className="pagination">
                <button className="pagination-button" onClick={() => setPage(1)} disabled={page === 1}>
                  <i className="fas fa-angle-double-left"></i>
                </button>
                <button className="pagination-button" onClick={() => setPage(page > 1 ? page - 1 : 1)} disabled={page === 1}>
                  <i className="fas fa-angle-left"></i>
                </button>

                <div className="pagination-info">
                  Page <span className="current-page">{page}</span> sur <span>{totalPages}</span>
                </div>

                <button className="pagination-button" onClick={() => setPage(page < totalPages ? page + 1 : totalPages)} disabled={page === totalPages}>
                  <i className="fas fa-angle-right"></i>
                </button>
                <button className="pagination-button" onClick={() => setPage(totalPages)} disabled={page === totalPages}>
                  <i className="fas fa-angle-double-right"></i>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>
                <i className={`fas ${selectedTeacher ? 'fa-edit' : 'fa-plus-circle'}`}></i>
                <span>{selectedTeacher ? 'Modifier l\'enseignant' : 'Ajouter un nouvel enseignant'}</span>
              </h2>
              <button className="close-button" onClick={() => setShowModal(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="modal-content">
              <form onSubmit={handleSubmit}>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="full_name">
                      <i className="fas fa-user"></i>
                      <span>Nom complet</span>
                    </label>
                    <input
                      id="full_name"
                      type="text"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                      placeholder="Entrer le nom complet"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="username">
                      <i className="fas fa-user-tag"></i>
                      <span>Nom d'utilisateur</span>
                    </label>
                    <input
                      id="username"
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="Entrer le nom d'utilisateur"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">
                      <i className="fas fa-lock"></i>
                      <span>Mot de passe</span>
                    </label>
                    <div className="password-input-group">
                      <input
                        id="password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder={selectedTeacher ? "Laisser vide pour garder le mot de passe actuel" : "Entrer un mot de passe"}
                        required={!selectedTeacher}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">
                      <i className="fas fa-envelope"></i>
                      <span>Email</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Entrer l'email"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone_number">
                      <i className="fas fa-phone"></i>
                      <span>Numéro de téléphone</span>
                    </label>
                    <input
                      id="phone_number"
                      type="text"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleChange}
                      placeholder="Entrer le numéro de téléphone"
                    />
                  </div>
                </div>

                <div className="modal-footer">
                  <button type="button" className="button secondary" onClick={() => setShowModal(false)}>
                    <i className="fas fa-times"></i>
                    <span>Annuler</span>
                  </button>

                  <button type="submit" className="button primary" disabled={loading}>
                    {loading ? (
                      <>
                        <div className="spinner-small"></div>
                        <span>Enregistrement...</span>
                      </>
                    ) : (
                      <>
                        <i className={`fas ${selectedTeacher ? 'fa-save' : 'fa-plus-circle'}`}></i>
                        <span>{selectedTeacher ? 'Mettre à jour' : 'Ajouter'}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default TeachersPage;