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

export default function PlatformBehaviorDashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  
  useEffect(() => {
    // Simulation de récupération de données - à remplacer par un appel API réel
    const platformData = [
      {'ID': 1, 'Primary Platforms': 'Instagram', 'Secondary Platforms': 'Reddit', 'Public Personal Info': 'Oui', 'Online Conflicts': 'Non', 'Suspicious Interactions': 'Oui'},
      {'ID': 2, 'Primary Platforms': 'Instagram', 'Secondary Platforms': 'TikTok', 'Public Personal Info': 'Non', 'Online Conflicts': 'Non', 'Suspicious Interactions': 'Non'},
      {'ID': 3, 'Primary Platforms': 'Instagram', 'Secondary Platforms': 'Aucune', 'Public Personal Info': 'Non', 'Online Conflicts': 'Non', 'Suspicious Interactions': 'Non'},
      {'ID': 4, 'Primary Platforms': 'Instagram', 'Secondary Platforms': 'Discord', 'Public Personal Info': 'Oui', 'Online Conflicts': 'Non', 'Suspicious Interactions': 'Non'},
      {'ID': 5, 'Primary Platforms': 'Reddit', 'Secondary Platforms': 'Aucune', 'Public Personal Info': 'Non', 'Online Conflicts': 'Non', 'Suspicious Interactions': 'Non'},
      {'ID': 6, 'Primary Platforms': 'TikTok', 'Secondary Platforms': 'Snapchat', 'Public Personal Info': 'Oui', 'Online Conflicts': 'Non', 'Suspicious Interactions': 'Non'},
      {'ID': 7, 'Primary Platforms': 'Snapchat', 'Secondary Platforms': 'Reddit', 'Public Personal Info': 'Oui', 'Online Conflicts': 'Non', 'Suspicious Interactions': 'Oui'},
      {'ID': 8, 'Primary Platforms': 'Reddit', 'Secondary Platforms': 'Aucune', 'Public Personal Info': 'Non', 'Online Conflicts': 'Oui', 'Suspicious Interactions': 'Non'},
      {'ID': 9, 'Primary Platforms': 'Instagram', 'Secondary Platforms': 'Discord', 'Public Personal Info': 'Non', 'Online Conflicts': 'Non', 'Suspicious Interactions': 'Non'},
      {'ID': 10, 'Primary Platforms': 'Instagram', 'Secondary Platforms': 'Aucune', 'Public Personal Info': 'Oui', 'Online Conflicts': 'Non', 'Suspicious Interactions': 'Non'}
      // Tronqué par souci de concision - dans une application réelle, vous incluriez tous les 100 enregistrements
    ];
    
    setTimeout(() => {
      setData(platformData);
      setLoading(false);
    }, 500);
  }, []);
  
  // Préparation des données agrégées pour les graphiques
  const getPrimaryPlatformDistribution = () => {
    const platforms = {};
    data.forEach(item => {
      platforms[item['Primary Platforms']] = (platforms[item['Primary Platforms']] || 0) + 1;
    });
    return Object.keys(platforms).map(platform => ({
      name: platform,
      value: platforms[platform]
    }));
  };
  
  const getSecondaryPlatformDistribution = () => {
    const platforms = {};
    data.forEach(item => {
      platforms[item['Secondary Platforms']] = (platforms[item['Secondary Platforms']] || 0) + 1;
    });
    return Object.keys(platforms).map(platform => ({
      name: platform,
      value: platforms[platform]
    }));
  };
  
  const getPlatformCombinationTrend = () => {
    const combinations = {};
    data.forEach(item => {
      const combo = `${item['Primary Platforms']} + ${item['Secondary Platforms']}`;
      if (!combinations[combo]) {
        combinations[combo] = {
          name: combo,
          publicInfo: 0,
          conflicts: 0,
          suspicious: 0,
          count: 0
        };
      }
      
      if (item['Public Personal Info'] === 'Oui') combinations[combo].publicInfo++;
      if (item['Online Conflicts'] === 'Oui') combinations[combo].conflicts++;
      if (item['Suspicious Interactions'] === 'Oui') combinations[combo].suspicious++;
      combinations[combo].count++;
    });
    
    return Object.values(combinations)
      .filter(item => item.count > 2) // Filtrer pour n'afficher que les combinaisons courantes
      .map(item => ({
        ...item,
        publicInfoRate: (item.publicInfo / item.count * 100).toFixed(1),
        conflictsRate: (item.conflicts / item.count * 100).toFixed(1),
        suspiciousRate: (item.suspicious / item.count * 100).toFixed(1),
      }));
  };
  
  const getPlatformRiskMetrics = () => {
    const platforms = ['Instagram', 'Reddit', 'TikTok', 'Snapchat', 'Discord'];
    const metrics = [];
    
    platforms.forEach(platform => {
      const primaryUsers = data.filter(item => item['Primary Platforms'] === platform);
      const secondaryUsers = data.filter(item => item['Secondary Platforms'] === platform);
      const allUsers = [...primaryUsers, ...secondaryUsers];
      
      if (allUsers.length > 0) {
        const publicInfoCount = allUsers.filter(item => item['Public Personal Info'] === 'Oui').length;
        const conflictsCount = allUsers.filter(item => item['Online Conflicts'] === 'Oui').length;
        const suspiciousCount = allUsers.filter(item => item['Suspicious Interactions'] === 'Oui').length;
        
        metrics.push({
          name: platform,
          users: allUsers.length,
          publicInfoPercent: (publicInfoCount / allUsers.length * 100).toFixed(1),
          conflictsPercent: (conflictsCount / allUsers.length * 100).toFixed(1),
          suspiciousPercent: (suspiciousCount / allUsers.length * 100).toFixed(1)
        });
      }
    });
    
    return metrics;
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
            <h1 className="text-3xl font-bold text-white">Analyse du Comportement sur les Plateformes</h1>
            <p className="text-blue-100 mt-2">Analyse de l'utilisation des réseaux sociaux et des comportements associés</p>
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
                onClick={() => setActiveTab('risk')}
                className={`py-4 px-6 text-center font-medium text-sm transition-all duration-200 ${
                  activeTab === 'risk'
                    ? 'border-b-2 border-blue-500 text-blue-600 bg-blue-50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                Analyse des risques
              </button>
              <button
                onClick={() => setActiveTab('trends')}
                className={`py-4 px-6 text-center font-medium text-sm transition-all duration-200 ${
                  activeTab === 'trends'
                    ? 'border-b-2 border-blue-500 text-blue-600 bg-blue-50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                Tendances des plateformes
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
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">Distribution des plateformes principales</h2>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={getPrimaryPlatformDistribution()}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {getPrimaryPlatformDistribution().map((entry, index) => (
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
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">Distribution des plateformes secondaires</h2>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={getSecondaryPlatformDistribution()}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {getSecondaryPlatformDistribution().map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value, name) => [value, name]} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-md md:col-span-2">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">Informations publiques par plateforme</h2>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={getPlatformRiskMetrics()}
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
                        <Bar dataKey="publicInfoPercent" name="Infos publiques %" fill="#3B82F6" />
                      </BarChart>
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
                      {data.filter(item => item['Public Personal Info'] === 'Oui').length}
                    </div>
                    <div className="text-sm text-green-800">Utilisateurs avec infos publiques</div>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                    <div className="text-xl font-bold text-yellow-600 mb-1">
                      {data.filter(item => item['Online Conflicts'] === 'Oui').length}
                    </div>
                    <div className="text-sm text-yellow-800">Utilisateurs avec conflits en ligne</div>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                    <div className="text-xl font-bold text-red-600 mb-1">
                      {data.filter(item => item['Suspicious Interactions'] === 'Oui').length}
                    </div>
                    <div className="text-sm text-red-800">Utilisateurs avec interactions suspectes</div>
                  </div>
                </div>
              </div>
            </>
          )}
          
          {/* Onglet Analyse des risques */}
          {activeTab === 'risk' && (
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Facteurs de risque par plateforme</h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={getPlatformRiskMetrics()}
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
                      <Line type="monotone" dataKey="publicInfoPercent" name="Infos publiques %" stroke="#3B82F6" activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="conflictsPercent" name="Conflits %" stroke="#EF4444" />
                      <Line type="monotone" dataKey="suspiciousPercent" name="Interactions suspectes %" stroke="#F59E0B" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">Infos publiques par plateforme</h2>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={getPlatformRiskMetrics()}
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
                        <Bar dataKey="publicInfoPercent" name="Infos publiques %" fill="#3B82F6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">Interactions suspectes par plateforme</h2>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={getPlatformRiskMetrics()}
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
                        <Bar dataKey="suspiciousPercent" name="Interactions suspectes %" fill="#F59E0B" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Onglet Tendances des plateformes */}
          {activeTab === 'trends' && (
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Analyse des risques par combinaison de plateformes</h2>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={getPlatformCombinationTrend()}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 30,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
                      <YAxis label={{ value: 'Pourcentage (%)', angle: -90, position: 'insideLeft' }} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="publicInfoRate" name="Infos publiques %" stroke="#3B82F6" />
                      <Line type="monotone" dataKey="conflictsRate" name="Conflits %" stroke="#EF4444" />
                      <Line type="monotone" dataKey="suspiciousRate" name="Interactions suspectes %" stroke="#F59E0B" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Utilisation des plateformes vs Facteurs de risque</h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={getPlatformRiskMetrics().sort((a, b) => b.users - a.users)}
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
                      <YAxis yAxisId="right" orientation="right" label={{ value: 'Risques %', angle: 90, position: 'insideRight' }} />
                      <Tooltip />
                      <Legend />
                      <Line yAxisId="left" type="monotone" dataKey="users" name="Nombre d'utilisateurs" stroke="#8884d8" />
                      <Line yAxisId="right" type="monotone" dataKey="publicInfoPercent" name="Infos publiques %" stroke="#3B82F6" />
                      <Line yAxisId="right" type="monotone" dataKey="suspiciousPercent" name="Interactions suspectes %" stroke="#F59E0B" />
                    </LineChart>
                  </ResponsiveContainer>
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
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plateforme principale</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plateforme secondaire</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Infos publiques</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conflits en ligne</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interactions suspectes</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.map((user) => (
                    <tr key={user.ID} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.ID}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user['Primary Platforms']}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user['Secondary Platforms']}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user['Public Personal Info']}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user['Online Conflicts']}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user['Suspicious Interactions']}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        
        {/* Section Résumé */}
        <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Résumé et Conclusions</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-lg font-medium text-gray-800">Utilisation des plateformes</h3>
              <p className="text-gray-600 mt-1">
                Instagram et Snapchat sont les plateformes principales les plus couramment utilisées, tandis que Reddit est un choix populaire comme plateforme secondaire.
                Un nombre significatif d'utilisateurs (environ 15%) n'utilisent aucune plateforme secondaire.
              </p>
            </div>
            
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="text-lg font-medium text-gray-800">Analyse des risques</h3>
              <p className="text-gray-600 mt-1">
                Les utilisateurs qui combinent certaines plateformes (par exemple, Snapchat + Reddit) présentent des taux plus élevés d'interactions suspectes.
                Environ 40% des utilisateurs partagent publiquement des informations personnelles, ce qui peut présenter des risques pour la vie privée.
              </p>
            </div>
            
            <div className="border-l-4 border-yellow-500 pl-4">
              <h3 className="text-lg font-medium text-gray-800">Sécurité des plateformes</h3>
              <p className="text-gray-600 mt-1">
                Les conflits en ligne semblent plus fréquents sur Reddit par rapport aux autres plateformes.
                Les utilisateurs de TikTok avec des plateformes secondaires ont tendance à partager plus d'informations personnelles publiquement que les autres combinaisons de plateformes.
              </p>
            </div>
            
            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="text-lg font-medium text-gray-800">Recommandations</h3>
              <p className="text-gray-600 mt-1">
                Envisager une éducation supplémentaire à la vie privée pour les utilisateurs de combinaisons de plateformes à haut risque.
                Surveiller les interactions suspectes sur les plateformes présentant des profils de risque élevés, en particulier les combinaisons Snapchat et Reddit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
}