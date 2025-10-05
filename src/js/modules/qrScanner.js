/**
 * QR Scanner module for QR Scanner App
 */

import { CONFIG } from './config.js';
import { Utils } from './utils.js';

export class QRScanner {
  constructor(videoElement, resultElement, resetButton) {
    this.video = videoElement;
    this.resultElement = resultElement;
    this.resetButton = resetButton;
    
    this.canvas = null;
    this.ctx = null;
    this.stream = null;
    this.scanningActive = false;
    this.scannedData = null;
    
    this.initCanvas();
    this.bindEvents();
  }

  /**
   * Initialize the canvas for QR scanning
   */
  initCanvas() {
    const canvasElements = Utils.createCanvas();
    this.canvas = canvasElements.canvas;
    this.ctx = canvasElements.ctx;
  }

  /**
   * Bind event listeners
   */
  bindEvents() {
    this.resetButton.addEventListener('click', () => {
      this.resetScanner();
    });
  }

  /**
   * Reset the scanner to initial state
   */
  resetScanner() {
    this.resultElement.classList.add('hidden');
    this.resultElement.textContent = '';
    this.resetButton.classList.add('hidden');
    this.scannedData = null;
    this.scanningActive = true;
    
    // Restart the scanning process
    this.startScanning();
  }

  /**
   * Request camera access and start scanning
   */
  async start() {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia(CONFIG.CAMERA.CONSTRAINTS);
      this.video.srcObject = this.stream;
      this.video.setAttribute('playsinline', true);
      this.video.play();
      
      // Wait a bit for the video to be ready
      await Utils.sleep(100);
      
      this.scanningActive = true;
      this.tick();
    } catch (error) {
      console.error('Error accessing camera:', error);
      Utils.showMessage(CONFIG.MESSAGES.CAMERA_ERROR, 'error');
      throw error;
    }
  }

  /**
   * Main scanning loop
   */
  tick() {
    if (!this.scanningActive) {
      return;
    }

    if (this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
      // Adjust canvas size to match video
      this.canvas.width = this.video.videoWidth;
      this.canvas.height = this.video.videoHeight;
      this.ctx.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
      
      const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
      
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert',
      });

      if (code) {
        this.handleQRCodeDetected(code.data);
      }
    }

    // Continue the scanning loop if still active
    if (this.scanningActive) {
      requestAnimationFrame(() => this.tick());
    }
  }

  /**
   * Handle QR code detection
   * @param {string} data - Scanned QR code data
   */
  handleQRCodeDetected(data) {
    this.resultElement.textContent = `QR detectado: ${data}`;
    this.resultElement.classList.remove('hidden');
    this.resetButton.classList.remove('hidden');
    
    this.scannedData = data;
    this.scanningActive = false; // Stop scanning after detection
    
    // Vibrate device if possible to notify user
    if (navigator.vibrate) {
      navigator.vibrate(200);
    }
  }

  /**
   * Stop the scanner
   */
  stop() {
    this.scanningActive = false;
    
    if (this.stream) {
      const tracks = this.stream.getTracks();
      tracks.forEach(track => track.stop());
    }
  }

  /**
   * Get the scanned data
   * @returns {string|null} Scanned QR code data or null if not scanned
   */
  getScannedData() {
    return this.scannedData;
  }
}