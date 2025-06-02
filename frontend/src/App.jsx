import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NewAnalysis from './pages/NewAnalysis';
import SavedAnalyses from './pages/SavedAnalyses';
import Header from './components/Header';
import './styles/main.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new-analysis" element={<NewAnalysis />} />
          <Route path="/saved-analyses" element={<SavedAnalyses />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;