# Stage 1: Builder
FROM node:24-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

# Stage 2: Production
FROM node:24-alpine
WORKDIR /usr/src/app
COPY package*.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY index.js .
EXPOSE 3000
CMD [ "npm", "start" ]
