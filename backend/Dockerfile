# --- Stage 1: Build the NestJS application ---
    FROM node:18-alpine AS builder

    # Set working directory
    WORKDIR /app
    
    # Copy package.json and package-lock.json first (for better Docker caching)
    COPY package*.json ./
    
    # Install dependencies
    RUN npm install --only=production
    
    # Copy the full backend source code
    COPY . .
    
    # Build the application
    RUN npm run build
    
    
    # --- Stage 2: Create a lightweight production image ---
    FROM node:18-alpine
    
    # Set working directory
    WORKDIR /app
    
    # Copy only necessary files from the build stage
    COPY --from=builder /app/dist ./dist
    COPY --from=builder /app/node_modules ./node_modules
    COPY --from=builder /app/package.json ./
    
    # Expose the backend API port (default: 4000)
    EXPOSE 4000
    
    # Start the backend server
    CMD ["node", "dist/main.js"]
    