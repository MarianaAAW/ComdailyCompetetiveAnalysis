import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import HomePage from './pages/HomePage';
import BrandsPage from './pages/BrandsPage';
import NewsletterPage from './pages/NewsletterPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/brands" element={<BrandsPage />} />
            <Route path="/newsletters" element={<NewsletterPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;