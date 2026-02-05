# Build stage
FROM node:22-alpine AS build

WORKDIR /app

# Copy frontend package files
COPY package*.json ./
RUN npm ci

# Copy frontend source and build
COPY index.html vite.config.js ./
COPY src ./src
COPY public ./public
RUN npm run build

# Production stage
FROM node:22-alpine AS production

WORKDIR /app

# Copy server package files and install
COPY server/package*.json ./server/
RUN cd server && npm ci --only=production

# Copy server source
COPY server ./server

# Copy built frontend
COPY --from=build /app/dist ./dist

# Create data directory
RUN mkdir -p /app/data

# Expose port
EXPOSE 3001

# Set environment
ENV NODE_ENV=production
ENV PORT=3001

# Start server
WORKDIR /app/server
CMD ["node", "index.js"]
