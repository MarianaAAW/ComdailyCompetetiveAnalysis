
import React, { useState } from 'react';
import { saveAnalysis } from '../services/analysisService';

const AnalysisResults = ({ result, brand1Name, brand2Name }) => {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveAnalysis({
        brand1Name,
        brand2Name,
        ...result
      });
      alert('Analysis saved successfully!');
    } catch (error) {
      console.error('Failed to save analysis:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="analysis-results">
      <h2>Analysis Results: {brand1Name} vs {brand2Name}</h2>

      <div className="results-section">
        <h3>Overview</h3>
        <p>{result.summary}</p>
      </div>

      <div className="results-section">
        <h3>Key Insights</h3>
        <div dangerouslySetInnerHTML={{ __html: result.key_insights.replace(/\n/g, '<br />') }} />
      </div>

      <div className="results-section">
        <h3>Detailed Analysis</h3>
        <div className="attributes-grid">
          {result.attributes.map((attr, index) => (
            <div key={index} className="attribute">
              <span className="attribute-name">{attr.name}</span>
              <div className="attribute-bar">
                <div 
                  className="attribute-value" 
                  style={{ width: `${attr.value * 20}%` }}
                ></div>
                <span className="attribute-score">{attr.value}/5</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="actions">
        <button onClick={handleSave} disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save Analysis'}
        </button>
        <button onClick={() => window.print()}>
          Download PDF Report
        </button>
      </div>
    </div>
  );
};

export default AnalysisResults;
