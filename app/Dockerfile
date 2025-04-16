FROM node:22-alpine AS builder

WORKDIR /app

RUN npm install -g npm

COPY package-lock.json ./
COPY package.json ./
RUN npm install
COPY . .

RUN npm run build

FROM node:22-alpine AS production

WORKDIR /app

RUN npm install -g npm

COPY --from=builder /app/package-lock.json ./
COPY --from=builder /app/package.json ./
RUN npm install --production

COPY --from=builder /app/.next ./.next

CMD [ "npm", "run", "start" ]
