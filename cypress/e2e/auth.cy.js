const endpoints = require('../support/endpoints')

describe('Authentication API', () => {
  describe('POST /api/register', () => {
    it('Should register user with valid credentials', () => {
      cy.fixture('auth').then((data) => {
        cy.apiPost(endpoints.register, data.validRegister).then((response) => {
          expect(response.status).to.equal(200)
          expect(response.body).to.have.property('id')
          expect(response.body).to.have.property('token')
          expect(response.body.token).to.be.a('string').and.not.be.empty
        })
      })
    })

    it('Should return 400 when password is missing', () => {
      cy.fixture('auth').then((data) => {
        cy.apiPost(endpoints.register, data.missingPassword).then(
          (response) => {
            expect(response.status).to.equal(400)
            expect(response.body).to.have.property('error')
            expect(response.body.error).to.contain('Missing password')
          },
        )
      })
    })

    it('Should return 400 when email is missing', () => {
      cy.fixture('auth').then((data) => {
        cy.apiPost(endpoints.register, data.missingEmail).then((response) => {
          expect(response.status).to.equal(400)
          expect(response.body).to.have.property('error')
          expect(response.body.error).to.contain('Missing')
        })
      })
    })

    it('Should return 400 for unregistered email', () => {
      cy.fixture('auth').then((data) => {
        cy.apiPost(endpoints.register, data.invalidEmail).then((response) => {
          expect(response.status).to.equal(400)
          expect(response.body).to.have.property('error')
        })
      })
    })
  })

  describe('POST /api/login', () => {
    it('Should login with valid credentials', () => {
      cy.fixture('auth').then((data) => {
        cy.apiPost(endpoints.login, data.validLogin).then((response) => {
          expect(response.status).to.equal(200)
          expect(response.body).to.have.property('token')
          expect(response.body.token).to.be.a('string').and.not.be.empty
        })
      })
    })

    it('Should return 400 when password is missing', () => {
      cy.fixture('auth').then((data) => {
        cy.apiPost(endpoints.login, data.missingPassword).then((response) => {
          expect(response.status).to.equal(400)
          expect(response.body).to.have.property('error')
          expect(response.body.error).to.contain('Missing password')
        })
      })
    })

    it('Should return 400 when email is missing', () => {
      cy.fixture('auth').then((data) => {
        cy.apiPost(endpoints.login, data.missingEmail).then((response) => {
          expect(response.status).to.equal(400)
          expect(response.body).to.have.property('error')
          expect(response.body.error).to.contain('Missing')
        })
      })
    })

    it('Should return 400 for unregistered email', () => {
      cy.fixture('auth').then((data) => {
        cy.apiPost(endpoints.login, data.invalidEmail).then((response) => {
          expect(response.status).to.equal(400)
          expect(response.body).to.have.property('error')
        })
      })
    })
  })
})
