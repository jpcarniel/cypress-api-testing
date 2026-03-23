# Casos de Teste: ReqRes.in API

**Autor:** João Paulo Carniel Fonseca
**Data:** 06/01/2026

---

## Users

### CT-001: Listar usuários com paginação

**Prioridade:** Alta
**Tipo:** Funcional

| Passo | Ação | Resultado Esperado |
|-------|------|--------------------|
| 1 | GET /api/users | Status 200, body com page, per_page, total, total_pages e data (array) |

---

### CT-002: Listar usuários de página específica

**Prioridade:** Média
**Tipo:** Funcional

| Passo | Ação | Resultado Esperado |
|-------|------|--------------------|
| 1 | GET /api/users?page=2 | Status 200, page = 2, data é array |

---

### CT-003: Listar página inexistente

**Prioridade:** Média
**Tipo:** Boundary

| Passo | Ação | Resultado Esperado |
|-------|------|--------------------|
| 1 | GET /api/users?page=999 | Status 200, data é array vazio |

---

### CT-004: Validar campos do usuário

**Prioridade:** Alta
**Tipo:** Contrato

| Passo | Ação | Resultado Esperado |
|-------|------|--------------------|
| 1 | GET /api/users | Cada usuário tem id, email, first_name, last_name, avatar |

---

### CT-005: Tempo de resposta da listagem

**Prioridade:** Baixa
**Tipo:** Performance

| Passo | Ação | Resultado Esperado |
|-------|------|--------------------|
| 1 | GET /api/users | Resposta em menos de 3 segundos |

---

### CT-006: Buscar usuário por ID

**Prioridade:** Alta
**Tipo:** Funcional

| Passo | Ação | Resultado Esperado |
|-------|------|--------------------|
| 1 | GET /api/users/2 | Status 200, data.id = 2, campos presentes |

---

### CT-007: Buscar usuário inexistente

**Prioridade:** Alta
**Tipo:** Funcional

| Passo | Ação | Resultado Esperado |
|-------|------|--------------------|
| 1 | GET /api/users/999 | Status 404, body vazio |

---

### CT-008: Criar usuário

**Prioridade:** Alta
**Tipo:** Funcional

| Passo | Ação | Resultado Esperado |
|-------|------|--------------------|
| 1 | POST /api/users com name e job | Status 201, body com name, job, id e createdAt |

---

### CT-009: Validar formato do timestamp de criação

**Prioridade:** Baixa
**Tipo:** Contrato

| Passo | Ação | Resultado Esperado |
|-------|------|--------------------|
| 1 | POST /api/users com name e job | createdAt em formato ISO 8601 |

---

### CT-010: Atualizar usuário (PUT)

**Prioridade:** Alta
**Tipo:** Funcional

| Passo | Ação | Resultado Esperado |
|-------|------|--------------------|
| 1 | PUT /api/users/2 com name e job | Status 200, body com name, job e updatedAt |

---

### CT-011: Atualizar usuário parcialmente (PATCH)

**Prioridade:** Alta
**Tipo:** Funcional

| Passo | Ação | Resultado Esperado |
|-------|------|--------------------|
| 1 | PATCH /api/users/2 com job | Status 200, body com job e updatedAt |

---

### CT-012: Deletar usuário

**Prioridade:** Alta
**Tipo:** Funcional

| Passo | Ação | Resultado Esperado |
|-------|------|--------------------|
| 1 | DELETE /api/users/2 | Status 204, body vazio |

---

## Autenticação

### CT-013: Registrar com credenciais válidas

**Prioridade:** Alta
**Tipo:** Funcional

| Passo | Ação | Resultado Esperado |
|-------|------|--------------------|
| 1 | POST /api/register com email e password | Status 200, body com id e token |

---

### CT-014: Registrar sem senha

**Prioridade:** Alta
**Tipo:** Validação

| Passo | Ação | Resultado Esperado |
|-------|------|--------------------|
| 1 | POST /api/register sem password | Status 400, error contém "Missing password" |

---

### CT-015: Registrar sem email

**Prioridade:** Média
**Tipo:** Validação

| Passo | Ação | Resultado Esperado |
|-------|------|--------------------|
| 1 | POST /api/register sem email | Status 400, error contém "Missing" |

