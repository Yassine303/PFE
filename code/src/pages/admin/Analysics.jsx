import React, { useState, useMemo } from 'react';
import Layout from './Layout';
import './admin.css';

// Custom hook for category data
const useCategoryData = () => {
  const categoryData = [
    { 
      category: 'Étudiant Peu Engagé', 
      count: 17, 
      color: '#0000FF',
      description: 'Étudiants qui montrent une participation minimale aux activités académiques',
      features: {
        'Utilisation Médias Sociaux': 'Variable',
        'Absences/Mois': 'Variable',
        'Stress (1-10)': '≤ 7',
        'Amis': '≥ 3'
      }
    },
    { 
      category: 'Utilisateur Actif de Médias Sociaux', 
      count: 3, 
      color: '#008000',
      description: 'Étudiants avec une utilisation élevée des médias sociaux mais des niveaux de stress gérables',
      features: {
        'Utilisation Médias Sociaux': '> 5',
        'Absences/Mois': 'Variable',
        'Stress (1-10)': '≤ 5',
        'Amis': 'Variable'
      }
    }
  ];
  
  // Model performance metrics based on the classification report
  const modelMetrics = {
    'Accuracy': '85%',
    'Precision': {
      'Étudiant Peu Engagé': '94%',
      'Utilisateur Actif de Médias Sociaux': '75%',
      'Overall': '90%'
    },
    'Recall': {
      'Étudiant Peu Engagé': '89%',
      'Utilisateur Actif de Médias Sociaux': '75%',
      'Overall': '85%'
    },
    'F1-Score': {
      'Étudiant Peu Engagé': '91%',
      'Utilisateur Actif de Médias Sociaux': '75%',
      'Overall': '87%'
    }
  };

  return { categoryData, modelMetrics };
};

// Custom hook for risk data
const useRiskData = () => {
  const riskData = [
    { level: 'Risque Modéré', count: 46, color: '#FFA500', description: 'Étudiants nécessitant une surveillance régulière et une intervention préventive' },
    { level: 'Risque Élevé', count: 33, color: '#FF0000', description: 'Étudiants ayant besoin d\'un soutien immédiat et intensif' },
    { level: 'Risque Faible', count: 21, color: '#008000', description: 'Étudiants sur la bonne voie avec un soutien minimal nécessaire' }
  ];
  
  return riskData;
};

