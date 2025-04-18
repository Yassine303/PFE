import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import './parent.css';

const ParentsPage = () => {
  const [parents, setParents] = useState([]);
  const [selectedParent, setSelectedParent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    full_name: '',
    username: '',
    password: '',
    email: '',
    phone_number: ''
  });

  const fetchParents = () => {
    setLoading(true);
    fetch(`http://localhost:5000/api/parents?page=${page}&limit=10${searchTerm ? `&search=${searchTerm}` : ''}`)
      .then((res) => res.json())
      .then((data) => {
        setParents(Array.isArray(data.parents) ? data.parents : data);
        setTotalPages(data.totalPages || 1);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Erreur lors de la récupération des parents:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchParents();
  }, [page, searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const endpoint = selectedParent 
      ? `http://localhost:5000/api/parents/${selectedParent.ID}` 
      : 'http://localhost:5000/api/parents';

    const method = selectedParent ? 'PUT' : 'POST';

    fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then((res) => res.json())
      .then(() => {
        fetchParents();
        setFormData({
          full_name: '',
          username: '',
          password: '',
          email: '',
          phone_number: ''
        });
        setShowModal(false);
      })
      .catch((err) => {
        console.error(`Erreur lors de la ${selectedParent ? 'modification' : 'création'} du parent:`, err);
        setLoading(false);
      });
  };

  const deleteParent = (parentId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce parent ?')) {
      setLoading(true);
      fetch(`http://localhost:5000/api/parents/${parentId}`, {
        method: 'DELETE',
      })
        .then((res) => res.json())
        .then(() => {
          fetchParents();
        })
        .catch((err) => {
          console.error('Erreur lors de la suppression du parent:', err);
          setLoading(false);
        });
    }
  };

  const openAddParentModal = () => {
    setSelectedParent(null);
    setFormData({
      full_name: '',
      username: '',
      password: '',
      email: '',
      phone_number: ''
    });
    setShowModal(true);
  };

  const openEditParentModal = (parent) => {
    setSelectedParent(parent);
    setFormData({
      full_name: parent.full_name || '',
      username: parent.username || '',
      password: '',
      email: parent.email || '',
      phone_number: parent.phone_number || ''
    });
    setShowModal(true);
  };

  return (
    <Layout>
      <div className="page-container">
        <div className="page-header">
          <div className="header-content">
            <h1>
              <i className="fas fa-users"></i>
              <span>Gestion des Parents</span>
            </h1>
            <p className="header-description">
              Gérer les comptes et informations des parents
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

            <button 
              className="action-button primary"
              onClick={openAddParentModal}
            >
              <i className="fas fa-plus"></i>
              <span>Ajouter un Parent</span>
            </button>
          </div>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Chargement des parents...</p>
          </div>
        ) : (
          <div className="data-card">
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nom Complet</th>
                    <th>Nom d'utilisateur</th>
                    <th>Email</th>
                    <th>Téléphone</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {parents.length > 0 ? (
                    parents.map((parent) => (
                      <tr key={parent.ID}>
                        <td>{parent.ID}</td>
                        <td>
                          <div className="user-info">
                            <div className="user-avatar">
                              {parent.full_name.charAt(0).toUpperCase()}
                            </div>
                            <span>{parent.full_name}</span>
                          </div>
                        </td>
                        <td>{parent.username}</td>
                        <td>
                          <a href={`mailto:${parent.email}`} className="email-link">
                            {parent.email}
                          </a>
                        </td>
                        <td>{parent.phone_number}</td>
                        <td>
                          <div className="action-buttons">
                            <button 
                              className="icon-button edit"
                              onClick={() => openEditParentModal(parent)}
                              title="Modifier le parent"
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button 
                              className="icon-button view"
                              title="Voir les détails"
                            >
                              <i className="fas fa-eye"></i>
                            </button>
                            <button 
                              className="icon-button delete"
                              onClick={() => deleteParent(parent.ID)}
                              title="Supprimer le parent"
                            >
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
                          <p>Aucun parent trouvé. Essayez de modifier votre recherche.</p>
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

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>
                <i className={`fas ${selectedParent ? 'fa-edit' : 'fa-plus-circle'}`}></i>
                <span>{selectedParent ? 'Modifier le Parent' : 'Ajouter un Nouveau Parent'}</span>
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
                      <span>Nom Complet</span>
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
                        placeholder={selectedParent ? "Laisser vide pour garder l'actuel" : "Entrer le mot de passe"}
                        required={!selectedParent}
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
                      <span>Téléphone</span>
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
                  <button 
                    type="button" 
                    className="button secondary" 
                    onClick={() => setShowModal(false)}
                  >
                    <i className="fas fa-times"></i>
                    <span>Annuler</span>
                  </button>

                  <button 
                    type="submit" 
                    className="button primary"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <div className="spinner-small"></div>
                        <span>Enregistrement...</span>
                      </>
                    ) : (
                      <>
                        <i className={`fas ${selectedParent ? 'fa-save' : 'fa-plus-circle'}`}></i>
                        <span>{selectedParent ? 'Mettre à jour' : 'Ajouter'}</span>
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

export default ParentsPage;
