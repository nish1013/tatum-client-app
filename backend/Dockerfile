# --- Stage 1: Build the NestJS application ---
    FROM node:18-alpine AS builder

    # Set working directory inside the container
    WORKDIR /app
    
    # Ensure required directories exist
    RUN mkdir -p backend lib/common
    
    # Copy backend package.json separately for better caching
    COPY backend/package*.json backend/
    
    # Install backend dependencies
    WORKDIR /app/backend
    RUN npm install && npm install -g @nestjs/cli
    
    # Copy and build the common library
    WORKDIR /app/lib/common
    COPY lib/common .
    RUN npm install && npm install -g typescript && npm run build
    
    # Verify tsconfig.cjs.json exists
    RUN ls -la /app/lib/common/tsconfig.cjs.json || echo "Missing tsconfig.cjs.json"
    
    # Move back to backend and copy its source
    WORKDIR /app/backend
    COPY backend . 
    
    # Ensure dependencies resolve correctly (to link @lib/common)
    RUN npm install --force
    
    # Run the NestJS build process
    RUN npm run build
    
    # Debug: Check if `dist/` was created
    RUN ls -la /app/backend/dist || echo "Error: /app/backend/dist was not created"
    
    # --- Stage 2: Create a lightweight production image ---
    FROM node:18-alpine
    
    # Set working directory
    WORKDIR /app
    
    # Ensure correct paths before copying
    RUN mkdir -p backend lib/common/dist/cjs
    
    # Copy only necessary files from the build stage
    COPY --from=builder /app/backend/dist ./backend/dist
    COPY --from=builder /app/backend/node_modules ./backend/node_modules
    COPY --from=builder /app/backend/package.json ./backend/
    
    # Ensure the built common library is copied correctly
    COPY --from=builder /app/lib/common/dist/cjs ./lib/common/dist/cjs
    
    # Set working directory inside the container to backend
    WORKDIR /app/backend
    
    # Expose the backend API port (default: 4000)
    EXPOSE 4000
    
    # Start the backend server
    CMD ["node", "dist/main.js"]
    