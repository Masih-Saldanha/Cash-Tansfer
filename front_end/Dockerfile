FROM node:16

WORKDIR /app

COPY . .

RUN npm i

RUN npm run build

RUN rm -rf /var/www/html/*

RUN mkdir -p /var/www/html

RUN mv build/* /var/www/html

WORKDIR /

EXPOSE 3000

RUN rm -rf /app