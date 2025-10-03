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

// Solicitar acceso a la cámara
navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
  .then(function(mediaStream) {
    stream = mediaStream;
    video.srcObject = stream;
    video.setAttribute("playsinline", true);
    video.play();
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
  scanningActive = true;
  scannedData = null;
});

// Evento para enviar la solicitud
sendBtn.addEventListener('click', function() {
  const spreadsheetUrl = spreadsheetUrlInput.value.trim();
  const quantity = quantityInput.value.trim();
  const user = userInput.value.trim();
  const password = passwordInput.value.trim();

  // Validar que todos los campos estén llenos
  if (!spreadsheetUrl || !quantity || !user || !password || !scannedData) {
    alert("Por favor complete todos los campos y escanee un código QR.");
    return;
  }

  // Enviar solicitud a Google Apps Script
  // ATENCIÓN: El modo 'no-cors' no permite manejar correctamente la respuesta
  // y puede causar problemas. Considera implementar un proxy o verificar la
  // configuración de CORS en tu script de Google Apps Script si es posible.
  fetch('https://script.google.com/macros/s/AKfycbzG5WH00sEz0j9mhwBXsZqvwG96PZyql9V97VexgWrTj5g4aGPTIQUURg8LYH8j2aqYow/exec', {
    method: 'POST',
    // mode: 'no-cors', // Comentado por razones de manejo de respuesta
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `spreadsheetUrl=${encodeURIComponent(spreadsheetUrl)}&qrData=${encodeURIComponent(scannedData)}&quantity=${encodeURIComponent(quantity)}&user=${encodeURIComponent(user)}&password=${encodeURIComponent(password)}`
  })
  .then(response => {
      // Si no usas 'no-cors', puedes verificar el estado de la respuesta
      // if (!response.ok) {
      //   throw new Error(`HTTP error! status: ${response.status}`);
      // }
      return response.text(); // o response.json() si tu GAS devuelve JSON
  })
  .then(data => {
      console.log("Respuesta del servidor:", data); // Para depuración
      // Limpiar solo el campo de cantidad y reiniciar escáner
      quantityInput.value = '';
      resultDiv.classList.add('hidden');
      resetBtn.classList.add('hidden');
      scanningActive = true;
      scannedData = null;
  })
  .catch(error => {
    console.error("Error al enviar:", error);
    alert("Error al enviar la solicitud. Intente de nuevo. Detalles: " + error.message);
  });
});

// Función principal del escaneo
function tick() {
  if (!scanningActive) return;

  if (video.readyState === video.HAVE_ENOUGH_DATA) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    const code = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: "dontInvert",
    });

    if (code) {
      resultDiv.textContent = "QR detectado: " + code.data;
      resultDiv.classList.remove("hidden");
      resetBtn.classList.remove("hidden");
      scanningActive = false; // Detener escaneo hasta que se reinicie
      scannedData = code.data;
    }
  }
  if (scanningActive) {
    requestAnimationFrame(tick);
  }
}
