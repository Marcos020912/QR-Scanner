/**
 * Configuration file for QR Scanner App
 */

export const CONFIG = {
  API: {
    ENDPOINT: 'https://script.google.com/macros/s/AKfycbzG5WH00sEz0j9mhwBXsZqvwG96PZyql9V97VexgWrTj5g4aGPTIQUURg8LYH8j2aqYow/exec',
    TIMEOUT: 30000, // 30 seconds
  },
  CAMERA: {
    FACING_MODE: 'environment', // Use rear camera on mobile
    CONSTRAINTS: {
      video: { 
        facingMode: 'environment',
        width: { ideal: 1280 },
        height: { ideal: 720 }
      }
    }
  },
  VALIDATION: {
    MIN_QUANTITY: 1,
    MAX_QUANTITY: 999999,
  },
  MESSAGES: {
    CAMERA_ERROR: 'No se pudo acceder a la cámara. Asegúrese de permitir el acceso.',
    FORM_ERROR: 'Por favor complete todos los campos y escanee un código QR.',
    SUCCESS: '¡Datos enviados con éxito!',
    SEND_ERROR: 'Error al enviar la solicitud.',
    NETWORK_ERROR: 'Error de red. Por favor, verifique su conexión e intente nuevamente.',
  }
};