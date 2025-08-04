# 🐉 Dragon Ball JWT App

Aplicación web completa que demuestra la implementación de **JWT (JSON Web Tokens)** para autenticación, consumiendo la API de Dragon Ball. Desarrollada con Next.js y PostgreSQL.

![Dragon Ball App](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 📋 Características Principales

### 🔐 Sistema de Autenticación Completo
- ✅ **Registro de usuarios** con validación robusta de contraseñas
- ✅ **Inicio de sesión** con JWT seguro
- ✅ **Logout** con limpieza de sesión
- ✅ **Protección de rutas** con middleware personalizado
- ✅ **Hash seguro de contraseñas** con bcrypt (12 rounds)
- ✅ **Tokens JWT** con expiración y validación completa

### 🐉 Funcionalidades de la Aplicación
- ✅ **Exploración de personajes** de Dragon Ball
- ✅ **Búsqueda avanzada** por nombre de personaje
- ✅ **Detalles completos** de cada personaje (transformaciones, ki, planeta, etc.)
- ✅ **Paginación** de resultados
- ✅ **Diseño responsive** optimizado para móviles y desktop
- ✅ **Estados de carga** y manejo de errores
- ✅ **Datos de fallback** cuando la API externa no está disponible

### 🛡️ Seguridad Implementada
- ✅ **Validación de contraseñas** (mayúsculas, minúsculas, números, caracteres especiales)
- ✅ **Sanitización de datos** de entrada
- ✅ **Middleware de autenticación** en todas las rutas protegidas
- ✅ **Manejo seguro de tokens** con expiración automática
- ✅ **Prevención de inyecciones SQL** con consultas parametrizadas

## 🛠 Tecnologías Utilizadas

- **Frontend**: Next.js 14 (Pages Router), React 18, Tailwind CSS v3
- **Backend**: Next.js API Routes con ES Modules
- **Base de datos**: PostgreSQL con triggers automáticos
- **Autenticación**: JWT (jsonwebtoken) con bcryptjs
- **HTTP Client**: Axios con interceptores
- **Estilos**: Tailwind CSS con componentes personalizados
- **Desarrollo**: ESLint, ES Modules

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js v18 o superior
- PostgreSQL v12 o superior
- npm o yarn

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/dragon-ball-jwt-app.git
cd dragon-ball-jwt-app
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar PostgreSQL

**Crear usuario y base de datos:**
```sql
-- Conectar como postgres
psql -U postgres

-- Crear usuario y base de datos
CREATE USER dragon_user WITH PASSWORD 'dragon_password_2024';
CREATE DATABASE dragon_ball_app OWNER dragon_user;
GRANT ALL PRIVILEGES ON DATABASE dragon_ball_app TO dragon_user;
```

**Ejecutar migraciones:**
```bash
psql -U dragon_user -d dragon_ball_app -h localhost -f database/init.sql
```

### 4. Configurar variables de entorno

Crear archivo `.env.local` en la raíz del proyecto:
```env
JWT_SECRET=tu_clave_secreta_muy_segura_aqui_2024
JWT_EXPIRES_IN=7d
DATABASE_URL=postgresql://dragon_user:dragon_password_2024@localhost:5432/dragon_ball_app
NEXT_PUBLIC_API_URL=http://localhost:3000
NODE_ENV=development
```

### 5. Ejecutar la aplicación
```bash
# Modo desarrollo
npm run dev

# La aplicación estará disponible en http://localhost:3000
```

## 🎯 Cómo Usar la Aplicación

### 1. **Registro de Usuario**
- Navegar a `/register`
- Completar el formulario con validación en tiempo real
- El sistema creará automáticamente una sesión JWT

### 2. **Inicio de Sesión**
- Ir a `/login`
- Ingresar credenciales registradas
- Acceso automático al dashboard principal

### 3. **Explorar Personajes**
- **Dashboard**: Información de bienvenida y acceso rápido
- **Personajes**: Lista completa con paginación
- **Búsqueda**: Filtro por nombre de personaje
- **Detalles**: Información completa incluyendo transformaciones y estadísticas

### 4. **Navegación**
- Todas las rutas están protegidas por autenticación
- Logout disponible desde la barra de navegación
- Redirección automática para usuarios no autenticados

## 🔒 Arquitectura de Seguridad

### Flujo de Autenticación JWT
1. **Usuario se registra/login** → Servidor valida credenciales
2. **Servidor genera JWT** → Token firmado con clave secreta
3. **Cliente almacena token** → LocalStorage con manejo seguro
4. **Requests incluyen token** → Header Authorization: Bearer
5. **Middleware valida token** → Verificación en cada request protegido

### Características de Seguridad
- **Tokens con expiración** configurable (7 días por defecto)
- **Validación de issuer/audience** en JWT
- **Hash bcrypt con 12 rounds** para contraseñas
- **Sanitización** de todas las entradas de usuario
- **Prevención XSS** con validación estricta

## 📊 Estructura del Proyecto

```
dragon-ball-jwt-app/
├── 📁 components/          # Componentes React reutilizables
├── 📁 hooks/               # Custom hooks (useAuth)
├── 📁 lib/                 # Configuración de DB y APIs externas
├── 📁 middleware/          # Middleware de autenticación
├── 📁 models/              # Modelos de datos (User)
├── 📁 pages/               # Páginas y API routes de Next.js
│   ├── 📁 api/auth/        # Endpoints de autenticación
│   ├── 📁 api/characters/  # Endpoints de personajes
│   └── 📁 characters/      # Páginas de personajes
├── 📁 styles/              # Estilos globales y Tailwind
├── 📁 utils/               # Utilidades (JWT, password)
└── 📁 database/            # Scripts SQL de inicialización
```

## 🎓 Propósito Educativo

Este proyecto fue desarrollado como **demostración práctica** para la materia de **Arquitectura Empresarial**, implementando:

### Conceptos Demostrados
- **Autenticación stateless** con JWT
- **Arquitectura full-stack** moderna
- **Seguridad web** con mejores prácticas
- **Integración con APIs externas**
- **Gestión de estado** en aplicaciones React
- **Base de datos relacional** con PostgreSQL

### Objetivos de Aprendizaje
- Comprender el funcionamiento interno de JWT
- Implementar autenticación segura desde cero
- Manejar bases de datos relacionales
- Crear interfaces de usuario modernas y responsivas
- Aplicar principios de seguridad en aplicaciones web

## 🚀 Características Técnicas Avanzadas

- **ES Modules** completos en todo el proyecto
- **Middleware personalizado** para protección de rutas
- **Context API** para gestión de estado global
- **Interceptores HTTP** para manejo automático de tokens
- **Error boundaries** y manejo robusto de errores
- **Loading states** en toda la aplicación
- **Responsive design** con Tailwind CSS
- **Optimización de rendimiento** con Next.js

## 📸 Screenshots

### Página de Login
Interfaz moderna con validación en tiempo real y diseño responsive.
![Login](docs/images/login.png)

### Dashboard Principal
Panel de bienvenida con información del usuario autenticado y acceso rápido a funcionalidades.
![Dashboard](docs/images/dashboard.png)


### Lista de Personajes
Exploración completa de personajes con búsqueda, paginación y cards informativas.
![Lista de personajes](docs/images/personajes.png)

### Detalles de Personaje
Información detallada incluyendo transformaciones, estadísticas de poder y biografía.
![Detalle de personaje](docs/images/detalle.png)

## 👨‍💻 Desarrollo

### Scripts Disponibles
```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build para producción
npm run start    # Servidor de producción
npm run lint     # Linter ESLint
```

### Tecnologías Destacadas
- **Next.js 14** con Pages Router para estructura clara
- **PostgreSQL** con triggers automáticos y optimizaciones
- **Tailwind CSS v3** con componentes personalizados
- **ES Modules** para código moderno y consistente

---

**Desarrollado para Arquitectura Empresarial - PUCE 2025**  
*Implementación completa de JWT en aplicaciones web modernas* 🐉✨