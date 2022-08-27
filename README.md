<p align="center">
  <img alt="compass logo" src="https://user-images.githubusercontent.com/65569815/176964539-fe858838-0d07-418e-9220-b6d94461ecee.png" />
</p>

# 🏪 Compass Store

Desafio final do **Programa de Bolsas de NodeJS da [Compass.uol](https://compass.uol/)**.

## 🧾 Sumário
* ### [Como inicializar](#-como-inicializar)
* ### [Endpoints](#-endpoints)
* ### [Schemas](#-schemas)

## 📖 Solicitação do cliente
A compasso entrou em um novo ramo de mercado, a CompassMart a qual é uma loja de departamento, onde seu foco é a comercialização de alimentos. Para essa
API vai ser necessário desenvolver uma API em NodeJS que realize o controle de [Produtos](#product-table)

## 🧰 Tecnologias

<p>
  <img src="https://user-images.githubusercontent.com/65569815/182266557-f2d0c589-fe31-4d65-b867-cb40385066a0.svg" width="100">
  <img src="https://user-images.githubusercontent.com/65569815/182253645-6966537e-18ed-4c47-974b-22510cc3d834.png" width="100">
</p>

Para o desenvolvimento deste projeto, utilizamos a linguagem Typescript, NodeJS com Express, Mongoose para a conexão ao banco de dados Mongo.
<br/>

## 🔑 Requisitos

Antes de começar, você vai precisar ter instalado em sua máquina o Node.js, também é necessário uma collection no MongoDB Atlas e não se esqueça de criar a pasta `.env` seguindo o arquivo `.env.example`.

Opcionalmente, você pode executar a API utilizando o [Docker]('https://www.docker.com/products/docker-desktop/'), para isso é necessário te-lo instalado em sua máquina.

## 🏁 Como inicializar

Como descrito nos requisitos acima, primeiramente você precisa instalar o [NodeJS](https://nodejs.org/en/)
<br/>
Depois você irá executar os seguintes comandos:

```bash
# Clona este repositório
$ git clone https://github.com/Desafio4Grupo2/CompassStoreExecutados.git

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


## ✋🏻 Autores
| <img src="https://avatars.githubusercontent.com/devrafamenegon" width=115>
|---
| <a href="https://github.com/devrafamenegon">Rafael Menegon</a> 
