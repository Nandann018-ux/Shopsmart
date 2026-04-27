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
RUN npx prisma generate
RUN npm run build

# Stage 3: Final Production Image
FROM node:22-alpine
WORKDIR /app/server

# Copy backend
COPY --from=backend-builder /app/server/dist ./dist
COPY --from=backend-builder /app/server/node_modules ./node_modules
COPY --from=backend-builder /app/server/package*.json ./
COPY --from=backend-builder /app/server/prisma ./prisma

# Copy frontend build
COPY --from=frontend-builder /app/client/dist ../client/dist

ENV NODE_ENV=production
ENV PORT=5000

# Generate Prisma client in final container
RUN npx prisma generate

EXPOSE 5000

CMD ["node", "dist/index.js"]