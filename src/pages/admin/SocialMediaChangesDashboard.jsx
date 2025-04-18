import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';

export default function SocialMediaChangesDashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  
  useEffect(() => {
    // Simulation de récupération de données - représente votre fichier CSV
    const socialMediaData = [
      {'ID': 1, 'Activity Change': 'No Change', 'Account Changes': 'Changed Privacy', 'Emotional Posts': 'No', 'Content Deletion': 'Yes'},
      {'ID': 2, 'Activity Change': 'Decreased', 'Account Changes': 'None', 'Emotional Posts': 'No', 'Content Deletion': 'No'},
      {'ID': 3, 'Activity Change': 'Increased', 'Account Changes': 'Changed Privacy', 'Emotional Posts': 'No', 'Content Deletion': 'No'},
      {'ID': 4, 'Activity Change': 'Increased', 'Account Changes': 'Created New', 'Emotional Posts': 'Yes', 'Content Deletion': 'Yes'},
      {'ID': 5, 'Activity Change': 'No Change', 'Account Changes': 'Created New', 'Emotional Posts': 'No', 'Content Deletion': 'No'},
      {'ID': 6, 'Activity Change': 'Increased', 'Account Changes': 'None', 'Emotional Posts': 'No', 'Content Deletion': 'No'},
      {'ID': 7, 'Activity Change': 'No Change', 'Account Changes': 'Changed Privacy', 'Emotional Posts': 'Yes', 'Content Deletion': 'No'},
      {'ID': 8, 'Activity Change': 'Increased', 'Account Changes': 'Deleted', 'Emotional Posts': 'No', 'Content Deletion': 'No'},
      {'ID': 9, 'Activity Change': 'No Change', 'Account Changes': 'None', 'Emotional Posts': 'No', 'Content Deletion': 'No'},
      {'ID': 10, 'Activity Change': 'Increased', 'Account Changes': 'Created New', 'Emotional Posts': 'No', 'Content Deletion': 'Yes'},
      // Les 10 premières entrées pour la démonstration - dans une application réelle, vous incluriez toutes les 100 entrées
    ];
    
    // Traduire les valeurs en français
    const translatedData = socialMediaData.map(item => ({
      'ID': item.ID,
      'Activity Change': item['Activity Change'] === 'No Change' ? 'Aucun changement' : 
                        item['Activity Change'] === 'Decreased' ? 'Diminué' : 'Augmenté',
      'Account Changes': item['Account Changes'] === 'None' ? 'Aucun' :
                        item['Account Changes'] === 'Changed Privacy' ? 'Confidentialité modifiée' :
                        item['Account Changes'] === 'Created New' ? 'Nouveau compte' : 'Supprimé',
      'Emotional Posts': item['Emotional Posts'] === 'No' ? 'Non' : 'Oui',
      'Content Deletion': item['Content Deletion'] === 'No' ? 'Non' : 'Oui'
    }));
    
    // Pour la démonstration, nous allons simuler l'importation de toutes les 100 entrées
    // En utilisant les proportions du fichier original pour générer les données complètes
    const fullDataset = [];
    
    // Distributions des données d'origine
    const activityChanges = ['Aucun changement', 'Diminué', 'Augmenté'];
    const activityDist = [0.4, 0.2, 0.4]; // Approximativement
    
    const accountChanges = ['Aucun', 'Confidentialité modifiée', 'Nouveau compte', 'Supprimé'];
    const accountDist = [0.2, 0.35, 0.25, 0.2]; // Approximativement
    
    const emotionalPosts = ['Non', 'Oui'];
    const emotionalDist = [0.75, 0.25]; // Approximativement
    
    const contentDeletion = ['Non', 'Oui'];
    const deletionDist = [0.65, 0.35]; // Approximativement
    
    // Générer 100 entrées basées sur les distributions approximatives
    for (let i = 1; i <= 100; i++) {
      const randomActivity = getRandomFromDist(activityChanges, activityDist);
      const randomAccount = getRandomFromDist(accountChanges, accountDist);
      const randomEmotional = getRandomFromDist(emotionalPosts, emotionalDist);
      const randomDeletion = getRandomFromDist(contentDeletion, deletionDist);
      
      fullDataset.push({
        'ID': i,
        'Activity Change': randomActivity,
        'Account Changes': randomAccount,
        'Emotional Posts': randomEmotional,
        'Content Deletion': randomDeletion
      });
    }
    
    setTimeout(() => {
      setData(fullDataset);
      setLoading(false);
    }, 500);
  }, []);
  
  // Fonction utilitaire pour sélectionner des valeurs en fonction de leur distribution
  function getRandomFromDist(values, distribution) {
    const rand = Math.random();
    let cumulativeProbability = 0;
    
    for (let i = 0; i < values.length; i++) {
      cumulativeProbability += distribution[i];
      if (rand <= cumulativeProbability) {
        return values[i];
      }
    }
    
    return values[0];
  }
  
  // Préparer les données agrégées pour les graphiques
  const getActivityDistribution = () => {
    const activities = {};
    data.forEach(item => {
      activities[item['Activity Change']] = (activities[item['Activity Change']] || 0) + 1;
    });
    return Object.keys(activities).map(activity => ({
      name: activity,
      value: activities[activity]
    }));
  };
  
  const getAccountChangesDistribution = () => {
    const changes = {};
    data.forEach(item => {
      changes[item['Account Changes']] = (changes[item['Account Changes']] || 0) + 1;
    });
    return Object.keys(changes).map(change => ({
      name: change,
      value: changes[change]
    }));
  };
  
  const getEmotionalPostsDistribution = () => {
    const emotional = {
      'Oui': data.filter(item => item['Emotional Posts'] === 'Oui').length,
      'Non': data.filter(item => item['Emotional Posts'] === 'Non').length
    };
    return Object.keys(emotional).map(key => ({
      name: key,
      value: emotional[key]
    }));
  };
  
  const getContentDeletionDistribution = () => {
    const deletion = {
      'Oui': data.filter(item => item['Content Deletion'] === 'Oui').length,
      'Non': data.filter(item => item['Content Deletion'] === 'Non').length
    };
    return Object.keys(deletion).map(key => ({
      name: key,
      value: deletion[key]
    }));
  };
  
  const getCombinedTrends = () => {
    const activities = ['Augmenté', 'Diminué', 'Aucun changement'];
    const metrics = [];
    
    activities.forEach(activity => {
      const filteredData = data.filter(item => item['Activity Change'] === activity);
      const total = filteredData.length;
      
      if (total > 0) {
        const emotionalCount = filteredData.filter(item => item['Emotional Posts'] === 'Oui').length;
        const deletionCount = filteredData.filter(item => item['Content Deletion'] === 'Oui').length;
        
        metrics.push({
          name: activity,
          users: total,
          emotionalPercent: (emotionalCount / total * 100).toFixed(1),
          deletionPercent: (deletionCount / total * 100).toFixed(1)
        });
      }
    });
    
    return metrics;
  };
  
  const getAccountChangeAnalysis = () => {
    const accountTypes = ['Confidentialité modifiée', 'Nouveau compte', 'Supprimé', 'Aucun'];
    const analysis = [];
    
    accountTypes.forEach(type => {
      const usersWithThisChange = data.filter(item => item['Account Changes'] === type);
      const total = usersWithThisChange.length;
      
      if (total > 0) {
        const increasedActivity = usersWithThisChange.filter(item => item['Activity Change'] === 'Augmenté').length;
        const deletedContent = usersWithThisChange.filter(item => item['Content Deletion'] === 'Oui').length;
        const emotionalPosts = usersWithThisChange.filter(item => item['Emotional Posts'] === 'Oui').length;
        
        analysis.push({
          name: type,
          count: total,
          increasedActivityPercent: (increasedActivity / total * 100).toFixed(1),
          deletedContentPercent: (deletedContent / total * 100).toFixed(1),
          emotionalPostsPercent: (emotionalPosts / total * 100).toFixed(1)
        });
      }
    });
    
    return analysis;
  };
  
  // COULEURS pour les graphiques
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }
  
  return (
    <Layout>
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8">
            <h1 className="text-3xl font-bold text-white">Analyse des Changements sur les Médias Sociaux</h1>
            <p className="text-blue-100 mt-2">Analyse des modifications d'activité et de comportement des utilisateurs</p>
          </div>
          
          {/* Onglets */}
          <div className="bg-white border-b">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-6 text-center font-medium text-sm transition-all duration-200 ${
                  activeTab === 'overview'
                    ? 'border-b-2 border-blue-500 text-blue-600 bg-blue-50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                Vue d'ensemble
              </button>
              <button
                onClick={() => setActiveTab('activity')}
                className={`py-4 px-6 text-center font-medium text-sm transition-all duration-200 ${
                  activeTab === 'activity'
                    ? 'border-b-2 border-blue-500 text-blue-600 bg-blue-50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                Activité & Comportement
              </button>
              <button
                onClick={() => setActiveTab('accounts')}
                className={`py-4 px-6 text-center font-medium text-sm transition-all duration-200 ${
                  activeTab === 'accounts'
                    ? 'border-b-2 border-blue-500 text-blue-600 bg-blue-50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                Modifications de compte
              </button>
              <button
                onClick={() => setActiveTab('data')}
                className={`py-4 px-6 text-center font-medium text-sm transition-all duration-200 ${
                  activeTab === 'data'
                    ? 'border-b-2 border-blue-500 text-blue-600 bg-blue-50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                Données brutes
              </button>
            </nav>
          </div>
        </div>
        
        {/* Zone de contenu */}
        <div className="space-y-6">
          {/* Onglet Vue d'ensemble */}
          {activeTab === 'overview' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">Distribution des changements d'activité</h2>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={getActivityDistribution()}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {getActivityDistribution().map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value, name) => [value, name]} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">Distribution des modifications de compte</h2>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={getAccountChangesDistribution()}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {getAccountChangesDistribution().map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value, name) => [value, name]} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">Publications émotionnelles</h2>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={getEmotionalPostsDistribution()}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {getEmotionalPostsDistribution().map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.name === 'Oui' ? '#EF4444' : '#3B82F6'} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value, name) => [value, name]} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">Suppression de contenu</h2>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={getContentDeletionDistribution()}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {getContentDeletionDistribution().map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.name === 'Oui' ? '#F59E0B' : '#10B981'} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value, name) => [value, name]} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Métriques clés</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <div className="text-xl font-bold text-blue-600 mb-1">{data.length}</div>
                    <div className="text-sm text-blue-800">Utilisateurs totaux</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                    <div className="text-xl font-bold text-green-600 mb-1">
                      {data.filter(item => item['Activity Change'] === 'Augmenté').length}
                    </div>
                    <div className="text-sm text-green-800">Activité augmentée</div>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                    <div className="text-xl font-bold text-yellow-600 mb-1">
                      {data.filter(item => item['Emotional Posts'] === 'Oui').length}
                    </div>
                    <div className="text-sm text-yellow-800">Publications émotionnelles</div>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                    <div className="text-xl font-bold text-red-600 mb-1">
                      {data.filter(item => item['Content Deletion'] === 'Oui').length}
                    </div>
                    <div className="text-sm text-red-800">Contenu supprimé</div>
                  </div>
                </div>
              </div>
            </>
          )}
          
          {/* Onglet Activité et Comportement */}
          {activeTab === 'activity' && (
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Tendances comportementales par activité</h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={getCombinedTrends()}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis label={{ value: 'Pourcentage (%)', angle: -90, position: 'insideLeft' }} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="emotionalPercent" name="Publications émotionnelles %" fill="#EF4444" />
                      <Bar dataKey="deletionPercent" name="Contenu supprimé %" fill="#F59E0B" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">Activité vs Publications émotionnelles</h2>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={getCombinedTrends()}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis yAxisId="left" label={{ value: 'Utilisateurs', angle: -90, position: 'insideLeft' }} />
                        <YAxis yAxisId="right" orientation="right" label={{ value: '% Émotionnel', angle: 90, position: 'insideRight' }} />
                        <Tooltip />
                        <Legend />
                        <Line yAxisId="left" type="monotone" dataKey="users" name="Nombre d'utilisateurs" stroke="#8884d8" />
                        <Line yAxisId="right" type="monotone" dataKey="emotionalPercent" name="Publications émotionnelles %" stroke="#EF4444" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">Activité vs Suppression de contenu</h2>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={getCombinedTrends()}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis yAxisId="left" label={{ value: 'Utilisateurs', angle: -90, position: 'insideLeft' }} />
                        <YAxis yAxisId="right" orientation="right" label={{ value: '% Suppression', angle: 90, position: 'insideRight' }} />
                        <Tooltip />
                        <Legend />
                        <Line yAxisId="left" type="monotone" dataKey="users" name="Nombre d'utilisateurs" stroke="#8884d8" />
                        <Line yAxisId="right" type="monotone" dataKey="deletionPercent" name="Contenu supprimé %" stroke="#F59E0B" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Onglet Modifications de compte */}
          {activeTab === 'accounts' && (
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Analyse des modifications de compte</h2>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={getAccountChangeAnalysis()}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 30,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis label={{ value: 'Pourcentage (%)', angle: -90, position: 'insideLeft' }} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="increasedActivityPercent" name="Activité augmentée %" fill="#10B981" />
                      <Bar dataKey="deletedContentPercent" name="Contenu supprimé %" fill="#F59E0B" />
                      <Bar dataKey="emotionalPostsPercent" name="Publications émotionnelles %" fill="#EF4444" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">Distribution des modifications de compte</h2>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={getAccountChangesDistribution()}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {getAccountChangesDistribution().map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value, name) => [value, name]} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">Comportements par type de modification</h2>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={getAccountChangeAnalysis()}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis label={{ value: 'Pourcentage (%)', angle: -90, position: 'insideLeft' }} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="increasedActivityPercent" name="Activité augmentée %" stroke="#10B981" />
                        <Line type="monotone" dataKey="deletedContentPercent" name="Contenu supprimé %" stroke="#F59E0B" />
                        <Line type="monotone" dataKey="emotionalPostsPercent" name="Publications émotionnelles %" stroke="#EF4444" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Onglet Données brutes */}
          {activeTab === 'data' && (
            <div className="bg-white p-6 rounded-xl shadow-md overflow-x-auto">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Données brutes</h2>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Changement d'activité</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Modifications de compte</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Publications émotionnelles</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Suppression de contenu</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.slice(0, 20).map((user) => (
                    <tr key={user.ID} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.ID}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user['Activity Change']}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user['Account Changes']}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span 
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user['Emotional Posts'] === 'Oui' 
                              ? 'bg-red-100 text-red-800' 
                              : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {user['Emotional Posts']}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span 
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user['Content Deletion'] === 'Oui' 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {user['Content Deletion']}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Affichage des 20 premiers enregistrements sur {data.length}.
                </div>
                <div className="flex-1 flex justify-center">
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      <span className="sr-only">Précédent</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button
                      className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-indigo-600 hover:bg-gray-50"
                    >
                      1
                    </button>
                    <button
                      className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      2
                    </button>
                    <button
                      className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      3
                    </button>
                    <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                      ...
                    </span>
                    <button
                      className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      5
                    </button>
                    <button
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      <span className="sr-only">Suivant</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
          
          {/* Footer avec infos explicatives */}
          <div className="bg-gray-100 p-6 rounded-xl text-sm text-gray-600 mt-4">
            <h3 className="font-medium text-gray-800 mb-2">À propos de cette analyse</h3>
            <p>Cette visualisation montre les résultats d'une étude sur les changements de comportement des utilisateurs sur les médias sociaux pendant une période spécifique. Les données représentent un échantillon de 100 utilisateurs.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <h4 className="font-medium text-gray-700 mb-1">Légende des métriques :</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li><span className="font-medium">Changement d'activité</span> - Comment l'activité d'un utilisateur a changé</li>
                  <li><span className="font-medium">Modifications de compte</span> - Actions prises sur le profil</li>
                  <li><span className="font-medium">Publications émotionnelles</span> - Si l'utilisateur a partagé du contenu émotionnel</li>
                  <li><span className="font-medium">Suppression de contenu</span> - Si l'utilisateur a supprimé du contenu existant</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-1">Analyse avancée :</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Les utilisateurs ayant augmenté leur activité ont tendance à créer de nouveaux comptes</li>
                  <li>La suppression de contenu est plus fréquente chez les utilisateurs qui changent leurs paramètres de confidentialité</li>
                  <li>Les publications émotionnelles sont généralement moins fréquentes que la suppression de contenu</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
}