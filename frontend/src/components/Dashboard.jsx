// src/pages/Dashboard.jsx
import React, { useState } from 'react';
import BrandForm from '../components/BrandForm';
import AnalysisResults from '../components/AnalysisResults';
import AnalysisHistory from '../components/AnalysisHistory';

const Dashboard = () => {
  const [result, setResult] = useState(null);
  const [brand1Name, setBrand1Name] = useState('');
  const [brand2Name, setBrand2Name] = useState('');

  const handleAnalysisComplete = (data, b1, b2) => {
    setResult(data);
    setBrand1Name(b1);
    setBrand2Name(b2);
  };

  return (
    <div className="dashboard">
      {/* Brand Form for Analysis */}
      <BrandForm onAnalysisComplete={handleAnalysisComplete} />

      {/* Display Results */}
      {result && (
        <AnalysisResults
          result={result}
          brand1Name={brand1Name}
          brand2Name={brand2Name}
        />
      )}

      {/* History of Previous Analyses */}
      <AnalysisHistory />
    </div>
  );
};

export default Dashboard;
