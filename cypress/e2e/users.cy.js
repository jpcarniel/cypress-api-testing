const endpoints = require('../support/endpoints')

describe('Users API', () => {
  describe('GET /api/users', () => {
    it('Should return paginated list of users', () => {
      cy.apiGet(endpoints.users).then((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('page')
        expect(response.body).to.have.property('per_page')
        expect(response.body).to.have.property('total')
        expect(response.body).to.have.property('total_pages')
        expect(response.body.data).to.be.an('array')
        expect(response.body.data).to.have.length.greaterThan(0)
      })
    })

    it('Should return correct page when page parameter is provided', () => {
      cy.apiGet(`${endpoints.users}?page=2`).then((response) => {
        expect(response.status).to.equal(200)
        expect(response.body.page).to.equal(2)
        expect(response.body.data).to.be.an('array')
      })
    })

    it('Should return empty data for page beyond total', () => {
      cy.apiGet(`${endpoints.users}?page=999`).then((response) => {
        expect(response.status).to.equal(200)
        expect(response.body.data).to.be.an('array').that.is.empty
      })
    })

    it('Should return users with expected fields', () => {
      cy.apiGet(endpoints.users).then((response) => {
        response.body.data.forEach((user) => {
          expect(user).to.have.property('id')
          expect(user).to.have.property('email')
          expect(user).to.have.property('first_name')
          expect(user).to.have.property('last_name')
          expect(user).to.have.property('avatar')
        })
      })
    })

    it('Should respond within acceptable time', () => {
      cy.apiGet(endpoints.users).then((response) => {
        expect(response.duration).to.be.lessThan(3000)
      })
    })
  })

  describe('GET /api/users/{id}', () => {
    it('Should return a single user by ID', () => {
      cy.apiGet(endpoints.singleUser(2)).then((response) => {
        expect(response.status).to.equal(200)
        expect(response.body.data).to.have.property('id', 2)
        expect(response.body.data).to.have.property('email')
        expect(response.body.data).to.have.property('first_name')
        expect(response.body.data).to.have.property('last_name')
        expect(response.body.data).to.have.property('avatar')
      })
    })

    it('Should return 404 for non-existent user', () => {
      cy.apiGet(endpoints.singleUser(999)).then((response) => {
        expect(response.status).to.equal(404)
        expect(response.body).to.be.empty
      })
    })
  })

  describe('POST /api/users', () => {
    it('Should create a new user', () => {
      cy.fixture('users').then((data) => {
        cy.apiPost(endpoints.users, data.create).then((response) => {
          expect(response.status).to.equal(201)
          expect(response.body).to.have.property('name', data.create.name)
          expect(response.body).to.have.property('job', data.create.job)
          expect(response.body).to.have.property('id')
          expect(response.body.createdAt).to.match(
            /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/,
          )
        })
      })
    })
  })

  describe('PUT /api/users/{id}', () => {
    it('Should update user with full replacement', () => {
      cy.fixture('users').then((data) => {
        cy.apiPut(endpoints.singleUser(2), data.updateFull).then((response) => {
          expect(response.status).to.equal(200)
          expect(response.body).to.have.property('name', data.updateFull.name)
          expect(response.body).to.have.property('job', data.updateFull.job)
          expect(response.body.updatedAt).to.match(
            /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/,
          )
        })
      })
    })
  })

  describe('PATCH /api/users/{id}', () => {
    it('Should partially update user', () => {
      cy.fixture('users').then((data) => {
        cy.apiPatch(endpoints.singleUser(2), data.updatePartial).then(
          (response) => {
            expect(response.status).to.equal(200)
            expect(response.body).to.have.property(
              'job',
              data.updatePartial.job,
            )
            expect(response.body.updatedAt).to.match(
              /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/,
            )
          },
        )
      })
    })
  })

  describe('DELETE /api/users/{id}', () => {
    it('Should delete user and return 204', () => {
      cy.apiDelete(endpoints.singleUser(2)).then((response) => {
        expect(response.status).to.equal(204)
        expect(response.body).to.be.empty
      })
    })
  })
})
