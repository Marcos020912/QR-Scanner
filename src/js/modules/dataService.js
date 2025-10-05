/**
 * Data service module for handling API requests
 */

import { CONFIG } from './config.js';
import { Utils } from './utils.js';

export class DataService {
  /**
   * Send QR data to the server
   * @param {Object} data - Data to send
   * @param {string} data.spreadsheetUrl - URL of the spreadsheet
   * @param {string} data.qrData - Scanned QR code data
   * @param {number} data.quantity - Quantity of products
   * @param {string} data.user - Username
   * @param {string} data.password - Password
   * @returns {Promise<Object>} Response from the server
   */
  static async sendQRData(data) {
    try {
      Utils.showStatusIndicator(true, 'Enviando datos...');
      
      const formData = {
        spreadsheetUrl: data.spreadsheetUrl,
        qrData: data.qrData,
        quantity: data.quantity,
        user: data.user,
        password: data.password
      };
      
      const encodedData = Utils.encodeFormData(formData);
      
      const response = await fetch(CONFIG.API.ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: encodedData
      });

      if (!response.ok) {
        throw new Error(`Error en la respuesta del servidor: ${response.statusText}`);
      }

      const result = await response.text();
      return result;
    } catch (error) {
      console.error('Error sending data:', error);
      throw error;
    } finally {
      Utils.showStatusIndicator(false);
    }
  }

  /**
   * Test the API connection
   * @returns {Promise<boolean>} True if connection is successful
   */
  static async testConnection() {
    try {
      const response = await fetch(CONFIG.API.ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'test=true'
      });

      return response.ok;
    } catch (error) {
      console.error('Connection test failed:', error);
      return false;
    }
  }
}