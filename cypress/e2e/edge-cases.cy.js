const endpoints = require('../support/endpoints')

describe('Edge Cases', () => {
  describe('Delayed response', () => {
    it('Should handle delayed response within timeout', () => {
      cy.apiGet(`${endpoints.users}?delay=3`, { timeout: 10000 }).then(
        (response) => {
          expect(response.status).to.equal(200)
          expect(response.body.data).to.be.an('array')
          expect(response.duration).to.be.greaterThan(2000)
        },
      )
    })
  })

  describe('Response headers', () => {
    it('Should return correct content-type header', () => {
      cy.apiGet(endpoints.users).then((response) => {
        expect(response.headers['content-type']).to.include('application/json')
      })
    })

    it('Should return CORS headers', () => {
      cy.apiGet(endpoints.users).then((response) => {
        expect(response.headers).to.have.property('access-control-allow-origin')
      })
    })
  })

  describe('Empty and invalid payloads', () => {
    it('Should create user with empty body', () => {
      cy.apiPost(endpoints.users, {}).then((response) => {
        expect(response.status).to.equal(201)
        expect(response.body).to.have.property('id')
        expect(response.body).to.have.property('createdAt')
      })
    })

    it('Should handle registration with empty body', () => {
      cy.apiPost(endpoints.register, {}).then((response) => {
        expect(response.status).to.equal(400)
        expect(response.body).to.have.property('error')
      })
    })

    it('Should handle login with empty body', () => {
      cy.apiPost(endpoints.login, {}).then((response) => {
        expect(response.status).to.equal(400)
        expect(response.body).to.have.property('error')
      })
    })
  })
})
