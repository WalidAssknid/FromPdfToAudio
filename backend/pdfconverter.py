from pypdf import PdfReader
from gtts import gTTS
from tkinter import Tk
from tkinter.filedialog import askopenfilename

# Hide the root tkinter window
Tk().withdraw()

# Ask user to select a PDF
book = askopenfilename(title="Select a PDF Book", filetypes=[("PDF files", "*.pdf")])
if not book:
    print("❌ No file selected.")
    exit()

# Language options
languages = {
    "1": ("English", "en"),
    "2": ("French", "fr"),
    "3": ("Arabic", "ar"),
    "4": ("Spanish", "es")
}

# Display language options
print("\nChoose a language for the audio:")
for key, (name, code) in languages.items():
    print(f"{key}. {name}")

# Ask for user choice
choice = input("Enter the number of your choice: ").strip()
if choice not in languages:
    print("❌ Invalid choice.")
    exit()

lang_name, lang_code = languages[choice]
print(f"\n🔊 Converting to {lang_name}...")

# Read and extract PDF text
reader = PdfReader(book)
text = ''
for page in reader.pages:
    extracted = page.extract_text()
    if extracted:
        text += extracted + '\n'

if not text.strip():
    print("❌ No readable text found in the PDF.")
    exit()

# Convert to speech
tts = gTTS(text=text, lang=lang_code)
output_file = f"output_{lang_code}.mp3"
tts.save(output_file)

print(f"\n✅ Done! Audio saved as: {output_file}")
