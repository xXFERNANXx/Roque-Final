
# 📦 Documentación del Proyecto **MundoAnime** con Docker

## 🗂️ Estructura de Carpetas

```plaintext
ROQUE-FINAL/
├── backend/
│   ├── dist/                  # Código compilado de NestJS
│   ├── postgres/              # Datos persistentes de PostgreSQL
│   ├── src/                   # Código fuente del backend
│   ├── test/                  # Pruebas del backend
│   ├── .dockerignore          # Archivos ignorados por Docker
│   ├── .env                   # Variables de entorno del backend
│   ├── Dockerfile             # Imagen Docker del backend
│   ├── package.json           # Dependencias del backend
│   └── wait-for-postgres.sh   # Script para esperar la disponibilidad de PostgreSQL
│
├── frontend/
│   ├── public/                # Archivos públicos (favicon, logos, etc.)
│   ├── src/                   # Código fuente del frontend (Vite + React/Vue)
│   ├── .dockerignore          # Archivos ignorados por Docker
│   ├── Dockerfile             # Imagen Docker del frontend
│   ├── nginx.conf             # Configuración de Nginx para producción
│   ├── package.json           # Dependencias del frontend
│   └── vite.config.js         # Configuración de Vite
│
└── docker-compose.yml         # Orquestación de contenedores con Docker Compose
```

## 🐳 Dockerfile del Backend

```Dockerfile
FROM node:22-alpine AS builder

WORKDIR /app
COPY package*.json ./ 
COPY tsconfig*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine
WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

RUN apk add --no-cache postgresql-client

COPY wait-for-postgres.sh /wait-for-postgres.sh
RUN chmod +x /wait-for-postgres.sh

EXPOSE 3000

CMD ["/bin/sh", "-c", "/wait-for-postgres.sh db ${DB_PORT} ${DB_USERNAME} ${DB_NAME} && npm run start:prod"]
```

### 🔍 Explicación

- Usa **multi-stage build** para reducir el tamaño final de la imagen.
- Solo instala dependencias necesarias (`npm ci`).
- Incluye el script `wait-for-postgres.sh` para asegurarse de que la base de datos esté disponible antes de iniciar NestJS.
- Expone el puerto 3000, el valor por defecto en aplicaciones NestJS.

## 🐳 Dockerfile del Frontend

```Dockerfile
FROM node:22-alpine as builder

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html/MundoAnime
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### 🔍 Explicación

- Construye el frontend usando **Vite** para mejor rendimiento.
- Utiliza **Nginx** para servir los archivos estáticos.
- El contenido se sirve desde `/MundoAnime`, permitiendo una ruta base personalizada.
- La configuración de Nginx está optimizada para SPAs (Single Page Applications).

## ⚙️ docker-compose.yml

```yaml
version: '3.8'

services:
  db:
    image: postgres:14.4
    environment:
      POSTGRES_USER: ${DB_USERNAME:-postgres}
      POSTGRES_PASSWORD: ${DB_PASSWORD:-postgres}
      POSTGRES_DB: ${DB_NAME:-mundoanime}
    volumes:
      - ./backend/postgres:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${DB_USERNAME:-postgres} -d ${DB_NAME:-mundoanime}"]
    networks:
      - mundoanime-net

  backend:
    build: ./backend
    env_file: .env
    ports:
      - "${BACKEND_PORT:-3000}:3000"
    depends_on:
      db:
        condition: service_healthy
    networks:
      - mundoanime-net

  frontend:
    build: ./frontend
    ports:
      - "${FRONTEND_PORT:-5000}:80"
    volumes:
      - ./frontend/nginx.conf:/etc/nginx/conf.d/default.conf
    depends_on:
      - backend
    networks:
      - mundoanime-net

networks:
  mundoanime-net:
    driver: bridge
```

### 🔍 Explicación

- **PostgreSQL**: Base de datos con persistencia de datos.
- **Backend**: NestJS conectado a PostgreSQL.
- **Frontend**: Aplicación estática servida por Nginx.
- **Red dedicada**: Aísla y permite comunicación segura entre los servicios.

## 🔧 Configuraciones Clave

### 1. `vite.config.js` (Frontend)

```javascript
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/MundoAnime/',
  server: {
    proxy: {
      '/api': {
        target: 'http://backend:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
```

### 2. `nginx.conf` (Frontend)

```nginx
server {
    listen 80;

    location /MundoAnime {
        alias /usr/share/nginx/html/MundoAnime;
        try_files $uri $uri/ /MundoAnime/index.html;
    }

    location /api {
        proxy_pass http://backend:3000;
        proxy_set_header Host $host;
    }
}
```

### 3. CORS en `app.module.ts` (Backend)

```typescript
app.enableCors({
  origin: [
    'http://localhost:5000',
    'http://frontend:80'
  ],
  methods: 'GET,POST,PUT,DELETE'
});
```

## ❗ Errores Comunes y Soluciones

### 1. ❌ Conexión rechazada entre frontend y backend

```bash
# Verifica el estado del backend
docker-compose logs backend

# Prueba la API directamente
curl http://localhost:3000/animes
```

### 2. ❌ Archivos estáticos no encontrados (404)

- Revisa la propiedad `base` en `vite.config.js`.
- Usa rutas relativas en tu frontend.
- Verifica permisos y estructura en `/usr/share/nginx/html/MundoAnime`.

### 3. ❌ Error de conexión a PostgreSQL

```bash
# Consulta logs de PostgreSQL
docker-compose logs db
```

- Revisa las variables `.env`.
- Aumenta el tiempo de espera en `wait-for-postgres.sh`.

## 📌 Consideraciones Finales

- 🔐 **Variables de Entorno**: Usa `.env` para datos sensibles.
- 💾 **Persistencia de Datos**: Usa volúmenes para no perder información.
- 🌐 **Redes Aisladas**: Mejoran la seguridad y la comunicación interna.
- 🧱 **Imágenes Optimizadas**: Usa `multi-stage builds`.

## 🛠️ Comandos Útiles

```bash
# Iniciar todos los servicios
docker-compose up -d --build

# Detener todos los servicios
docker-compose down

# Ver logs en tiempo real
docker-compose logs -f

# Reconstruir un servicio específico
docker-compose up -d --build frontend
```

## 🧩 Cambios y Mejoras Agregadas

- Traducción completa al español.
- Corrección de estilo y redacción profesional.
- Secciones con emojis para mejor visualización.
- Explicaciones ampliadas en configuraciones clave.
- Añadido un apartado de errores comunes y cómo solucionarlos.
- Reorganización y limpieza para mejor lectura.
