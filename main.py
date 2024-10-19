from flask import Flask, render_template, request, jsonify, session
from TTS.api import TTS
import os
import logging
from dotenv import load_dotenv
from groq import Groq
# from TTS.utils.synthesizer import Synthesizer

load_dotenv()  # Carga las variables de entorno desde .env

app = Flask(__name__)
app.secret_key = os.getenv('FLASK_SECRET_KEY') # Add a secret key for session management

# Groq API configuration
client = Groq(api_key=os.getenv('GROQ_API_KEY'))

# Initialize Coqui TTS
base_path = "models/tts_models/es/mai/tacotron2-DDC"
model_path = os.path.join(base_path, "model_file.pth")
config_path = os.path.join(base_path, "config.json")
tts = TTS(model_path=model_path, config_path=config_path, progress_bar=False, gpu=False)

# Verifica si los archivos existen
for path in [model_path, config_path]:
    if not os.path.exists(path):
        raise FileNotFoundError(f"File not found: {path}")

# Configurar logging para depuración
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Initialize session or history storage
@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json(force=True)
        user_input = data['text']

        # Retrieve conversation history from session
        if 'conversation_history' not in session:
            session['conversation_history'] = []
        session['conversation_history'].append({"role": "user", "content": user_input})
        messages = session['conversation_history']

        logger.debug(f"Conversation so far: {messages}")

        # Generate AI response using Groq API
        chat_completion = client.chat.completions.create(
            messages=messages,
            model="llama3-groq-70b-8192-tool-use-preview",
            max_tokens=150,
            temperature=0.7,
            top_p=0.95
        )
        response = chat_completion.choices[0].message.content

        session['conversation_history'].append({"role": "assistant", "content": response})

        # Generar audio
        audio_path = "models/output.wav"
        try:
            tts.tts_to_file(text=response, file_path=audio_path)
        except Exception as tts_error:
            logger.error(f"Error generating audio: {str(tts_error)}")
            return jsonify({'error': 'Error generating audio'}), 500

        logger.debug(f"Generated text: {response}")
        return jsonify({'result': response, 'audio_url': f'/{audio_path}'})

    except Exception as e:
        logger.error(f"Error in predict route: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/')
def home():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=81, debug=True)