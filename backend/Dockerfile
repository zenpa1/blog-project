FROM node:18-alpine AS builder
WORKDIR /app

# Install dependencies and build
COPY package*.json tsconfig.json ./
COPY src ./src
RUN npm install && npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package*.json ./
RUN npm install --production

ENV PORT=3000
EXPOSE 3000

CMD ["node", "dist/app.js"]
