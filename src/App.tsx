
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import { SimpleToast } from '../components/ui/SimpleToast';
import { useSimpleToast } from '../components/ui/SimpleToast';

const App: React.FC = () => {
  const { toast, hideToast } = useSimpleToast();
  
  return (
    <div className="min-h-screen bg-background">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
      
      {toast && (
        <SimpleToast 
          message={toast.message} 
          type={toast.type} 
          onClose={hideToast} 
        />
      )}
    </div>
  );
};

export default App;
