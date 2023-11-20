
# Med Senior - API

* [Sobre](#sobre)
* [Configurando a aplicação](#configurando-a-aplicação)
    * [Intalando o Yarn (opcional)](#instalando-o-yarn-opcional)
    * [Instalando as dependências](#instalando-as-dependências)
    * [Criando a variável de ambiente](#criando-a-variável-de-ambiente)
    * [Utilizando o Prisma](#utilizando-o-prisma)
    * [Rodando a aplicação](#rodando-a-aplicação)
* [Rodando a aplicação com Docker](#rodando-a-aplicação-com-docker)
* [Outros repositórios](#outros-repositórios)
* [Colaboradores](#colaboradores)

## Sobre

> Projeto desenvolvido para as disciplinas de DSW e PDM

Idosos muitas vezes enfrentam desafios em sua vida diária e podem precisar de ajuda em situações de emergência.

Solução Proposta: Um aplicativo web que oferece recursos de assistência, como alertas de medicamentos, rastreamento de saúde e botões de emergência para idosos. Ele também pode permitir que familiares e cuidadores monitorem o bem-estar dos idosos remotamente.


## Configurando a aplicação
### Instalando o Yarn (opcional)

```bash
$ npm -g i yarn
```

### Instalando as dependências

Rode o seguinte comando para instalar as dependências do projeto:

```bash
$ npm install
# ou
$ yarn install
```

### Criando a variável de ambiente

Para ter o acesso ao banco de dados é necessário uma string de conexão, essa string de conexão deve estar em um arquivo ```.env```... Para isso basta cria-lo utilizando como base o arquivo ```.env.example```, substituindo somente o conteúdo da variável.

### Utilizando o Prisma

Para rodar a aplicação é necessário gerar as tabelas no banco de dados, para isso o [Prisma](https://www.prisma.io/) está sendo utilizado.

> A string de conexão deve estar no arquivo .env

> O banco utilizado deve ser o mongodb

Os comandos necessários são:
```bash
$ yarn prisma generate

# ou

$ npx prisma generate
```

### Rodando a aplicação

Após realizar todas as etapas acima, já podemos iniciar a aplicação com o seguinte comando:

```bash
$ yarn run start
```
Após a aplicação terminar de subir, já vai ser possível realizar requisições através de algum API Client através da URL: http://localhost:5001.

## Rodando a aplicação com Docker
Para rodar a aplicação em Docker irá ser utilizado o docker compose juntamente com o Dockerfile que está nesse repositório e nos outros [componentes](#outros-repositórios) que complementam a aplicação.

A seguir vamos ter dois arquivos composes, um deles é o **docker-compose-app.yml** e o **docker-compose-db.yml**, sendo o *-app para a aplicação junto com os componentes e o *-db para o banco de dados.


### docker-compose-app.yml
```
version: '3.7'

services:
  med-senior-api:
    container_name: med-senior-api-container
    restart: always
    build:
      context: ./med-senior-api
      dockerfile: ./Dockerfile
    environment:
      - DATABASE_URL=mongodb://172.18.0.1:27017/admin
      - IP_ADDRESS=172.18.0.1
    expose:
      - '5000'
    ports:
      - '5000:5000'
    networks:
      - clusterGeral
  
  med-senior-front:
    container_name: med-senior-front-container
    restart: always
    build:
      context: ./med-senior-front
      dockerfile: ./Dockerfile
    expose:
      - '3000'
    ports:
      - '3000:3000'
    networks:
      - clusterGeral
  
  med-senior-auth:
    container_name: med-senior-auth-container
    restart: always
    build:
      context: ./med-senior-auth
      dockerfile: ./Dockerfile
    environment:
      - DATABASE_URL=mongodb://172.18.0.1:27017/admin
      - SECRET=mySecret_medSeniorAuth
    expose:
      - '5001'
    ports:
      - '5001:5001'
    networks:
      - clusterGeral
  
networks:
  clusterGeral:
```

### docker-compose-db.yml
```
version: '3.7'

services:
  mongo1:
    image: mongo:5
    container_name: mongo1-container
    restart: always
    expose:
      - '27017'
    ports:
      - '27017:27017'
    command: mongod --replSet myReplicaSet --bind_ip localhost,mongo1
    networks:
      - clusterGeral
  
  mongo2:
    image: mongo:5
    container_name: mongo2-container
    restart: always
    expose:
      - '27017'
    ports:
      - '27018:27017'
    command: mongod --replSet myReplicaSet --bind_ip localhost,mongo2
    networks:
      - clusterGeral

  mongo3:
    image: mongo:5
    container_name: mongo3-container
    restart: always
    expose:
      - '27017'
    ports:
      - '27019:27017'
    command: mongod --replSet myReplicaSet --bind_ip localhost,mongo3
    networks:
      - clusterGeral

  mongo-ui:
    image: mongo-express
    container_name: mongo-ui
    restart: always
    expose: 
      - '8081'
    ports:
      - '8081:8081'
    environment:
      ME_CONFIG_MONGODB_URL: mongodb://172.18.0.1:27017
    networks:
      - clusterGeral
networks:
  clusterGeral:

```

#### Rodando os dockers compose

Para iniciar a aplicação primeiro é necessário salvar os arquivo .yml acima na pasta onde todos os projetos vão estar, após salvar os arquivos devem ser necessários os seguintes comandos:

```bash
$ docker compose -f docker-compose-db.yml -f docker-compose-app.yml up -d

$ docker exec -it mongo1-container mongosh --eval "rs.initiate({
 _id: \"myReplicaSet\",
 members: [
   {_id: 0, host: \"mongo1\"},
   {_id: 1, host: \"mongo2\"},
   {_id: 2, host: \"mongo3\"}
 ]
})"

$ docker exec -it med-senior-api-container npx prisma db push
```

## Outros repositórios

- Módulo de autenticação: [Med Senior - Auth](https://github.com/gcostacoelho/med-senior-auth)

- Front End (desenvolvido em Vue): [Med Senior - Front](https://github.com/Rezende-Fabio/med-senior-front)

- Mobile (desenvolvido em Flutter): [Med Senior - Mobile](https://github.com/Rezende-Fabio/med-senior-mobile)

## Colaboradores

- [Fabio Rezende](https://github.com/Rezende-Fabio)
- [Mateus Moraes](https://github.com/Mateus11Toledo)
- [Hellen Turri](https://github.com/hellenTurri)
- [Karin Kagi](https://github.com/karinkagi)
