/**
 * Utility functions for QR Scanner App
 */

export class Utils {
  /**
   * Creates and returns a canvas element for QR scanning
   * @returns {HTMLCanvasElement} Canvas element
   */
  static createCanvas() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    return { canvas, ctx };
  }

  /**
   * Shows a message to the user
   * @param {string} message - Message to display
   * @param {string} type - Type of message: 'success', 'error', 'info'
   */
  static showMessage(message, type = 'info') {
    // Create or update a message element
    let messageEl = document.getElementById('messageToast');
    
    if (!messageEl) {
      messageEl = document.createElement('div');
      messageEl.id = 'messageToast';
      messageEl.className = 'message-toast';
      document.body.appendChild(messageEl);
    }

    messageEl.textContent = message;
    messageEl.className = `message-toast ${type}`;
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
      messageEl.classList.add('hidden');
    }, 5000);
  }

  /**
   * Shows/hides the status indicator
   * @param {boolean} show - Whether to show or hide the indicator
   * @param {string} text - Text to display in the indicator
   */
  static showStatusIndicator(show, text = 'Procesando...') {
    const indicator = document.getElementById('statusIndicator');
    const statusText = document.querySelector('.status-text');
    
    if (statusText) {
      statusText.textContent = text;
    }
    
    if (show) {
      indicator.classList.remove('hidden');
    } else {
      indicator.classList.add('hidden');
    }
  }

  /**
   * Validates form inputs
   * @param {Object} formData - Form data to validate
   * @returns {Object} Validation result with isValid flag and errors array
   */
  static validateForm(formData) {
    const errors = [];
    
    if (!formData.spreadsheetUrl || formData.spreadsheetUrl.trim() === '') {
      errors.push('La URL de la hoja de cálculo es requerida');
    } else if (!this.isValidUrl(formData.spreadsheetUrl)) {
      errors.push('La URL de la hoja de cálculo no es válida');
    }
    
    if (!formData.quantity || formData.quantity < CONFIG.VALIDATION.MIN_QUANTITY || formData.quantity > CONFIG.VALIDATION.MAX_QUANTITY) {
      errors.push(`La cantidad debe ser un número entre ${CONFIG.VALIDATION.MIN_QUANTITY} y ${CONFIG.VALIDATION.MAX_QUANTITY}`);
    }
    
    if (!formData.user || formData.user.trim() === '') {
      errors.push('El nombre de usuario es requerido');
    }
    
    if (!formData.password || formData.password.trim() === '') {
      errors.push('La contraseña es requerida');
    }
    
    if (!formData.scannedData || formData.scannedData.trim() === '') {
      errors.push('Debe escanear un código QR');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Validates if a string is a valid URL
   * @param {string} url - URL to validate
   * @returns {boolean} True if valid, false otherwise
   */
  static isValidUrl(url) {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * Encodes form data for POST request
   * @param {Object} data - Data to encode
   * @returns {string} Encoded form data
   */
  static encodeFormData(data) {
    return Object.keys(data)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
      .join('&');
  }

  /**
   * Sleeps for a specified number of milliseconds
   * @param {number} ms - Milliseconds to sleep
   * @returns {Promise} Promise that resolves after the specified time
   */
  static async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}