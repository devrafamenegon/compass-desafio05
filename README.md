<p align="center">
  <img alt="compass logo" src="https://user-images.githubusercontent.com/65569815/176964539-fe858838-0d07-418e-9220-b6d94461ecee.png" />
</p>

# 🏪 Compass Mart

Desafio final do **Programa de Bolsas de NodeJS da [Compass.uol](https://compass.uol/)**.

## 🧾 Sumário
* ### [Como inicializar](#-como-inicializar)
* ### [Endpoints](#-endpoints)
* ### [Schemas](#-schemas)

## 📖 Solicitação do cliente
A compasso entrou em um novo ramo de mercado, a CompassMart a qual é uma loja de departamento, onde seu foco é a comercialização de alimentos. Para essa API vai ser necessário desenvolver uma API em NodeJS que realize o controle de [Produtos](#product-table)


## 📗 Documentação Swagger
Para acessar a documentão completa da API, basta acessar este [link](https://app.swaggerhub.com/apis/devrafamenegon/CompassMart/1.0.0)

## 🧰 Tecnologias

<p>
  <img src="https://user-images.githubusercontent.com/65569815/182266557-f2d0c589-fe31-4d65-b867-cb40385066a0.svg" width="100">
  <img src="https://user-images.githubusercontent.com/65569815/182253645-6966537e-18ed-4c47-974b-22510cc3d834.png" width="100">
  <img src="https://user-images.githubusercontent.com/65569815/187051607-c61423cb-a4c8-480c-9655-ff038a001ed7.jpg" width="100">
</p>

Para o desenvolvimento deste projeto, utilizei a linguagem Typescript, NodeJS com Express, Mongoose para a conexão ao banco de dados Mongo.
<br/>

## 🔑 Requisitos

Antes de começar, você vai precisar ter instalado em sua máquina o Node.js, também é necessário uma collection no MongoDB Atlas e não se esqueça de criar a pasta `.env` seguindo o arquivo `.env.example`.

Opcionalmente, você pode executar a API utilizando o [Docker]('https://www.docker.com/products/docker-desktop/'), para isso é necessário te-lo instalado em sua máquina.

```json
"dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.0.1",
    "express": "^4.18.1",
    "joi": "^17.6.0",
    "mongoose": "^6.5.2",
    "mongoose-paginate-v2": "^1.7.0",
    "multer": "^1.4.5-lts.1"
},
"devDependencies": {
    "@commitlint/cli": "^17.0.3",
    "@commitlint/config-conventional": "^17.0.3",
    "@types/cors": "^2.8.12",
    "@types/dotenv": "^8.2.0",
    "@types/express": "^4.17.13",
    "@types/jest": "^28.1.7",
    "@types/joi": "^17.2.3",
    "@typescript-eslint/eslint-plugin": "^5.33.1",
    "@typescript-eslint/parser": "^5.32.0",
    "eslint": "^8.22.0",
    "eslint-config-airbnb-base": "^15.0.0",
    "eslint-config-prettier": "^8.5.0",
    "eslint-config-standard-with-typescript": "^22.0.0",
    "eslint-plugin-import": "^2.26.0",
    "eslint-plugin-n": "^15.2.4",
    "eslint-plugin-prettier": "^4.2.1",
    "eslint-plugin-promise": "^6.0.0",
    "husky": "^8.0.0",
    "jest": "^28.1.3",
    "nodemon": "^2.0.19",
    "prettier": "^2.7.1",
    "supertest": "^6.2.4",
    "ts-jest": "^28.0.8",
    "ts-node": "^10.9.1",
    "typescript": "^4.7.4"
  }
```

## 🎭 Variáveis ambiente
```bash
PORT=3000
MONGO_DB_URL=mongodb+srv://<user>:<password>@<cluster>.tn4rwt6.mongodb.net/<collection>?retryWrites=true&w=majority
DEFAULT_LIMIT_PER_PAGE

# if you want to use docker, you need to set the following environment variables
API_EXPOSED_PORT
API_CONTAINER_PORT
```

## 🏁 Como inicializar

Como descrito nos requisitos acima, primeiramente você precisa instalar o [NodeJS](https://nodejs.org/en/)
<br/>
Depois você irá executar os seguintes comandos:

```bash
# Clona este repositório
$ git clone https://github.com/devrafamenegon/compass-desafio05.git

# Acessa a pasta do projeto
$ cd compass-desafio05

# Instala as dependências
$ npm install
```

Agora que você já possui as dependências instalas, basta iniciar o projeto (Não se esqueça de configurar as variáveis de ambiente no arquivo `.env`)

```bash
# Caso tenha o docker
$ docker-compose up

# Caso não tenha o Docker
# Inicia a aplicação em localhost:3000
$ npm run dev

```

## 🧪 Testes

Após instalar e configurar todo o projeto, você pode rodar os testes com o comando abaixo

```bash
# Inicia os testes unitários e de integração
$ npm run test
```

## 🚪 Endpoints

### Product Endpoints
|       Route           |    Method    |                   Description                     |                                                                         
|   ---------------     | :----------: |  ----------------------------------------------   |                                                                           
|  `/product`           |    POST      |  Creates a product                                | 
|  `/product/csv`       |    POST      |  Creates many products using a csv file           |    
|  `/product`           |    GET       |  Gets all of products                             |   
|  `/product/:id`       |    GET       |  Gets the product by its ID                       |  
|  `/product/low_stock` |    GET       |  Gets the product with low qtd_stock              |  
|  `/product/:id`       |    PATCH     |  Updates a part of a product by its ID            |    
|  `/product/:id`       |    PUT       |  Updates an entire product by its ID              |
|  `/product/:id`       |    DELETE    |  Deletes the product by its ID                    |
   
## 🧱 Schemas

### Product Table
|        FieldName        |    Type   | Required | Unique |
|-------------------------|:---------:|:--------:|:------:|
| `_id`                   | Uuid      | true     | true   |
| `title`                 | String    | true     | false  |
| `description`           | String    | true     | false  |
| `department`            | String    | true     | false  |
| `brand`                 | String    | true     | false  |
| `price`                 | Number    | true     | false  |
| `qtd_stock`             | Number    | true     | false  |
| `stock_control_enabled` | Boolean   | true     | false  |
| `bar_codes`             | String    | true     | true   |
| `createdAt`             | Date      | true     | false  |
| `updatedAt`             | Date      | true     | false  |


## ✋🏻 Autor
| <img src="https://avatars.githubusercontent.com/devrafamenegon" width=115>
|---
| <a href="https://github.com/devrafamenegon">Rafael Menegon</a> 
