# QR-Scaner

Welcome to QR-Scaner, a web application for scanning QR codes and managing product inventory.

## Project Overview

This project is designed to help users scan QR codes that contain product information in JSON format (with fields for 'producto', 'precio', and 'moneda'), and manage their product inventory.

The application features:
- A clean, modern interface with dark mode support
- QR code scanning functionality using the device's camera
- Product management with a simple form for adding products
- A product list display with columns for Nombre, Cantidad, Precio Unitario, and Precio Total

## Documentation

For detailed information about the project, please refer to the following documentation files:

- [Visual Documentation](visual.md) - Detailed description of all visual elements and design decisions
- [Logic Documentation](logic.md) - Comprehensive explanation of all functionality and code structure

## Getting Started

To run this project:
1. Open `index.html` in your web browser
2. Click the "+" button to add a new product
3. Use the camera button to scan QR codes or manually enter product details
4. View your product list with calculated totals

## Features

### Header
- Logo and title "QR-Scaner" with Milkshake font
- Settings button with gear emoji that toggles a dropdown menu for dark mode

### Main Content
- Circular button with "+" symbol to add new products
- Product list with columns for: Nombre, Cantidad, Precio Unitario, Precio Total

### Modal Form
- Form with fields for Producto and Cantidad
- Camera button next to Producto field for scanning QR codes
- Validation to ensure all fields are filled before submission
- QR code scanning functionality that validates JSON format with required fields (producto, precio, and moneda)

### Footer
- Simple footer with copyright information

## Technical Details

This project is built with HTML, CSS, and JavaScript. It uses vanilla JavaScript without any external libraries for simplicity and compatibility.

## Future Enhancements

Potential future features include:
- Saving product data to localStorage or a backend database
- Editing existing products
- Deleting products from the list
- Exporting product list to CSV or PDF
- More sophisticated QR code scanning with actual library integration

For more detailed information, please see the [Visual Documentation](visual.md) and [Logic Documentation](logic.md) files.