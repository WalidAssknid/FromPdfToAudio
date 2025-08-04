from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename
from pypdf import PdfReader
from gtts import gTTS
import tempfile

app = Flask(__name__)
CORS(app)  # Allow React frontend to access backend

# Configure upload folder
UPLOAD_FOLDER = 'uploads'
AUDIO_FOLDER = 'audio_output'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(AUDIO_FOLDER, exist_ok=True)

# Language options
LANGUAGES = {
    "en": "English",
    "fr": "French", 
    "ar": "Arabic",
    "es": "Spanish"
}

@app.route('/api/hello')
def hello():
    return jsonify({'message': 'Hello from Flask!'})

@app.route('/api/languages')
def get_languages():
    return jsonify(LANGUAGES)

@app.route('/api/convert', methods=['POST'])
def convert_pdf_to_audio():
    try:
        # Check if file was uploaded
        if 'file' not in request.files:
            return jsonify({'error': 'No file uploaded'}), 400
        
        file = request.files['file']
        language = request.form.get('language', 'en')
        
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        if not file.filename.lower().endswith('.pdf'):
            return jsonify({'error': 'File must be a PDF'}), 400
        
        if language not in LANGUAGES:
            return jsonify({'error': 'Invalid language selected'}), 400
        
        # Save uploaded file
        filename = secure_filename(file.filename)
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        file.save(filepath)
        
        # Extract text from PDF
        reader = PdfReader(filepath)
        text = ''
        for page in reader.pages:
            extracted = page.extract_text()
            if extracted:
                text += extracted + '\n'
        
        if not text.strip():
            return jsonify({'error': 'No readable text found in the PDF'}), 400
        
        # Convert to speech
        tts = gTTS(text=text, lang=language)
        audio_filename = f"output_{language}_{filename.replace('.pdf', '')}.mp3"
        audio_path = os.path.join(AUDIO_FOLDER, audio_filename)
        tts.save(audio_path)
        
        # Clean up uploaded PDF
        os.remove(filepath)
        
        return jsonify({
            'success': True,
            'message': f'PDF converted to {LANGUAGES[language]} audio successfully!',
            'audio_file': audio_filename
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/audio/<filename>')
def get_audio(filename):
    try:
        return send_file(
            os.path.join(AUDIO_FOLDER, filename),
            as_attachment=True,
            download_name=filename
        )
    except FileNotFoundError:
        return jsonify({'error': 'Audio file not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)
