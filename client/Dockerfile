FROM node:15-alpine as build
WORKDIR /app
COPY ./package.json /app/
COPY ./package-lock.json /app/
RUN npm install
COPY . /app
RUN npm run build

FROM ghcr.io/linuxserver/swag
COPY default.conf /config/nginx/site-confs/default
COPY --from=build /app/build /var/www/html

# CMD ["nginx", "-g", "daemon off;"]