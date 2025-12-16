🛒 TechStore - eCommerce de Tecnología

Proyecto de eCommerce desarrollado con React + Vite, especializado en productos tecnológicos como laptops, periféricos y accesorios premium.

## 🚀 Demo

- **Usuario de prueba:** `admin`
- **Contraseña:** `1234`

## 📋 Descripción

TechStore es una aplicación web completa de comercio electrónico desarrollada con las últimas tecnologías de React. Permite a los usuarios explorar productos, gestionar un carrito de compras, y a los administradores realizar operaciones CRUD sobre el catálogo.

## ✨ Características Principales

### 🛍️ Para Usuarios
- ✅ Catálogo de productos con imágenes y detalles
- ✅ Búsqueda en tiempo real por nombre o categoría
- ✅ Sistema de paginación (8 productos por página)
- ✅ Carrito de compras interactivo
- ✅ Agregar/eliminar productos del carrito
- ✅ Modificar cantidades de productos
- ✅ Cálculo automático de totales
- ✅ Vista detallada de cada producto
- ✅ Notificaciones toast elegantes
- ✅ Diseño responsive y moderno

### 🔐 Autenticación
- ✅ Sistema de login/logout
- ✅ Persistencia de sesión con localStorage
- ✅ Protección de rutas administrativas
- ✅ Información de usuario en el header

### 👨‍💼 Panel de Administración
- ✅ CRUD completo de productos
- ✅ Crear nuevos productos
- ✅ Editar productos existentes
- ✅ Eliminar productos con confirmación
- ✅ Validación de formularios
- ✅ Vista en tabla con imágenes

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 18.3** - Biblioteca de JavaScript para construir interfaces
- **Vite** - Herramienta de desarrollo rápida
- **React Router DOM 6** - Navegación y enrutamiento
- **React Bootstrap 2.10** - Componentes UI
- **Bootstrap 5.3** - Framework CSS

### Backend/API
- **MockAPI** - API REST simulada para gestión de productos

## 💡 Funcionalidades Destacadas

### 1. Context API
- **CarritoContext**: Gestión global del carrito
- **AuthContext**: Estado de autenticación
- **ProductosContext**: CRUD de productos y sincronización con API

### 2. Búsqueda y Filtrado
- Búsqueda en tiempo real
- Filtrado por nombre y categoría
- Reset automático de paginación al buscar

### 3. Paginación Inteligente
- 8 productos por página
- Navegación con botones First, Prev, Next, Last
- Ellipsis (...) para muchas páginas
- Resaltado de página activa

### 4. Notificaciones Toast
- Success: Producto agregado, creado, actualizado
- Error: Fallos en operaciones
- Warning: Producto eliminado
- Info: Cantidad actualizada

### 5. SEO Optimizado
- Meta tags dinámicos por página
- Títulos descriptivos
- Meta descriptions personalizadas
