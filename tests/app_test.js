const request = require('supertest')
const app = require('../src/app.js')

test('Returns list of all todos in DB on /todos', (done) => {
  request(app)
    .get('/todos')
    .then((response) => {
      expect(response.statusCode).toBe(200)
      done()
    })
})
