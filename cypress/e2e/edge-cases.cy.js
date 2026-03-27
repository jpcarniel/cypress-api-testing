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

    it('Should create user with wrong field types', () => {
      cy.apiPost(endpoints.users, { name: 123, job: true }).then((response) => {
        expect(response.status).to.equal(201)
        expect(response.body).to.have.property('name', 123)
        expect(response.body).to.have.property('job', true)
      })
    })
  })

  describe('Non-existent resources', () => {
    it('Should handle PUT on non-existent user', () => {
      cy.apiPut(endpoints.singleUser(999), { name: 'Ghost', job: 'None' }).then(
        (response) => {
          expect(response.status).to.equal(200)
          expect(response.body).to.have.property('updatedAt')
        },
      )
    })

    it('Should handle DELETE on non-existent user', () => {
      cy.apiDelete(endpoints.singleUser(999)).then((response) => {
        expect(response.status).to.equal(204)
      })
    })
  })

  describe('Invalid pagination', () => {
    it('Should handle negative page number', () => {
      cy.apiGet(`${endpoints.users}?page=-1`).then((response) => {
        expect(response.status).to.equal(200)
        expect(response.body.data).to.be.an('array')
      })
    })

    it('Should handle string as page number', () => {
      cy.apiGet(`${endpoints.users}?page=abc`).then((response) => {
        expect(response.status).to.equal(200)
        expect(response.body.data).to.be.an('array')
      })
    })

    it('Should handle zero per_page', () => {
      cy.apiGet(`${endpoints.users}?per_page=0`).then((response) => {
        expect(response.status).to.equal(200)
        expect(response.body.data).to.be.an('array')
      })
    })
  })
})
