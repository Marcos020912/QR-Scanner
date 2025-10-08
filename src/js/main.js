// JavaScript for handling the settings menu, dark mode toggle, and modal form

document.addEventListener('DOMContentLoaded', function() {
    const settingsBtn = document.getElementById('settingsBtn');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const addButton = document.getElementById('addButton');
    const modal = document.getElementById('modal');
    const closeModalBtn = document.querySelector('.close');
    const cancelBtn = document.getElementById('cancelBtn');
    const productForm = document.getElementById('productForm');
    const cameraBtn = document.querySelector('.camera-btn');
    const productoInput = document.getElementById('producto');
    const cantidadInput = document.getElementById('cantidad');
    const productList = document.getElementById('productList');
    const precioInput = document.getElementById('precio');
    const monedaInput = document.getElementById('moneda');

    let animationFrameId = null;

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
    darkModeToggle.addEventListener('change', function() {
        document.body.classList.toggle('dark-mode', this.checked);
        localStorage.setItem('darkMode', this.checked);
    });

    // Check for saved user preference on page load
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    darkModeToggle.checked = savedDarkMode;
    document.body.classList.toggle('dark-mode', savedDarkMode);

    // Function to close the modal and reset state
    function closeModalAndReset() {
        modal.style.display = 'none';
        productForm.reset();
    }

    // Handle modal functionality
    addButton.addEventListener('click', function() {
        modal.style.display = 'block';
    });

    closeModalBtn.addEventListener('click', closeModalAndReset);
    cancelBtn.addEventListener('click', closeModalAndReset);

    // Close modal if user clicks outside of it
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModalAndReset();
        }
    });

    // Camera button functionality for QR code scanning
    cameraBtn.addEventListener('click', function() {
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

        const cameraElement = document.createElement('video');
        cameraElement.id = 'camera-stream';
        cameraElement.style.width = '80%';
        cameraElement.style.maxWidth = '600px';
        cameraElement.style.borderRadius = '8px';
        cameraElement.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
        
        const canvas = document.createElement('canvas');
        canvas.style.display = 'none';

        const instructions = document.createElement('p');
        instructions.textContent = 'Apunta la cámara al código QR para escanearlo';
        instructions.style.color = 'white';
        instructions.style.marginTop = '1rem';
        instructions.style.fontSize = '1.2rem';
        instructions.style.textAlign = 'center';

        const feedbackMessage = document.createElement('p');
        feedbackMessage.style.color = 'red';
        feedbackMessage.style.marginTop = '1rem';
        feedbackMessage.style.textAlign = 'center';

        cameraContainer.appendChild(closeCameraBtn);
        cameraContainer.appendChild(cameraElement);
        cameraContainer.appendChild(canvas);
        cameraContainer.appendChild(instructions);
        cameraContainer.appendChild(feedbackMessage);
        document.body.appendChild(cameraContainer);

        const canvasContext = canvas.getContext('2d');

        function stopCamera() {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
            if (cameraElement.srcObject) {
                cameraElement.srcObject.getTracks().forEach(track => track.stop());
            }
            if (document.body.contains(cameraContainer)) {
                document.body.removeChild(cameraContainer);
            }
        }

        async function startCamera() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: 'environment' }
                });
                cameraElement.srcObject = stream;
                cameraElement.setAttribute('playsinline', true); // Required for iOS
                cameraElement.play();
                animationFrameId = requestAnimationFrame(tick);
            } catch (error) {
                console.error('Error accessing camera:', error);
                alert('No se pudo acceder a la cámara. Por favor, permita el acceso a la cámara en su navegador.');
                stopCamera();
            }
        }

        function tick() {
            if (cameraElement.readyState === cameraElement.HAVE_ENOUGH_DATA) {
                canvas.height = cameraElement.videoHeight;
                canvas.width = cameraElement.videoWidth;
                canvasContext.drawImage(cameraElement, 0, 0, canvas.width, canvas.height);
                const imageData = canvasContext.getImageData(0, 0, canvas.width, canvas.height);
                const code = jsQR(imageData.data, imageData.width, imageData.height, {
                    inversionAttempts: 'dontInvert',
                });

                if (code) {
                    feedbackMessage.textContent = ''; // Clear previous message
                    try {
                        const qrData = JSON.parse(code.data);
                        if (qrData.producto && qrData.precio !== undefined && qrData.moneda !== undefined) {
                            productoInput.value = qrData.producto;
                            precioInput.value = qrData.precio;
                            monedaInput.value = qrData.moneda;
                            alert('Código QR escaneado exitosamente!');
                            stopCamera();
                        } else {
                            feedbackMessage.textContent = 'Código QR inválido: Faltan los campos "producto", "precio" o "moneda".';
                        }
                    } catch (error) {
                        feedbackMessage.textContent = 'El código QR no contiene un JSON válido. Intentando de nuevo...';
                    }
                }
            }
            animationFrameId = requestAnimationFrame(tick);
        }

        startCamera();
        closeCameraBtn.addEventListener('click', stopCamera);
    });

    // Form submission handler
    productForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const producto = productoInput.value.trim();
        const cantidad = cantidadInput.value;
        const precioUnitario = precioInput.value;
        const moneda = monedaInput.value.trim();

        if (!producto || !cantidad || !precioUnitario || !moneda) {
            alert('Por favor, complete todos los campos del formulario.');
            return;
        }

        const precioTotal = parseFloat(precioUnitario) * parseInt(cantidad);

        const productItem = document.createElement('tr');
        productItem.innerHTML = `
            <td>${producto}</td>
            <td>${cantidad}</td>
            <td>${parseFloat(precioUnitario).toFixed(2)}</td>
            <td>${moneda}</td>
            <td>${precioTotal.toFixed(2)}</td>
            <td><button class="delete-btn">🗑️</button></td>
        `;

        // Add event listener for delete button
        const deleteBtn = productItem.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', function() {
            if (confirm('¿Está seguro de que desea eliminar este producto?')) {
                productItem.remove();
                alert('Producto eliminado exitosamente!');
            }
        });

        productList.appendChild(productItem);
        
        closeModalAndReset();

        alert('Producto agregado exitosamente!');
    });

    // Add event listener for 'Limpiar' button
    const clearButton = document.getElementById('clearButton');
    clearButton.addEventListener('click', function() {
        if (confirm('¿Está seguro de que desea eliminar todos los productos?')) {
            productList.innerHTML = '';
            alert('Todos los productos han sido eliminados.');
        }
    });

    // Add event listener for 'Finalizar' button (placeholder)
    const finishButton = document.getElementById('finishButton');
    finishButton.addEventListener('click', function() {
        // Placeholder - currently does nothing
        console.log('Finalizar button clicked - no action defined yet');
    });

    // License Modal Functionality
    const licenseBtn = document.getElementById('licenseBtn');
    const licenseModal = document.getElementById('licenseModal');
    const closeLicenseBtn = document.querySelector('.close-license');
    const cancelLicenseBtn = document.getElementById('cancelLicenseBtn');
    const licenseForm = document.getElementById('licenseForm');
    const licenseKeyInput = document.getElementById('licenseKey');

    licenseBtn.addEventListener('click', function() {
        licenseModal.style.display = 'block';
    });

    closeLicenseBtn.addEventListener('click', function() {
        licenseModal.style.display = 'none';
    });

    cancelLicenseBtn.addEventListener('click', function() {
        licenseModal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === licenseModal) {
            licenseModal.style.display = 'none';
        }
    });

    licenseForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const licenseKey = licenseKeyInput.value.trim();
        if (licenseKey) {
            console.log('License Key:', licenseKey);
            alert('Licencia confirmada!');
            licenseModal.style.display = 'none';
        } else {
            alert('Por favor, ingrese una clave de licencia.');
        }
    });
});
