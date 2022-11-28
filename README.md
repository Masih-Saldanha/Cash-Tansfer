<p align="center">
  <a href="https://github.com/$username-github/$nome-repositorio">
    <img src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f4b0.svg" alt="readme-logo" width="80" height="80"> <!-- src="image-link" -->
  </a>

  <h3 align="center">
    Cash Transfer
  </h3>
</p>

# Descrição

Aplicação fullstack de transferência de dinheiro.

# Link do deploy

http://ec2-54-88-227-250.compute-1.amazonaws.com/

# Instruções de uso a partir do aplicativo descompactado

O Projeto compactado já vem com .env configurado para rodar localmente sem docker, por isso não é necessário criar um novo e preenchê-lo baseado no .env.example. No entanto pode ser necessário alterá-lo caso queira executá-lo pelo docker.

## Uso Local (Sem docker)

O documento "diretório-escolhido/cash_transfer/back_end/.env" deve estar preenchido com os seguintes dados:

```bash
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=cash_transfer_db
DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}?schema=public

PORT=5000
BCRYPT_SALT=10
JWT_TOKEN=cash_transfer
```

E o documento "diretório-escolhido/cash_transfer/front_end/.env" deve estar preenchido com os seguintes dados:

```bash
REACT_APP_BASE_URL=http://localhost:5000
```

Após isso, confira se a linha 41 de "diretório-escolhido/cash_transfer/docker-compose.yml" está assim:

```bash
      - 80:80
```

Após esses passos, siga com os seguinte comandos para executar a aplicação:

### Backend:

```bash
$ cd diretório-escolhido/cash_transfer/back_end/

$ npm install

$ npm run dev
```

### Frontend:

```bash
$ cd diretório-escolhido/cash_transfer/front_end/

$ npm install

$ npm start
```

Agora basta acessar a aplicação através do localhost:3000/

## Uso Local (Com docker)

O documento "diretório-escolhido/cash_transfer/back_end/.env" deve estar preenchido com os seguintes dados:

```bash
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_HOST=postgres_cash_transfer_db
POSTGRES_PORT=5432
POSTGRES_DB=cash_transfer_db
DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}?schema=public

PORT=5000
BCRYPT_SALT=10
JWT_TOKEN=cash_transfer
```

E o documento "diretório-escolhido/cash_transfer/front_end/.env" deve estar preenchido com os seguintes dados:

```bash
REACT_APP_BASE_URL=http://localhost:8080/api
```

Após isso, altere a linha 41 de "diretório-escolhido/cash_transfer/docker-compose.yml" para:

```bash
      - 8080:80
```

Terminando esses passos, siga com os seguinte comandos para executar a aplicação:

```bash
$ cd diretório-escolhido/cash_transfer/

$ docker compose build && mkdir -p html

$ docker compose down && docker compose up -d

$ docker cp react_cash_transfer_app:/app/build front_end/

$ cp -fR front_end/build/* html/
 
$ docker cp html/ react_cash_transfer_app:/var/www
```

Agora basta acessar a aplicação através do localhost:8080/