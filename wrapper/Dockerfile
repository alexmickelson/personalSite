# meant for building the react app, not serving it
FROM node:15-alpine

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

CMD npm run build