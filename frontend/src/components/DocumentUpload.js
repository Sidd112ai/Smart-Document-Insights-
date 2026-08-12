import React, { useState } from 'react';
import './DocumentUpload.css';

function DocumentUpload({ onAnalyze, loading }) {
  const [documentText, setDocumentText] = useState('');
  const [documentType, setDocumentType] = useState('legal');
  const [fileContent, setFileContent] = useState('');

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFileContent(event.target.result);
        setDocumentText(event.target.result);
      };
      reader.readAsText(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!documentText.trim()) {
      alert('Please paste or upload document text');
      return;
    }
    onAnalyze(documentText, documentType);
  };

  return (
    <div className="upload-container">
      <form onSubmit={handleSubmit} className="upload-form">
        <div className="form-group">
          <label>Document Type</label>
          <select
            value={documentType}
            onChange={(e) => setDocumentType(e.target.value)}
            disabled={loading}
          >
            <option value="legal">Legal Document</option>
            <option value="research">Research Paper</option>
            <option value="financial">Financial Report</option>
            <option value="general">General Document</option>
          </select>
        </div>

        <div className="form-group">
          <label>Upload Document (TXT)</label>
          <input
            type="file"
            accept=".txt"
            onChange={handleFileUpload}
            disabled={loading}
            className="file-input"
          />
        </div>

        <div className="form-group">
          <label>Or Paste Document Text</label>
          <textarea
            value={documentText}
            onChange={(e) => setDocumentText(e.target.value)}
            placeholder="Paste your document here..."
            rows="8"
            disabled={loading}
            className="textarea"
          />
        </div>

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? 'Analyzing...' : 'Analyze Document'}
        </button>
      </form>
    </div>
  );
}

export default DocumentUpload;
