const endpoints = require('../support/endpoints')

describe('Resources API', () => {
  describe('GET /api/unknown', () => {
    it('Should return list of resources', () => {
      cy.apiGet(endpoints.resources).then((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('page')
        expect(response.body).to.have.property('per_page')
        expect(response.body).to.have.property('total')
        expect(response.body.data).to.be.an('array')
        expect(response.body.data).to.have.length.greaterThan(0)
      })
    })

    it('Should return resources with expected fields', () => {
      cy.apiGet(endpoints.resources).then((response) => {
        response.body.data.forEach((resource) => {
          expect(resource).to.have.property('id')
          expect(resource).to.have.property('name')
          expect(resource).to.have.property('year')
          expect(resource).to.have.property('color')
          expect(resource).to.have.property('pantone_value')
        })
      })
    })

    it('Should return valid hex color format', () => {
      cy.apiGet(endpoints.resources).then((response) => {
        response.body.data.forEach((resource) => {
          expect(resource.color).to.match(/^#[0-9A-Fa-f]{6}$/)
        })
      })
    })
  })

  describe('GET /api/unknown/{id}', () => {
    it('Should return a single resource by ID', () => {
      cy.apiGet(endpoints.singleResource(2)).then((response) => {
        expect(response.status).to.equal(200)
        expect(response.body.data).to.have.property('id', 2)
        expect(response.body.data).to.have.property('name')
        expect(response.body.data).to.have.property('year')
        expect(response.body.data).to.have.property('color')
      })
    })

    it('Should return 404 for non-existent resource', () => {
      cy.apiGet(endpoints.singleResource(999)).then((response) => {
        expect(response.status).to.equal(404)
        expect(response.body).to.be.empty
      })
    })
  })
})
