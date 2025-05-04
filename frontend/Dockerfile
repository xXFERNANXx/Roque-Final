# Etapa de construcción
FROM node:22-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Etapa de producción
FROM nginx:alpine
# Copiar archivos SSL
COPY ./ssl/mundoanime.crt /etc/nginx/ssl/
COPY ./ssl/mundoanime.key /etc/nginx/ssl/
# Configuración Nginx
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
# Aplicación
COPY --from=builder /app/dist /usr/share/nginx/html/MundoAnime
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]