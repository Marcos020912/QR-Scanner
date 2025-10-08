# Documentación de Lógica del Proyecto QR-Scanner

## Introducción
Este documento detalla la funcionalidad y lógica del proyecto QR-Scanner, que permite a los usuarios escanear códigos QR para agregar productos a una lista de inventario.

## Funcionalidades Principales

### 1. Interfaz de Usuario (UI)
- Header con logo y título "QR-Scaner"
- Botón de configuración (engranaje) que despliega un menú con opción de modo oscuro
- Botón circular con signo "+" para agregar nuevos productos
- Formulario emergente para agregar productos
- Lista de productos con columnas: Nombre, Cantidad, Precio Unitario, Precio Total
- Pie de página con información de derechos de autor

### 2. Modo Oscuro
- Toggle en el menú de configuración para activar/desactivar el modo oscuro
- Cambia el esquema de colores de toda la interfaz
- Guarda la preferencia del usuario en localStorage

### 3. Escaneo de QR Codes
- Botón de cámara en el formulario de producto
- Abre una interfaz de cámara cuando se toca
- Simula la lectura de un código QR (en implementación real, se usaría una biblioteca como jsQR)
- Valida que el contenido del QR code sea un JSON válido con campos "nombre" y "precio"
- Si es válido, rellena el campo "producto" con el valor de "nombre" del JSON

### 4. Gestión de Productos
- Formulario para agregar productos con campos: Producto (texto) y Cantidad (número)
- Validación de campos requeridos antes de guardar
- Cálculo automático del precio total (Cantidad × Precio Unitario)
- Mostrar productos en una lista con sus detalles

### 5. Flujo de Trabajo
1. El usuario hace clic en el botón "+" para agregar un nuevo producto
2. Se abre un formulario modal
3. El usuario puede:
   - Ingresar manualmente el nombre del producto y la cantidad
   - Oprimir el botón de cámara para escanear un QR code
4. Al escanear un QR code, se valida su contenido como JSON con campos "nombre" y "precio"
5. Si es válido, se completa el campo "Producto" con el nombre del producto
6. Al guardar, se validan ambos campos
7. Se calcula el precio total y se añade el producto a la lista
8. El formulario se reinicia y el modal se cierra

## Estructura de Archivos
```
/home/marcos/proyectos/html/QR-Scanner/
├── index.html
├── visual.md
├── logic.md
├── README.md
├── manifest.json
├── assets/
│   ├── icons/
│   │   └── icon.png
│   └── images/
└── src/
    ├── css/
    │   └── style.css
    └── js/
        └── main.js
```

## Tecnologías Utilizadas
- HTML5, CSS3, JavaScript ES6+
- Font: Milkshake (importada desde Google Fonts)
- LocalStorage para guardar preferencias de modo oscuro
- Navegador API: getUserMedia para acceso a la cámara

## Consideraciones Futuras
- Implementar una biblioteca real de escaneo de QR codes (como jsQR)
- Añadir funcionalidad para editar o eliminar productos
- Implementar almacenamiento persistente de productos
- Añadir filtros y búsquedas en la lista de productos