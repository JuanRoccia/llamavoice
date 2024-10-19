# 🎙️ AudioGPT Demo

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

> A voice-powered AI assistant that brings conversations to life

AudioGPT Demo is an innovative side project that showcases the potential of combining advanced language processing with text-to-speech technology. This web-based application allows users to interact with an AI assistant using their voice, creating a natural and engaging conversational experience.

## 🌟 Features

- 🗣️ **Voice Input Recognition**: Capture user's speech with high accuracy
- 🧠 **AI-Powered Responses**: Utilize GPT-3 to generate context-aware and intelligent replies
- 🔊 **Text-to-Speech Output**: Convert AI responses to natural-sounding speech
- 💻 **Web Interface**: Easy-to-use interface accessible from any modern browser
- 📜 **Conversation History**: Keep track of your dialogue with the AI assistant
- 🌐 **Real-time Processing**: Experience quick response times for a smooth conversation flow

## 📊 Project Statistics

pie title Usage of Technologies
    "Python" : 40
    "JavaScript" : 25
    "HTML/CSS" : 20
    "AI Models" : 15

```mermaid
pie title Usage of Technologies
    "Python" : 40
    "JavaScript" : 25
    "HTML/CSS" : 20
    "AI Models" : 15

    https://img.shields.io/tokei/lines/github/yourusername/AudioGPT-Demo

```
show image
![Usage of Technologies](https://img.shields.io/tokei/lines/github/yourusername/AudioGPT-Demo)

## 🛠️ Technologies Used

- Backend:

    - Flask (Python) v3.0.3
    - Groq API Client v0.11.0

- Frontend:

    - HTML5
    - CSS (Tailwind CSS) v2.2.16
    - JavaScript (ES6+)

- Language Model:

    - GPT-3 (via Groq API)

- Text-to-Speech:

    - Coqui TTS v0.22.0

- Speech Recognition:

    - Web Speech API

## 🚀 Setup Instructions

1. **Clone the repository**

    ```sh
    git clone https://github.com/JuanRoccia/AudioGPT.git
    cd AudioGPT
    ```
2. **Create and activate a virtual environment:**
    
    ```sh
    python -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate` instead
    ```
3. **Install the required dependencies:**

    [!TIP]
    If you encounter any issues during installation, make sure you have the latest version of pip: `pip install --upgrade pip`

4. **Set up the environment variables:**

    Create a `.env` file in the root directory and add the following environment variables:

    ```sh
    FLASK_SECRET_KEY=your_secret_key_here
    GROQ_API_KEY=your_groq_api_key_here
    ```
    [!IMPORTANT]
    Never commit your `.env` file to version control. Make sure it's listed in your `.gitignore` file.

5. **Download TTS models files:**

    Place the necessary TTS model files in the models/tts_models/es/mai/tacotron2-DDC/ directory.

    [!NOTE]
    You can download the model files from Coqui TTS Model Repository

6. **Run the application:**

    ```sh
    python main.py
    ```
7. Open your web browser and navigate to http://localhost:81

## 🎯 How to Use
1. Click the microphone button 🎙️ to start recording your voice.
2. Speak your question or command clearly.
3. Click the stop button 🛑 to end the recording.
4. Wait for the AI to process your input and generate a response.
5. Listen to the audio response and read the text on the screen.

## Example Interactions

-- "What's the weather like today?"
-- "Tell me a joke about programming."
-- "Explain the concept of machine learning in simple terms."

## 🔧 Troubleshooting


    | Issue | Solution |
    |-------|----------|
    | Microphone not working | Ensure your browser has permission to access the microphone. Check your system's audio settings. |
    | No sound output | Verify that your system's volume is turned on and the browser is not muted. |
    | Slow response times | Check your internet connection. The AI processing may take longer for complex queries. |

If you encounter persistent issues, please open an issue on GitHub.

## 🤝 Contributing
Contributions, issues, and feature requests are welcome!
Feel free to check the issues page.

## 🔮 Future Improvements

- [ ] Implement multi-language support for the AI assistant
- [ ] Implement user authentication for personalized experiences
- [ ] Add support for multiple languages
 - [ ] Improve UI/UX design with animations and transitions
 - [ ] Integrate with external APIs (e.g., weather, news, calendar)
 - [ ] Optimize AI model for faster response times
 - [ ] Implement voice customization options
 - [ ] Add offline mode for basic functionalities

## 📝 License
This project is MIT licensed.

Made with ❤️ by [JuanRoccia](https://juanroccia.github.io/)
📧 Contact: juanroccia@gmail.com
🌐 Website: [juanroccia.blog](https://juanroccia.vercel.app/)