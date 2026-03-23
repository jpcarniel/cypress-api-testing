const getHeaders = () => ({
  'x-api-key': Cypress.env('API_KEY'),
})

Cypress.Commands.add('apiGet', (url, options = {}) => {
  return cy.request({
    method: 'GET',
    url,
    headers: getHeaders(),
    failOnStatusCode: false,
    ...options,
  })
})

Cypress.Commands.add('apiPost', (url, body, options = {}) => {
  return cy.request({
    method: 'POST',
    url,
    body,
    headers: getHeaders(),
    failOnStatusCode: false,
    ...options,
  })
})

Cypress.Commands.add('apiPut', (url, body, options = {}) => {
  return cy.request({
    method: 'PUT',
    url,
    body,
    headers: getHeaders(),
    failOnStatusCode: false,
    ...options,
  })
})

Cypress.Commands.add('apiPatch', (url, body, options = {}) => {
  return cy.request({
    method: 'PATCH',
    url,
    body,
    headers: getHeaders(),
    failOnStatusCode: false,
    ...options,
  })
})

Cypress.Commands.add('apiDelete', (url, options = {}) => {
  return cy.request({
    method: 'DELETE',
    url,
    headers: getHeaders(),
    failOnStatusCode: false,
    ...options,
  })
})
