# Documentación del Proyecto MundoAnime con Docker

## Índice de Contenido

1. [Introducción](#introducción)
2. [Estructura del Proyecto](#estructura-del-proyecto)
3. [Configuración de Contenedores](#configuración-de-contenedores)
   - [Backend (NestJS)](#backend-nestjs)
   - [Frontend](#frontend)
   - [Base de Datos (PostgreSQL)](#base-de-datos-postgresql)
4. [Orquestación con Docker Compose](#orquestación-con-docker-compose)
5. [Configuraciones Clave](#configuraciones-clave)
6. [Problemas Comunes y Soluciones](#problemas-comunes-y-soluciones)
7. [Comandos Útiles](#comandos-útiles)
8. [Buenas Prácticas y Recomendaciones](#buenas-prácticas-y-recomendaciones)

## Introducción

MundoAnime es una aplicación web basada en una arquitectura de microservicios, implementada con tecnologías modernas y desplegada mediante contenedores Docker. El proyecto utiliza:

- *Backend*: NestJS (framework de Node.js)
- *Frontend*: Aplicación SPA (posiblemente React, Angular o Vue)
- *Base de Datos*: PostgreSQL 14.4
- *Servidor Web*: Nginx para servir contenido estático
- *Orquestación*: Docker Compose

Esta documentación proporciona información detallada sobre la configuración, despliegue y mantenimiento de todos los componentes en un entorno contenerizado.

## Estructura del Proyecto


ROQUE-FINAL/
├── backend/
│   ├── dist/                  # Código compilado de NestJS
│   ├── postgres/              # Datos persistentes de PostgreSQL
│   ├── src/                   # Código fuente del backend
│   ├── test/                  # Pruebas del backend
│   ├── .dockerignore          # Archivos a ignorar en Docker
│   ├── .env                   # Variables de entorno
│   ├── Dockerfile             # Configuración Docker para backend
│   ├── package.json           # Dependencias del backend
│   └── wait-for-postgres.sh   # Script para esperar PostgreSQL
│
├── frontend/
│   ├── public/                # Assets públicos
│   ├── src/                   # Código fuente del frontend
│   ├── .dockerignore          # Archivos a ignorar en Docker
│   ├── Dockerfile             # Configuración Docker para frontend
│   ├── nginx.conf             # Configuración de Nginx
│   ├── package.json           # Dependencias del frontend
│   └── vite.config.js         # Configuración de Vite
│
└── docker-compose.yml         # Orquestación de contenedores


## Configuración de Contenedores

### Backend (NestJS)

El backend está implementado con NestJS, un framework progresivo de Node.js para construir aplicaciones del lado del servidor.

#### Dockerfile Backend

dockerfile
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


#### Características destacadas:

- *Multi-stage build*: Optimiza el tamaño de la imagen final, separando la fase de compilación de la de ejecución.
- *Node.js Alpine*: Usa imágenes ligeras basadas en Alpine Linux.
- *PostgreSQL Client*: Incluye el cliente para verificar la conectividad con la base de datos.
- *Script de espera*: Implementa wait-for-postgres.sh para asegurar que la base de datos esté disponible antes de iniciar la aplicación.
- *Variables de entorno*: Utiliza variables para configuraciones como credenciales de base de datos.

### Frontend

El frontend parece ser una aplicación de una sola página (SPA) construida con un framework moderno como React, Vue o Angular, utilizando Vite como bundler.

#### Dockerfile Frontend

dockerfile
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


#### Características destacadas:

- *Multi-stage build*: Separa la fase de construcción de la de servir contenido.
- *Nginx*: Utiliza el servidor web Nginx para servir los archivos estáticos generados.
- *Ruta personalizada*: Monta la aplicación bajo la ruta /MundoAnime.
- *Configuración personalizada*: Utiliza un archivo nginx.conf específico para la aplicación.

### Base de Datos (PostgreSQL)

Se utiliza la imagen oficial de PostgreSQL 14.4, con configuración de variables de entorno y volúmenes para persistencia de datos.

## Orquestación con Docker Compose

El archivo docker-compose.yml define y configura los servicios que componen la aplicación:

yaml
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


#### Características destacadas:

- *Valores predeterminados*: Utiliza la sintaxis ${VARIABLE:-default} para proporcionar valores por defecto.
- *Healthcheck*: Implementa verificación de salud para la base de datos.
- *Dependencias*: Establece el orden de inicio de servicios con depends_on.
- *Red dedicada*: Define una red aislada para la comunicación entre servicios.
- *Volúmenes*: Configura la persistencia de datos para PostgreSQL.

## Configuraciones Clave

### 1. Vite Config (Frontend)

javascript
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


- *Base URL*: Configura la ruta base de la aplicación como /MundoAnime/.
- *Proxy API*: Redirige las peticiones a /api hacia el servicio backend.

### 2. Nginx Config (Frontend)

nginx
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


- *SPA Routing*: Configuración try_files para manejar enrutamiento del lado del cliente.
- *API Proxy*: Redirección de solicitudes API al backend.
- *Alias*: Configuración para servir la aplicación desde la ruta /MundoAnime.

### 3. CORS en Backend

typescript
app.enableCors({
  origin: [
    'http://localhost:5000',
    'http://frontend:80'
  ],
  methods: 'GET,POST,PUT,DELETE'
});


- *Orígenes permitidos*: Define qué dominios pueden acceder al API.
- *Métodos HTTP*: Especifica los métodos permitidos en solicitudes CORS.

## Problemas Comunes y Soluciones

### 1. Conexión rechazada entre frontend y backend

*Síntomas:*
- Error 502 Bad Gateway
- Mensajes de error CORS en la consola del navegador

*Soluciones:*
- Verificar que el backend esté en ejecución:
  bash
  docker-compose logs backend
  
- Probar la API directamente:
  bash
  curl http://localhost:3000/animes
  
- Verificar configuración CORS en el backend
- Comprobar que ambos servicios estén en la misma red Docker

### 2. Assets no encontrados (404)

*Síntomas:*
- CSS/JS no se cargan correctamente
- Imágenes rotas o no mostradas

*Soluciones:*
- Verificar la configuración base en vite.config.js
- Asegurar que todas las rutas en el código sean relativas a la base configurada
- Revisar permisos de archivos en /usr/share/nginx/html/MundoAnime
- Verificar la estructura de carpetas en la imagen Nginx

### 3. PostgreSQL no se conecta

*Síntomas:*
- Timeouts en el backend
- Mensajes de conexión rechazada

*Soluciones:*
- Verificar credenciales en archivo .env
- Aumentar tiempos de espera en healthcheck
- Revisar logs de PostgreSQL:
  bash
  docker-compose logs db
  
- Comprobar configuración de red y accesibilidad entre contenedores

## Comandos Útiles

bash
# Iniciar todos los servicios
docker-compose up -d --build

# Detener todos los servicios
docker-compose down

# Ver logs en tiempo real
docker-compose logs -f

# Ver logs de un servicio específico
docker-compose logs -f backend

# Reconstruir un servicio específico
docker-compose up -d --build frontend

# Reiniciar un servicio específico
docker-compose restart backend

# Ejecutar comandos dentro de un contenedor
docker-compose exec backend sh

# Verificar estado de los contenedores
docker-compose ps


## Buenas Prácticas y Recomendaciones

### Seguridad

1. *Variables de entorno*: 
   - Nunca almacenar credenciales directamente en archivos Dockerfile o docker-compose.yml
   - Utilizar archivos .env para desarrollo local
   - Considerar soluciones de administración de secretos para producción

2. *Redes*:
   - Mantener la red mundoanime-net aislada
   - Exponer solo los puertos necesarios

### Rendimiento

1. *Multi-stage builds*:
   - Continuar utilizando la técnica de multi-stage builds para reducir el tamaño de las imágenes

2. *Caché de Docker*:
   - Organizar los Dockerfiles para maximizar el uso de caché
   - Colocar las instrucciones que cambian con frecuencia al final

### Despliegue

1. *Estrategias de actualización*:
   - Considerar implementar actualizaciones graduales o rolling updates
   - Mantener versiones específicas de las imágenes base

2. *Monitoreo*:
   - Incorporar soluciones como Prometheus y Grafana para monitoreo
   - Implementar registros centralizados con ELK Stack o similares

### Mantenimiento

1. *Backups*:
   - Programar copias de seguridad regulares de los volúmenes de PostgreSQL
   - Documentar y probar procedimientos de restauración

2. *Actualizaciones*:
   - Establecer un proceso para actualizar dependencias y imágenes base
   - Mantener registro de cambios en configuraciones Docker