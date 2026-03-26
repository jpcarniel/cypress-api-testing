# Cypress API Testing

![CI](https://github.com/jpcarniel/cypress-api-testing/actions/workflows/api-tests.yml/badge.svg)

Automação de testes de API para o [ReqRes.in](https://reqres.in) usando Cypress. A ReqRes.in é uma API pública de simulação — ela retorna respostas realistas mas não persiste dados entre requisições.

## O que é testado

- **Users** - CRUD completo (listar, buscar, criar, atualizar, deletar) com validação de status codes, response body e timestamps
- **Autenticação** - registro e login com cenários de sucesso e falha (senha faltando, email inválido)
- **Resources** - listagem e busca de recursos com validação de formato (cores hexadecimais)
- **Edge cases** - resposta com delay, rotas inexistentes, headers CORS, payloads vazios

## Stack

- [Cypress](https://www.cypress.io/) 15.x
- JavaScript
- [ReqRes.in](https://reqres.in) (API pública)

## Como executar

```bash
# instalar dependências
npm install

# rodar todos os testes (headless)
npm test

# abrir a interface do Cypress
npm run test:open

# rodar uma suite específica
npm run test:users
npm run test:auth
npm run test:resources
npm run test:edge
```

## Estrutura do projeto

```
cypress/
├── e2e/
│   ├── users.cy.js
│   ├── auth.cy.js
│   ├── resources.cy.js
│   └── edge-cases.cy.js
├── fixtures/
│   ├── users.json
│   └── auth.json
└── support/
    ├── endpoints.js
    ├── commands.js
    └── e2e.js
```

## Arquitetura

- **Endpoints centralizados** (`endpoints.js`) funcionam como equivalente a Page Objects para API, centralizando todas as URLs
- **Custom commands** (`apiGet`, `apiPost`, `apiPut`, `apiPatch`, `apiDelete`) abstraem chamadas HTTP com `failOnStatusCode: false` para validar erros explicitamente
- **Fixtures** armazenam payloads de request separados da lógica dos testes
- Cada teste valida: **status code**, **response body**, **headers** e **tempo de resposta**

## Documentação

- [Plano de Testes](docs/test-plan.md) - escopo, estratégia, ambientes e riscos
- [Casos de Teste](docs/test-cases.md) - 31 casos de teste documentados com passos e resultados esperados
- [Bug Reports](docs/bug-reports.md) - 4 bugs identificados na API (validação, status codes, persistência)
