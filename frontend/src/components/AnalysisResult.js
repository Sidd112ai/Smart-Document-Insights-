import React from 'react';
import './AnalysisResult.css';

function AnalysisResult({ data }) {
  return (
    <div className="result-container">
      <div className="result-header">
        <h2>📊 Analysis Results</h2>
        <p className="timestamp">Generated at {new Date(data.timestamp).toLocaleString()}</p>
      </div>

      <div className="result-content">
        <div className="summary-section">
          <h3>Summary</h3>
          <p>{data.summary}</p>
        </div>

        <div className="bullet-points-section">
          <h3>Key Points</h3>
          <ul className="bullet-list">
            {data.bulletPoints && data.bulletPoints.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>

        <div className="metadata">
          <span className="badge">Document Type: {data.documentType}</span>
        </div>
      </div>
    </div>
  );
}

export default AnalysisResult;
