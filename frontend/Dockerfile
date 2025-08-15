FROM node:18

WORKDIR /app

# Copy root package.json & lock
COPY package*.json ./

# Install dependencies (includes frontend & backend packages)
RUN npm install

# Copy frontend files
COPY frontend/ ./       

EXPOSE 5173
CMD ["npm", "run", "dev"]