---

### CT-016: Registrar com email não cadastrado

**Prioridade:** Média
**Tipo:** Validação

| Passo | Ação | Resultado Esperado |
|-------|------|--------------------|
| 1 | POST /api/register com email inválido | Status 400, body com error |

---

### CT-017: Login com credenciais válidas

**Prioridade:** Alta
**Tipo:** Funcional

| Passo | Ação | Resultado Esperado |
|-------|------|--------------------|
| 1 | POST /api/login com email e password | Status 200, body com token |

---

### CT-018: Login sem senha

**Prioridade:** Alta
**Tipo:** Validação

| Passo | Ação | Resultado Esperado |
|-------|------|--------------------|
| 1 | POST /api/login sem password | Status 400, error contém "Missing password" |

---

### CT-019: Login sem email

**Prioridade:** Média
**Tipo:** Validação

| Passo | Ação | Resultado Esperado |
|-------|------|--------------------|
| 1 | POST /api/login sem email | Status 400, error contém "Missing" |

---

## Resources

### CT-020: Listar recursos

**Prioridade:** Alta
**Tipo:** Funcional

| Passo | Ação | Resultado Esperado |
|-------|------|--------------------|
| 1 | GET /api/unknown | Status 200, body com page, per_page, total e data (array) |

---

### CT-021: Validar campos do recurso

**Prioridade:** Média
**Tipo:** Contrato

| Passo | Ação | Resultado Esperado |
|-------|------|--------------------|
| 1 | GET /api/unknown | Cada recurso tem id, name, year, color, pantone_value |

---

### CT-022: Validar formato de cor hexadecimal

**Prioridade:** Baixa
**Tipo:** Contrato

| Passo | Ação | Resultado Esperado |
|-------|------|--------------------|
| 1 | GET /api/unknown | Cada color segue formato #RRGGBB |

---

### CT-023: Buscar recurso por ID

**Prioridade:** Alta
**Tipo:** Funcional

| Passo | Ação | Resultado Esperado |
|-------|------|--------------------|
| 1 | GET /api/unknown/2 | Status 200, data.id = 2 |

---

### CT-024: Buscar recurso inexistente

**Prioridade:** Alta
**Tipo:** Funcional

| Passo | Ação | Resultado Esperado |
|-------|------|--------------------|
| 1 | GET /api/unknown/999 | Status 404, body vazio |

---

## Edge Cases

### CT-025: Resposta com delay

**Prioridade:** Média
**Tipo:** Performance

| Passo | Ação | Resultado Esperado |
|-------|------|--------------------|
| 1 | GET /api/users?delay=3 | Status 200, duração > 2s, data é array |

---

### CT-026: Rota inexistente

**Prioridade:** Baixa
**Tipo:** Boundary

| Passo | Ação | Resultado Esperado |
|-------|------|--------------------|
| 1 | GET /api/nonexistent | Status 404 |

---

### CT-027: Header content-type

**Prioridade:** Média
**Tipo:** Contrato

| Passo | Ação | Resultado Esperado |
|-------|------|--------------------|
| 1 | GET /api/users | content-type inclui application/json |

---

### CT-028: Header CORS

**Prioridade:** Baixa
**Tipo:** Contrato

| Passo | Ação | Resultado Esperado |
|-------|------|--------------------|
| 1 | GET /api/users | Header access-control-allow-origin presente |

---

### CT-029: Criar usuário com body vazio

**Prioridade:** Média
**Tipo:** Boundary

| Passo | Ação | Resultado Esperado |
|-------|------|--------------------|
| 1 | POST /api/users com {} | Status 201, body com id e createdAt |

---

### CT-030: Registrar com body vazio

**Prioridade:** Média
**Tipo:** Boundary

| Passo | Ação | Resultado Esperado |
|-------|------|--------------------|
| 1 | POST /api/register com {} | Status 400, body com error |

---

### CT-031: Login com body vazio

**Prioridade:** Média
**Tipo:** Boundary

| Passo | Ação | Resultado Esperado |
|-------|------|--------------------|
| 1 | POST /api/login com {} | Status 400, body com error |
