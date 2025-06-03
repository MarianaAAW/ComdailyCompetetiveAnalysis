import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import NewAnalysis from './pages/NewAnalysis';
import SavedAnalyses from './pages/SavedAnalyses';
import NavBar from './components/NavBar';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/new-analysis" element={<NewAnalysis />} />
        <Route path="/saved-analyses" element={<SavedAnalyses />} />
      </Routes>
    </Router>
  );
}

export default App;