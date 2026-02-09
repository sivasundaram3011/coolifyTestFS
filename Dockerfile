# Multi-stage Docker build for React Vite app
# This Dockerfile is optimized for AI-generated applications

# Stage 1: Build stage
FROM public.ecr.aws/docker/library/node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci || npm install

# Copy source code
COPY . .

# Accept build argument for Vite base path
ARG BASE_PATH=/

ENV VITE_BASE_PATH=${BASE_PATH}

# Build the application
RUN npm run build

# Stage 2: Production stage
FROM public.ecr.aws/docker/library/nginx:alpine AS production

# Create non-root user and remove default nginx configuration
RUN addgroup -g 1001 -S appuser && \
    adduser -S appuser -u 1001 -G appuser && \
    rm -rf /usr/share/nginx/html/*

# Copy built application from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx configuration for React SPA
COPY --chown=appuser:appuser nginx.conf /etc/nginx/nginx.conf

# Create nginx cache, log, and runtime directories with proper permissions
RUN mkdir -p /var/cache/nginx /var/log/nginx /var/lib/nginx /tmp && \
    chown -R appuser:appuser /var/cache/nginx /var/log/nginx /var/lib/nginx /etc/nginx /usr/share/nginx/html /tmp && \
    chmod 755 /tmp

# Switch to non-root user
USER appuser

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=30s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
