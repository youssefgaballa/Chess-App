FROM node:iron-trixie-slim

WORKDIR /app
COPY package*.json ./
RUN npm ci 
COPY . .
CMD ["npm", "run", "start"]