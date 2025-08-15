# backend/Dockerfile
FROM node:18

WORKDIR /app

RUN apt-get update && apt-get install -y python3 make g++

# Copy root package.json & lock file
COPY package*.json ./

# Install dependencies (backend + frontend deps will be installed)
RUN npm install

# Copy backend source code
COPY backend/ ./

EXPOSE 5000
CMD ["node", "server/server.js"]
