import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/admin/AdminDashboard';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import ParentDashboard from './pages/parent/ParentDashboard';
import StudentsPage from './pages/admin/StudentsPage';
import TeachersPage from './pages/admin/TeachersPage';
import ParentsPage from './pages/admin/ParentsPage';
import FeedbackOverview from './pages/admin/FeedbackOverview';
import ChildrenListPage from './pages/parent/ChildrenListPage';
import FeedbackFormPage from './pages/parent/FeedbackFormPage';
import ChildrenReportPage from './pages/parent/ChildrenReportPage';
import TeacherChildrenListPage from './pages/teacher/TeacherChildrenListPage';
import TeacherFeedbackFormPage from './pages/teacher/TeacherFeedbackFormPage';
import TeacherChildrenReportPage from './pages/teacher/TeacherChildrenReportPage';
import Analysics from './pages/admin/Analysics';
import Clustering from './pages/admin/Clustering';
import DemographicsBehavior from './pages/admin/DemographicsBehavior';
import ParentEngagementDashboard from './pages/admin/ParentEngagementDashboard';
import PlatformBehaviorDashboard from './pages/admin/PlatformBehaviorDashboard';
import SocialMediaChangesDashboard from './pages/admin/SocialMediaChangesDashboard';


// Protected Route Component (example)
const ProtectedRoute = ({ children, requiredRole }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user || user.role !== requiredRole) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Admin Routes */}
        <Route path="/admin-dashboard" element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>} />
        <Route path="/students" element={<ProtectedRoute requiredRole="admin"><StudentsPage /></ProtectedRoute>} />
        <Route path="/teachers" element={<ProtectedRoute requiredRole="admin"><TeachersPage /></ProtectedRoute>} />
        <Route path="/parents" element={<ProtectedRoute requiredRole="admin"><ParentsPage /></ProtectedRoute>} />
        <Route path="/analytics" element={<ProtectedRoute requiredRole="admin"><Analysics /></ProtectedRoute>} />
        <Route path="/Clustering" element={<ProtectedRoute requiredRole="admin"><Clustering /></ProtectedRoute>} />
        <Route path="/feedback" element={<ProtectedRoute requiredRole="admin"><FeedbackOverview /></ProtectedRoute>} />
        <Route path="/Demographics" element={<ProtectedRoute requiredRole="admin"><DemographicsBehavior /></ProtectedRoute>} />
        <Route path="/ParentEngagementDashboard" element={<ProtectedRoute requiredRole="admin"><ParentEngagementDashboard /></ProtectedRoute>} />
        <Route path="/PlatformBehaviorDashboard" element={<ProtectedRoute requiredRole="admin"><PlatformBehaviorDashboard /></ProtectedRoute>} />
        <Route path="/SocialMediaChangesDashboard" element={<ProtectedRoute requiredRole="admin"><SocialMediaChangesDashboard /></ProtectedRoute>} />


        {/* Parent Routes */}
        <Route path="/parent-dashboard" element={<ProtectedRoute requiredRole="parent"><ParentDashboard /></ProtectedRoute>} />
        <Route path="/children" element={<ProtectedRoute requiredRole="parent"><ChildrenListPage /></ProtectedRoute>} />
        <Route path="/give-feedback" element={<ProtectedRoute requiredRole="parent"><FeedbackFormPage /></ProtectedRoute>} />
        <Route path="/children-report" element={<ProtectedRoute requiredRole="parent"><ChildrenReportPage /></ProtectedRoute>} />

        {/* Teacher Route */}
        <Route path="/teacher-dashboard" element={<ProtectedRoute requiredRole="teacher"><TeacherDashboard /></ProtectedRoute>} />

        <Route 
          path="/teacher-children" 
          element={
            <ProtectedRoute requiredRole="teacher">
              <TeacherChildrenListPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/teacher-feedback" 
          element={
            <ProtectedRoute requiredRole="teacher">
              <TeacherFeedbackFormPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/teacher-report" 
          element={
            <ProtectedRoute requiredRole="teacher">
              <TeacherChildrenReportPage />
            </ProtectedRoute>
          } 
        />

        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
