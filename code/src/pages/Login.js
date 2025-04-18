import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, role }),
      });

      const data = await response.json();
      if (data.success) {
        localStorage.setItem('user', JSON.stringify(data));
        console.log("Utilisateur enregistré dans localStorage:", JSON.parse(localStorage.getItem('user')));
        
        switch(data.role) {
          case 'admin':
            navigate('/admin-dashboard');
            break;
          case 'teacher':
            navigate('/teacher-children');
            break;
          case 'parent':
            navigate('/children');
            break;
          default:
            setError('Rôle invalide');
        }
      } else {
        setError(data.message || 'Échec de connexion');
      }
    } catch (error) {
      console.error('Erreur de connexion:', error);
      setError('Une erreur est survenue lors de la connexion');
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-brand">
          <span className="brand-icon">🛡️</span>
          <h1 className="brand-text">AntiHarcèlement</h1>
        </div>
        
        <div className="login-content">
          <div className="login-info">
            <h2>Portail de Prévention du Harcèlement Scolaire</h2>
            <p>Créer un environnement d'apprentissage sûr pour tous les élèves. Ensemble, nous pouvons identifier, signaler et traiter le harcèlement dans les écoles pour favoriser une communauté respectueuse et solidaire.</p>
          </div>
          
          <div className="login-form-container">
            <h3>CONNEXION UTILISATEUR</h3>
            
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}
            
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="username">Nom d'utilisateur</label>
                <div className="input-with-icon">
                  <i className="fas fa-user"></i>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Mot de passe</label>
                <div className="input-with-icon">
                  <i className="fas fa-lock"></i>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button 
                    type="button" 
                    className="toggle-password"
                    onClick={handleTogglePasswordVisibility}
                  >
                    <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </button>
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="role">Rôle</label>
                <div className="input-with-icon">
                  <i className="fas fa-id-badge"></i>
                  <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                  >
                    <option value="" disabled>Sélectionner un rôle</option>
                    <option value="admin">Administrateur</option>
                    <option value="teacher">Enseignant</option>
                    <option value="parent">Parent</option>
                  </select>
                </div>
              </div>
              
              <div className="form-options">
                <div className="remember-me">
                  <input type="checkbox" id="remember" />
                  <label htmlFor="remember">Se souvenir de moi</label>
                </div>
                <a href="#forgot" className="forgot-link">Mot de passe oublié?</a>
              </div>
              
              <button type="submit" className="login-button">
                Se Connecter
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;