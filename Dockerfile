FROM node:alpine

WORKDIR /app

COPY package*.json ./
COPY client ./client

RUN npm install

RUN npm run setup-production-app

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]