FROM node:22-alpine AS builder

WORKDIR /app

# Copy package.json
COPY package.json ./

# Use npm install instead of npm ci since we don't have a package-lock.json
RUN npm install

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

FROM node:22-alpine
WORKDIR /app

COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Install PostgreSQL client
RUN apk add --no-cache postgresql-client

EXPOSE 3000

# Start the production server
CMD npm run start:prod