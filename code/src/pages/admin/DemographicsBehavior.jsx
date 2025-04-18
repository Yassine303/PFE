import React, { useState, useEffect } from 'react';
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
import Layout from './Layout';

export default function DemographicsBehavior() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  
  // In a real application, you would fetch this data from an API
  useEffect(() => {
    // Simulating data fetch - this would be replaced with actual API call
    const demographicsData = [
  {'ID': 1, 'Age': 18, 'Gender': 'Male', 'Grade': 'D', 'SocialMediaUsage': 6, 'AcademicChange': 'Declined', 'AbsencesMonth': 7, 'Stress': 6, 'PeerInteractions': 'Positive', 'Friends': 18, 'DisciplinaryActions': 0, 'TeacherConcern': 5},
  {'ID': 2, 'Age': 18, 'Gender': 'Female', 'Grade': 'C', 'SocialMediaUsage': 3, 'AcademicChange': 'No Change', 'AbsencesMonth': 1, 'Stress': 6, 'PeerInteractions': 'Negative', 'Friends': 0, 'DisciplinaryActions': 0, 'TeacherConcern': 3},
  {'ID': 3, 'Age': 15, 'Gender': 'Male', 'Grade': 'C', 'SocialMediaUsage': 0, 'AcademicChange': 'No Change', 'AbsencesMonth': 0, 'Stress': 6, 'PeerInteractions': 'Positive', 'Friends': 4, 'DisciplinaryActions': 2, 'TeacherConcern': 1},
  {'ID': 4, 'Age': 13, 'Gender': 'Female', 'Grade': 'C', 'SocialMediaUsage': 3, 'AcademicChange': 'No Change', 'AbsencesMonth': 7, 'Stress': 9, 'PeerInteractions': 'Negative', 'Friends': 18, 'DisciplinaryActions': 1, 'TeacherConcern': 4},
  {'ID': 5, 'Age': 15, 'Gender': 'Male', 'Grade': 'C', 'SocialMediaUsage': 0, 'AcademicChange': 'Improved', 'AbsencesMonth': 5, 'Stress': 3, 'PeerInteractions': 'Neutral', 'Friends': 14, 'DisciplinaryActions': 0, 'TeacherConcern': 2},
  {'ID': 6, 'Age': 16, 'Gender': 'Female', 'Grade': 'B', 'SocialMediaUsage': 5, 'AcademicChange': 'No Change', 'AbsencesMonth': 0, 'Stress': 5, 'PeerInteractions': 'Neutral', 'Friends': 8, 'DisciplinaryActions': 0, 'TeacherConcern': 4},
  {'ID': 7, 'Age': 13, 'Gender': 'Female', 'Grade': 'C', 'SocialMediaUsage': 5, 'AcademicChange': 'No Change', 'AbsencesMonth': 7, 'Stress': 2, 'PeerInteractions': 'Neutral', 'Friends': 12, 'DisciplinaryActions': 0, 'TeacherConcern': 4},
  {'ID': 8, 'Age': 14, 'Gender': 'Male', 'Grade': 'C', 'SocialMediaUsage': 6, 'AcademicChange': 'Improved', 'AbsencesMonth': 5, 'Stress': 2, 'PeerInteractions': 'Negative', 'Friends': 13, 'DisciplinaryActions': 0, 'TeacherConcern': 3},
  {'ID': 9, 'Age': 13, 'Gender': 'Male', 'Grade': 'A', 'SocialMediaUsage': 0, 'AcademicChange': 'Declined', 'AbsencesMonth': 10, 'Stress': 1, 'PeerInteractions': 'Negative', 'Friends': 0, 'DisciplinaryActions': 3, 'TeacherConcern': 2},
  {'ID': 10, 'Age': 16, 'Gender': 'Male', 'Grade': 'B', 'SocialMediaUsage': 5, 'AcademicChange': 'Improved', 'AbsencesMonth': 9, 'Stress': 6, 'PeerInteractions': 'Negative', 'Friends': 0, 'DisciplinaryActions': 1, 'TeacherConcern': 1},
  {'ID': 11, 'Age': 15, 'Gender': 'Male', 'Grade': 'B', 'SocialMediaUsage': 5, 'AcademicChange': 'Improved', 'AbsencesMonth': 3, 'Stress': 1, 'PeerInteractions': 'Positive', 'Friends': 12, 'DisciplinaryActions': 3, 'TeacherConcern': 4},
  {'ID': 12, 'Age': 15, 'Gender': 'Male', 'Grade': 'A', 'SocialMediaUsage': 7, 'AcademicChange': 'Declined', 'AbsencesMonth': 0, 'Stress': 8, 'PeerInteractions': 'Positive', 'Friends': 19, 'DisciplinaryActions': 2, 'TeacherConcern': 5},
  {'ID': 13, 'Age': 13, 'Gender': 'Male', 'Grade': 'D', 'SocialMediaUsage': 6, 'AcademicChange': 'Improved', 'AbsencesMonth': 1, 'Stress': 4, 'PeerInteractions': 'Neutral', 'Friends': 6, 'DisciplinaryActions': 1, 'TeacherConcern': 5},
  {'ID': 14, 'Age': 16, 'Gender': 'Male', 'Grade': 'B', 'SocialMediaUsage': 2, 'AcademicChange': 'No Change', 'AbsencesMonth': 1, 'Stress': 7, 'PeerInteractions': 'Neutral', 'Friends': 9, 'DisciplinaryActions': 0, 'TeacherConcern': 1},
  {'ID': 15, 'Age': 16, 'Gender': 'Male', 'Grade': 'D', 'SocialMediaUsage': 3, 'AcademicChange': 'No Change', 'AbsencesMonth': 4, 'Stress': 7, 'PeerInteractions': 'Negative', 'Friends': 9, 'DisciplinaryActions': 2, 'TeacherConcern': 5},
  {'ID': 16, 'Age': 16, 'Gender': 'Male', 'Grade': 'B', 'SocialMediaUsage': 3, 'AcademicChange': 'Improved', 'AbsencesMonth': 2, 'Stress': 8, 'PeerInteractions': 'Positive', 'Friends': 3, 'DisciplinaryActions': 0, 'TeacherConcern': 2},
  {'ID': 17, 'Age': 15, 'Gender': 'Male', 'Grade': 'C', 'SocialMediaUsage': 3, 'AcademicChange': 'Improved', 'AbsencesMonth': 5, 'Stress': 9, 'PeerInteractions': 'Positive', 'Friends': 3, 'DisciplinaryActions': 2, 'TeacherConcern': 2},
  {'ID': 18, 'Age': 15, 'Gender': 'Female', 'Grade': 'B', 'SocialMediaUsage': 0, 'AcademicChange': 'Declined', 'AbsencesMonth': 3, 'Stress': 3, 'PeerInteractions': 'Neutral', 'Friends': 6, 'DisciplinaryActions': 3, 'TeacherConcern': 3},
  {'ID': 19, 'Age': 15, 'Gender': 'Male', 'Grade': 'C', 'SocialMediaUsage': 1, 'AcademicChange': 'No Change', 'AbsencesMonth': 10, 'Stress': 10, 'PeerInteractions': 'Neutral', 'Friends': 5, 'DisciplinaryActions': 1, 'TeacherConcern': 4},
  {'ID': 20, 'Age': 14, 'Gender': 'Male', 'Grade': 'F', 'SocialMediaUsage': 5, 'AcademicChange': 'No Change', 'AbsencesMonth': 6, 'Stress': 3, 'PeerInteractions': 'Positive', 'Friends': 18, 'DisciplinaryActions': 3, 'TeacherConcern': 3},
  {'ID': 21, 'Age': 16, 'Gender': 'Female', 'Grade': 'C', 'SocialMediaUsage': 4, 'AcademicChange': 'Declined', 'AbsencesMonth': 2, 'Stress': 9, 'PeerInteractions': 'Negative', 'Friends': 5, 'DisciplinaryActions': 2, 'TeacherConcern': 2},
  {'ID': 22, 'Age': 14, 'Gender': 'Male', 'Grade': 'C', 'SocialMediaUsage': 0, 'AcademicChange': 'Declined', 'AbsencesMonth': 4, 'Stress': 1, 'PeerInteractions': 'Neutral', 'Friends': 8, 'DisciplinaryActions': 2, 'TeacherConcern': 4},
  {'ID': 23, 'Age': 18, 'Gender': 'Female', 'Grade': 'C', 'SocialMediaUsage': 6, 'AcademicChange': 'Declined', 'AbsencesMonth': 10, 'Stress': 10, 'PeerInteractions': 'Negative', 'Friends': 16, 'DisciplinaryActions': 0, 'TeacherConcern': 2},
  {'ID': 24, 'Age': 13, 'Gender': 'Male', 'Grade': 'B', 'SocialMediaUsage': 6, 'AcademicChange': 'Improved', 'AbsencesMonth': 1, 'Stress': 3, 'PeerInteractions': 'Neutral', 'Friends': 1, 'DisciplinaryActions': 1, 'TeacherConcern': 1},
  {'ID': 25, 'Age': 16, 'Gender': 'Female', 'Grade': 'C', 'SocialMediaUsage': 0, 'AcademicChange': 'No Change', 'AbsencesMonth': 9, 'Stress': 5, 'PeerInteractions': 'Positive', 'Friends': 15, 'DisciplinaryActions': 3, 'TeacherConcern': 4},
  {'ID': 26, 'Age': 13, 'Gender': 'Male', 'Grade': 'B', 'SocialMediaUsage': 1, 'AcademicChange': 'No Change', 'AbsencesMonth': 0, 'Stress': 1, 'PeerInteractions': 'Positive', 'Friends': 6, 'DisciplinaryActions': 2, 'TeacherConcern': 5},
  {'ID': 27, 'Age': 13, 'Gender': 'Female', 'Grade': 'C', 'SocialMediaUsage': 7, 'AcademicChange': 'Improved', 'AbsencesMonth': 4, 'Stress': 1, 'PeerInteractions': 'Positive', 'Friends': 1, 'DisciplinaryActions': 3, 'TeacherConcern': 5},
  {'ID': 28, 'Age': 16, 'Gender': 'Male', 'Grade': 'B', 'SocialMediaUsage': 4, 'AcademicChange': 'Improved', 'AbsencesMonth': 1, 'Stress': 5, 'PeerInteractions': 'Neutral', 'Friends': 15, 'DisciplinaryActions': 1, 'TeacherConcern': 3},
  {'ID': 29, 'Age': 14, 'Gender': 'Male', 'Grade': 'B', 'SocialMediaUsage': 3, 'AcademicChange': 'Declined', 'AbsencesMonth': 6, 'Stress': 6, 'PeerInteractions': 'Negative', 'Friends': 6, 'DisciplinaryActions': 0, 'TeacherConcern': 1},
  {'ID': 30, 'Age': 17, 'Gender': 'Male', 'Grade': 'A', 'SocialMediaUsage': 2, 'AcademicChange': 'Improved', 'AbsencesMonth': 3, 'Stress': 9, 'PeerInteractions': 'Positive', 'Friends': 19, 'DisciplinaryActions': 0, 'TeacherConcern': 4},
  {'ID': 31, 'Age': 17, 'Gender': 'Male', 'Grade': 'C', 'SocialMediaUsage': 1, 'AcademicChange': 'Declined', 'AbsencesMonth': 10, 'Stress': 6, 'PeerInteractions': 'Neutral', 'Friends': 4, 'DisciplinaryActions': 2, 'TeacherConcern': 5},
  {'ID': 32, 'Age': 14, 'Gender': 'Female', 'Grade': 'A', 'SocialMediaUsage': 7, 'AcademicChange': 'No Change', 'AbsencesMonth': 5, 'Stress': 7, 'PeerInteractions': 'Neutral', 'Friends': 3, 'DisciplinaryActions': 1, 'TeacherConcern': 1},
  {'ID': 33, 'Age': 17, 'Gender': 'Female', 'Grade': 'D', 'SocialMediaUsage': 7, 'AcademicChange': 'Improved', 'AbsencesMonth': 3, 'Stress': 9, 'PeerInteractions': 'Positive', 'Friends': 7, 'DisciplinaryActions': 1, 'TeacherConcern': 1},
  {'ID': 34, 'Age': 16, 'Gender': 'Female', 'Grade': 'C', 'SocialMediaUsage': 3, 'AcademicChange': 'Improved', 'AbsencesMonth': 8, 'Stress': 10, 'PeerInteractions': 'Positive', 'Friends': 7, 'DisciplinaryActions': 3, 'TeacherConcern': 2},
  {'ID': 35, 'Age': 14, 'Gender': 'Male', 'Grade': 'C', 'SocialMediaUsage': 0, 'AcademicChange': 'No Change', 'AbsencesMonth': 0, 'Stress': 2, 'PeerInteractions': 'Negative', 'Friends': 14, 'DisciplinaryActions': 3, 'TeacherConcern': 3},
  {'ID': 36, 'Age': 18, 'Gender': 'Male', 'Grade': 'C', 'SocialMediaUsage': 4, 'AcademicChange': 'Improved', 'AbsencesMonth': 2, 'Stress': 10, 'PeerInteractions': 'Negative', 'Friends': 10, 'DisciplinaryActions': 3, 'TeacherConcern': 5},
  {'ID': 37, 'Age': 14, 'Gender': 'Male', 'Grade': 'C', 'SocialMediaUsage': 6, 'AcademicChange': 'No Change', 'AbsencesMonth': 10, 'Stress': 9, 'PeerInteractions': 'Neutral', 'Friends': 11, 'DisciplinaryActions': 3, 'TeacherConcern': 4},
  {'ID': 38, 'Age': 14, 'Gender': 'Male', 'Grade': 'A', 'SocialMediaUsage': 0, 'AcademicChange': 'Improved', 'AbsencesMonth': 3, 'Stress': 2, 'PeerInteractions': 'Positive', 'Friends': 13, 'DisciplinaryActions': 1, 'TeacherConcern': 3},
  {'ID': 39, 'Age': 15, 'Gender': 'Male', 'Grade': 'B', 'SocialMediaUsage': 0, 'AcademicChange': 'No Change', 'AbsencesMonth': 9, 'Stress': 1, 'PeerInteractions': 'Negative', 'Friends': 7, 'DisciplinaryActions': 3, 'TeacherConcern': 1},
  {'ID': 40, 'Age': 15, 'Gender': 'Female', 'Grade': 'A', 'SocialMediaUsage': 1, 'AcademicChange': 'No Change', 'AbsencesMonth': 4, 'Stress': 7, 'PeerInteractions': 'Neutral', 'Friends': 5, 'DisciplinaryActions': 0, 'TeacherConcern': 1},
  {'ID': 41, 'Age': 15, 'Gender': 'Female', 'Grade': 'B', 'SocialMediaUsage': 4, 'AcademicChange': 'No Change', 'AbsencesMonth': 9, 'Stress': 3, 'PeerInteractions': 'Positive', 'Friends': 18, 'DisciplinaryActions': 0, 'TeacherConcern': 5},
  {'ID': 42, 'Age': 17, 'Gender': 'Female', 'Grade': 'D', 'SocialMediaUsage': 3, 'AcademicChange': 'No Change', 'AbsencesMonth': 2, 'Stress': 5, 'PeerInteractions': 'Positive', 'Friends': 6, 'DisciplinaryActions': 0, 'TeacherConcern': 5},
  {'ID': 43, 'Age': 18, 'Gender': 'Male', 'Grade': 'A', 'SocialMediaUsage': 1, 'AcademicChange': 'Declined', 'AbsencesMonth': 1, 'Stress': 4, 'PeerInteractions': 'Neutral', 'Friends': 16, 'DisciplinaryActions': 0, 'TeacherConcern': 3},
  {'ID': 44, 'Age': 13, 'Gender': 'Male', 'Grade': 'D', 'SocialMediaUsage': 1, 'AcademicChange': 'Improved', 'AbsencesMonth': 10, 'Stress': 10, 'PeerInteractions': 'Neutral', 'Friends': 11, 'DisciplinaryActions': 2, 'TeacherConcern': 5},
  {'ID': 45, 'Age': 18, 'Gender': 'Female', 'Grade': 'F', 'SocialMediaUsage': 3, 'AcademicChange': 'Improved', 'AbsencesMonth': 1, 'Stress': 10, 'PeerInteractions': 'Neutral', 'Friends': 19, 'DisciplinaryActions': 0, 'TeacherConcern': 2},
  {'ID': 46, 'Age': 14, 'Gender': 'Female', 'Grade': 'C', 'SocialMediaUsage': 1, 'AcademicChange': 'No Change', 'AbsencesMonth': 3, 'Stress': 1, 'PeerInteractions': 'Negative', 'Friends': 11, 'DisciplinaryActions': 0, 'TeacherConcern': 4},
  {'ID': 47, 'Age': 17, 'Gender': 'Male', 'Grade': 'C', 'SocialMediaUsage': 5, 'AcademicChange': 'Declined', 'AbsencesMonth': 1, 'Stress': 9, 'PeerInteractions': 'Neutral', 'Friends': 6, 'DisciplinaryActions': 3, 'TeacherConcern': 1},
  {'ID': 48, 'Age': 15, 'Gender': 'Male', 'Grade': 'A', 'SocialMediaUsage': 1, 'AcademicChange': 'Declined', 'AbsencesMonth': 7, 'Stress': 4, 'PeerInteractions': 'Positive', 'Friends': 15, 'DisciplinaryActions': 3, 'TeacherConcern': 1},
  {'ID': 49, 'Age': 18, 'Gender': 'Male', 'Grade': 'B', 'SocialMediaUsage': 6, 'AcademicChange': 'Declined', 'AbsencesMonth': 7, 'Stress': 9, 'PeerInteractions': 'Neutral', 'Friends': 2, 'DisciplinaryActions': 3, 'TeacherConcern': 2},
  {'ID': 50, 'Age': 14, 'Gender': 'Female', 'Grade': 'B', 'SocialMediaUsage': 6, 'AcademicChange': 'Declined', 'AbsencesMonth': 4, 'Stress': 9, 'PeerInteractions': 'Negative', 'Friends': 16, 'DisciplinaryActions': 1, 'TeacherConcern': 4},
  {'ID': 51, 'Age': 16, 'Gender': 'Male', 'Grade': 'C', 'SocialMediaUsage': 7, 'AcademicChange': 'Declined', 'AbsencesMonth': 7, 'Stress': 5, 'PeerInteractions': 'Negative', 'Friends': 2, 'DisciplinaryActions': 2, 'TeacherConcern': 2},
  {'ID': 52, 'Age': 18, 'Gender': 'Male', 'Grade': 'D', 'SocialMediaUsage': 0, 'AcademicChange': 'Declined', 'AbsencesMonth': 1, 'Stress': 8, 'PeerInteractions': 'Negative', 'Friends': 13, 'DisciplinaryActions': 3, 'TeacherConcern': 5},
  {'ID': 53, 'Age': 16, 'Gender': 'Female', 'Grade': 'D', 'SocialMediaUsage': 0, 'AcademicChange': 'Declined', 'AbsencesMonth': 6, 'Stress': 9, 'PeerInteractions': 'Positive', 'Friends': 19, 'DisciplinaryActions': 1, 'TeacherConcern': 2},
  {'ID': 54, 'Age': 13, 'Gender': 'Female', 'Grade': 'C', 'SocialMediaUsage': 1, 'AcademicChange': 'Declined', 'AbsencesMonth': 7, 'Stress': 6, 'PeerInteractions': 'Negative', 'Friends': 13, 'DisciplinaryActions': 0, 'TeacherConcern': 4},
  {'ID': 55, 'Age': 13, 'Gender': 'Male', 'Grade': 'B', 'SocialMediaUsage': 1, 'AcademicChange': 'Declined', 'AbsencesMonth': 4, 'Stress': 7, 'PeerInteractions': 'Positive', 'Friends': 2, 'DisciplinaryActions': 1, 'TeacherConcern': 3},
  {'ID': 56, 'Age': 14, 'Gender': 'Female', 'Grade': 'A', 'SocialMediaUsage': 3, 'AcademicChange': 'No Change', 'AbsencesMonth': 4, 'Stress': 10, 'PeerInteractions': 'Negative', 'Friends': 8, 'DisciplinaryActions': 2, 'TeacherConcern': 5},
  {'ID': 57, 'Age': 18, 'Gender': 'Female', 'Grade': 'F', 'SocialMediaUsage': 5, 'AcademicChange': 'Improved', 'AbsencesMonth': 10, 'Stress': 2, 'PeerInteractions': 'Negative', 'Friends': 19, 'DisciplinaryActions': 3, 'TeacherConcern': 5},
  {'ID': 58, 'Age': 17, 'Gender': 'Female', 'Grade': 'B', 'SocialMediaUsage': 0, 'AcademicChange': 'No Change', 'AbsencesMonth': 7, 'Stress': 7, 'PeerInteractions': 'Neutral', 'Friends': 5, 'DisciplinaryActions': 2, 'TeacherConcern': 2},
  {'ID': 59, 'Age': 13, 'Gender': 'Female', 'Grade': 'C', 'SocialMediaUsage': 3, 'AcademicChange': 'Improved', 'AbsencesMonth': 5, 'Stress': 2, 'PeerInteractions': 'Negative', 'Friends': 8, 'DisciplinaryActions': 3, 'TeacherConcern': 1},
  {'ID': 60, 'Age': 14, 'Gender': 'Female', 'Grade': 'F', 'SocialMediaUsage': 2, 'AcademicChange': 'Improved', 'AbsencesMonth': 9, 'Stress': 8, 'PeerInteractions': 'Positive', 'Friends': 16, 'DisciplinaryActions': 1, 'TeacherConcern': 5},
  {'ID': 61, 'Age': 17, 'Gender': 'Female', 'Grade': 'B', 'SocialMediaUsage': 5, 'AcademicChange': 'Declined', 'AbsencesMonth': 6, 'Stress': 3, 'PeerInteractions': 'Positive', 'Friends': 6, 'DisciplinaryActions': 2, 'TeacherConcern': 5},
  {'ID': 62, 'Age': 14, 'Gender': 'Female', 'Grade': 'C', 'SocialMediaUsage': 0, 'AcademicChange': 'Declined', 'AbsencesMonth': 9, 'Stress': 2, 'PeerInteractions': 'Negative', 'Friends': 12, 'DisciplinaryActions': 2, 'TeacherConcern': 3},
  {'ID': 63, 'Age': 14, 'Gender': 'Female', 'Grade': 'C', 'SocialMediaUsage': 1, 'AcademicChange': 'Improved', 'AbsencesMonth': 7, 'Stress': 10, 'PeerInteractions': 'Negative', 'Friends': 10, 'DisciplinaryActions': 2, 'TeacherConcern': 3},
  {'ID': 64, 'Age': 15, 'Gender': 'Female', 'Grade': 'B', 'SocialMediaUsage': 5, 'AcademicChange': 'Improved', 'AbsencesMonth': 1, 'Stress': 7, 'PeerInteractions': 'Neutral', 'Friends': 19, 'DisciplinaryActions': 1, 'TeacherConcern': 1},
  {'ID': 65, 'Age': 15, 'Gender': 'Male', 'Grade': 'B', 'SocialMediaUsage': 2, 'AcademicChange': 'No Change', 'AbsencesMonth': 7, 'Stress': 7, 'PeerInteractions': 'Negative', 'Friends': 15, 'DisciplinaryActions': 2, 'TeacherConcern': 3},
  {'ID': 66, 'Age': 18, 'Gender': 'Male', 'Grade': 'A', 'SocialMediaUsage': 0, 'AcademicChange': 'No Change', 'AbsencesMonth': 1, 'Stress': 1, 'PeerInteractions': 'Negative', 'Friends': 19, 'DisciplinaryActions': 1, 'TeacherConcern': 2},
  {'ID': 67, 'Age': 16, 'Gender': 'Male', 'Grade': 'C', 'SocialMediaUsage': 4, 'AcademicChange': 'No Change', 'AbsencesMonth': 4, 'Stress': 5, 'PeerInteractions': 'Neutral', 'Friends': 17, 'DisciplinaryActions': 2, 'TeacherConcern': 1},
  {'ID': 68, 'Age': 15, 'Gender': 'Female', 'Grade': 'C', 'SocialMediaUsage': 5, 'AcademicChange': 'Improved', 'AbsencesMonth': 0, 'Stress': 5, 'PeerInteractions': 'Neutral', 'Friends': 12, 'DisciplinaryActions': 0, 'TeacherConcern': 3},
  {'ID': 69, 'Age': 14, 'Gender': 'Male', 'Grade': 'A', 'SocialMediaUsage': 2, 'AcademicChange': 'No Change', 'AbsencesMonth': 10, 'Stress': 1, 'PeerInteractions': 'Negative', 'Friends': 16, 'DisciplinaryActions': 1, 'TeacherConcern': 1},
  {'ID': 70, 'Age': 16, 'Gender': 'Male', 'Grade': 'C', 'SocialMediaUsage': 7, 'AcademicChange': 'No Change', 'AbsencesMonth': 4, 'Stress': 5, 'PeerInteractions': 'Positive', 'Friends': 17, 'DisciplinaryActions': 2, 'TeacherConcern': 1},
  {'ID': 71, 'Age': 18, 'Gender': 'Male', 'Grade': 'A', 'SocialMediaUsage': 4, 'AcademicChange': 'No Change', 'AbsencesMonth': 8, 'Stress': 3, 'PeerInteractions': 'Negative', 'Friends': 9, 'DisciplinaryActions': 3, 'TeacherConcern': 1},
  {'ID': 72, 'Age': 15, 'Gender': 'Female', 'Grade': 'C', 'SocialMediaUsage': 4, 'AcademicChange': 'Declined', 'AbsencesMonth': 10, 'Stress': 10, 'PeerInteractions': 'Negative', 'Friends': 1, 'DisciplinaryActions': 0, 'TeacherConcern': 3},
  {'ID': 73, 'Age': 14, 'Gender': 'Male', 'Grade': 'A', 'SocialMediaUsage': 4, 'AcademicChange': 'No Change', 'AbsencesMonth': 8, 'Stress': 1, 'PeerInteractions': 'Negative', 'Friends': 17, 'DisciplinaryActions': 3, 'TeacherConcern': 4},
  {'ID': 74, 'Age': 15, 'Gender': 'Female', 'Grade': 'D', 'SocialMediaUsage': 7, 'AcademicChange': 'Declined', 'AbsencesMonth': 2, 'Stress': 1, 'PeerInteractions': 'Neutral', 'Friends': 7, 'DisciplinaryActions': 3, 'TeacherConcern': 4},
  {'ID': 75, 'Age': 13, 'Gender': 'Female', 'Grade': 'C', 'SocialMediaUsage': 4, 'AcademicChange': 'Declined', 'AbsencesMonth': 6, 'Stress': 1, 'PeerInteractions': 'Negative', 'Friends': 16, 'DisciplinaryActions': 1, 'TeacherConcern': 3},
  {'ID': 76, 'Age': 16, 'Gender': 'Male', 'Grade': 'B', 'SocialMediaUsage': 2, 'AcademicChange': 'No Change', 'AbsencesMonth': 5, 'Stress': 8, 'PeerInteractions': 'Positive', 'Friends': 5, 'DisciplinaryActions': 3, 'TeacherConcern': 3},
  {'ID': 77, 'Age': 18, 'Gender': 'Male', 'Grade': 'B', 'SocialMediaUsage': 6, 'AcademicChange': 'Improved', 'AbsencesMonth': 5, 'Stress': 2, 'PeerInteractions': 'Positive', 'Friends': 14, 'DisciplinaryActions': 2, 'TeacherConcern': 3},
  {'ID': 78, 'Age': 13, 'Gender': 'Female', 'Grade': 'D', 'SocialMediaUsage': 4, 'AcademicChange': 'Improved', 'AbsencesMonth': 8, 'Stress': 3, 'PeerInteractions': 'Negative', 'Friends': 15, 'DisciplinaryActions': 1, 'TeacherConcern': 4},
  {'ID': 79, 'Age': 18, 'Gender': 'Female', 'Grade': 'C', 'SocialMediaUsage': 2, 'AcademicChange': 'Improved', 'AbsencesMonth': 1, 'Stress': 9, 'PeerInteractions': 'Positive', 'Friends': 6, 'DisciplinaryActions': 3, 'TeacherConcern': 3},
  {'ID': 80, 'Age': 17, 'Gender': 'Other', 'Grade': 'C', 'SocialMediaUsage': 6, 'AcademicChange': 'Improved', 'AbsencesMonth': 5, 'Stress': 6, 'PeerInteractions': 'Negative', 'Friends': 0, 'DisciplinaryActions': 2, 'TeacherConcern': 1},
  {'ID': 81, 'Age': 18, 'Gender': 'Female', 'Grade': 'D', 'SocialMediaUsage': 5, 'AcademicChange': 'Declined', 'AbsencesMonth': 7, 'Stress': 8, 'PeerInteractions': 'Neutral', 'Friends': 18, 'DisciplinaryActions': 1, 'TeacherConcern': 4},
  {'ID': 82, 'Age': 17, 'Gender': 'Male', 'Grade': 'A', 'SocialMediaUsage': 2, 'AcademicChange': 'No Change', 'AbsencesMonth': 0, 'Stress': 3, 'PeerInteractions': 'Positive', 'Friends': 7, 'DisciplinaryActions': 2, 'TeacherConcern': 4},
  {'ID': 83, 'Age': 14, 'Gender': 'Female', 'Grade': 'D', 'SocialMediaUsage': 2, 'AcademicChange': 'Declined', 'AbsencesMonth': 0, 'Stress': 9, 'PeerInteractions': 'Negative', 'Friends': 13, 'DisciplinaryActions': 2, 'TeacherConcern': 2},
  {'ID': 84, 'Age': 18, 'Gender': 'Male', 'Grade': 'B', 'SocialMediaUsage': 2, 'AcademicChange': 'Declined', 'AbsencesMonth': 4, 'Stress': 7, 'PeerInteractions': 'Positive', 'Friends': 9, 'DisciplinaryActions': 3, 'TeacherConcern': 3},
  {'ID': 85, 'Age': 16, 'Gender': 'Male', 'Grade': 'B', 'SocialMediaUsage': 2, 'AcademicChange': 'Improved', 'AbsencesMonth': 2, 'Stress': 10, 'PeerInteractions': 'Negative', 'Friends': 2, 'DisciplinaryActions': 0, 'TeacherConcern': 2},
  {'ID': 86, 'Age': 16, 'Gender': 'Female', 'Grade': 'A', 'SocialMediaUsage': 1, 'AcademicChange': 'No Change', 'AbsencesMonth': 7, 'Stress': 7, 'PeerInteractions': 'Positive', 'Friends': 16, 'DisciplinaryActions': 0, 'TeacherConcern': 4},
  {'ID': 87, 'Age': 14, 'Gender': 'Male', 'Grade': 'C', 'SocialMediaUsage': 0, 'AcademicChange': 'No Change', 'AbsencesMonth': 4, 'Stress': 10, 'PeerInteractions': 'Neutral', 'Friends': 14, 'DisciplinaryActions': 3, 'TeacherConcern': 1},
  {'ID': 88, 'Age': 15, 'Gender': 'Female', 'Grade': 'F', 'SocialMediaUsage': 1, 'AcademicChange': 'Improved', 'AbsencesMonth': 7, 'Stress': 6, 'PeerInteractions': 'Positive', 'Friends': 14, 'DisciplinaryActions': 0, 'TeacherConcern': 4},
  {'ID': 89, 'Age': 18, 'Gender': 'Female', 'Grade': 'C', 'SocialMediaUsage': 7, 'AcademicChange': 'No Change', 'AbsencesMonth': 5, 'Stress': 2, 'PeerInteractions': 'Positive', 'Friends': 8, 'DisciplinaryActions': 0, 'TeacherConcern': 4},
  {'ID': 90, 'Age': 14, 'Gender': 'Male', 'Grade': 'C', 'SocialMediaUsage': 5, 'AcademicChange': 'No Change', 'AbsencesMonth': 2, 'Stress': 8, 'PeerInteractions': 'Negative', 'Friends': 12, 'DisciplinaryActions': 3, 'TeacherConcern': 2},
  {'ID': 91, 'Age': 18, 'Gender': 'Other', 'Grade': 'A', 'SocialMediaUsage': 1, 'AcademicChange': 'Improved', 'AbsencesMonth': 8, 'Stress': 8, 'PeerInteractions': 'Negative', 'Friends': 18, 'DisciplinaryActions': 1, 'TeacherConcern': 1},
  {'ID': 92, 'Age': 16, 'Gender': 'Female', 'Grade': 'A', 'SocialMediaUsage': 4, 'AcademicChange': 'No Change', 'AbsencesMonth': 4, 'Stress': 9, 'PeerInteractions': 'Neutral', 'Friends': 8, 'DisciplinaryActions': 2, 'TeacherConcern': 5},
  {'ID': 93, 'Age': 17, 'Gender': 'Other', 'Grade': 'A', 'SocialMediaUsage': 2, 'AcademicChange': 'Declined', 'AbsencesMonth': 7, 'Stress': 5, 'PeerInteractions': 'Positive', 'Friends': 15, 'DisciplinaryActions': 0, 'TeacherConcern': 2},
  {'ID': 94, 'Age': 18, 'Gender': 'Male', 'Grade': 'B', 'SocialMediaUsage': 6, 'AcademicChange': 'No Change', 'AbsencesMonth': 9, 'Stress': 7, 'PeerInteractions': 'Neutral', 'Friends': 12, 'DisciplinaryActions': 3, 'TeacherConcern': 2},
  {'ID': 95, 'Age': 13, 'Gender': 'Male', 'Grade': 'A', 'SocialMediaUsage': 4, 'AcademicChange': 'No Change', 'AbsencesMonth': 8, 'Stress': 8, 'PeerInteractions': 'Neutral', 'Friends': 13, 'DisciplinaryActions': 1, 'TeacherConcern': 4},
  {'ID': 96, 'Age': 17, 'Gender': 'Female', 'Grade': 'A', 'SocialMediaUsage': 3, 'AcademicChange': 'Improved', 'AbsencesMonth': 8, 'Stress': 1, 'PeerInteractions': 'Positive', 'Friends': 11, 'DisciplinaryActions': 0, 'TeacherConcern': 5},
  {'ID': 97, 'Age': 18, 'Gender': 'Female', 'Grade': 'C', 'SocialMediaUsage': 6, 'AcademicChange': 'No Change', 'AbsencesMonth': 1, 'Stress': 2, 'PeerInteractions': 'Negative', 'Friends': 12, 'DisciplinaryActions': 1, 'TeacherConcern': 1},
  {'ID': 98, 'Age': 16, 'Gender': 'Female', 'Grade': 'D', 'SocialMediaUsage': 7, 'AcademicChange': 'Improved', 'AbsencesMonth': 8, 'Stress': 4, 'PeerInteractions': 'Neutral', 'Friends': 17, 'DisciplinaryActions': 2, 'TeacherConcern': 3},
  {'ID': 99, 'Age': 18, 'Gender': 'Female', 'Grade': 'C', 'SocialMediaUsage': 1, 'AcademicChange': 'Improved', 'AbsencesMonth': 6, 'Stress': 8, 'PeerInteractions': 'Negative', 'Friends': 9, 'DisciplinaryActions': 0, 'TeacherConcern': 4},
  {'ID': 100, 'Age': 17, 'Gender': 'Female', 'Grade': 'B', 'SocialMediaUsage': 5, 'AcademicChange': 'Improved', 'AbsencesMonth': 6, 'Stress': 6, 'PeerInteractions': 'Negative', 'Friends': 13, 'DisciplinaryActions': 3, 'TeacherConcern': 5},
];
    
    // Translate data labels to French
    const translatedData = demographicsData.map(item => ({
      ...item,
      Gender: item.Gender === "Male" ? "Homme" : item.Gender === "Female" ? "Femme" : "Autre",
      AcademicChange: item.AcademicChange === "Improved" ? "Amélioré" : 
                     item.AcademicChange === "Declined" ? "Diminué" : "Pas de Changement",
      PeerInteractions: item.PeerInteractions === "Positive" ? "Positive" : 
                       item.PeerInteractions === "Negative" ? "Négative" : "Neutre"
    }));
    
    setTimeout(() => {
      setData(translatedData);
      setLoading(false);
    }, 500);
  }, []);
  
  // Prepare aggregated data for charts
  const getAgeDistribution = () => {
    const ageGroups = {};
    data.forEach(item => {
      ageGroups[item.Age] = (ageGroups[item.Age] || 0) + 1;
    });
    return Object.keys(ageGroups).map(age => ({
      age: age,
      count: ageGroups[age]
    }));
  };
  
  const getGenderDistribution = () => {
    const genderCount = {};
    data.forEach(item => {
      genderCount[item.Gender] = (genderCount[item.Gender] || 0) + 1;
    });
    return Object.keys(genderCount).map(gender => ({
      name: gender,
      value: genderCount[gender]
    }));
  };
  
  const getAcademicChangeData = () => {
    const academicChanges = {};
    data.forEach(item => {
      academicChanges[item.AcademicChange] = (academicChanges[item.AcademicChange] || 0) + 1;
    });
    return Object.keys(academicChanges).map(change => ({
      name: change,
      value: academicChanges[change]
    }));
  };
  
  const getSocialMediaVsStressData = () => {
    return data.map(item => ({
      socialMediaUsage: item.SocialMediaUsage,
      stress: item.Stress,
      id: item.ID
    }));
  };
  
  // COLORS for charts - Modern color palette
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
      <Layout>
        <div className="flex items-center justify-center h-screen bg-gray-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8">
              <h1 className="text-3xl font-bold text-white">Analyse Démographique et Comportementale</h1>
              <p className="text-blue-100 mt-2">Visualisation des tendances démographiques et des modèles comportementaux des élèves</p>
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
                  onClick={() => setActiveTab('academic')}
                  className={`py-4 px-6 text-center font-medium text-sm transition-all duration-200 ${
                    activeTab === 'academic'
                      ? 'border-b-2 border-blue-500 text-blue-600 bg-blue-50'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Performance Académique
                </button>
                <button
                  onClick={() => setActiveTab('social')}
                  className={`py-4 px-6 text-center font-medium text-sm transition-all duration-200 ${
                    activeTab === 'social'
                      ? 'border-b-2 border-blue-500 text-blue-600 bg-blue-50'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Comportement Social
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
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">Distribution par Âge</h2>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={getAgeDistribution()}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                          <XAxis dataKey="age" label={{ value: 'Âge', position: 'insideBottomRight', offset: -10 }} />
                          <YAxis label={{ value: 'Nombre d\'élèves', angle: -90, position: 'insideLeft' }} />
                          <Tooltip formatter={(value, name) => [value, 'Nombre d\'élèves']} />
                          <Bar dataKey="count" name="Nombre d'élèves" fill={CHART_COLORS.primary} radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">Distribution par Genre</h2>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={getGenderDistribution()}
                            cx="50%"
                            cy="50%"
                            labelLine={true}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {getGenderDistribution().map((entry, index) => (
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
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">Évolution Académique</h2>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={getAcademicChangeData()}
                            cx="50%"
                            cy="50%"
                            labelLine={true}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {getAcademicChangeData().map((entry, index) => (
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
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">Médias Sociaux vs Stress</h2>
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
                            dataKey="socialMediaUsage" 
                            name="Utilisation des Médias Sociaux"
                            label={{ value: 'Utilisation des Médias Sociaux', position: 'insideBottomRight', offset: -10 }} 
                          />
                          <YAxis 
                            type="number" 
                            dataKey="stress" 
                            name="Niveau de Stress" 
                            label={{ value: 'Niveau de Stress', angle: -90, position: 'insideLeft' }}
                          />
                          <ZAxis range={[60, 60]} />
                          <Tooltip 
                            cursor={{ strokeDasharray: '3 3' }}
                            formatter={(value, name) => {
                              return [value, name === 'socialMediaUsage' ? 'Utilisation des Médias Sociaux' : 'Niveau de Stress'];
                            }}
                          />
                          <Scatter name="Élèves" data={getSocialMediaVsStressData()} fill={CHART_COLORS.accent} />
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
                      <div className="text-sm text-blue-800">Nombre Total d'Élèves</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                      <div className="text-xl font-bold text-green-600 mb-1">
                        {data.filter(item => item.AcademicChange === "Amélioré").length}
                      </div>
                      <div className="text-sm text-green-800">Élèves avec Amélioration Académique</div>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                      <div className="text-xl font-bold text-yellow-600 mb-1">
                        {(data.reduce((sum, item) => sum + item.Stress, 0) / data.length).toFixed(1)}
                      </div>
                      <div className="text-sm text-yellow-800">Niveau de Stress Moyen</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                      <div className="text-xl font-bold text-purple-600 mb-1">
                        {(data.reduce((sum, item) => sum + item.SocialMediaUsage, 0) / data.length).toFixed(1)}
                      </div>
                      <div className="text-sm text-purple-800">Utilisation Moyenne des Médias Sociaux</div>
                    </div>
                  </div>
                </div>
              </>
            )}
            
            {/* Academic Performance Tab */}
            {activeTab === 'academic' && (
              <div className="grid grid-cols-1 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">Distribution des Notes</h2>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={data.reduce((acc, curr) => {
                          const grade = curr.Grade;
                          const existing = acc.find(item => item.grade === grade);
                          if (existing) {
                            existing.count += 1;
                          } else {
                            acc.push({ grade, count: 1 });
                          }
                          return acc;
                        }, []).sort((a, b) => {
                          const gradeOrder = { 'A': 0, 'B': 1, 'C': 2, 'D': 3, 'F': 4 };
                          return gradeOrder[a.grade] - gradeOrder[b.grade];
                        })}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="grade" label={{ value: 'Note', position: 'insideBottomRight', offset: -10 }} />
                        <YAxis label={{ value: 'Nombre d\'élèves', angle: -90, position: 'insideLeft' }} />
                        <Tooltip formatter={(value, name) => [value, 'Nombre d\'élèves']} />
                        <Bar dataKey="count" name="Nombre d'élèves" fill={CHART_COLORS.secondary} radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">Préoccupation des Enseignants vs Évolution Académique</h2>
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
                          type="category" 
                          dataKey="academicChange" 
                          name="Évolution Académique"
                          allowDuplicatedCategory={false} 
                        />
                        <YAxis 
                          type="number" 
                          dataKey="teacherConcern" 
                          name="Niveau de Préoccupation des Enseignants" 
                          domain={[0, 5]}
                          label={{ value: 'Préoccupation des Enseignants', angle: -90, position: 'insideLeft' }}
                        />
                        <ZAxis range={[60, 60]} />
                        <Tooltip 
                          cursor={{ strokeDasharray: '3 3' }}
                          formatter={(value, name) => {
                            return [value, name === 'academicChange' ? 'Évolution Académique' : 'Préoccupation des Enseignants'];
                          }}
                        />
                        <Scatter 
                          name="Élèves" 
                          data={data.map(item => ({
                            academicChange: item.AcademicChange,
                            teacherConcern: item.TeacherConcern,
                            id: item.ID
                          }))} 
                          fill={CHART_COLORS.tertiary}
                        />
                      </ScatterChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">Absences Mensuelles par Évolution Académique</h2>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={data.reduce((acc, curr) => {
                          const academicChange = curr.AcademicChange;
                          const existing = acc.find(item => item.academicChange === academicChange);
                          if (existing) {
                            existing.totalAbsences += curr.AbsencesMonth;
                            existing.count += 1;
                          } else {
                            acc.push({ 
                              academicChange, 
                              totalAbsences: curr.AbsencesMonth,
                              count: 1,
                              averageAbsences: curr.AbsencesMonth
                            });
                          }
                          return acc;
                        }, []).map(item => ({
                          ...item,
                          averageAbsences: (item.totalAbsences / item.count).toFixed(1)
                        }))}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="academicChange" />
                        <YAxis label={{ value: 'Absences Moyennes', angle: -90, position: 'insideLeft' }} />
                        <Tooltip formatter={(value, name) => [value, 'Absences Moyennes']} />
                        <Bar dataKey="averageAbsences" name="Absences Moyennes" fill={CHART_COLORS.quaternary} radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}
            
            {/* Social Behavior Tab */}
            {activeTab === 'social' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">Interactions entre Pairs</h2>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={data.reduce((acc, curr) => {
                            const interaction = curr.PeerInteractions;
                            const existing = acc.find(item => item.name === interaction);
                            if (existing) {
                              existing.value += 1;
                            } else {
                              acc.push({ name: interaction, value: 1 });
                            }
                            return acc;
                          }, [])}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {data.reduce((acc, curr) => {
                            const interaction = curr.PeerInteractions;
                            const existing = acc.find(item => item.name === interaction);
                            if (existing) {
                              existing.value += 1;
                            } else {
                              acc.push({ name: interaction, value: 1 });
                            }
                            return acc;
                          }, []).map((entry, index) => (
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
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">Distribution du Nombre d'Amis</h2>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { range: '0-5', count: data.filter(item => item.Friends >= 0 && item.Friends <= 5).length },
                          { range: '6-10', count: data.filter(item => item.Friends >= 6 && item.Friends <= 10).length },
                          { range: '11-15', count: data.filter(item => item.Friends >= 11 && item.Friends <= 15).length },
                          { range: '16-20', count: data.filter(item => item.Friends >= 16 && item.Friends <= 20).length }
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="range" label={{ value: 'Nombre d\'Amis', position: 'insideBottomRight', offset: -10 }} />
                        <YAxis label={{ value: 'Nombre d\'Élèves', angle: -90, position: 'insideLeft' }} />
                        <Tooltip formatter={(value, name) => [value, 'Nombre d\'Élèves']} />
                        <Bar dataKey="count" name="Nombre d'Élèves" fill={CHART_COLORS.accent} radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-md md:col-span-2">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">Mesures Disciplinaires par Âge</h2>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={data.reduce((acc, curr) => {
                          const age = curr.Age;
                          const existing = acc.find(item => item.age === age);
                          if (existing) {
                            existing.disciplinaryCount += curr.DisciplinaryActions;
                            existing.studentCount += 1;
                          } else {
                            acc.push({ 
                              age, 
                              disciplinaryCount: curr.DisciplinaryActions,
                              studentCount: 1,
                              average: curr.DisciplinaryActions
                            });
                          }
                          return acc;
                        }, []).map(item => ({
                          ...item,
                          average: (item.disciplinaryCount / item.studentCount).toFixed(2)
                        })).sort((a, b) => a.age - b.age)}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="age" label={{ value: 'Âge', position: 'insideBottomRight', offset: -10 }} />
                        <YAxis />
                        <Tooltip 
                          formatter={(value, name) => {
                            return [value, name === 'average' ? 'Mesures Disciplinaires Moyennes' : 'Nombre d\'Élèves'];
                          }}
                        />
                        <Legend />
                        <Bar dataKey="average" fill={CHART_COLORS.tertiary} name="Mesures Disciplinaires Moyennes" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="studentCount" fill={CHART_COLORS.primary} name="Nombre d'Élèves" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}
            
            {/* Raw Data Tab */}
            {activeTab === 'data' && (
              <div className="bg-white p-6 rounded-xl shadow-md overflow-x-auto">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Données Brutes</h2>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Âge</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Genre</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Note</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Médias Sociaux</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Académique</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Absences</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stress</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interaction</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amis</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discipline</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Préoccupation</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Préoccupation</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((student) => (
                      <tr key={student.ID} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.ID}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.Age}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.Gender}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.Grade}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.SocialMediaUsage}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.AcademicChange}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.AbsencesMonth}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.Stress}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.PeerInteractions}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.Friends}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.DisciplinaryActions}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.TeacherConcern}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          
          {/* Summary Section */}
          <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Résumé et Conclusions</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-lg font-medium text-gray-800">Tendances Démographiques</h3>
                <p className="text-gray-600 mt-1">
                  L'analyse montre une distribution variée des âges parmi les élèves, avec une représentation équilibrée des genres.
                  Ces facteurs démographiques semblent influencer certains comportements observés.
                </p>
              </div>
              
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="text-lg font-medium text-gray-800">Performance Académique</h3>
                <p className="text-gray-600 mt-1">
                  La majorité des élèves maintiennent un niveau académique stable, avec {data.filter(item => item.AcademicChange === "Amélioré").length} élèves 
                  montrant une amélioration significative. Les données suggèrent une corrélation entre les absences et la performance académique.
                </p>
              </div>
              
              <div className="border-l-4 border-yellow-500 pl-4">
                <h3 className="text-lg font-medium text-gray-800">Comportement Social</h3>
                <p className="text-gray-600 mt-1">
                  L'utilisation des médias sociaux semble avoir une corrélation avec les niveaux de stress rapportés. 
                  Les élèves avec des interactions positives entre pairs tendent à montrer de meilleurs résultats académiques.
                </p>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="text-lg font-medium text-gray-800">Recommandations</h3>
                <p className="text-gray-600 mt-1">
                  Sur la base de ces données, il pourrait être bénéfique d'explorer davantage la relation entre l'utilisation des médias sociaux et le stress, 
                  ainsi que de mettre en place des programmes de soutien ciblés pour les élèves présentant des signes de stress élevé et de faibles interactions sociales.
                </p>
              </div>
            </div>
          </div>
          
          {/* Export and Actions Footer */}
          <div className="mt-8 flex justify-between items-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Exporter les Données
            </button>
            
            <div className="flex space-x-4">
              <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-lg transition-colors flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
                Actualiser
              </button>
              
              <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-lg transition-colors flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                </svg>
                Aide
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
