# Backend Dockerfile for Node.js API
FROM public.ecr.aws/docker/library/node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app/backend

# Copy backend package files
COPY backend/package.json backend/package-lock.json* ./

# Install dependencies
RUN npm install --production

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy node_modules from deps stage
COPY --from=deps /app/backend/node_modules ./backend/node_modules

# Copy database module
COPY database ./database

# Copy backend application code
COPY backend ./backend

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nodejs

# Set working directory to backend
WORKDIR /app/backend

USER nodejs

EXPOSE 3000

ENV PORT=3000

CMD ["node", "src/index.js"]
