# Documentación Visual del Proyecto QR-Scaner

## Diseño General
El proyecto QR-Scaner tiene un diseño moderno y limpio con una paleta de colores que cambia entre modo claro y oscuro.

## Elementos Visuales

### Cabecera (Header)
- **Logo**: Icono de QR-Scaner en la izquierda (assets/icons/icon.png)
- **Título**: "QR-Scaner" en la tipografía Milkshake, estilizada y atractiva
- **Botón de configuración**: Emoji de tuerca (⚙️) en la derecha que despliega un menú

### Menú de Configuración
- **Opción de Modo Oscuro**: Toggle para activar/desactivar el modo oscuro
- **Estilo**: Menú desplegable con fondo blanco en modo claro y gris oscuro en modo oscuro

### Botón Principal
- **Forma**: Circular con borde redondeado
- **Icono**: Signo de más (+)
- **Color**: Azul oscuro (#2c3e50) en modo claro, azul más claro en modo oscuro
- **Efecto hover**: Cambia de color y se agranda ligeramente al pasar el mouse

### Formulario Emergente
- **Contenedor**: Modal con fondo semi-transparente y contenido en blanco/gris oscuro
- **Campos de entrada**: 
  - Producto: Campo de texto con botón de cámara (📷) a la derecha
  - Cantidad: Campo numérico con mínimo de 1
- **Validación**: El código QR debe contener los campos "producto", "precio" y "moneda" para ser válido
- **Botones**: 
  - Guardar: Botón azul oscuro con texto blanco
  - Cancelar: Botón gris claro con texto oscuro

### Lista de Productos
- **Encabezado**: Barra con columnas: Nombre, Cantidad, Precio Unitario, Precio Total
- **Filas de productos**: Cada producto se muestra en una fila con los cuatro campos
- **Estilo**: Fondo blanco en modo claro, gris oscuro en modo oscuro

### Pie de Página (Footer)
- **Texto**: "© 2025 QR-Scaner. Todos los derechos reservados."
- **Estilo**: Barra inferior con fondo gris claro en modo claro, gris oscuro en modo oscuro

## Estilos CSS
- **Tipografía principal**: Segoe UI, Tahoma, Geneva, Verdana, sans-serif
- **Tipografía del título**: Milkshake (estilizada)
- **Colores principales**:
  - Claro: #2c3e50 (azul oscuro), #f5f5f5 (gris claro)
  - Oscuro: #1a1a1a (negro oscuro), #f5f5f5 (blanco)
- **Transiciones**: Suaves transiciones de color y tamaño para interacciones

## Comportamiento Visual
- **Modo Oscuro**: Cambia todos los colores de fondo y texto para mejorar la legibilidad en entornos oscuros
- **Interacciones**: Efectos hover en botones y elementos interactivos
- **Responsive**: Diseño adaptativo que funciona bien en diferentes tamaños de pantalla