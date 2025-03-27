
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import { SimpleToast } from '../components/ui/SimpleToast';
import { useSimpleToast } from '../components/ui/SimpleToast';
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from '@/components/AuthProvider';

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // Using localStorage for compatibility with the existing code
  const isAuthenticated = !!localStorage.getItem('auth_token');
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

// Public route component that redirects if authenticated
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = !!localStorage.getItem('auth_token');
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

const App: React.FC = () => {
  const { toast, hideToast } = useSimpleToast();
  
  return (
    <div className="min-h-screen bg-background">
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={
              <PublicRoute>
                {/* Login component will be handled by Next.js */}
                <div>Login Page</div>
              </PublicRoute>
            } />
            
            {/* Protected routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            } />
            
            {/* Redirect root to login or dashboard based on auth */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            
            {/* Catch all other routes and redirect to dashboard if authenticated */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Router>
        
        {/* Toast notifications */}
        {toast && (
          <SimpleToast 
            message={toast.message} 
            type={toast.type} 
            onClose={hideToast} 
          />
        )}
        <Toaster />
      </AuthProvider>
    </div>
  );
};

export default App;
