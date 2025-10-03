// Obtener referencias a los elementos del DOM
const video = document.getElementById('video');
const resultDiv = document.getElementById('result');
const resetBtn = document.getElementById('resetBtn');
const spreadsheetUrlInput = document.getElementById('spreadsheetUrl');
const quantityInput = document.getElementById('quantity');
const userInput = document.getElementById('user');
const passwordInput = document.getElementById('password');
const sendBtn = document.getElementById('sendBtn');

let scanningActive = true;
let scannedData = null;
let stream = null;

// --- INICIO DE LA CORRECCIÓN ---
// 1. Crear el canvas y su contexto UNA SOLA VEZ fuera del bucle de escaneo.
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
// --- FIN DE LA CORRECCIÓN ---


// Solicitar acceso a la cámara
navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
  .then(function(mediaStream) {
    stream = mediaStream;
    video.srcObject = stream;
    video.setAttribute("playsinline", true);
    video.play();
    // Iniciar el bucle de escaneo
    requestAnimationFrame(tick);
  })
  .catch(function(error) {
    console.error("Error al acceder a la cámara:", error);
    alert("No se pudo acceder a la cámara. Asegúrese de permitir el acceso.");
  });

// Evento para reiniciar el escaneo
resetBtn.addEventListener('click', function() {
  resultDiv.classList.add('hidden');
  resetBtn.classList.add('hidden');
  scannedData = null;
  scanningActive = true;
  // Reiniciamos el bucle de escaneo
  requestAnimationFrame(tick);
});

// Evento para enviar la solicitud
sendBtn.addEventListener('click', function() {
  const spreadsheetUrl = spreadsheetUrlInput.value.trim();
  const quantity = quantityInput.value.trim();
  const user = userInput.value.trim();
  const password = passwordInput.value.trim();

  if (!spreadsheetUrl || !quantity || !user || !password || !scannedData) {
    alert("Por favor complete todos los campos y escanee un código QR.");
    return;
  }
  
  // Muestra un indicador de que se está enviando
  sendBtn.textContent = 'Enviando...';
  sendBtn.disabled = true;

  fetch('https://script.google.com/macros/s/AKfycbzG5WH00sEz0j9mhwBXsZqvwG96PZyql9V97VexgWrTj5g4aGPTIQUURg8LYH8j2aqYow/exec', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `spreadsheetUrl=${encodeURIComponent(spreadsheetUrl)}&qrData=${encodeURIComponent(scannedData)}&quantity=${encodeURIComponent(quantity)}&user=${encodeURIComponent(user)}&password=${encodeURIComponent(password)}`
  })
  .then(response => {
    // Es importante verificar la respuesta, incluso si es solo de texto
    if (!response.ok) {
       throw new Error(`Error en la respuesta del servidor: ${response.statusText}`);
    }
    return response.text();
  })
  .then(data => {
      console.log("Respuesta del servidor:", data);
      alert("¡Datos enviados con éxito!"); // Opcional: notificar al usuario
      quantityInput.value = ''; // Limpiar solo la cantidad
      resetBtn.click(); // Simular clic en reiniciar para la próxima lectura
  })
  .catch(error => {
    console.error("Error al enviar:", error);
    alert("Error al enviar la solicitud. Detalles: " + error.message);
  })
  .finally(() => {
      // Restablecer el botón de envío
      sendBtn.textContent = 'Enviar Solicitud';
      sendBtn.disabled = false;
  });
});

// Función principal del escaneo
function tick() {
  // Si el escaneo no está activo, detenemos el bucle.
  if (!scanningActive) {
      return;
  }

  if (video.readyState === video.HAVE_ENOUGH_DATA) {
    // --- INICIO DE LA CORRECCIÓN ---
    // 2. Ajustamos el tamaño del canvas al del video y lo dibujamos.
    //    Ya no lo creamos, solo lo reutilizamos.
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    // --- FIN DE LA CORRECCIÓN ---

    const code = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: "dontInvert",
    });

    if (code) {
      resultDiv.textContent = "QR detectado: " + code.data;
      resultDiv.classList.remove("hidden");
      resetBtn.classList.remove("hidden");
      scannedData = code.data;
      scanningActive = false; // Detener el escaneo
      // Opcional: hacer vibrar el teléfono para notificar la detección
      if (navigator.vibrate) {
          navigator.vibrate(200);
      }
    }
  }
  
  // Continuar el bucle solo si el escaneo sigue activo
  if (scanningActive) {
    requestAnimationFrame(tick);
  }
}
