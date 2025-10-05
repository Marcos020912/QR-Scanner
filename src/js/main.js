/**
 * Main application module for QR Scanner App
 */

import { QRScanner } from './modules/qrScanner.js';
import { DataService } from './modules/dataService.js';
import { CONFIG } from './config.js';
import { Utils } from './utils.js';

class QRScannerApp {
  constructor() {
    // Get DOM elements
    this.video = document.getElementById('video');
    this.resultDiv = document.getElementById('result');
    this.resetBtn = document.getElementById('resetBtn');
    this.spreadsheetUrlInput = document.getElementById('spreadsheetUrl');
    this.quantityInput = document.getElementById('quantity');
    this.userInput = document.getElementById('user');
    this.passwordInput = document.getElementById('password');
    this.sendBtn = document.getElementById('sendBtn');
    this.qrForm = document.getElementById('qrForm');
    
    this.qrScanner = null;
    
    this.init();
  }

  /**
   * Initialize the application
   */
  async init() {
    try {
      // Initialize the QR scanner
      this.qrScanner = new QRScanner(
        this.video,
        this.resultDiv.querySelector('.result-text'),
        this.resetBtn
      );
      
      // Bind form submit event
      this.qrForm.addEventListener('submit', (e) => this.handleSubmit(e));
      
      // Start the QR scanner
      await this.qrScanner.start();
      
      console.log('QR Scanner App initialized successfully');
    } catch (error) {
      console.error('Failed to initialize QR Scanner App:', error);
      Utils.showMessage('Error al inicializar la aplicación', 'error');
    }
  }

  /**
   * Handle form submission
   * @param {Event} e - Form submit event
   */
  async handleSubmit(e) {
    e.preventDefault(); // Prevent default form submission
    
    try {
      // Get form data
      const formData = {
        spreadsheetUrl: this.spreadsheetUrlInput.value.trim(),
        quantity: parseInt(this.quantityInput.value),
        user: this.userInput.value.trim(),
        password: this.passwordInput.value.trim(),
        scannedData: this.qrScanner.getScannedData()
      };
      
      // Validate form data
      const validation = Utils.validateForm(formData);
      
      if (!validation.isValid) {
        Utils.showMessage(validation.errors.join('\n'), 'error');
        return;
      }
      
      // Disable submit button to prevent double submission
      this.sendBtn.disabled = true;
      this.sendBtn.textContent = 'Enviando...';
      
      // Send data to server
      const result = await DataService.sendQRData({
        spreadsheetUrl: formData.spreadsheetUrl,
        qrData: formData.scannedData,
        quantity: formData.quantity,
        user: formData.user,
        password: formData.password
      });
      
      // Show success message
      Utils.showMessage(CONFIG.MESSAGES.SUCCESS, 'success');
      
      // Clear quantity input and reset scanner for next scan
      this.quantityInput.value = '';
      this.resetBtn.click();
      
    } catch (error) {
      console.error('Error submitting form:', error);
      Utils.showMessage(`${CONFIG.MESSAGES.SEND_ERROR} Detalles: ${error.message}`, 'error');
    } finally {
      // Re-enable submit button
      this.sendBtn.disabled = false;
      this.sendBtn.textContent = 'Enviar Solicitud';
    }
  }
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new QRScannerApp();
});