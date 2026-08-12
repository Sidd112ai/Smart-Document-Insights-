import React, { useState } from 'react';
import './App.css';
import DocumentUpload from './components/DocumentUpload';
import AnalysisResult from './components/AnalysisResult';

function App() {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async (documentText, documentType) => {
    setLoading(true);
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          documentText,
          documentType,
        }),
      });

      if (!response.ok) throw new Error('Analysis failed');
      const data = await response.json();
      setAnalysis(data);
    } catch (error) {
      console.error('Error:', error);
      alert('Error analyzing document');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>📄 Smart Document Insights</h1>
        <p>AI-Powered Document Analysis & Summarization</p>
      </header>

      <main className="app-main">
        <div className="container">
          <DocumentUpload onAnalyze={handleAnalyze} loading={loading} />
          {loading && <div className="loading">Analyzing your document...</div>}
          {analysis && <AnalysisResult data={analysis} />}
        </div>
      </main>
    </div>
  );
}

export default App;
