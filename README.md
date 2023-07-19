#  🤖 ChatBot  💬 💬 💬

<div align="center">
  
![Art](art.gif)

</div> 
 
##

## :memo: Descrição
<p> O chatBot é uma aplicação full-stack desenvolvida em ReactJS, Node.js e MySQL para fornecer informações sobre data, hora e informações sobre empréstimos de forma rápida e eficiente. A aplicação é acessível apenas para usuários cadastrados no banco de dados.</p>
<p>Quando os usuários finalizam suas conversas com o ChatBot, eles têm a opção de exportar todo o conteúdo da conversa em um arquivo CSV. Essa funcionalidade permite que os usuários mantenham um registro pessoal das interações e informações fornecidas pelo ChatBot.</p>
<p>Além disso,  os usuários com permissões de administrador têm acesso a uma funcionalidade especial: eles podem exportar todos os históricos de conversas que estão armazenados no banco de dados. Essa funcionalidade é valiosa para realizar análises detalhadas.</p>

## 🔍 Funcionalidades 
- Acesso para Usuários Cadastrados
- Autenticação de usuários da aplicação
- Informações sobre Data e Hora
- Informações sobre Emprestimos
- Exportação em arquivo .csv da Conversa do usuário 
- Exportação de Históricos de Conversas (Funcionalidade Administrativa)

##  💻 Instalação
- Certifique-se de ter o Node.js instalado em seu sistema.
- Faça o clone deste repositório para o seu ambiente local.
- Navegue até o diretório raiz do projeto.
- No terminal, acesse a pasta "backend" e execute o comando npm install para instalar as dependências do backend.
- Em seguida, acesse a pasta "frontend" e execute novamente o comando npm install para instalar as dependências do frontend.

## ⚙️ Configurações
<p>Esta aplicação utiliza o docker-compose para trabalhar com o banco de dados Mysql. Após o clone da aplicação, verifique se o arquivo docker-compose.yml está presente.</> 
<p>Abra o arquivo docker-compose.yml em um editor de texto e certifique-se de que as variáveis de ambiente MYSQL_ROOT_PASSWORD, MYSQL_DATABASE e ports estão configuradas corretamente:</p>

 <details>

  ```yml
  version: '3'
  services:
    node:
      build:
        context: .
        dockerfile: ./Dockerfile
      container_name: api_chatbot
      restart: always
      working_dir: /app
      volumes:
        - ./:/app
      ports:
        - "3000:3000"
      depends_on:
        - database
    database:
      image: mysql:8.0.29
      restart: always
      environment:
        MYSQL_ROOT_PASSWORD: root
        MYSQL_DATABASE: chatbotDB
      ports:
        - "3306:3306"
      volumes:
        - ./database.sql:/docker-entrypoint-initdb.d/database.sql

  ```
  
 </details> 
 <p>Se necessário, ajuste as configurações para atender às suas necessidades.</>

## ⚙️ Configurações do Ambiente
Antes de executar o projeto, você precisará configurar algumas variáveis de ambiente. Siga as instruções abaixo:

Antes de executar o projeto, você precisará configurar o arquivo `.env` com as variáveis de ambiente necessárias. Siga as instruções abaixo:

<details>

1. Crie um arquivo chamado `.env` na raiz do projeto.

2. Abra o arquivo `.env` em um editor de texto.

3. Preencha as variáveis de ambiente com as informações necessárias. Abaixo estão as variáveis necessárias e uma breve explicação de cada uma:

```dotenv
# Configurações do banco de dados MySQL
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=root
MYSQL_PORT=33060

# Chave secreta para geração dos tokens JWT
JWT_SECRET=chatbot

# Senhas dos usuários (substitua pelas senhas reais)
USER1_PASSWORD=password1
USER2_PASSWORD=password2
USER3_PASSWORD=password3
ADMIN1_PASSWORD=password
   ```
⚠️ Observação: Lembrando que essas variáveis estão com valores genéricos, servindo apenas de exemplo. Para garantir maior segurança, substitua-os por valores reais e complexos.

4. Salve o arquivo `.env`.

</details>

## ▶️ Execução
  <p>Após concluir as etapas de instalação e configuração, execute os seguintes etapas</p>
  
  - Localize a pasta que contém o arquivo docker-compose.yml e execute o seguinte comando no terminal:
  
  ```js
  
docker-compose up

```

