// JavaScript for handling the settings menu, dark mode toggle, and modal form

document.addEventListener('DOMContentLoaded', function() {
    const settingsBtn = document.getElementById('settingsBtn');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const addButton = document.getElementById('addButton');
    const modal = document.getElementById('modal');
    const closeModal = document.querySelector('.close');
    const cancelBtn = document.getElementById('cancelBtn');
    const productForm = document.getElementById('productForm');
    const cameraBtn = document.querySelector('.camera-btn');
    const productoInput = document.getElementById('producto');
    const cantidadInput = document.getElementById('cantidad');
    const productList = document.getElementById('productList');
    
    // Toggle dropdown menu when settings button is clicked
    settingsBtn.addEventListener('click', function() {
        dropdownMenu.classList.toggle('show');
    });
    
    // Close dropdown when clicking outside of it
    window.addEventListener('click', function(event) {
        if (!event.target.matches('#settingsBtn') && !event.target.closest('.dropdown-menu')) {
            if (dropdownMenu.classList.contains('show')) {
                dropdownMenu.classList.remove('show');
            }
        }
    });
    
    // Handle dark mode toggle
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        // Save user preference
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
        
        // Update the text of the toggle button
        this.textContent = isDarkMode ? '🌙 Modo Oscuro (Activado)' : '☀️ Modo Oscuro (Desactivado)';
    });
    
    // Check for saved user preference on page load
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    if (savedDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeToggle.textContent = '🌙 Modo Oscuro (Activado)';
    }
    
    // Handle modal functionality
    addButton.addEventListener('click', function() {
        modal.style.display = 'block';
    });
    
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    cancelBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Close modal if user clicks outside of it
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Camera button functionality for QR code scanning
    cameraBtn.addEventListener('click', function() {
        // Create a container for the camera stream
        const cameraContainer = document.createElement('div');
        cameraContainer.id = 'camera-container';
        cameraContainer.style.position = 'fixed';
        cameraContainer.style.top = '0';
        cameraContainer.style.left = '0';
        cameraContainer.style.width = '100%';
        cameraContainer.style.height = '100%';
        cameraContainer.style.backgroundColor = 'black';
        cameraContainer.style.zIndex = '3000';
        cameraContainer.style.display = 'flex';
        cameraContainer.style.flexDirection = 'column';
        cameraContainer.style.justifyContent = 'center';
        cameraContainer.style.alignItems = 'center';
        
        // Add close button for camera
        const closeCameraBtn = document.createElement('button');
        closeCameraBtn.textContent = 'Cerrar Cámara';
        closeCameraBtn.style.position = 'absolute';
        closeCameraBtn.style.top = '20px';
        closeCameraBtn.style.right = '20px';
        closeCameraBtn.style.padding = '0.5rem 1rem';
        closeCameraBtn.style.backgroundColor = '#ff4444';
        closeCameraBtn.style.color = 'white';
        closeCameraBtn.style.border = 'none';
        closeCameraBtn.style.borderRadius = '4px';
        closeCameraBtn.style.cursor = 'pointer';
        closeCameraBtn.style.fontSize = '1rem';
        closeCameraBtn.style.zIndex = '3001';
        
        // Add camera element
        const cameraElement = document.createElement('video');
        cameraElement.id = 'camera-stream';
        cameraElement.style.width = '80%';
        cameraElement.style.maxWidth = '600px';
        cameraElement.style.borderRadius = '8px';
        cameraElement.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
        
        // Add instructions
        const instructions = document.createElement('p');
        instructions.textContent = 'Apunta la cámara al código QR para escanearlo';
        instructions.style.color = 'white';
        instructions.style.marginTop = '1rem';
        instructions.style.fontSize = '1.2rem';
        instructions.style.textAlign = 'center';
        
        // Add the elements to the container
        cameraContainer.appendChild(closeCameraBtn);
        cameraContainer.appendChild(cameraElement);
        cameraContainer.appendChild(instructions);
        
        // Add the container to the body
        document.body.appendChild(cameraContainer);
        
        // Function to start the camera stream
        async function startCamera() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: 'environment' }
                });
                cameraElement.srcObject = stream;
                
                // Start playing the video
                cameraElement.play();
                
                // In a real implementation, you would use a QR code scanning library like jsQR
                // For demo purposes, we'll simulate QR code scanning
                
                // Set up a timeout to simulate QR code detection after 3 seconds
                setTimeout(() => {
                    // Simulate QR code detection
                    const simulatedQRData = '{"nombre": "Producto de Ejemplo", "precio": 99.99}';
                    
                    try {
                        // Parse the QR code data as JSON
                        const qrData = JSON.parse(simulatedQRData);
                        
                        // Validate that the JSON has required fields
                        if (qrData.nombre && qrData.precio !== undefined) {
                            // Set the producto field with the name from the JSON
                            productoInput.value = qrData.nombre;
                            
                            // Show success message
                            alert('Código QR escaneado exitosamente!');
                        } else {
                            // Show error message for invalid JSON format
                            alert('El código QR no contiene los campos requeridos (nombre y precio)');
                        }
                    } catch (error) {
                        // Show error message for invalid JSON
                        alert('El código QR no contiene un JSON válido');
                    }
                    
                    // Close the camera
                    document.body.removeChild(cameraContainer);
                }, 3000);
                
            } catch (error) {
                console.error('Error accessing camera:', error);
                alert('No se pudo acceder a la cámara. Por favor, permita el acceso a la cámara en su navegador.');
                document.body.removeChild(cameraContainer);
            }
        }
        
        // Start the camera when the camera container is added to the DOM
        startCamera();
        
        // Add event listener to close button
        closeCameraBtn.addEventListener('click', function() {
            // Stop the camera stream
            if (cameraElement.srcObject) {
                const tracks = cameraElement.srcObject.getTracks();
                tracks.forEach(track => track.stop());
            }
            
            // Remove the camera container
            document.body.removeChild(cameraContainer);
        });
    });
    
    // Form submission handler
    productForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const producto = productoInput.value.trim();
        const cantidad = cantidadInput.value;
        
        // Validate that all fields are filled
        if (!producto || !cantidad) {
            alert('Por favor, complete todos los campos del formulario.');
            return;
        }
        
        // Get the price from the QR code scan (simulated for now)
        let precioUnitario = 0;
        
        // In a real implementation, you would get the price from the QR code scan
        // For now, we'll use a default value or calculate based on some logic
        // Since we're simulating, let's assume the price comes from the QR code
        // In our simulation, we'll use 99.99 as the price
        precioUnitario = 99.99;
        
        // Calculate total price
        const precioTotal = parseFloat(precioUnitario) * parseInt(cantidad);
        
        // Create a new product item
        const productItem = document.createElement('div');
        productItem.className = 'product-item';
        productItem.innerHTML = `
            <div class="product-column">${producto}</div>
            <div class="product-column">${cantidad}</div>
            <div class="product-column">${parseFloat(precioUnitario).toFixed(2)}</div>
            <div class="product-column">${precioTotal.toFixed(2)}</div>
        `;
        
        // Add the product item to the product list
        productList.appendChild(productItem);
        
        // Reset form and close modal
        productForm.reset();
        modal.style.display = 'none';
        
        // Show success message
        alert('Producto agregado exitosamente!');
    });
});