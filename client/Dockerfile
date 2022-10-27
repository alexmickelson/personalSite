FROM node:15-alpine as build
WORKDIR /app
COPY ./package.json /app/
COPY ./package-lock.json /app/
RUN npm install
COPY . /app
RUN npm run build

FROM ghcr.io/linuxserver/swag
RUN rm -f /config/nginx/site-confs/*
COPY --from=build /app/build /usr/share/nginx/html

# CMD ["nginx", "-g", "daemon off;"]