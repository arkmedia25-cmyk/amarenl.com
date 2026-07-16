# syntax = docker/dockerfile:1

# AmareNL Content Orchestrator — Fly.io deployment
FROM node:22-slim

# Install git (needed by some orchestrator steps)
RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy package files
COPY server/package*.json ./server/
COPY package*.json ./

# Install dependencies
RUN cd server && npm install --production

# Copy entire project (server needs access to content/, lib/, etc.)
COPY . .

# Run from server directory
WORKDIR /app/server

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3001/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})" || exit 1

EXPOSE 3001

CMD ["npx", "tsx", "index.ts"]
