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
  Line,
  ScatterChart,
  Scatter,
  ZAxis
} from 'recharts';

// Composant principal pour l'analyse de l'engagement parental
export default function ParentEngagementDashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  
  // Dans une application réelle, les données seraient récupérées depuis une API
  useEffect(() => {
    // Simulation de récupération de données - dans une vraie app, ce serait un appel API
    const parentalData = [
      {'ID': 1, 'Parental_Involvement': 1, 'Home_Supervision': 'Moderate', 'Family_Stress_Level': 8, 'Parent_Social_Media_Monitoring': 'Yes'},
      {'ID': 2, 'Parental_Involvement': 4, 'Home_Supervision': 'Low', 'Family_Stress_Level': 2, 'Parent_Social_Media_Monitoring': 'Yes'},
      {'ID': 3, 'Parental_Involvement': 1, 'Home_Supervision': 'Moderate', 'Family_Stress_Level': 5, 'Parent_Social_Media_Monitoring': 'Yes'},
      {'ID': 4, 'Parental_Involvement': 5, 'Home_Supervision': 'High', 'Family_Stress_Level': 9, 'Parent_Social_Media_Monitoring': 'No'},
      {'ID': 5, 'Parental_Involvement': 1, 'Home_Supervision': 'High', 'Family_Stress_Level': 9, 'Parent_Social_Media_Monitoring': 'No'},
      {'ID': 6, 'Parental_Involvement': 3, 'Home_Supervision': 'Moderate', 'Family_Stress_Level': 1, 'Parent_Social_Media_Monitoring': 'Yes'},
      {'ID': 7, 'Parental_Involvement': 0, 'Home_Supervision': 'Moderate', 'Family_Stress_Level': 10, 'Parent_Social_Media_Monitoring': 'No'},
      {'ID': 8, 'Parental_Involvement': 5, 'Home_Supervision': 'Moderate', 'Family_Stress_Level': 8, 'Parent_Social_Media_Monitoring': 'Yes'},
      {'ID': 9, 'Parental_Involvement': 5, 'Home_Supervision': 'Moderate', 'Family_Stress_Level': 9, 'Parent_Social_Media_Monitoring': 'No'},
      {'ID': 10, 'Parental_Involvement': 4, 'Home_Supervision': 'Low', 'Family_Stress_Level': 8, 'Parent_Social_Media_Monitoring': 'Yes'},
      {'ID': 11, 'Parental_Involvement': 1, 'Home_Supervision': 'Low', 'Family_Stress_Level': 4, 'Parent_Social_Media_Monitoring': 'Yes'},
      {'ID': 12, 'Parental_Involvement': 0, 'Home_Supervision': 'High', 'Family_Stress_Level': 7, 'Parent_Social_Media_Monitoring': 'Yes'},
      {'ID': 13, 'Parental_Involvement': 3, 'Home_Supervision': 'Moderate', 'Family_Stress_Level': 8, 'Parent_Social_Media_Monitoring': 'No'},
      {'ID': 14, 'Parental_Involvement': 4, 'Home_Supervision': 'Low', 'Family_Stress_Level': 10, 'Parent_Social_Media_Monitoring': 'No'},
      {'ID': 15, 'Parental_Involvement': 4, 'Home_Supervision': 'Low', 'Family_Stress_Level': 9, 'Parent_Social_Media_Monitoring': 'Yes'},
      {'ID': 16, 'Parental_Involvement': 2, 'Home_Supervision': 'Moderate', 'Family_Stress_Level': 1, 'Parent_Social_Media_Monitoring': 'No'},
      {'ID': 17, 'Parental_Involvement': 4, 'Home_Supervision': 'Moderate', 'Family_Stress_Level': 3, 'Parent_Social_Media_Monitoring': 'No'},
      {'ID': 18, 'Parental_Involvement': 3, 'Home_Supervision': 'Low', 'Family_Stress_Level': 1, 'Parent_Social_Media_Monitoring': 'No'},
      {'ID': 19, 'Parental_Involvement': 2, 'Home_Supervision': 'Low', 'Family_Stress_Level': 3, 'Parent_Social_Media_Monitoring': 'Yes'},
      {'ID': 20, 'Parental_Involvement': 1, 'Home_Supervision': 'Low', 'Family_Stress_Level': 9, 'Parent_Social_Media_Monitoring': 'Yes'},
      {'ID': 21, 'Parental_Involvement': 5, 'Home_Supervision': 'Low', 'Family_Stress_Level': 10, 'Parent_Social_Media_Monitoring': 'Yes'},
      {'ID': 22, 'Parental_Involvement': 1, 'Home_Supervision': 'Moderate', 'Family_Stress_Level': 1, 'Parent_Social_Media_Monitoring': 'Yes'},
      {'ID': 23, 'Parental_Involvement': 3, 'Home_Supervision': 'Moderate', 'Family_Stress_Level': 2, 'Parent_Social_Media_Monitoring': 'Yes'},
      {'ID': 24, 'Parental_Involvement': 3, 'Home_Supervision': 'High', 'Family_Stress_Level': 2, 'Parent_Social_Media_Monitoring': 'Yes'},
      {'ID': 25, 'Parental_Involvement': 4, 'Home_Supervision': 'Low', 'Family_Stress_Level': 2, 'Parent_Social_Media_Monitoring': 'Yes'},
      {'ID': 26, 'Parental_Involvement': 4, 'Home_Supervision': 'High', 'Family_Stress_Level': 7, 'Parent_Social_Media_Monitoring': 'No'},
      {'ID': 27, 'Parental_Involvement': 5, 'Home_Supervision': 'Low', 'Family_Stress_Level': 4, 'Parent_Social_Media_Monitoring': 'No'},
      {'ID': 28, 'Parental_Involvement': 2, 'Home_Supervision': 'Low', 'Family_Stress_Level': 5, 'Parent_Social_Media_Monitoring': 'No'},
      {'ID': 29, 'Parental_Involvement': 3, 'Home_Supervision': 'Low', 'Family_Stress_Level': 9, 'Parent_Social_Media_Monitoring': 'No'},
      {'ID': 30, 'Parental_Involvement': 2, 'Home_Supervision': 'Low', 'Family_Stress_Level': 7, 'Parent_Social_Media_Monitoring': 'Yes'},
      {'ID': 31, 'Parental_Involvement': 5, 'Home_Supervision': 'High', 'Family_Stress_Level': 10, 'Parent_Social_Media_Monitoring': 'Yes'},
      {'ID': 32, 'Parental_Involvement': 0, 'Home_Supervision': 'Low', 'Family_Stress_Level': 7, 'Parent_Social_Media_Monitoring': 'Yes'},
      {'ID': 33, 'Parental_Involvement': 4, 'Home_Supervision': 'High', 'Family_Stress_Level': 7, 'Parent_Social_Media_Monitoring': 'No'},
      {'ID': 34, 'Parental_Involvement': 4, 'Home_Supervision': 'Low', 'Family_Stress_Level': 6, 'Parent_Social_Media_Monitoring': 'Yes'},
      {'ID': 35, 'Parental_Involvement': 4, 'Home_Supervision': 'High', 'Family_Stress_Level': 9, 'Parent_Social_Media_Monitoring': 'No'},
      {'ID': 36, 'Parental_Involvement': 0, 'Home_Supervision': 'Moderate', 'Family_Stress_Level': 6, 'Parent_Social_Media_Monitoring': 'Yes'},
      {'ID': 37, 'Parental_Involvement': 1, 'Home_Supervision': 'High', 'Family_Stress_Level': 7, 'Parent_Social_Media_Monitoring': 'Yes'},
      {'ID': 38, 'Parental_Involvement': 3, 'Home_Supervision': 'Low', 'Family_Stress_Level': 3, 'Parent_Social_Media_Monitoring': 'Yes'},
      {'ID': 39, 'Parental_Involvement': 4, 'Home_Supervision': 'Low', 'Family_Stress_Level': 4, 'Parent_Social_Media_Monitoring': 'No'},
      {'ID': 40, 'Parental_Involvement': 2, 'Home_Supervision': 'Moderate', 'Family_Stress_Level': 8, 'Parent_Social_Media_Monitoring': 'Yes'},
      {'ID': 41, 'Parental_Involvement': 0, 'Home_Supervision': 'Moderate', 'Family_Stress_Level': 6, 'Parent_Social_Media_Monitoring': 'No'},
      {'ID': 42, 'Parental_Involvement': 0, 'Home_Supervision': 'Moderate', 'Family_Stress_Level': 1, 'Parent_Social_Media_Monitoring': 'Yes'},
      {'ID': 43, 'Parental_Involvement': 2, 'Home_Supervision': 'Moderate', 'Family_Stress_Level': 10, 'Parent_Social_Media_Monitoring': 'Yes'},
      {'ID': 44, 'Parental_Involvement': 5, 'Home_Supervision': 'High', 'Family_Stress_Level': 6, 'Parent_Social_Media_Monitoring': 'No'},
      {'ID': 45, 'Parental_Involvement': 1, 'Home_Supervision': 'Moderate', 'Family_Stress_Level': 7, 'Parent_Social_Media_Monitoring': 'Yes'},
      {'ID': 46, 'Parental_Involvement': 2, 'Home_Supervision': 'Moderate', 'Family_Stress_Level': 6, 'Parent_Social_Media_Monitoring': 'Yes'},
      {'ID': 47, 'Parental_Involvement': 1, 'Home_Supervision': 'High', 'Family_Stress_Level': 1, 'Parent_Social_Media_Monitoring': 'No'},
      {'ID': 48, 'Parental_Involvement': 4, 'Home_Supervision': 'Moderate', 'Family_Stress_Level': 5, 'Parent_Social_Media_Monitoring': 'No'},
      {'ID': 49, 'Parental_Involvement': 4, 'Home_Supervision': 'Low', 'Family_Stress_Level': 1, 'Parent_Social_Media_Monitoring': 'No'},
      {'ID': 50, 'Parental_Involvement': 2, 'Home_Supervision': 'Moderate', 'Family_Stress_Level': 10, 'Parent_Social_Media_Monitoring': 'Yes'},
      {'ID': 51, 'Parental_Involvement': 3, 'Home_Supervision': 'High', 'Family_Stress_Level': 2, 'Parent_Social_Media_Monitoring': 'No'},
      {'ID': 52, 'Parental_Involvement': 5, 'Home_Supervision': 'Low', 'Family_Stress_Level': 9, 'Parent_Social_Media_Monitoring': 'Yes'},
      {'ID': 53, 'Parental_Involvement': 4, 'Home_Supervision': 'Low', 'Family_Stress_Level': 4, 'Parent_Social_Media_Monitoring': 'Yes'},
      {'ID': 54, 'Parental_Involvement': 5, 'Home_Supervision': 'Low', 'Family_Stress_Level': 10, 'Parent_Social_Media_Monitoring': 'Yes'},
      {'ID': 55, 'Parental_Involvement': 1, 'Home_Supervision': 'Low', 'Family_Stress_Level': 2, 'Parent_Social_Media_Monitoring': 'No'},
      {'ID': 56, 'Parental_Involvement': 5, 'Home_Supervision': 'High', 'Family_Stress_Level': 2, 'Parent_Social_Media_Monitoring': 'Yes'},
      {'ID': 57, 'Parental_Involvement': 4, 'Home_Supervision': 'Low', 'Family_Stress_Level': 6, 'Parent_Social_Media_Monitoring': 'No'},
      {'ID': 58, 'Parental_Involvement': 1, 'Home_Supervision': 'Moderate', 'Family_Stress_Level': 5, 'Parent_Social_Media_Monitoring': 'No'},
      {'ID': 59, 'Parental_Involvement': 2, 'Home_Supervision': 'High', 'Family_Stress_Level': 2, 'Parent_Social_Media_Monitoring': 'Yes'},
      {'ID': 60, 'Parental_Involvement': 4, 'Home_Supervision': 'High', 'Family_Stress_Level': 5, 'Parent_Social_Media_Monitoring': 'No'},
      {'ID': 61, 'Parental_Involvement': 3, 'Home_Supervision': 'Moderate', 'Family_Stress_Level': 10, 'Parent_Social_Media_Monitoring': 'Yes'},
      {'ID': 62, 'Parental_Involvement': 1, 'Home_Supervision': 'Moderate', 'Family_Stress_Level': 8, 'Parent_Social_Media_Monitoring': 'No'},
      {'ID': 63, 'Parental_Involvement': 2, 'Home_Supervision': 'Low', 'Family_Stress_Level': 1, 'Parent_Social_Media_Monitoring': 'Yes'},
      {'ID': 64, 'Parental_Involvement': 1, 'Home_Supervision': 'Moderate', 'Family_Stress_Level': 4, 'Parent_Social_Media_Monitoring': 'Yes'},
      {'ID': 65, 'Parental_Involvement': 4, 'Home_Supervision': 'High', 'Family_Stress_Level': 9, 'Parent_Social_Media_Monitoring': 'No'},
      {'ID': 66, 'Parental_Involvement': 1, 'Home_Supervision': 'Moderate', 'Family_Stress_Level': 10, 'Parent_Social_Media_Monitoring': 'No'},
      {'ID': 67, 'Parental_Involvement': 5, 'Home_Supervision': 'High', 'Family_Stress_Level': 8, 'Parent_Social_Media_Monitoring': 'No'},
      {'ID': 68, 'Parental_Involvement': 2, 'Home_Supervision': 'Low', 'Family_Stress_Level': 8, 'Parent_Social_Media_Monitoring': 'Yes'},
      {'ID': 69, 'Parental_Involvement': 3, 'Home_Supervision': 'Low', 'Family_Stress_Level': 6, 'Parent_Social_Media_Monitoring': 'Yes'},
      {'ID': 70, 'Parental_Involvement': 5, 'Home_Supervision': 'Low', 'Family_Stress_Level': 7, 'Parent_Social_Media_Monitoring': 'Yes'},
      {'ID': 71, 'Parental_Involvement': 4, 'Home_Supervision': 'Low', 'Family_Stress_Level': 7, 'Parent_Social_Media_Monitoring': 'No'},
      {'ID': 72, 'Parental_Involvement': 5, 'Home_Supervision': 'Low', 'Family_Stress_Level': 6, 'Parent_Social_Media_Monitoring': 'Yes'},
      {'ID': 73, 'Parental_Involvement': 0, 'Home_Supervision': 'High', 'Family_Stress_Level': 3, 'Parent_Social_Media_Monitoring': 'No'},
      {'ID': 74, 'Parental_Involvement': 2, 'Home_Supervision': 'High', 'Family_Stress_Level': 5, 'Parent_Social_Media_Monitoring': 'Yes'},
      {'ID': 75, 'Parental_Involvement': 5, 'Home_Supervision': 'Moderate', 'Family_Stress_Level': 7, 'Parent_Social_Media_Monitoring': 'No'},
      {'ID': 76, 'Parental_Involvement': 1, 'Home_Supervision': 'High', 'Family_Stress_Level': 9, 'Parent_Social_Media_Monitoring': 'Yes'},
      {'ID': 77, 'Parental_Involvement': 3, 'Home_Supervision': 'High', 'Family_Stress_Level': 3, 'Parent_Social_Media_Monitoring': 'No'},
      {'ID': 78, 'Parental_Involvement': 2, 'Home_Supervision': 'Moderate', 'Family_Stress_Level': 10, 'Parent_Social_Media_Monitoring': 'Yes'},
      {'ID': 79, 'Parental_Involvement': 5, 'Home_Supervision': 'High', 'Family_Stress_Level': 3, 'Parent_Social_Media_Monitoring': 'Yes'},
      {'ID': 80, 'Parental_Involvement': 3, 'Home_Supervision': 'Moderate', 'Family_Stress_Level': 9, 'Parent_Social_Media_Monitoring': 'Yes'},
      {'ID': 81, 'Parental_Involvement': 5, 'Home_Supervision': 'Low', 'Family_Stress_Level': 8, 'Parent_Social_Media_Monitoring': 'No'},
      {'ID': 82, 'Parental_Involvement': 3, 'Home_Supervision': 'Moderate', 'Family_Stress_Level': 3, 'Parent_Social_Media_Monitoring': 'No'},
      {'ID': 83, 'Parental_Involvement': 0, 'Home_Supervision': 'High', 'Family_Stress_Level': 2, 'Parent_Social_Media_Monitoring': 'Yes'},
      {'ID': 84, 'Parental_Involvement': 2, 'Home_Supervision': 'Low', 'Family_Stress_Level': 9, 'Parent_Social_Media_Monitoring': 'No'},
      {'ID': 85, 'Parental_Involvement': 1, 'Home_Supervision': 'Moderate', 'Family_Stress_Level': 9, 'Parent_Social_Media_Monitoring': 'Yes'},
      {'ID': 86, 'Parental_Involvement': 0, 'Home_Supervision': 'Moderate', 'Family_Stress_Level': 9, 'Parent_Social_Media_Monitoring': 'No'},
      {'ID': 87, 'Parental_Involvement': 5, 'Home_Supervision': 'Moderate', 'Family_Stress_Level': 5, 'Parent_Social_Media_Monitoring': 'No'},
      {'ID': 88, 'Parental_Involvement': 5, 'Home_Supervision': 'Low', 'Family_Stress_Level': 8, 'Parent_Social_Media_Monitoring': 'No'},
      {'ID': 89, 'Parental_Involvement': 4, 'Home_Supervision': 'Moderate', 'Family_Stress_Level': 8, 'Parent_Social_Media_Monitoring': 'Yes'},
      {'ID': 90, 'Parental_Involvement': 5, 'Home_Supervision': 'Low', 'Family_Stress_Level': 6, 'Parent_Social_Media_Monitoring': 'Yes'},
      {'ID': 91, 'Parental_Involvement': 2, 'Home_Supervision': 'High', 'Family_Stress_Level': 6, 'Parent_Social_Media_Monitoring': 'Yes'},
      {'ID': 92, 'Parental_Involvement': 4, 'Home_Supervision': 'High', 'Family_Stress_Level': 9, 'Parent_Social_Media_Monitoring': 'No'},
      {'ID': 93, 'Parental_Involvement': 3, 'Home_Supervision': 'Moderate', 'Family_Stress_Level': 3, 'Parent_Social_Media_Monitoring': 'No'},
      {'ID': 94, 'Parental_Involvement': 0, 'Home_Supervision': 'Moderate', 'Family_Stress_Level': 9, 'Parent_Social_Media_Monitoring': 'No'},
      {'ID': 95, 'Parental_Involvement': 5, 'Home_Supervision': 'Low', 'Family_Stress_Level': 9, 'Parent_Social_Media_Monitoring': 'Yes'},
      {'ID': 96, 'Parental_Involvement': 5, 'Home_Supervision': 'High', 'Family_Stress_Level': 3, 'Parent_Social_Media_Monitoring': 'Yes'},
      {'ID': 97, 'Parental_Involvement': 4, 'Home_Supervision': 'High', 'Family_Stress_Level': 9, 'Parent_Social_Media_Monitoring': 'No'},
      {'ID': 98, 'Parental_Involvement': 0, 'Home_Supervision': 'High', 'Family_Stress_Level': 6, 'Parent_Social_Media_Monitoring': 'No'},
      {'ID': 99, 'Parental_Involvement': 0, 'Home_Supervision': 'High', 'Family_Stress_Level': 10, 'Parent_Social_Media_Monitoring': 'No'},
      {'ID': 100, 'Parental_Involvement': 4, 'Home_Supervision': 'Low', 'Family_Stress_Level': 2, 'Parent_Social_Media_Monitoring': 'Yes'},
    ];
    
    // Dans une application réelle, importez toutes les données du CSV
    // J'ai limité à 25 pour cette démonstration
    
    // Traduire les données en français
    const translatedData = parentalData.map(item => ({
      ...item,
      Home_Supervision: item.Home_Supervision === "High" ? "Élevée" : 
                       item.Home_Supervision === "Moderate" ? "Modérée" : "Faible",
      Parent_Social_Media_Monitoring: item.Parent_Social_Media_Monitoring === "Yes" ? "Oui" : "Non"
    }));
    
    setTimeout(() => {
      setData(translatedData);
      setLoading(false);
    }, 500);
  }, []);
  
  // Préparation des données agrégées pour les graphiques
  const getInvolvementDistribution = () => {
    const involvementGroups = {};
    data.forEach(item => {
      involvementGroups[item.Parental_Involvement] = (involvementGroups[item.Parental_Involvement] || 0) + 1;
    });
    return Object.keys(involvementGroups).map(involvement => ({
      involvement: involvement,
      count: involvementGroups[involvement]
    })).sort((a, b) => parseInt(a.involvement) - parseInt(b.involvement));
  };
  
  const getSupervisionDistribution = () => {
    const supervisionCount = {};
    data.forEach(item => {
      supervisionCount[item.Home_Supervision] = (supervisionCount[item.Home_Supervision] || 0) + 1;
    });
    return Object.keys(supervisionCount).map(supervision => ({
      name: supervision,
      value: supervisionCount[supervision]
    }));
  };
  
  const getStressLevelDistribution = () => {
    const stressLevels = {};
    for (let i = 1; i <= 10; i++) {
      stressLevels[i] = 0;
    }
    data.forEach(item => {
      stressLevels[item.Family_Stress_Level] = (stressLevels[item.Family_Stress_Level] || 0) + 1;
    });
    return Object.keys(stressLevels).map(level => ({
      level: level,
      count: stressLevels[level]
    }));
  };
  
  const getSocialMediaMonitoringData = () => {
    const monitoringCount = {};
    data.forEach(item => {
      monitoringCount[item.Parent_Social_Media_Monitoring] = (monitoringCount[item.Parent_Social_Media_Monitoring] || 0) + 1;
    });
    return Object.keys(monitoringCount).map(monitoring => ({
      name: monitoring,
      value: monitoringCount[monitoring]
    }));
  };
  
  const getInvolvementVsStressData = () => {
    return data.map(item => ({
      involvement: item.Parental_Involvement,
      stress: item.Family_Stress_Level,
      id: item.ID
    }));
  };
  
  // COLORS pour les graphiques - Palette de couleurs moderne
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];
  const CHART_COLORS = {
    primary: '#3B82F6',
    secondary: '#10B981',
    tertiary: '#F59E0B',
    quaternary: '#EF4444',
    accent: '#8B5CF6'
  };
  
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
            <h1 className="text-3xl font-bold text-white">Analyse de l'Engagement Parental</h1>
            <p className="text-blue-100 mt-2">Visualisation des tendances d'implication des parents et leur impact sur les élèves</p>
          </div>
          
          {/* Tabs */}
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
                Aperçu Général
              </button>
              <button
                onClick={() => setActiveTab('involvement')}
                className={`py-4 px-6 text-center font-medium text-sm transition-all duration-200 ${
                  activeTab === 'involvement'
                    ? 'border-b-2 border-blue-500 text-blue-600 bg-blue-50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                Implication Parentale
              </button>
              <button
                onClick={() => setActiveTab('stress')}
                className={`py-4 px-6 text-center font-medium text-sm transition-all duration-200 ${
                  activeTab === 'stress'
                    ? 'border-b-2 border-blue-500 text-blue-600 bg-blue-50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                Stress Familial
              </button>
              <button
                onClick={() => setActiveTab('data')}
                className={`py-4 px-6 text-center font-medium text-sm transition-all duration-200 ${
                  activeTab === 'data'
                    ? 'border-b-2 border-blue-500 text-blue-600 bg-blue-50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                Données Brutes
              </button>
            </nav>
          </div>
        </div>
        
        {/* Content Area */}
        <div className="space-y-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">Distribution des Rencontres Parents-Professeurs</h2>
                  <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
  <BarChart 
    data={getInvolvementDistribution()}
    margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
  >
    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
    <XAxis 
      dataKey="involvement" 
      label={{ 
        value: 'Nombre de Rencontres/Semestre', 
        position: 'bottom',
        offset: 0,
        dy: 20
      }} 
    />
    <YAxis 
      label={{ 
        value: 'Nombre de Familles', 
        angle: -90, 
        position: 'insideLeft',
        dx: -10,
        dy: -10
      }} 
    />
    <Tooltip formatter={(value, name) => [value, 'Nombre de Familles']} />
    <Bar dataKey="count" name="Nombre de Familles" fill={CHART_COLORS.primary} radius={[4, 4, 0, 0]} />
  </BarChart>
</ResponsiveContainer>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">Niveaux de Supervision à Domicile</h2>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={getSupervisionDistribution()}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {getSupervisionDistribution().map((entry, index) => (
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
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">Surveillance des Médias Sociaux par les Parents</h2>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={getSocialMediaMonitoringData()}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {getSocialMediaMonitoringData().map((entry, index) => (
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
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">Implication Parentale vs Niveau de Stress</h2>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <ScatterChart
                        margin={{
                          top: 20,
                          right: 20,
                          bottom: 20,
                          left: 20,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis 
                          type="number" 
                          dataKey="involvement" 
                          name="Implication Parentale"
                          label={{ value: 'Nombre de Rencontres/Semestre', position: 'insideBottomRight', offset: -10 }} 
                        />
                        <YAxis 
                          type="number" 
                          dataKey="stress" 
                          name="Niveau de Stress Familial" 
                          label={{ value: 'Niveau de Stress (1-10)', angle: -90, position: 'insideLeft' }}
                        />
                        <ZAxis range={[60, 60]} />
                        <Tooltip 
                          cursor={{ strokeDasharray: '3 3' }}
                          formatter={(value, name) => {
                            return [value, name === 'involvement' ? 'Implication Parentale' : 'Niveau de Stress'];
                          }}
                        />
                        <Scatter name="Familles" data={getInvolvementVsStressData()} fill={CHART_COLORS.accent} />
                      </ScatterChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Aperçu des Données Clés</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <div className="text-xl font-bold text-blue-600 mb-1">{data.length}</div>
                    <div className="text-sm text-blue-800">Nombre Total de Familles</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                    <div className="text-xl font-bold text-green-600 mb-1">
                      {(data.reduce((sum, item) => sum + item.Parental_Involvement, 0) / data.length).toFixed(1)}
                    </div>
                    <div className="text-sm text-green-800">Moyenne des Rencontres par Semestre</div>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                    <div className="text-xl font-bold text-yellow-600 mb-1">
                      {(data.reduce((sum, item) => sum + item.Family_Stress_Level, 0) / data.length).toFixed(1)}
                    </div>
                    <div className="text-sm text-yellow-800">Niveau de Stress Familial Moyen</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                    <div className="text-xl font-bold text-purple-600 mb-1">
                      {Math.round(data.filter(item => item.Parent_Social_Media_Monitoring === "Oui").length / data.length * 100)}%
                    </div>
                    <div className="text-sm text-purple-800">Familles Surveillant les Médias Sociaux</div>
                  </div>
                </div>
              </div>
            </>
          )}
          
          {/* Involvement Tab */}
          {activeTab === 'involvement' && (
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Implication Parentale par Niveau de Supervision</h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={data.reduce((acc, curr) => {
                        const supervision = curr.Home_Supervision;
                        const existing = acc.find(item => item.supervision === supervision);
                        if (existing) {
                          existing.totalInvolvement += curr.Parental_Involvement;
                          existing.count += 1;
                        } else {
                          acc.push({ 
                            supervision, 
                            totalInvolvement: curr.Parental_Involvement,
                            count: 1,
                            averageInvolvement: curr.Parental_Involvement
                          });
                        }
                        return acc;
                      }, []).map(item => ({
                        ...item,
                        averageInvolvement: (item.totalInvolvement / item.count).toFixed(1)
                      }))}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="supervision" label={{ value: 'Niveau de Supervision', position: 'insideBottomRight', offset: -10 }} />
                      <YAxis label={{ value: 'Implication Moyenne', angle: -90, position: 'insideLeft' }} />
                      <Tooltip formatter={(value, name) => [value, 'Implication Moyenne']} />
                      <Bar dataKey="averageInvolvement" name="Implication Moyenne" fill={CHART_COLORS.secondary} radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Distribution des Familles par Nombre de Rencontres</h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={getInvolvementDistribution().map(item => ({
                          name: `${item.involvement} Rencontres`,
                          value: item.count
                        }))}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {getInvolvementDistribution().map((entry, index) => (
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
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Relation entre Implication Parentale et Surveillance des Médias Sociaux</h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={data.reduce((acc, curr) => {
                        const monitoring = curr.Parent_Social_Media_Monitoring;
                        const existing = acc.find(item => item.monitoring === monitoring);
                        if (existing) {
                          existing.totalInvolvement += curr.Parental_Involvement;
                          existing.count += 1;
                        } else {
                          acc.push({ 
                            monitoring, 
                            totalInvolvement: curr.Parental_Involvement,
                            count: 1,
                            averageInvolvement: curr.Parental_Involvement
                          });
                        }
                        return acc;
                      }, []).map(item => ({
                        ...item,
                        averageInvolvement: (item.totalInvolvement / item.count).toFixed(1)
                      }))}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="monitoring" label={{ value: 'Surveillance des Médias Sociaux', position: 'insideBottomRight', offset: -10 }} />
                      <YAxis label={{ value: 'Implication Moyenne', angle: -90, position: 'insideLeft' }} />
                      <Tooltip formatter={(value, name) => [value, 'Implication Moyenne']} />
                      <Bar dataKey="averageInvolvement" name="Implication Moyenne" fill={CHART_COLORS.tertiary} radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}
          
          {/* Stress Tab */}
          {activeTab === 'stress' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Distribution des Niveaux de Stress Familial</h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={getStressLevelDistribution()}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="level" label={{ value: 'Niveau de Stress (1-10)', position: 'insideBottomRight', offset: -10 }} />
                      <YAxis />
                      <Tooltip formatter={(value, name) => [value, 'Nombre de Familles']} />
                      <Bar dataKey="count" name="Nombre de Familles" fill={CHART_COLORS.quaternary} radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Stress Familial par Niveau de Supervision</h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={data.reduce((acc, curr) => {
                        const supervision = curr.Home_Supervision;
                        const existing = acc.find(item => item.supervision === supervision);
                        if (existing) {
                          existing.totalStress += curr.Family_Stress_Level;
                          existing.count += 1;
                        } else {
                          acc.push({ 
                            supervision, 
                            totalStress: curr.Family_Stress_Level,
                            count: 1,
                            averageStress: curr.Family_Stress_Level
                          });
                        }
                        return acc;
                      }, []).map(item => ({
                        ...item,
                        averageStress: (item.totalStress / item.count).toFixed(1)
                      }))}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="supervision" label={{ value: 'Niveau de Supervision', position: 'insideBottomRight', offset: -10 }} />
                      <YAxis label={{ value: 'Niveau de Stress Moyen', angle: -90, position: 'insideLeft' }} />
                      <Tooltip formatter={(value, name) => [value, 'Niveau de Stress Moyen']} />
                      <Bar dataKey="averageStress" name="Niveau de Stress Moyen" fill={CHART_COLORS.accent} radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md md:col-span-2">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Classification des Niveaux de Stress</h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Faible (1-3)', value: data.filter(item => item.Family_Stress_Level >= 1 && item.Family_Stress_Level <= 3).length },
                          { name: 'Modéré (4-7)', value: data.filter(item => item.Family_Stress_Level >= 4 && item.Family_Stress_Level <= 7).length },
                          { name: 'Élevé (8-10)', value: data.filter(item => item.Family_Stress_Level >= 8 && item.Family_Stress_Level <= 10).length }
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {[0, 1, 2].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value, name) => [value, name]} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}
          
          {/* Data Tab */}
          {activeTab === 'data' && (
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-semibold mb-6 text-gray-800">Données Brutes</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead>
                    <tr>
                      <th className="py-3 px-4 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">ID</th>
                      <th className="py-3 px-4 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Rencontres Parents-Profs</th>
                      <th className="py-3 px-4 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Niveau de Supervision</th>
                      <th className="py-3 px-4 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Niveau de Stress</th>
                      <th className="py-3 px-4 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Surveillance des Réseaux Sociaux</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {data.map((item) => (
                      <tr key={item.ID} className="hover:bg-gray-50">
                        <td className="py-2 px-4 text-sm text-gray-900">{item.ID}</td>
                        <td className="py-2 px-4 text-sm text-gray-900">{item.Parental_Involvement}</td>
                        <td className="py-2 px-4 text-sm text-gray-900">{item.Home_Supervision}</td>
                        <td className="py-2 px-4 text-sm text-gray-900">{item.Family_Stress_Level}</td>
                        <td className="py-2 px-4 text-sm text-gray-900">{item.Parent_Social_Media_Monitoring}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <h3 className="font-semibold text-blue-800 mb-2">Note sur les données</h3>
                <p className="text-sm text-blue-700">
                  Ces données représentent un échantillon de 25 familles. Dans une application réelle,
                  vous pourriez importer des données plus complètes et mettre en place des fonctionnalités
                  d'exportation et d'analyse avancée.
                </p>
              </div>
            </div>
          )}
          
          {/* Footer */}
          <div className="bg-white p-4 rounded-xl shadow-md text-center text-sm text-gray-500 mt-8">
            <p>© 2025 - Tableau de Bord d'Engagement Parental - Tous droits réservés</p>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
}