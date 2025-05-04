import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import Layout from './components/layout/Layout';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import ClassesPage from './pages/classes/ClassesPage';
import ClassDetailPage from './pages/classes/ClassDetailPage';
import AssignmentsPage from './pages/assignments/AssignmentsPage';
import AssignmentDetailPage from './pages/assignments/AssignmentDetailPage';
import AssignmentEditorPage from './pages/assignments/AssignmentEditorPage';
import ProfilePage from './pages/profile/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/classes" element={<ClassesPage />} />
              <Route path="/classes/:id" element={<ClassDetailPage />} />
              <Route path="/assignments" element={<AssignmentsPage />} />
              <Route path="/assignments/:id" element={<AssignmentDetailPage />} />
              <Route path="/assignments/:id/editor" element={<AssignmentEditorPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;