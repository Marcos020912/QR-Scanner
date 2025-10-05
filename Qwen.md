# QR Scanner - Documentación del Proyecto

## Descripción General
QR Scanner es una aplicación web diseñada para permitir a pequeños negocios sin acceso a cajas registradoras escanear códigos QR para acelerar el registro de compras en tiendas físicas y calcular facturas. La aplicación está construida con tecnologías web estándar: HTML, CSS y JavaScript.

## Objetivo del Proyecto
Brindar una solución económica y eficiente para pequeños comercios que necesitan un sistema de registro de ventas sin la inversión en equipos costosos como cajas registradoras tradicionales.

## Tecnologías Utilizadas
- HTML5
- CSS3
- JavaScript (ES6+)

## Estructura del Proyecto

```
QR-Scanner/
├── index.html              # Página principal de la aplicación
├── manifest.json           # Archivo de manifest para PWA
├── README.md               # Documentación general del proyecto
├── assets/
│   ├── icons/
│   │   └── icon.png        # Icono de la aplicación
│   └── images/             # Carpeta para imágenes adicionales
└── src/
    ├── css/
    │   └── main.css        # Hoja de estilos principal
    └── js/
        ├── config.js       # Configuraciones generales de la aplicación
        ├── main.js         # Punto de entrada principal de la lógica
        ├── utils.js        # Funciones utilitarias generales
        └── modules/
            ├── dataService.js    # Servicio para manejo de datos
            └── qrScanner.js      # Módulo para escaneo de códigos QR
```

### Archivos Principales

#### index.html
Página principal de la aplicación que contiene la estructura HTML y enlaza los recursos necesarios (CSS, JavaScript).

#### manifest.json
Archivo de manifest para permitir que la aplicación funcione como una aplicación web progresiva (PWA).

#### assets/
Carpeta que contiene recursos estáticos como iconos e imágenes utilizadas en la aplicación.

#### src/css/main.css
Hoja de estilos principal que define la apariencia visual de la aplicación.

#### src/js/config.js
Archivo que contiene configuraciones generales de la aplicación como rutas API, constantes, etc.

#### src/js/main.js
Punto de entrada principal de la lógica de la aplicación donde se inicializan los módulos.

#### src/js/utils.js
Funciones utilitarias compartidas que pueden ser usadas en diferentes partes de la aplicación.

#### src/js/modules/
Carpeta que contiene módulos específicos de la aplicación:

- `dataService.js`: Maneja la lógica para interactuar con datos (almacenamiento local o API)
- `qrScanner.js`: Contiene la lógica específica para escanear códigos QR

## Características del Proyecto

- **Sin caja registradora**: Solución económica para pequeños negocios
- **Escaneo de productos**: Acelera el registro de compras mediante códigos QR
- **Cálculo de facturas**: Calcula automáticamente el total de las compras
- **Diseño web responsive**: Funciona en diferentes dispositivos
- **Progressive Web App (PWA)**: Funcionalidad de instalación opcional

## Instrucciones Básicas de Uso

1. Abrir `index.html` en un navegador web moderno
2. Permitir acceso a la cámara para el escaneo de códigos QR
3. Escanear códigos QR de productos para registrar compras
4. La aplicación calculará automáticamente el total de la factura

## Consideraciones de Desarrollo

- La aplicación debe funcionar en navegadores web modernos
- Debe tener acceso a la cámara para el escaneo de QR
- Se recomienda usar dispositivos con cámara para un uso óptimo
- El almacenamiento local puede usarse para persistir datos de ventas

## Idioma
Todos los comentarios, documentación y mensajes en la interfaz deben estar en español para facilitar el uso por parte de los comerciantes hispanohablantes.

## Convenciones de Commits
Cuando se realicen commits en este repositorio, estos deben ser claros sobre los cambios realizados que se van a actualizar. Además, se debe aclarar que los commits fueron realizados con ayuda de inteligencia artificial para mantener transparencia sobre el proceso de desarrollo.