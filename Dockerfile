# Stage 1: Build Stage
FROM node:18 AS builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) for dependency installation
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the entire application source code
COPY . .

# Build the Vite.js application for production
RUN npm run build

# Stage 2: Production Stage
FROM nginx:alpine

# Set the working directory for Nginx
WORKDIR /usr/share/nginx/html

# Copy the built app from the builder stage to the Nginx html directory
COPY --from=builder /app/dist .

# Expose port 80 for Nginx
EXPOSE 80

# Start Nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]
