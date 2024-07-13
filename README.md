# MySQL CRUD com Node.js
Este servidor de aplicação tem propósitos educacionais, pois é um projeto pessoal baseado em um case, explicando a interface e as funcionalidades do aplicativo. 

## Instalação
Instale todas as dependências necessárias para executar o projeto, descritas no arquivo package.json.

Como este é um projeto Node.js, você pode executar o seguinte comando para fazer isso:

```bash
yarn install
```

## Base de dados
Este aplicativo é executado em um servidor MySQL localhost. Certifique-se de que você tem um servidor MySQL em execução e crie um banco de dados conforme descrito nos arquivos de script SQL.

## Modelagem UML de banco de dados
No repositório, há arquivos .png e .brM3 para permitir a visualização do processo para chegar ao esquema final do banco de dados.

Para abrir o arquivo .brM3, visite este link.

## Configuração do Banco de Dados
  1.No arquivo executeScript.mjs, atualize as credenciais do MySQL (usuário e senha) conforme necessário.
  2.Execute o script de criação do banco de dados:

```bash
yarn run-sql

```

## Como executar
  1. Certifique-se de que as credenciais do MySQL no arquivo executeScript.mjs estão corretas.
  2. Na pasta 'api', altere o arquivo db.js e defina o nome de usuário e a senha do seu usuário MySQL
  3. Se desejar, ainda na pasta 'api', altere a porta do index.js para uma de sua escolha.
  4. Iniciar o Servidor da API
     Navegue até a pasta 'api' e execute:

     ```bash
    yarn start

    ```
  5. Iniciar o Frontend
     Navegue até a pasta 'frontend' e execute:

     ```bash
    yarn start

    ```

## Autora
Este projeto tem fins educativos e foi idealizado por Eduarda Figueredo.
     

    