- Na pasta backend execute o servidor com o seguinte comando:
```js
  
npm run dev

```

- Na pasta frontend execute a aplicação com o seguinte comando:

```js

npm run dev

```

<details>

⚠️ Observação: Caso você faça alguma modificação significativa nos arquivos de configuração do Docker Compose ou no script do banco de dados database.sql, e deseje reconstruir os contêineres do zero, execute o seguinte comando:

```js

docker-compose down && docker-compose up -d

```

</details>

## ⚠️ Observações

A aplicação possui um arquivo que faz a conexão do pool do MySQL para se conectar ao banco de dados na porta 33060. Certifique-se de que a porta do banco de dados definida no seu código corresponda à porta mapeada no arquivo `docker-compose.yml`.

<details> 

  ```javascript
require('dotenv').config();
const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: 'chatbotDB',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = connection;
```
⚠️ Observação: Os valores das variáveis MYSQL_HOST, MYSQL_PORT, MYSQL_USER e MYSQL_PASSWORD são lidos das variáveis de ambiente definidas no arquivo .env. Certifique-se de configurar corretamente essas variáveis no arquivo .env para que a conexão com o banco de dados funcione corretamente.

</details> 

## ℹ️ Gerando Hashes de Senhas:
Para garantir a segurança das senhas armazenadas no banco de dados,  hashes gerados a partir do algoritmo bcrypt são utilizados. Caso você queira adicionar suas próprias senhas ao banco de dados, você pode seguir os passos abaixo:

<details> 

Após clonar o projeto, navegue até a pasta onde se encontra o arquivo `generatePasswordHashes.js`. Neste arquivo, você encontrará as variáveis `password1`, `password2` e `password3`, que estão definidas como variáveis de ambiente. Você pode substituir os valores dessas variáveis pelas suas próprias senhas:

```javascript
require('dotenv').config();
const bcrypt = require('bcrypt');

const password1 = process.env.USER1_PASSWORD;
const password2 = process.env.USER2_PASSWORD;
const password3 = process.env.USER3_PASSWORD;

const hash1 = bcrypt.hashSync(password1, 10);
const hash2 = bcrypt.hashSync(password2, 10);
const hash3 = bcrypt.hashSync(password3, 10);

console.log(`Hash1: ${hash1}`); 
console.log(`Hash2: ${hash2}`); 
console.log(`Hash3: ${hash3}`); 

```
Após definir as suas senhas nas variáveis correspondentes, execute o arquivo generatePasswordHashes.js para gerar os hashes das senhas. No terminal, dentro da pasta que contém o arquivo generatePasswordHashes.js, execute o seguinte comando:

```bash
node generatePasswordHashes.js
```
Os hashes das senhas serão exibidos no console, como no exemplo abaixo:

```bash
Hash1: $2b$10$2JAtiAEqzFW3j2Ag0U9zx.XWd.TjDvwsDxwDzfoXMX04T7C96nt1i
Hash2: $2b$10$iRsd4wimn60KAspOawbi5uAD9cQce7CI8W5XKF1mAlJLoI/La5dfy
Hash3: $2b$10$EJ7jXstWEw9fA3kK6bd/e.KFiWc5w1FYHrxpSMTvUucUWp1IuNfwy
```
Com os hashes gerados, você pode copiá-los e inseri-los no script do banco de dados database.sql, substituindo os valores correspondentes às senhas existentes no INSERT INTO da tabela users. Substitua 'SEU_HASH_1', 'SEU_HASH_2' e 'SEU_HASH_3' pelos hashes gerados para as suas senhas.

```bash

-- database.sql

-- Resto do script...

INSERT INTO users (username, password, role) VALUES
  ('user1', 'SEU_HASH_1', 'admin'),
  ('user2', 'SEU_HASH_2', 'user'),
  ('user3', 'SEU_HASH_3', 'user');

```
</details> 

⚠️ Observação: Não recomendamos armazenar senhas em texto plano no código. Neste exemplo, utilizamos variáveis de ambiente (.env) para armazenar as senhas em ambiente de desenvolvimento. Em um ambiente de produção, é recomendado o uso de variáveis de ambiente seguras.

Esses hashes gerados são utilizados no script do banco de dados para popular a tabela users com dados de exemplo. Esses dados podem ser usados apenas para fins de teste e desenvolvimento.


## :wrench: Tecnologias utilizadas

- Node.js

- React.js

- Vite

- MySql

- Bootstrap


