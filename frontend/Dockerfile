# Use official Node.js Alpine image for lightweight container
FROM node:18-alpine AS builder

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first (to cache dependencies)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire frontend project
COPY . .

# Build the frontend (Vite generates optimized `dist/`)
RUN npm run build


# --- Stage 2: Serve the built frontend using a lightweight web server ---
FROM nginx:alpine

# Set working directory
WORKDIR /usr/share/nginx/html

# Remove default Nginx static files
RUN rm -rf ./*

# Copy built frontend files from previous stage
COPY --from=builder /app/dist .

# Expose the port for serving the frontend (default 80)
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
