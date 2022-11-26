FROM node:16

WORKDIR /app/

RUN mkdir -p /var/www/html

RUN rm -rf /var/www/html/*

COPY . .

RUN npm i

RUN npm run build

RUN cp -fR build/* /var/www/html

WORKDIR /

# RUN rm -rf /app

EXPOSE 3000