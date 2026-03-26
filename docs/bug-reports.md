# Bug Reports: ReqRes.in API

**Autor:** João Paulo Carniel Fonseca
**Data:** 06/01/2026

---

## BUG-001: POST /api/users aceita body vazio sem validação

**Severidade:** Média
**Prioridade:** Média
**Status:** Aberto
**Caso de teste relacionado:** CT-029

**Descrição:**
O endpoint POST /api/users aceita requisições com body vazio `{}` e retorna status 201 (Created) com id e timestamp, sem validar a presença de campos obrigatórios como `name` e `job`. Em contraste, os endpoints de autenticação (register e login) validam corretamente e retornam 400 quando campos obrigatórios estão ausentes.

**Passos para reproduzir:**

| Passo | Ação | Resultado |
|-------|------|-----------|
| 1 | POST /api/users com body `{}` | Status 201 retornado |
| 2 | Verificar response body | Body contém id e createdAt, sem name ou job |
| 3 | Comparar com POST /api/register com body `{}` | Status 400, error: "Missing email or username" |

**Resultado esperado:** Status 400 com mensagem indicando campos obrigatórios ausentes (name, job)

**Resultado real:** Status 201, recurso "criado" sem dados, apenas id e createdAt

**Ambiente:** ReqRes.in API, Cypress 15.x

**Observação:** Comportamento inconsistente entre endpoints. A falta de validação no endpoint de usuários pode permitir criação de registros vazios no sistema.

---

## BUG-002: Registro retorna status 200 em vez de 201

**Severidade:** Baixa
**Prioridade:** Baixa
**Status:** Aberto
**Caso de teste relacionado:** CT-013

**Descrição:**
O endpoint POST /api/register retorna status 200 (OK) ao registrar um usuário com sucesso. A convenção HTTP para criação de recurso é 201 (Created), que é o status usado corretamente pelo endpoint POST /api/users. Isso representa uma inconsistência entre endpoints da mesma API.

**Passos para reproduzir:**

| Passo | Ação | Resultado |
|-------|------|-----------|
| 1 | POST /api/register com email e password válidos | Status 200 retornado |
| 2 | Verificar status code | 200 OK |
| 3 | Comparar com POST /api/users com name e job | Status 201 Created |

**Resultado esperado:** Status 201 (Created), pois um novo recurso (conta de usuário) foi criado

**Resultado real:** Status 200 (OK)

**Ambiente:** ReqRes.in API, Cypress 15.x

**Observação:** Não impacta funcionalidade. É uma questão de aderência à especificação HTTP (RFC 7231). O endpoint de login corretamente retorna 200, pois não cria recurso.

---

## BUG-003: DELETE retorna 204 mas recurso continua existindo

**Severidade:** Alta
**Prioridade:** Alta
**Status:** Aberto
**Caso de teste relacionado:** CT-012

**Descrição:**
O endpoint DELETE /api/users/{id} retorna status 204 (No Content), indicando que o recurso foi deletado com sucesso. Porém, ao fazer GET /api/users/{id} imediatamente após, o recurso ainda existe e retorna status 200 com dados completos. A operação de delete não persiste.

**Passos para reproduzir:**

| Passo | Ação | Resultado |
|-------|------|-----------|
| 1 | DELETE /api/users/2 | Status 204 (sucesso) |
| 2 | GET /api/users/2 | Status 200, usuário retornado normalmente |
| 3 | Repetir DELETE e GET múltiplas vezes | Mesmo comportamento |

**Resultado esperado:** Após DELETE retornar 204, GET subsequente deveria retornar 404 (Not Found)

**Resultado real:** GET retorna 200 com dados do usuário, como se o DELETE não tivesse ocorrido

**Ambiente:** ReqRes.in API, Cypress 15.x

**Observação:** Este comportamento é conhecido e documentado pela ReqRes.in — a API simula respostas mas não persiste alterações. Em uma API real, isso seria um bug crítico de integridade de dados. Documentado aqui como exercício de identificação de inconsistências.

---

## BUG-004: POST /api/users não valida tipos de dados

**Severidade:** Baixa
**Prioridade:** Baixa
**Status:** Aberto
**Caso de teste relacionado:** CT-008

**Descrição:**
O endpoint POST /api/users aceita qualquer tipo de dado nos campos name e job sem validação. É possível enviar números, booleanos, arrays ou objetos onde strings são esperadas. A API não sanitiza nem rejeita tipos incorretos.

**Passos para reproduzir:**

| Passo | Ação | Resultado |
|-------|------|-----------|
| 1 | POST /api/users com `{"name": 12345, "job": true}` | Status 201, dados aceitos como enviados |
| 2 | POST /api/users com `{"name": [1,2,3], "job": {"a":"b"}}` | Status 201, dados aceitos como enviados |
| 3 | POST /api/users com `{"name": "<script>alert(1)</script>"}` | Status 201, script aceito sem sanitização |

**Resultado esperado:** Status 400 para tipos inválidos, ou sanitização de inputs potencialmente perigosos

**Resultado real:** Status 201, qualquer payload é aceito e retornado sem validação

**Ambiente:** ReqRes.in API, Cypress 15.x

**Observação:** A ausência de validação de tipo e sanitização de input pode representar vulnerabilidades de segurança (XSS stored) em APIs reais que persistem dados.
