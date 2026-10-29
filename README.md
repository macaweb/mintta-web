# Mintta

Proyecto web de Mintta. La versión estática de la tienda se genera con:

```bash
npm run build
```

El comando crea `dist/` con las páginas públicas, estilos, JavaScript, imágenes y catálogo de productos. No copia el archivo de clientes ni el código del servidor.

## Vista previa en un alojamiento estático

Configura un proveedor de alojamiento compatible con tiendas/comercio:
- Comando de compilación: `npm run build`
- Directorio de salida: `dist`

Las compras se preparan en el navegador y se envían por WhatsApp. Los datos del formulario de envío no se guardan en una base de datos desde esta versión estática.

No publiques datos personales ni credenciales en el repositorio. Los cambios actuales están en la rama `quitar-registro-github-pages`.
