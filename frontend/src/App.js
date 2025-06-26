import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import HomePage from './pages/HomePage';
import BrandsPage from './pages/BrandsPage';
import BrandDetailPage from './pages/BrandDetailPage';
import NewsletterPage from './pages/NewsletterPage';
import NewsletterAnalysisPage from './pages/NewsletterAnalysisPage';
import CompareBrandsPage from './pages/CompareBrandsPage';
import AnalysisResultPage from './pages/AnalysisResultPage';
import './App.css';

function App() {
  return (
    
      <div className="app">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/brands" element={<BrandsPage />} />
            <Route path="/brands/:brandId" element={<BrandDetailPage />} />
            <Route path="/newsletters" element={<NewsletterPage />} />
            <Route path="/newsletter-analysis" element={<NewsletterAnalysisPage />} />
            <Route path="/compare-brands" element={<CompareBrandsPage />} />
            <Route path="/analysis-result" element={<AnalysisResultPage />} />
          </Routes>
        </main>
      </div>
   
  );
}

export default App;