// Component for individual metric
const MetricCard = ({ bgColor, title, value }) => (
  <div className={`${bgColor} rounded p-3 text-center transform transition-transform duration-300 hover:scale-105`}>
    <p className="text-sm text-gray-600">{title}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

// Bar component for chart
const CategoryBar = ({ item, index, totalItems, maxCount, isSelected, onClick }) => {
  const maxHeight = 240;
  const barHeight = (item.count / maxCount) * maxHeight;
  const barWidth = `${(1 / totalItems) * 100 - 10}%`;
  const leftPosition = `${(index / totalItems) * 100 + 5}%`;
  
  return (
    <div 
      className="absolute bottom-0 transition-all duration-300"
      style={{ 
        left: leftPosition, 
        width: barWidth
      }}
    >
      <div 
        className="flex flex-col items-center cursor-pointer"
        onClick={() => onClick(item.category)}
      >
        <div 
          className="w-full rounded-t-lg flex items-end justify-center transition-all shadow-md"
          style={{ 
            backgroundColor: item.color,
            height: `${barHeight}px`,
            opacity: isSelected ? 1 : 0.8,
            transform: isSelected ? 'scaleY(1.05)' : 'scaleY(1)'
          }}
        >
          <span className="text-white font-bold mb-2">{item.count}</span>
        </div>
        <div className="mt-2 text-sm font-medium text-center">
          {item.category}
        </div>
      </div>
    </div>
  );
};

// Component to display category details
const CategoryDetails = ({ category, data, metrics }) => {
  const categoryInfo = data.find(c => c.category === category);
  
  return (
    <div className="bg-gray-50 p-4 rounded-lg mt-6 transition-all duration-300 shadow-md">
      <h3 className="font-bold text-lg text-gray-800 mb-2">
        {category}
      </h3>
      <p className="text-gray-700 mb-3">
        {categoryInfo.description}
      </p>
      
      <h4 className="font-semibold text-gray-700 mb-2">Caractéristiques Principales:</h4>
      <div className="grid grid-cols-2 gap-2">
        {Object.entries(categoryInfo.features).map(([feature, value]) => (
          <div key={feature} className="bg-white p-2 rounded border border-gray-200 hover:bg-gray-50 transition-colors">
            <span className="text-sm font-medium">{feature}:</span> {value}
          </div>
        ))}
      </div>
      
      <h4 className="font-semibold text-gray-700 mt-4 mb-2">Performance du Modèle:</h4>
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-white p-2 rounded border border-gray-200 hover:bg-gray-50 transition-colors">
          <p className="text-xs text-gray-500">Précision</p>
          <p className="font-semibold">
            {metrics.Precision[category] || "N/A"}
          </p>
        </div>
        <div className="bg-white p-2 rounded border border-gray-200 hover:bg-gray-50 transition-colors">
          <p className="text-xs text-gray-500">Rappel</p>
          <p className="font-semibold">
            {metrics.Recall[category] || "N/A"}
          </p>
        </div>
        <div className="bg-white p-2 rounded border border-gray-200 hover:bg-gray-50 transition-colors">
          <p className="text-xs text-gray-500">Score F1</p>
          <p className="font-semibold">
            {metrics['F1-Score'][category] || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

// Main component for predicted student categories
const PredictedStudentCategories = () => {
  const { categoryData, modelMetrics } = useCategoryData();
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  const totalStudents = useMemo(() => 
    categoryData.reduce((sum, item) => sum + item.count, 0), 
    [categoryData]
  );
  
  const maxCount = useMemo(() => 
    Math.max(...categoryData.map(d => d.count)), 
    [categoryData]
  );
  
  // Function to handle bar click
  const handleBarClick = (category) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };
  
  return (
    <div className="flex flex-col bg-white rounded-lg shadow-lg p-6 max-w-4xl transform transition-all duration-500 hover:shadow-xl">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Catégories d'Étudiants Prédites</h1>
      <p className="text-center text-gray-600 mb-6">Résultats du Modèle d'Apprentissage Automatique (Forêt Aléatoire)</p>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <MetricCard bgColor="bg-blue-50" title="Total Prédit" value={totalStudents} />
        <MetricCard bgColor="bg-green-50" title="Précision du Modèle" value={modelMetrics.Accuracy} />
        <MetricCard bgColor="bg-purple-50" title="Précision Globale" value={modelMetrics.Precision.Overall} />
        <MetricCard bgColor="bg-yellow-50" title="Score F1 Global" value={modelMetrics['F1-Score'].Overall} />
      </div>
      
      {/* Chart */}
      <div className="relative h-64 mb-4">
        {categoryData.map((item, index) => (
          <CategoryBar 
            key={item.category}
            item={item}
            index={index}
            totalItems={categoryData.length}
            maxCount={maxCount}
            isSelected={selectedCategory === item.category}
            onClick={handleBarClick}
          />
        ))}
      </div>
      
      {/* Category Details */}
      {selectedCategory && (
        <CategoryDetails 
          category={selectedCategory} 
          data={categoryData} 
          metrics={modelMetrics} 
        />
      )}
      
      {!selectedCategory && (
        <div className="text-center text-gray-600 mt-4 p-4 bg-gray-50 rounded-lg transform transition-all duration-300 hover:bg-gray-100">
          Cliquez sur une barre de catégorie pour voir des informations détaillées
        </div>
      )}
      
      {/* Model Information */}
      <div className="mt-8 text-sm text-gray-600 border-t pt-4">
        <p className="font-medium">À propos du Modèle:</p>
        <p>Classificateur de Forêt Aléatoire avec 100 estimateurs entraînés sur les données comportementales des étudiants</p>
        <p>Caractéristiques: Utilisation des Médias Sociaux, Absences/Mois, Niveau de Stress, Nombre d'Amis</p>
      </div>
    </div>
  );
};

// Risk Card Component
const RiskCard = ({ category, totalStudents }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4 shadow text-center transition-all duration-300 hover:shadow-md hover:translate-y-1">
      <h3 className="text-lg font-semibold" style={{ color: category.color }}>{category.level}</h3>
      <p className="text-3xl font-bold my-2">{category.count}</p>
      <p className="text-sm text-gray-600">{((category.count / totalStudents) * 100).toFixed(1)}% des étudiants</p>
    </div>
  );
};

// Risk Bar Component
const RiskBar = ({ category, index, totalCategories, maxCount, isHighlighted, onMouseEnter, onMouseLeave }) => {
  const barWidth = `${(1 / totalCategories) * 100}%`;
  const leftPosition = `${(index / totalCategories) * 100}%`;
  const maxHeight = 220;
  const heightPercentage = category.count / maxCount;
  const barHeight = maxHeight * heightPercentage;
  
  return (
    <div 
      className="absolute bottom-0 transition-all duration-300 flex flex-col items-center justify-end cursor-pointer"
      style={{ 
        left: leftPosition, 
        width: barWidth,
        height: `${barHeight}px`,
        transform: isHighlighted ? 'translateY(-5px)' : 'translateY(0)',
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div 
        className="w-4/5 rounded-t-lg flex items-end justify-center shadow-lg"
        style={{ 
          backgroundColor: category.color,
          height: '100%',
          opacity: isHighlighted ? 1 : 0.85
        }}
      >
        <span className="text-white font-bold mb-2">{category.count}</span>
      </div>
      <div className="mt-2 text-sm font-medium text-center w-full">{category.level}</div>
    </div>
  );
};

// Student Risk Chart Component
const StudentRiskChart = () => {
  const riskData = useRiskData();
  const [highlightedBar, setHighlightedBar] = useState(null);
  
  const totalStudents = useMemo(() => 
    riskData.reduce((sum, category) => sum + category.count, 0),
    [riskData]
  );
  
  const maxCount = useMemo(() => 
    Math.max(...riskData.map(d => d.count)),
    [riskData]
  );
  
  return (
    <div className="flex flex-col bg-white rounded-lg shadow-lg p-6 max-w-4xl transform transition-all duration-500 hover:shadow-xl">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Distribution des Niveaux de Risque des Étudiants</h1>
      <p className="text-center text-gray-600 mb-6">Total des Étudiants: {totalStudents}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {riskData.map((category) => (
          <RiskCard 
            key={category.level}
            category={category}
            totalStudents={totalStudents}
          />
        ))}
      </div>
      
      <div className="relative h-64 mb-4">
        {riskData.map((category, index) => (
          <RiskBar 
            key={category.level}
            category={category}
            index={index}
            totalCategories={riskData.length}
            maxCount={maxCount}
            isHighlighted={highlightedBar === category.level}
            onMouseEnter={() => setHighlightedBar(category.level)}
            onMouseLeave={() => setHighlightedBar(null)}
          />
        ))}
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg mt-4 shadow-sm">
        <h3 className="font-semibold text-gray-700 mb-2">Descriptions des Niveaux de Risque:</h3>
        <ul className="space-y-2">
          {riskData.map((category) => (
            <li key={category.level} className="flex items-start transform transition-all duration-300 hover:translate-x-1">
              <div className="h-4 w-4 mt-1 mr-2 rounded-sm" style={{ backgroundColor: category.color }}></div>
              <div>
                <span className="font-medium">{category.level}:</span> {category.description}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Navigation Button
const NavButton = ({ active, icon, label, onClick }) => (
  <button 
    className={`flex-1 py-4 px-6 text-center font-medium transition-all duration-200 flex items-center justify-center ${
      active 
        ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' 
        : 'text-gray-600 hover:bg-gray-50'
    }`}
    onClick={onClick}
  >
    <i className={`fas ${icon} mr-2`}></i>
    {label}
  </button>
);

// Main Analytics component
const Analytics = () => {
  const [activeView, setActiveView] = useState('classification'); // Default view

  return (
    <Layout>
      <div className="page-container">
        <div className="page-header">
          <div className="header-content">
            <h1 className="flex items-center">
              <i className="fas fa-tachometer-alt mr-2"></i>
              <span>Analyses</span>
            </h1>
          </div>
        </div>

        {/* Navigation Bar */}
        <div className="bg-white shadow-sm mb-6 rounded-lg">
          <nav className="flex">
            <NavButton 
              active={activeView === 'classification'}
              icon="fa-chart-pie"
              label="Analyse de Classification"
              onClick={() => setActiveView('classification')}
            />
            <NavButton 
              active={activeView === 'clustering'}
              icon="fa-users"
              label="Analyse de Clustering"
              onClick={() => setActiveView('clustering')}
            />
          </nav>
        </div>

        {/* Content based on active view */}
        <div className="flex justify-center">
          {activeView === 'classification' ? (
            <PredictedStudentCategories />
          ) : (
            <StudentRiskChart />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Analytics;