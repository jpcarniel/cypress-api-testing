# Plano de Testes: ReqRes.in API

**Autor:** João Paulo Carniel Fonseca
**Data:** 06/01/2026
**Versão:** 1.0

## Objetivo

Validar os endpoints da API pública ReqRes.in, cobrindo operações CRUD de usuários, autenticação (registro e login), listagem de recursos e cenários de borda. Os testes são automatizados com Cypress e executados via GitHub Actions.

## Escopo

### Dentro do escopo

- CRUD de usuários (GET, POST, PUT, PATCH, DELETE)
- Paginação e busca por ID
- Registro e login (sucesso e falha)
- Listagem de recursos (/api/unknown)
- Validação de status codes (200, 201, 204, 400, 404)
- Validação de response body (campos, tipos, formatos)
- Validação de headers (content-type, CORS)
- Tempo de resposta
- Resposta com delay
- Payloads vazios e inválidos

### Fora do escopo

- Endpoints autenticados com API key (collections, app-users)
- Testes de carga/performance
- Testes de UI
- Segurança avançada (rate limiting, injection)

## Ambiente de Testes

- **URL base:** https://reqres.in
- **Navegador:** Chrome (headless no CI)
- **SO:** Ubuntu (CI), macOS (local)
- **Node.js:** 20.x
- **Cypress:** 15.x

## Critérios de Entrada

- API acessível na URL base
- Cypress e dependências instalados
- Conexão com internet estável

## Critérios de Saída

- Todas as suites executam sem erros de infraestrutura
- Todos os testes passam
- Relatório gerado via Mochawesome

## Estratégia de Testes

Os testes são organizados por recurso (users, auth, resources, edge-cases). Cada teste valida status code, response body, headers e tempo de resposta. Os dados de teste são centralizados em fixtures e as URLs em um arquivo de endpoints. O CI roda automaticamente a cada push na branch main.

## Riscos

| Risco | Impacto | Mitigação |
|-------|---------|-----------|
| ReqRes.in fora do ar | Todos os testes falham | Reexecutar CI, sem workaround local |
| API muda contratos | Testes quebram | Fixtures facilitam atualização rápida |
| Rate limiting | Testes intermitentes | Retry configurado no Cypress |
| Delay endpoint instável | Falso negativo | Timeout aumentado para 10s |
