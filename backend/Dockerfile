# Stage 1: Build Application
FROM node:18-alpine AS builder

WORKDIR /app
RUN mkdir -p backend lib/common

# Build the common library
WORKDIR /app/lib/common
# Copy package files for caching
COPY lib/common/package*.json ./
# Install dependencies and install TypeScript globally
RUN npm install && npm install -g typescript
# Copy the rest of the common library source
COPY lib/common ./
# Run the build script (ensure your package.json defines a "build" command)
RUN npm run build
# Remove devDependencies to slim the package
RUN npm prune --production

# Build the backend service
WORKDIR /app/backend
# Copy backend package files for caching
COPY backend/package*.json ./
RUN npm install && npm install -g @nestjs/cli
# Copy the entire backend source
COPY backend ./
# Build the NestJS application
RUN npm run build

# Stage 2: Production Image
FROM node:18-alpine

WORKDIR /app

# Copy built backend artifacts and node_modules from builder stage
COPY --from=builder /app/backend/dist ./backend/dist
COPY --from=builder /app/backend/node_modules ./backend/node_modules
COPY --from=builder /app/backend/package.json ./backend/package.json

# Overwrite the local dependency with the built common library
COPY --from=builder /app/lib/common /app/backend/node_modules/@lib/common

WORKDIR /app/backend
EXPOSE 4000

CMD ["node", "dist/main.js"]
