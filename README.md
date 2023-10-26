# ImpostoAPI

## Descrição
A ImpostoAPI é uma API REST desenvolvida como parte da atividade da disciplina "PW-III" e tem como objetivo fornecer serviços relacionados a impostos. Ela permite a criação, recuperação, atualização e exclusão de informações de usuários, calculando as alíquotas de imposto com base em sua renda mensal.

## Stack
Esta API REST foi desenvolvida usando as seguintes tecnologias:

- Linguagem de Programação: TypeScript
- Framework: Nest.js
- Banco de Dados: SQLite - Prisma (ORM)
- Ferramentas de Documentação: Swagger

## Como Executar Localmente
Para executar esta API localmente em seu ambiente de desenvolvimento, siga as etapas abaixo:

1 - Clonar o Repositório:
``` bash
git clone https://github.com/WiliamMelo01/impostoApi
```
2 - Instalar Dependências:
Navegue até o diretório do projeto e instale as dependências usando o gerenciador de pacotes npm ou yarn:
``` bash
cd impostoApi
npm install
# ou
yarn install
```

Executar o Servidor:
Inicie o servidor da API com o seguinte comando:
``` bash
npm start:dev
# ou
yarn start:dev
```

Acessar a Documentação com Swagger:
Após iniciar o servidor, você poderá acessar a documentação da API usando Swagger em seu navegador, acessando http://localhost:3000/doc.
