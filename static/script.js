if ('speechSynthesis' in window) {
    alert("La síntesis de voz está soportada en tu navegador.");
  } else {
    alert("Lo siento, la síntesis de voz no está soportada en tu navegador.");
}  

const startButton = document.getElementById('record');
const stopButton = document.getElementById('stop');
const chatDiv = document.getElementById('chat');

// Crear una nueva instancia de reconocimiento de voz
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'es-AR';

recognition.onstart = function() {
    console.log('El reconocimiento de voz está activado');
};

recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript;
    console.log(transcript);

    // Agregar el mensaje del usuario al chat
    const userMessageDiv = document.createElement('div');
    userMessageDiv.textContent = transcript;
    userMessageDiv.classList.add('bg-blue-500', 'text-white', 'rounded', 'p-4', 'shadow-md');
    chatDiv.appendChild(userMessageDiv);

    // Enviar la transcripción al servidor local
    fetch('http://127.0.0.1:81/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: transcript })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.error) {
            console.error('Server error:', data.error);
            // Dsiplay error message to the user
            const errorDiv = document.createElement('div');
            errorDiv.textContent = `Error: ${data.error}`;
            errorDiv.classList.add('bg-red-500', 'text-white', 'rounded', 'p-4', 'shadow-md');
            chatDiv.appendChild(errorDiv);
            return;
        } else {
            // Handle successful response
            console.log('Success:', data.result);
        }

        // Agregar la respuesta del modelo al chat
        const modelMessageDiv = document.createElement('div');
        modelMessageDiv.innerHTML = formatResponse(data.result); // Use the formatting function
        // modelMessageDiv.textContent = data.result;
        modelMessageDiv.classList.add('bg-gray-700', 'text-white', 'rounded', 'p-4', 'shadow-md');
        chatDiv.appendChild(modelMessageDiv);

        // Create SpeechSynthesisUtterance with adjusted parameters
        var utterance = new SpeechSynthesisUtterance(data.result);
        utterance.lang = 'es-AR';
        utterance.pitch = 1.2;
        utterance.rate = 0.9;
        utterance.volume = 1.0;
        
        // Speak the response with these adjusted parameters
        window.speechSynthesis.speak(utterance);
    })
    .catch(error => {
        console.error('Error:', error);
        // Display error message to the user
        const errorDiv = document.createElement('div');
        errorDiv.textContent = `Error: ${error.message}`;
        errorDiv.classList.add('bg-red-500', 'text-white', 'rounded', 'p-4', 'shadow-md');
        chatDiv.appendChild(errorDiv);
        return;
    });
};

startButton.addEventListener('click', () => {
    recognition.start();
});

stopButton.addEventListener('click', () => {
    recognition.stop();
});

// Function to format the response with HTML elements
function formatResponse(response) {
    response = response.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    response = response.replace(/\n+/g, '</p><p>');
    response = response.replace(/^\d+\.\s+/gm, '<li>');  // for ordered lists
    response = response.replace(/^- /gm, '<ul><li>');    // for unordered lists

    return '<p>' + response + '</p>';  // wrap response in <p> tags
}