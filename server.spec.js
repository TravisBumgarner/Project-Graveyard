const supertest = require('supertest')

const app = require('./app')

describe('GET /ok', () => {
    it('Should return status code 200', (done) => {
        supertest(app)
            .get('/ok')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    })
})