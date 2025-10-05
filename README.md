# QR Scanner App

A mobile-friendly QR scanner application that captures QR codes and sends the data along with form information to a Google Spreadsheet.

## Project Structure

```
QR-Scanner/
├── index.html              # Main HTML file
├── manifest.json           # PWA manifest
├── README.md               # This file
├── Qwen.md                 # Project documentation and AI development guidelines
├── assets/
│   ├── icons/
│   │   └── icon.png       # App icon
├── src/
│   ├── css/
│   │   └── main.css       # Main styles
│   └── js/
│       ├── config.js      # Configuration settings
│       ├── utils.js       # Utility functions
│       ├── main.js        # Main application module
│       └── modules/
│           ├── qrScanner.js    # QR scanning functionality
│           └── dataService.js  # API service
```

## Features

- Real-time QR code scanning using device camera
- Form validation for user inputs
- Secure data transmission to Google Spreadsheet
- Responsive design for mobile devices
- PWA support for offline capability
- Error handling and user feedback

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- jsQR library for QR scanning
- Google Apps Script for backend processing

## Setup Instructions

1. Clone the repository
2. Open `index.html` in a web browser
3. Grant camera access when prompted

## Usage

1. Enter the Google Spreadsheet URL
2. Fill in quantity, username and password
3. Point camera at QR code
4. Click "Enviar Solicitud" to send data

## Configuration

All configuration settings are in `src/js/config.js`:
- API endpoint URL
- Camera constraints
- Validation rules
- User messages

## Modules

### QRScanner
Handles camera access and QR code scanning functionality.

### DataService
Manages API requests and data transmission.

### Utils
Provides utility functions for form validation, encoding, and UI updates.

### CONFIG
Centralized configuration for all app settings.

## Browser Compatibility

- Chrome (Mobile & Desktop)
- Firefox (Mobile & Desktop)
- Edge (Mobile & Desktop)

Note: Safari on iOS may require additional configuration for camera access.

## Security Considerations

- Form data is sent via HTTPS
- Input validation is performed before submission
- Credentials are sent directly to secure endpoint