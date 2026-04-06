# Stage 1: Build Frontend
FROM node:22-alpine AS frontend-builder
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/ .
RUN npm run build

# Stage 2: Build Backend
FROM node:22-alpine AS backend-builder
WORKDIR /app/server
COPY server/package*.json ./
RUN npm install
COPY server/ .
RUN npm run build

# Stage 3: Final Production Image
FROM node:22-alpine
WORKDIR /app

# Copy built backend
COPY --from=backend-builder /app/server/dist ./server/dist
COPY --from=backend-builder /app/server/node_modules ./server/node_modules
COPY --from=backend-builder /app/server/package*.json ./server/

# Copy built frontend into backend's public/dist directory for static serving
COPY --from=frontend-builder /app/client/dist ./client/dist

# Set environment variables
ENV NODE_ENV=production
ENV PORT=5000

# Expose production port
EXPOSE 5000

# Command to run the production backend
CMD ["node", "server/dist/index.js"]
