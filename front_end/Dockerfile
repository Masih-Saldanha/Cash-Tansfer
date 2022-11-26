FROM node:16

WORKDIR /app/

RUN rm -rf /app/*

COPY . .

RUN mkdir -p /var/www/html

RUN rm -rf /var/www/html/*

RUN npm i

RUN npm run build

RUN cp -fR /app/build/* /var/www/html/

WORKDIR /

# RUN rm -rf /app

EXPOSE 3000