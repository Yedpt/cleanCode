# 🚀 CleanCode – Blog para Programadores

Bienvenido a **CleanCode**, un espacio donde compartiré recursos, videos, artículos y herramientas sobre desarrollo web y programación. 📚💡

## 🌟 Características

✅ Publicación de artículos, videos y recursos educativos.
✅ Panel de administración con CRUD completo.
✅ Diseño moderno y responsive.
✅ Backend robusto con tecnologías escalables.

## 🛠️ Tecnologías

### 🎨 Frontend
- ⚛️ React – Componentes reutilizables y eficientes.
- 🎨 Tailwind CSS – Estilos modernos y flexibles.

### 🖥️ Backend
- 🟦 TypeScript – Código seguro y tipado.
- 🚀 Node.js & Express – Servidor rápido y eficiente.
- 🗄️ MySQL & Sequelize – Base de datos relacional con ORM potente.

## 📂 Estructura del Proyecto

```

## ⚙️ Configuración y variables de entorno

El servidor utiliza variables de entorno para configurar la base de datos, el puerto y secretos.
Copia `server/.env.example` a `server/.env` y actualiza los valores antes de ejecutar el backend.

Variables principales (ver `server/.env.example`):
- `DB_HOST` - host de la base de datos (ej. localhost)
- `DB_PORT` - puerto MySQL (ej. 3306)
- `DB_USER` - usuario DB
- `DB_PASSWORD` - contraseña DB
- `DB_DEV_NAME` - nombre de la base de datos de desarrollo
- `DB_TEST_NAME` - nombre de la base de datos de test
- `NODE_ENV` - entorno (`development` / `production` / `test`)
- `PORT` - puerto donde corre el servidor (ej. 4000)
- `JWT_SECRET` - secreto para firmar tokens JWT
- `FRONTEND_URL` - URL del frontend para CORS (ej. http://localhost:5173)
- `DB_SYNC_FORCE` - `true` para forzar `sequelize.sync({ force: true })` (solo development/test)

Buenas prácticas:
- No subir el archivo `.env` al repositorio.
- En producción, deshabilita `DB_SYNC_FORCE` y usa migraciones (Sequelize CLI / umzug).

### Ejecutar localmente
1. Instala dependencias:

```bash
cd server
npm install

cd ../client
npm install
```

2. Crear `server/.env` a partir de `server/.env.example` y configurar valores.

3. Ejecutar en modo desarrollo:

```bash
cd server
npm run dev

cd ../client
npm run dev
```

4. URL por defecto del frontend: `http://localhost:5173`.

Si deseas que el servidor sincronice las tablas automáticamente en desarrollo, establece `DB_SYNC_FORCE=true` en `.env`. Para entornos reales usa migraciones.

