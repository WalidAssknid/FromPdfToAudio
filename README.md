# 📚 PDF to Audio Converter

A modern web application that converts PDF books into audio files using React frontend and Flask backend.

## ✨ Features

- **Drag & Drop Interface**: Easy PDF upload with drag and drop support
- **Multiple Languages**: Support for English, French, Arabic, and Spanish
- **Real-time Conversion**: Live status updates during conversion
- **Modern UI**: Beautiful, responsive design with smooth animations
- **Audio Download**: Direct download of converted audio files
- **Mobile Responsive**: Works perfectly on all devices

## 🛠️ Tech Stack

### Frontend
- **React**: Modern UI framework
- **CSS3**: Custom styling with gradients and animations
- **JavaScript ES6+**: Modern JavaScript features

### Backend
- **Flask**: Python web framework
- **pypdf**: PDF text extraction
- **gTTS**: Google Text-to-Speech conversion
- **Flask-CORS**: Cross-origin resource sharing

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 14+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd FromPdfToAudio
   ```

2. **Setup Backend**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. **Start Backend Server**
   ```bash
   cd backend
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   python app.py
   ```
   Backend will run on: `http://localhost:5000`

2. **Start Frontend Server**
   ```bash
   cd frontend
   npm start
   ```
   Frontend will run on: `http://localhost:3000`

3. **Open your browser** and navigate to `http://localhost:3000`

## 📖 How to Use

1. **Upload PDF**: Drag and drop your PDF file or click to browse
2. **Select Language**: Choose from English, French, Arabic, or Spanish
3. **Convert**: Click "Convert to Audio" and wait for processing
4. **Download**: Click "Download Audio File" to save your audio

## 🏗️ Project Structure

```
FromPdfToAudio/
├── backend/
│   ├── app.py              # Flask API server
│   ├── pdfconverter.py     # PDF processing logic
│   ├── requirements.txt    # Python dependencies
│   ├── uploads/           # Temporary PDF storage
│   └── audio_output/      # Generated audio files
├── frontend/
│   ├── src/
│   │   ├── App.js         # Main React component
│   │   └── App.css        # Styling
│   ├── package.json       # Node.js dependencies
│   └── public/            # Static assets
└── README.md
```

## 🔧 API Endpoints

- `GET /api/languages` - Get available languages
- `POST /api/convert` - Convert PDF to audio
- `GET /api/audio/<filename>` - Download audio file

## 🎨 Features Explained

### Frontend Components
- **File Upload**: Drag & drop with visual feedback
- **Language Selection**: Grid layout with flag icons
- **Progress Tracking**: Real-time conversion status
- **Download Manager**: Direct audio file download

### Backend Processing
- **PDF Extraction**: Text extraction from PDF files
- **Text Processing**: Clean and prepare text for TTS
- **Audio Generation**: Convert text to speech using gTTS
- **File Management**: Secure file handling and cleanup

## 🚀 Deployment

### Backend Deployment
- Use a WSGI server like Gunicorn
- Set up environment variables
- Configure CORS for production

### Frontend Deployment
- Build with `npm run build`
- Serve static files with nginx or similar
- Configure API endpoints for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Google Text-to-Speech (gTTS) for audio conversion
- React team for the amazing frontend framework
- Flask team for the lightweight backend framework

---

Made with ❤️ for book lovers everywhere
