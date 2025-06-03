import React, { useState } from 'react';
import axios from 'axios';
import PdfDownloadButton from '../components/PdfDownloadButton';

function NewAnalysis() {
  const [brand1, setBrand1] = useState('');
  const [brand2, setBrand2] = useState('');
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    const response = await axios.post('http://localhost:8000/analyze', {
      brand1,
      brand2,
      text
    });
    setResult(response.data);
  };

  return (
    <div className="page">
      <h2>New Brand Analysis</h2>
      <input placeholder="Brand 1 Name" value={brand1} onChange={e => setBrand1(e.target.value)} />
      <input placeholder="Brand 2 Name" value={brand2} onChange={e => setBrand2(e.target.value)} />
      <textarea placeholder="Paste newsletter text here..." value={text} onChange={e => setText(e.target.value)} />
      <button onClick={handleSubmit}>Run Analysis</button>

      {result && (
        <div>
          <h3>Analysis Results</h3>
          <ul>
            {result.attributes.map(attr => (
              <li key={attr.name}>{attr.name}: {attr.value}</li>
            ))}
          </ul>
          <PdfDownloadButton data={result} />
        </div>
      )}
    </div>
  );
}

export default NewAnalysis;