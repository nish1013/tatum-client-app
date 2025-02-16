# --- Stage 1: Build Frontend ---
    FROM node:18-alpine AS builder

    # Set working directory inside the container
    WORKDIR /app
    
    # Ensure frontend and common lib directories exist
    RUN mkdir -p frontend lib/common
    
    # Copy package.json files separately for caching
    COPY frontend/package*.json frontend/
    COPY lib/common/package*.json lib/common/
    
    # Install frontend dependencies
    WORKDIR /app/frontend
    RUN npm install
    
    # Move to common lib and install dependencies
    WORKDIR /app/lib/common
    COPY lib/common .
    RUN npm install && npm install -g typescript
    
    # Verify tsconfig.cjs.json exists
    RUN ls -la /app/lib/common/tsconfig.cjs.json || echo "Missing tsconfig.cjs.json"
    
    # Build the common library
    RUN npm run build
    
    # Move back to frontend and ensure correct dependency linking
    WORKDIR /app/frontend
    COPY frontend . 
    RUN npm install --force
    
    # Build the frontend
    RUN npm run build
    
    # --- Stage 2: Serve with Nginx ---
    FROM nginx:alpine
    
    # Set working directory
    WORKDIR /usr/share/nginx/html
    
    # Remove default Nginx static files
    RUN rm -rf ./*
    
    # Copy built frontend files from previous stage
    COPY --from=builder /app/frontend/dist . 
    
    # Expose the port for serving the frontend (default 80)
    EXPOSE 80
    
    # Start Nginx
    CMD ["nginx", "-g", "daemon off;"]
    