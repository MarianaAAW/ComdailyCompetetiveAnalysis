// src/components/AnalysisHistory.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AnalysisHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get('http://localhost:8000/analysis/all');
        setHistory(res.data);
      } catch (err) {
        console.error('Error fetching history:', err);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="history-container">
      <h2>Previous Analyses</h2>
      {history.length === 0 ? (
        <p>No previous analyses found.</p>
      ) : (
        history.map((item) => (
          <div key={item.id} className="history-item">
            <h4>{item.brand1_name} vs {item.brand2_name}</h4>
            <p><strong>Date:</strong> {new Date(item.timestamp).toLocaleString()}</p>
            <p><strong>Summary:</strong> {item.summary}</p>
            <hr />
          </div>
        ))
      )}
    </div>
  );
};

export default AnalysisHistory;
