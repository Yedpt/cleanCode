<div align="center">
  

  # 🚀 Clean Coders Blog

  *Una plataforma escalable, robusta y de alto rendimiento para desarrolladores. Comparte noticias, recursos y tutoriales en video con la comunidad.*

  [![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react&logoColor=black&style=for-the-badge)](https://reactjs.org/)
  [![Vite](https://img.shields.io/badge/Vite-5.4.8-646CFF?logo=vite&logoColor=white&style=for-the-badge)](https://vitejs.dev/)
  [![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=nodedotjs&logoColor=white&style=for-the-badge)](https://nodejs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-3178C6?logo=typescript&logoColor=white&style=for-the-badge)](https://www.typescriptlang.org/)
  [![MySQL](https://img.shields.io/badge/MySQL-Sequelize-4479A1?logo=mysql&logoColor=white&style=for-the-badge)](https://www.mysql.com/)
</div>

---

## 🎯 Funcionalidades Principales

Nuestra plataforma ha sido diseñada desde cero para garantizar la mejor experiencia de usuario y una gestión de seguridad impenetrable en el backend.

| Característica | Descripción |
| :---: | :--- |
| 🛡️ **Seguridad y Autenticación** | Flujo de autenticación seguro utilizando **JWT (JSON Web Tokens)** y **bcrypt**. Autorización precisa de rutas mediante middleware personalizado para separar administradores y usuarios. |
| 🗞️ **Motor de Noticias y Blog** | Capacidades completas CRUD para noticias de tecnología. Incluye APIs REST robustas para consultar, crear y gestionar los artículos en la base de datos. |
| 🎥 **Plataforma Educativa** | Biblioteca integrada para recursos enfocados en desarrolladores y tutoriales en vídeo. Controladores dedicados para gestionar un ecosistema de aprendizaje integral. |
| 🔒 **Arquitectura Enterprise** | Backend listo para producción empleando **Helmet** para proteger cabeceras HTTP, **express-rate-limit** para protección DDoS y **express-validator** para un saneamiento estricto. |

---

## 📂 Estructura del Proyecto

La arquitectura del código sigue las mejores prácticas de separación de responsabilidades, dividiendo el ecosistema en entornos independientes Cliente / Servidor.

```text
📦 CleanCoders_Blog/
├── 📁 client/                # 💻 Frontend React + Vite (SPA)
│   ├── 📁 public/            # 🌐 Archivos estáticos públicos
│   ├── 📁 src/               
│   │   ├── 📁 assets/        # 🎨 Recursos visuales y multimedia
│   │   ├── 📁 components/    # 🧩 Componentes UI (Nav, Footer, Forms)
│   │   ├── 📁 context/       # 🧠 Estados globales y AuthContext
│   │   ├── 📁 layout/        # 📐 Estructuras maestras de página
│   │   ├── 📁 pages/         # 📄 Vistas (Home, Login, Noticias, Perfil)
│   │   ├── 📁 routes/        # 🛣️ Configuración dinámica de React Router
│   │   └── 📁 services/      # 🔌 Integración API (Llamadas Axios/Fetch)
│   ├── 📄 package.json       # 📦 Dependencias y scripts frontend
│   └── ⚙️ vite.config.js     # 🛠️ Configuración rápida del bundler
│
├── 📁 server/                # ⚙️ Backend Node.js + Express
│   ├── 📁 controllers/       # 🧠 Lógica de negocio de la API REST
│   ├── 📁 database/          # 🗄️ Conexión principal a MySQL / Sequelize
│   ├── 📁 interfaces/        # 📏 Tipados de TypeScript para validaciones
│   ├── 📁 middleware/        # 🛡️ Seguridad local (JWT, Roles, Bloqueos)
│   ├── 📁 migrations/        # 🏗️ Scripts estructurados para Base de Datos
│   ├── 📁 models/            # 📊 Modelos ORM (Data Layer)
│   ├── 📁 routes/            # 🛤️ Definición modular de endpoints API
│   ├── 📁 __test__/          # 🧪 Pruebas unitarias e integración (Jest)
│   ├── 📄 app.ts             # 🚀 Entry-point de nuestro servidor Express
│   └── 📄 package.json       # 📦 Dependencias estables backend
│
└── 📄 README.md              # 📖 Este archivo de especificaciones
```

---

## 🏗️ Flujo de Datos y Arquitectura Aplicada

La aplicación funciona mediante un modelo de **Cliente-Servidor** donde la interfaz amigable y la API REST se comunican de forma rápida y segura. A continuación un diagrama visual simplificado del recorrido de datos de un usuario interactuando con la aplicación.

```mermaid
graph TD
    %% Estilos Globales
    classDef frontend fill:#0ea5e9,stroke:#0284c7,stroke-width:2px,color:#fff;
    classDef backend fill:#10b981,stroke:#059669,stroke-width:2px,color:#fff;
    classDef database fill:#f59e0b,stroke:#047857,stroke-width:2px,color:#fff;
    classDef user fill:#4f46e5,stroke:#4338ca,stroke-width:2px,color:#fff;

    %% Nodos Principales
    User((👨‍💻 Usuario Petición)):::user

    subgraph "💻 Interfaz del Cliente (React)"
        UI[Pantallas y Vistas UI]:::frontend
        AuthCtx[Verifica Estado Login]:::frontend
    end

    subgraph "⚙️ Motor del Servidor (Node.js)"
        API[Recepción de Petición API]:::backend
        AuthMid[🛡️ Seguridad y Permisos]:::backend
        Controllers[🧠 Lógica de la Plataforma]:::backend
    end

    subgraph "🗄️ Base de Datos"
        DB[(Datos MySQL)]:::database
    end

    %% Relaciones Más Claras
    User -->|1. Navega o hace clic| UI
    UI <-->|2. Consulta credenciales| AuthCtx
    UI -->|3. Manda datos en JSON| API
    API -->|4. Verifica identidades| AuthMid
    AuthMid -->|5. Si está autorizado| Controllers
    Controllers -->|6. Pide / Guarda info| DB
    DB -->|7. Retorna info fresca| Controllers
    Controllers -->|8. Responde con Éxito| UI
```

---

## 💻 Stack Tecnológico Completo

Hemos elegido un ecosistema tecnológico moderno, enfocado directamente en la velocidad de iteración, escalabilidad y una experiencia de desarrollo de primer nivel.

### Frontend (Cliente orientable a UI)
- <img src="https://cdn.simpleicons.org/react/61DAFB" width="16"/> **React 18** (`react`, `react-dom`): Framework UI declarativo basado en la reconciliación del DOM y componentes reutilizables.
- <img src="https://cdn.simpleicons.org/vite/646CFF" width="16"/> **Vite**: Herramienta de construcción ultra rápida. Soporta sustituto de módulos en caliente (HMR) casi instantáneo usando SWC.
- <img src="https://cdn.simpleicons.org/tailwindcss/06B6D4" width="16"/> **Tailwind CSS v3**: Motor de estilizado *utility-first* altamente optimizado gracias al paso previo de PostCSS.
- <img src="https://cdn.simpleicons.org/reactrouter/CA4245" width="16"/> **React Router DOM v6**: Gestión dinámica y unificada del enrutamiento sin recargas (Client-side routing).

### Backend (Servidor de aplicaciones)
- <img src="https://cdn.simpleicons.org/nodedotjs/339933" width="16"/> **Node.js**: Entorno de ejecución JavaScript intensivo manejado por eventos (V8 Engine).
- <img src="https://cdn.simpleicons.org/express/000000" width="16"/> **Express**: Micro-framework web que permite construir la estructura HTTP del API Gateway fácilmente.
- <img src="https://cdn.simpleicons.org/typescript/3178C6" width="16"/> **TypeScript**: Superset de JavaScript que nos ofrece tipado fuerte local estático y previene incontables errores en runtime.
- <img src="https://cdn.simpleicons.org/sequelize/52B0E7" width="16"/> **Sequelize**: ORM basado en Promesas que nos abstrae de sentencias SQL puras y estandariza consultas de capa base.
- <img src="https://cdn.simpleicons.org/mysql/4479A1" width="16"/> **MySQL 2**: Controlador moderno de MySQL para interactuar directamente desde Node hacia la capa persistente de datos.
- <img src="https://cdn.simpleicons.org/jest/C21325" width="16"/> **Jest & Supertest**: Herramientas integrales para crear aserciones precisas en nuestras APIs asíncronas.
- <img src="https://cdn.simpleicons.org/jsonwebtokens/000000" width="16"/> **JWT (JSON Web Tokens)**: Certificados simétricos y compactos utilizados dentro de todo el flujo Auth (Stateless Authentication).

---

## 🚀 Guía de Inicio Rápido (Quick Start)

Para desplegar este proyecto en tu entorno local, asegúrate de tener instalado previamente tu motor **Node.js (v18+)** y un entorno funcional **MySQL**. 

### 1. Clonar e Instalar las Dependencias

Abre tu terminal favorita e instala los módulos para ambos proyectos:

```bash
# Instalador para dependencias del cliente React
cd client
npm install

# Instalador consecutivo para dependencias del servidor
cd ../server
npm install
```

### 2. Configurar Variables de Entorno Seguras

Las integraciones hacia tu motor SQL y tu JWT Secret dependen de variables locales. Copia los esquemas para crear los tuyos:

```bash
# Ubicado en la ruta /server
cp .env.example .env
# IMPORTANTE: Rellena tus claves, puerto local y accesos dentro de '.env'
```

### 3. Migraciones a la Base de Datos

Comienza asegurándote que exista la base principal en PHPMyAdmin o MySQL Workbench. A continuación, corre la integración estructural de Sequelize desde el propio proyecto:

```bash
cd server
npm run migrate
```

### 4. Ejecución Integral (Modo Desarrollo Full Stack)

El proyecto completo requiere que corras ambos servidores operando mutuamente. Abre dos nuevas instancias en tu terminal:

**Terminal 1 (Backend - API REST):**
```bash
cd server
npm run dev
# Ejecutará ts-node-dev en modo Watch constante. Disponible puerto http://localhost:PORT
```

**Terminal 2 (Frontend - Interfaz SPA):**
```bash
cd client
npm run dev
# Levantará inmediatamente Vite con HMR. Disponible UI temporal proxy en http://localhost:5173
```

---

## 📷 Demostración de la Aplicación (UI / Modo Visual)

<div align="center">
  <!-- MOCKUP PLACEHOLDER -->
  <picture>
    <img src="https://via.placeholder.com/1000x550/1E293B/38BDF8?text=Interfaz+Visual+Limpia+-+Noticias+y+Recursos+Blog" alt="App Mockup" style="border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
  </picture>
  <br/><br/>
  <p><i>Captura de simulación local: Tablero principal gestionando publicaciones dinámicas, el sistema visual de perfil y área de desarrollo iterativo.</i></p>
</div>

---

## 🧪 Contribuciones y Entorno de Testing Integrado

El directorio `/server` incluye un ecosistema de comprobación continua enfocado en Controladores. Para iniciar y auditar validaciones en un entorno aislado, lanza el motor local de pruebas:

```bash
cd server
# Compilará y descubrirá test con extensiones *.test.ts
npm test 
```

---
<div align="center">
  <strong>Ingeniería meticulosa. Código moderno. Construido para crecer.</strong> <br>
  © 2026 Clean Coders Blog
</div>
