import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [languages, setLanguages] = useState({});
  const [isConverting, setIsConverting] = useState(false);
  const [conversionStatus, setConversionStatus] = useState('');
  const [audioFile, setAudioFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    // Fetch available languages from backend
    fetch('http://localhost:5000/api/languages')
      .then(res => res.json())
      .then(data => setLanguages(data))
      .catch(err => console.error('Error fetching languages:', err));
  }, []);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/pdf') {
        setSelectedFile(file);
      } else {
        alert('Please select a PDF file');
      }
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    } else {
      alert('Please select a PDF file');
    }
  };

  const handleConvert = async () => {
    if (!selectedFile) {
      alert('Please select a PDF file first');
      return;
    }

    setIsConverting(true);
    setConversionStatus('Converting PDF to audio...');

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('language', selectedLanguage);

    try {
      const response = await fetch('http://localhost:5000/api/convert', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setConversionStatus(data.message);
        setAudioFile(data.audio_file);
      } else {
        setConversionStatus(`Error: ${data.error}`);
      }
    } catch (error) {
      setConversionStatus('Error: Failed to convert PDF');
      console.error('Conversion error:', error);
    } finally {
      setIsConverting(false);
    }
  };

  const handleDownload = () => {
    if (audioFile) {
      window.open(`http://localhost:5000/api/audio/${audioFile}`, '_blank');
    }
  };

  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <h1>📚 PDF to Audio Converter</h1>
          <p>Transform your books into audio files with ease</p>
        </header>

        <main className="main-content">
          {/* File Upload Section */}
          <section className="upload-section">
            <h2>Step 1: Upload Your PDF</h2>
            <div 
              className={`upload-area ${dragActive ? 'drag-active' : ''} ${selectedFile ? 'has-file' : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileSelect}
                id="file-input"
                className="file-input"
              />
              <label htmlFor="file-input" className="upload-label">
                <div className="upload-icon">📄</div>
                <p className="upload-text">
                  {selectedFile ? selectedFile.name : 'Drag & drop your PDF here or click to browse'}
                </p>
                <p className="upload-hint">Supports PDF files only</p>
              </label>
            </div>
          </section>

          {/* Language Selection Section */}
          <section className="language-section">
            <h2>Step 2: Choose Language</h2>
            <div className="language-grid">
              {Object.entries(languages).map(([code, name]) => (
                <button
                  key={code}
                  className={`language-btn ${selectedLanguage === code ? 'selected' : ''}`}
                  onClick={() => setSelectedLanguage(code)}
                >
                  <span className="language-flag">
                    {code === 'en' ? '🇺🇸' : code === 'fr' ? '🇫🇷' : code === 'ar' ? '🇸🇦' : '🇪🇸'}
                  </span>
                  <span className="language-name">{name}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Convert Button */}
          <section className="convert-section">
            <button
              className={`convert-btn ${isConverting ? 'converting' : ''}`}
              onClick={handleConvert}
              disabled={!selectedFile || isConverting}
            >
              {isConverting ? (
                <>
                  <span className="spinner"></span>
                  Converting...
                </>
              ) : (
                <>
                  <span className="convert-icon">🔊</span>
                  Convert to Audio
                </>
              )}
            </button>
          </section>

          {/* Status and Download */}
          {conversionStatus && (
            <section className="status-section">
              <div className={`status-message ${audioFile ? 'success' : 'error'}`}>
                {conversionStatus}
              </div>
              {audioFile && (
                <button className="download-btn" onClick={handleDownload}>
                  <span className="download-icon">⬇️</span>
                  Download Audio File
                </button>
              )}
            </section>
          )}
        </main>

        <footer className="footer">
          <p>Made with ❤️ for book lovers</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
